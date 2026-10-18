import { readFile } from 'node:fs/promises';

const [html, analytics] = await Promise.all([
  readFile(new URL('../dist/index.html', import.meta.url), 'utf8'),
  readFile(new URL('../dist/analytics.js', import.meta.url), 'utf8')
]);

const measurementId = html.match(/<meta name="google-analytics-id" content="([^"]*)">/)?.[1];
if (measurementId === undefined) throw new Error('Missing Google Analytics configuration meta tag.');
if (measurementId && !/^G-[A-Z0-9]+$/i.test(measurementId)) throw new Error('Invalid GA4 Measurement ID.');
if (html.includes('googletagmanager.com')) throw new Error('Analytics must not load directly from HTML before consent.');

for (const requiredId of ['cookie-banner', 'accept-analytics', 'decline-analytics', 'cookie-settings']) {
  if (!html.includes(`id="${requiredId}"`)) throw new Error(`Missing consent control: ${requiredId}`);
}

for (const eventName of ['project_open', 'contact_click', 'outbound_click', 'theme_change']) {
  if (!analytics.includes(`'${eventName}'`)) throw new Error(`Missing analytics event: ${eventName}`);
}

if (!analytics.includes("readConsent() !== 'granted'")) {
  throw new Error('Analytics events are not protected by the consent gate.');
}

console.log(`Analytics privacy checks passed (${measurementId ? 'configured' : 'waiting for a GA4 Measurement ID'}).`);
