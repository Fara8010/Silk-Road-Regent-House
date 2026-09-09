# Silk Regent Ltd website

Source files for the Silk Regent Ltd public website at `silkregent.co.uk`.

## Hosting

- Static HTML, CSS and JavaScript
- Production hosting: Netlify
- Netlify Forms form name: `booking-request`
- Production publishing should only occur after explicit approval

## Files

- `index.html` — main multilingual landing page and booking-request form
- `styles.css` — presentation and responsive layout
- `script.js` — language switching and page interactions
- `thank-you.html` — form confirmation page
- `_headers` — Netlify response headers
- `netlify.toml` — Netlify publish-directory configuration

## Safe change workflow

1. Create a feature branch.
2. Make and validate the requested changes.
3. Open a draft pull request or create a deploy preview.
4. Review the preview.
5. Merge to the production branch only after approval.
