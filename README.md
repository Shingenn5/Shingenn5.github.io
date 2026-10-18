# Elliott Davis — Portfolio

A responsive, dependency-free static portfolio. Site files live in `dist/` and can be served by any static host.

## Local preview

Run `npm run dev`, then open http://127.0.0.1:4173. Run `npm run check` for JavaScript syntax validation. No compilation or installation is required.

## Editing

- `dist/index.html`: employment-focused introduction, prominent contact links, resume-aligned profile and experience, credentials, and clickable project showcase.
- `dist/styles.css`: colors, typography, responsive layout, and focus states.
- `dist/app.js`: project notes and accessible native dialog behavior.
- `dist/analytics.js`: consent storage, delayed analytics loading, and privacy-conscious interaction events.
- `.openai/hosting.json`: Sites identity and static output configuration.

The page uses Google Fonts with local system-font fallbacks. Contact links open an email client, LinkedIn, or GitHub; the site does not collect form submissions or require paid hosting.

## Analytics setup

The cookie banner and click tracking are prepared for the free Google Analytics 4 tier. Analytics remains completely off until `dist/index.html` contains a valid GA4 Measurement ID in this tag:

```html
<meta name="google-analytics-id" content="G-XXXXXXXXXX">
```

After an ID is configured, visitors can allow or decline analytics. The Google script is only requested after consent. The site records page views plus `project_open`, `contact_click`, `outbound_click`, `theme_change`, and `cookie_consent_update` events. Event details use project keys, page sections, and external destination domains; they do not send email addresses, typed content, or full outbound URLs. Visitors can reopen the choice from **Cookie settings** in the footer. Reports appear in Google Analytics under **Reports → Engagement → Events**.

## Resume alignment

Content was reconciled against the user-supplied `Elliott_Davis_Resume.pdf` on October 17, 2026. The attached resume is the authority for biography, employment, dates, skills, project descriptions, and credentials. Graduation in May 2027 is shown as expected.

The site features Rasputin/WarSat, Geo Graph, and Digital Forensics. Experience lists Independent Software Developer (January 2026–present), Domino’s Pizza Delivery Driver (July 2026–present), and Chick-fil-A Team Member (June 2021–August 2024). The resume’s “Deliver Driver” typo is normalized to “Delivery Driver.” GitHub Foundations is dated 2025, FTK Ace is dated 2026, and Eagle Scout includes Middle Tennessee Scouting Council and May 2023.

The source resume is used for content verification and is not distributed by the website. No performance metrics or business outcomes have been added. Rasputin imagery remains labeled as an existing development snapshot.

GitHub Pages publishes `dist/` from `main` through `.github/workflows/deploy-pages.yml`. The repository workflow is the authority for the exact workflow filename. See `PROJECT_SOURCES.md` for provenance.

## Validation

Validated JavaScript syntax (including the theme script), analytics privacy checks, and whitespace checks. Browser verification covered 1440px desktop, 768px tablet, 390px and 375px phones, and 812×375 landscape in both light and dark themes with reduced motion enabled; no horizontal overflow or page errors occurred. All three project dialogs passed Enter activation, Escape dismissal, and focus return. The About link remains accessible on mobile. Desktop and phone screenshots were visually reviewed.

Email and LinkedIn destinations match the source resume; external delivery/profile ownership was not tested.

The header theme switch follows the system preference on first visit and remembers an explicit light/dark selection when browser storage is available. The portfolio is positioned for employment, not freelance commissions.

The current contact surface intentionally publishes email, LinkedIn, GitHub, and city/state. The phone number and full resume PDF are not published on the website.
