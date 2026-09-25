# Bicycle Website Task List

This checklist implements the approved scope in `implementation.md`. It is planning material only; no build work starts until the plan and required business inputs are approved.

## Phase 0: Discovery and Inputs

- [ ] Confirm project tier and approve `implementation.md`.
- [ ] Confirm the brand name, legal entity, domain, business address, contact details, and operating hours.
- [ ] Confirm target countries, languages, currency, delivery/service region, and governing jurisdiction.
- [ ] Inventory every bicycle model and obtain owner-verified specifications, descriptions, categories, sizes, colours, weights, price policy, and availability wording.
- [ ] Collect logo sources, brand guidance, image files, usage licences, model releases, attribution requirements, and alternative-text notes.
- [ ] Confirm warranty, returns/cancellation, delivery, assembly, fitting, safety, servicing, financing, and quotation terms.
- [ ] Name content, legal, privacy, accessibility, sales, and technical approvers.
- [ ] Confirm Git provider, Netlify team, GA4 property, Clarity project, and administrator ownership.
- [ ] Confirm form notification address, response owner, response-time statement, retention period, and deletion process.
- [ ] Record every unresolved input as a launch blocker rather than filling it with invented content.

## Phase 1: Architecture and Design Approval

- [ ] Initialize the static Astro project only after approval.
- [ ] Pin runtime/dependency versions and commit the lockfile.
- [ ] Define the content schema and validation rules for bicycles, site settings, metadata, and legal-page dates.
- [ ] Define the route map, navigation, footer, breadcrumbs, 404, and thank-you paths.
- [ ] Define IBM Carbon-inspired colour, typography, spacing, grid, border, icon, focus, and motion tokens.
- [ ] Produce mobile and desktop designs for home, catalogue, product, contact, legal, consent, and navigation states.
- [ ] Review the full enquiry journey and remove any cart, checkout, payment, reservation, or Buy Now implication.
- [ ] Validate colour contrast, keyboard order, tap targets, long text, and 200%/400% zoom in prototypes.
- [ ] Obtain brand, content, and UX approval before full page implementation.

## Phase 2: Static Site Foundation

- [ ] Build reusable semantic header, navigation, footer, layout, metadata, button, field, and feedback components.
- [ ] Build static home, about, FAQ, accessibility, thank-you, and 404 pages.
- [ ] Build the catalogue with progressive-enhancement filters and an accessible empty state.
- [ ] Build statically generated detail pages for all validated bicycle records.
- [ ] Add responsive specifications, image galleries, fit/usage guidance, and model-specific enquiry links.
- [ ] Ensure core content, navigation, product browsing, and contact submission work without client-side JavaScript.
- [ ] Verify stable layout at 320px through wide desktop sizes and prevent content overlap or horizontal overflow.
- [ ] Add automated content checks for missing fields, duplicate slugs, invalid URLs, and unapproved placeholder text.

## Phase 3: Netlify Image Asset Pipeline

- [ ] Store approved image originals under `site/assets/images/` with the static site.
- [ ] Confirm the production Netlify hostname or custom domain and TLS.
- [ ] Define versioned folder/file naming and asset ownership conventions.
- [ ] Add approved originals and record rights, dimensions, alt text, and source for each asset.
- [ ] Configure Netlify Image CDN transformations for responsive formats, widths, and quality where useful.
- [ ] Implement responsive image sources, intrinsic dimensions, focal crops, lazy loading, and hero prioritization.
- [ ] Add the social previews and full favicon/icon package to the deployed site.
- [ ] Set and verify cache rules for versioned assets in `netlify.toml`.
- [ ] Add a build check that rejects unapproved external image sources.
- [ ] Verify every production image resolves successfully through Netlify.

## Phase 4: Contact and Lead Handling

- [ ] Implement a statically rendered Netlify contact form with a unique form name.
- [ ] Add required and optional fields agreed in the plan.
- [ ] Prefill the bicycle model safely when arriving from a product page.
- [ ] Add native validation, accessible inline messages, error summary, success state, and privacy acknowledgement.
- [ ] Add honeypot protection; add CAPTCHA only after an abuse/usability review.
- [ ] Configure Netlify form detection and the approved notification email in the dashboard.
- [ ] Configure an informative subject line and a documented internal reply/escalation workflow.
- [ ] Test successful, invalid, duplicate, spam, offline/failure, and keyboard-only submissions on a deployed preview.
- [ ] Confirm the enquiry appears in Netlify and the notification reaches the business inbox without exposing SMTP credentials.
- [ ] Verify retention and deletion procedures with the submission owner.

## Phase 5: Consent, GA4, and Clarity

- [ ] Create a consent banner and preference panel with equally clear accept and reject choices.
- [ ] Default optional analytics/ad storage to denied where applicable.
- [ ] Load or activate GA4 and Clarity according to the approved consent model.
- [ ] Send consent updates and support later withdrawal.
- [ ] Configure GA4 page views and the approved catalogue/contact events.
- [ ] Mark only successful `generate_lead` submissions as the primary conversion.
- [ ] Configure Clarity masking and test that form and sensitive page content cannot be replayed.
- [ ] Exclude internal traffic where appropriate and keep preview/branch analytics disabled.
- [ ] Test fresh, accepted, rejected, changed, and expired consent states in supported browsers.
- [ ] Inspect cookies, local storage, network traffic, DebugView, and Clarity diagnostics.
- [ ] Audit event payloads and URLs to prove that no name, email, phone, message, or stable personal identifier is sent.

