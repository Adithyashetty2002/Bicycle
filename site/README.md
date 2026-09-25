# Vayu static site

This is a dependency-free static site intended for Netlify deployment. The working brand name, catalogue, legal policy framework, canonical domain, image CDN hostname, analytics IDs, and form recipient are intentionally not launch-ready until the owner supplies and approves them.

## Required launch configuration

1. Upload every image and icon in `assets/images/` and `assets/icons/` to Bunny.net Storage, then set `imageCdnBase` in `assets/js/config.js` to the approved Bunny Pull Zone or custom image hostname.
2. Replace every `example.com` canonical, sitemap, Open Graph URL, and `YOUR_PULL_ZONE.b-cdn.net` social-image URL with production values. Upload a 1200 x 630 social card to Bunny before enabling sharing.
3. Add the GA4 Measurement ID and Microsoft Clarity Project ID to `assets/js/config.js`. Keep both empty until the final consent and privacy review passes.
4. In Netlify, enable form detection and add an email notification for the `bicycle-enquiry` form. Submit a deployed-preview test before production.
5. Replace the working brand and model copy with approved catalogue data. Complete all pre-launch legal-policy placeholders with reviewed jurisdiction-specific wording.
6. Connect the Git repository to Netlify, set `site` as the publish directory, configure the custom domain/TLS, and enable Deploy Previews plus Git-only production deploys.

## Local preview

Run `python3 -m http.server 8080` from this directory and open `http://localhost:8080`.
