# Vayu static site

This is a dependency-free static site deployed on Netlify. Images are served with the site from Netlify, while optional analytics stays disabled until the required IDs and privacy approval are provided.

## Required launch configuration

1. Add the GA4 Measurement ID and Microsoft Clarity Project ID to `assets/js/config.js`. Keep both empty until the final consent and privacy review passes.
2. Confirm the Netlify email notification for the `bicycle-enquiry` form and submit a deployed-site test.
3. Replace the working brand and model copy with approved catalogue data. Complete all pre-launch legal-policy placeholders with reviewed jurisdiction-specific wording.
4. Keep `site` as the Netlify publish directory and enable Deploy Previews plus Git-only production deploys.

## Local preview

Run `python3 -m http.server 8080` from this directory and open `http://localhost:8080`.