## Phase 6: SEO, WhatsApp, and Favicons

- [ ] Add unique titles, descriptions, canonical URLs, language, and robots metadata to every route.
- [ ] Add Organization/LocalBusiness, Product, Breadcrumb, and FAQ structured data only where facts qualify.
- [ ] Generate XML sitemap and `robots.txt`; exclude previews and non-public paths.
- [ ] Add complete Open Graph and Twitter/X metadata with absolute production URLs.
- [ ] Produce the approved 1200 x 630 social image and model-specific variants where useful.
- [ ] Add image type, dimensions, and alternative-text metadata.
- [ ] Add ICO, PNG, Apple touch, web-app, and maskable icons plus the web manifest.
- [ ] Validate structured data and crawl the built site for broken links and missing metadata.
- [ ] Test the production-domain preview in WhatsApp on a real device and verify title, description, image, and link.
- [ ] Confirm versioned social-image URLs handle platform caching when imagery changes.

## Phase 7: Legal and Policy Publication

- [ ] Draft the Privacy Policy from the actual data inventory and processor list.
- [ ] Draft the Cookie Policy with real cookie/storage names, providers, purposes, and durations.
- [ ] Draft Website Terms with verified entity, jurisdiction, ownership, use, liability, and dispute provisions.
- [ ] Draft the enquiry/sales disclaimer covering non-binding enquiries, quotation, stock, prices, imagery, specifications, and contract formation.
- [ ] Draft the Warranty and Returns page from the real business policy and statutory obligations.
- [ ] Add bicycle sizing, use, assembly, inspection, maintenance, protective equipment, e-bike/battery, recall, and safety wording where applicable.
- [ ] Add accessibility statement, feedback contact, known limitations, and review date.
- [ ] Cross-check all legal pages against form fields, analytics behaviour, retention, vendors, and sales workflow.
- [ ] Obtain and record owner/legal approval, effective date, and next review date.
- [ ] Link every policy in the footer and relevant just-in-time locations.
- [ ] Block production if any placeholder, copied policy, invented fact, or material contradiction remains.

## Phase 8: Netlify CI/CD and Security

- [ ] Connect the private Git repository to Netlify with `main` as production.
- [ ] Add `netlify.toml` for build/publish settings, redirects, headers, caching, and environment contexts.
- [ ] Enable automatic Deploy Previews for pull requests and Git-only production deploy enforcement.
- [ ] Prevent indexing and production analytics in preview/branch contexts.
- [ ] Configure public environment IDs and protected settings in Netlify with least-privilege access.
- [ ] Add CI checks for format, lint, type/content validation, tests, static build, links, metadata, accessibility smoke, dependencies, and secrets.
- [ ] Configure HTTPS, canonical domain redirects, security headers, and Content Security Policy.
- [ ] Test CSP against Netlify Forms, Netlify-hosted images, GA4, and Clarity; remove unused origins.
- [ ] Document approval, deployment, DNS/CDN access, rollback, incident, and credential-rotation procedures.
- [ ] Verify a failed check cannot publish production.

## Phase 9: Quality Assurance and Launch

- [ ] Run responsive tests at 320, 375, 768, 1024, 1440, and 1920px.
- [ ] Test current Chrome, Edge, Firefox, Safari, iOS Safari, and Android Chrome.
- [ ] Complete keyboard, screen-reader, 200%/400% zoom, contrast, reduced-motion, and touch testing.
- [ ] Verify WCAG 2.2 AA acceptance for core journeys.
- [ ] Run Lighthouse on home, catalogue, product, and contact templates and meet agreed budgets.
- [ ] Verify mobile Core Web Vitals targets on production-like hosting.
- [ ] Test all CDN images, fallback states, caching, lazy loading, and layout stability.
- [ ] Complete form delivery, spam, privacy, consent, GA4, Clarity, social-preview, sitemap, robots, favicon, and structured-data checks.
- [ ] Confirm there are no direct buying controls and every sales action routes to an enquiry/contact path.
- [ ] Resolve all critical/high defects and document accepted lower-severity exceptions.
- [ ] Obtain final business, content, legal, privacy, accessibility, and technical sign-off.
- [ ] Merge the approved release to `main` and verify the Netlify production deployment.
- [ ] Run post-deploy smoke checks and confirm rollback readiness.

## Phase 10: Post-Launch Operations

- [ ] Check enquiries and notification delivery daily during the first week.
- [ ] Review 404s, form spam, consent errors, analytics events, Clarity masking, performance, and CDN failures after 24 hours and 7 days.
- [ ] Correct misleading or outdated catalogue data immediately through the normal review flow.
- [ ] Establish monthly dependency/content/link checks and quarterly privacy, analytics, security, accessibility, and legal reviews.
- [ ] Define ownership for adding/removing bicycles and retiring CDN assets without breaking historical links.
- [ ] Record launch verification and any approved deviations in `global_implementation.md`.

## Launch Gate

Production is approved only when every required item above is complete or has a named owner, written risk acceptance, and review date. Critical exceptions are not eligible for risk acceptance: broken enquiry delivery, missing legal identity/privacy notice, analytics without required consent, exposed secrets, inaccessible core journeys, broken or oversized image delivery, incorrect WhatsApp metadata, or any direct purchase implication.
