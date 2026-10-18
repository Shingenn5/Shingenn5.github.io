(() => {
  const consentCookie = 'portfolio_analytics_consent';
  const consentMaxAge = 60 * 60 * 24 * 180;
  const measurementId = document.querySelector('meta[name="google-analytics-id"]')?.content.trim() || '';
  const configured = /^G-[A-Z0-9]+$/i.test(measurementId);
  const localPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const available = configured || localPreview;
  let analyticsReady = false;
  let returnFocusTo = null;
  const pendingEvents = [];

  function readConsent() {
    const match = document.cookie.split('; ').find(item => item.startsWith(`${consentCookie}=`));
    return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : null;
  }

  function writeConsent(value) {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${consentCookie}=${encodeURIComponent(value)}; Max-Age=${consentMaxAge}; Path=/; SameSite=Lax${secure}`;
  }

  function clearGoogleCookies() {
    document.cookie.split(';').forEach(rawCookie => {
      const name = rawCookie.split('=')[0].trim();
      if (name === '_ga' || name.startsWith('_ga_')) {
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
      }
    });
  }

  function safeContext(element) {
    if (element.closest('#project-dialog')) return 'project_dialog';
    return element.closest('section[id]')?.id || element.closest('header, footer')?.tagName.toLowerCase() || 'page';
  }

  function sendEvent(name, parameters = {}) {
    if (!analyticsReady || typeof window.gtag !== 'function') return;
    window.gtag('event', name, parameters);
  }

  function track(name, parameters = {}) {
    if (readConsent() !== 'granted' || !configured) return;
    if (!analyticsReady) {
      pendingEvents.push([name, parameters]);
      return;
    }
    sendEvent(name, parameters);
  }

  function loadAnalytics() {
    if (!configured || analyticsReady || document.querySelector('script[data-portfolio-analytics]')) return;
    window[`ga-disable-${measurementId}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
      anonymize_ip: true,
      transport_type: 'beacon'
    });
    analyticsReady = true;
    pendingEvents.splice(0).forEach(([name, parameters]) => sendEvent(name, parameters));

    const script = document.createElement('script');
    script.async = true;
    script.dataset.portfolioAnalytics = '';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.append(script);
  }

  function updateBannerOffset(banner) {
    if (banner.hidden) {
      document.documentElement.style.removeProperty('--cookie-banner-offset');
      return;
    }
    document.documentElement.style.setProperty('--cookie-banner-offset', `${Math.ceil(banner.getBoundingClientRect().height + 32)}px`);
  }

  function showBanner({ focus = false } = {}) {
    const banner = document.querySelector('#cookie-banner');
    if (!available || !banner) return;
    banner.hidden = false;
    document.body.classList.add('cookie-banner-visible');
    updateBannerOffset(banner);
    if (focus) document.querySelector('#cookie-title')?.focus({ preventScroll: true });
  }

  function hideBanner() {
    const banner = document.querySelector('#cookie-banner');
    if (!banner) return;
    banner.hidden = true;
    document.body.classList.remove('cookie-banner-visible');
    updateBannerOffset(banner);
    if (returnFocusTo?.isConnected) returnFocusTo.focus({ preventScroll: true });
    returnFocusTo = null;
  }

  function setConsent(value) {
    writeConsent(value);
    if (value === 'granted') {
      if (configured) window[`ga-disable-${measurementId}`] = false;
      loadAnalytics();
      track('cookie_consent_update', { analytics_storage: 'granted' });
    } else {
      if (configured) window[`ga-disable-${measurementId}`] = true;
      if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: 'denied' });
      pendingEvents.length = 0;
      clearGoogleCookies();
    }
    hideBanner();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('#cookie-banner');
    const settingsButton = document.querySelector('#cookie-settings');
    const detailsButton = document.querySelector('#cookie-details-toggle');
    const details = document.querySelector('#cookie-details');

    if (!available || !banner || !settingsButton) return;
    settingsButton.hidden = false;

    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(() => updateBannerOffset(banner)) : null;
    resizeObserver?.observe(banner);

    const consent = readConsent();
    if (consent === 'granted') loadAnalytics();
    if (consent === 'denied' && configured) window[`ga-disable-${measurementId}`] = true;
    if (consent !== 'granted' && consent !== 'denied') showBanner();

    document.querySelector('#accept-analytics')?.addEventListener('click', () => setConsent('granted'));
    document.querySelector('#decline-analytics')?.addEventListener('click', () => setConsent('denied'));
    settingsButton.addEventListener('click', () => {
      returnFocusTo = settingsButton;
      showBanner({ focus: true });
    });
    detailsButton?.addEventListener('click', () => {
      const expanded = detailsButton.getAttribute('aria-expanded') === 'true';
      detailsButton.setAttribute('aria-expanded', String(!expanded));
      details.hidden = expanded;
      detailsButton.textContent = expanded ? 'Privacy details' : 'Hide privacy details';
      updateBannerOffset(banner);
    });

    document.addEventListener('click', event => {
      const target = event.target.closest('a, button');
      if (!target || target.closest('#cookie-banner') || target === settingsButton) return;

      if (target.matches('[data-project]')) {
        track('project_open', { project: target.dataset.project, page_section: 'work' });
        return;
      }
      if (target.matches('a[href^="mailto:"]')) {
        track('contact_click', { contact_method: 'email', page_section: safeContext(target) });
        return;
      }
      if (target.id === 'theme-toggle') {
        track('theme_change', { theme: document.documentElement.dataset.theme || 'unknown' });
        return;
      }
      if (target instanceof HTMLAnchorElement) {
        try {
          const destination = new URL(target.href, window.location.href);
          if (['http:', 'https:'].includes(destination.protocol) && destination.hostname !== window.location.hostname) {
            track('outbound_click', { destination_domain: destination.hostname, page_section: safeContext(target) });
          }
        } catch { /* Ignore invalid or browser-handled links. */ }
      }
    });
  });

  window.portfolioAnalytics = Object.freeze({ track, configured });
})();
