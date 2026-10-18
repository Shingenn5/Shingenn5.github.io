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

## Content review before public release

The current copy is aligned with the September 2026 resume for education, skills, employment dates, certifications, and recognition. Geo Graph is described from its public repository and README. Rasputin's native runtime description follows current project direction where it differs from older resume wording. No performance metrics or business results have been invented.

The Rasputin logo and workspace screenshot come from its existing project assets; the screenshot is labeled as a development snapshot. The other projects use typographic project marks, not claimed existing product logos. Add approved repository links and a current downloadable resume when available. The initial hosted version is private; public audience settings must be changed before sharing it with employers.

## Validation

Checked local HTTP response, JavaScript syntax, desktop appearance, 390px mobile layout without horizontal overflow, all four project dialogs, Enter activation, Escape dismissal, focus return to the project icon, and browser console errors. Email and LinkedIn destinations match the source resume; external delivery/profile ownership was not tested.




The header theme switch follows the system preference on first visit and remembers an explicit light/dark selection when browser storage is available. The portfolio is positioned for employment, not freelance commissions.

The current contact surface intentionally publishes email, LinkedIn, GitHub, and city/state. The phone number from the source resume is omitted from the public page.
