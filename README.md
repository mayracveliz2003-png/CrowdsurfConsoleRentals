# GameRent — Console Rental (Swiss Punk)

A single-page, mobile-first static site demonstrating a Swiss‑Punk aesthetic for a gaming console rental service. Features parallax scrolling, mobile-optimized service cards, and a contact form that posts to a Zapier webhook for CRM integration.

Quick start

1. Serve locally:

```bash
python3 -m http.server 8000
# open http://localhost:8000 in your browser
```

2. Replace Zapier webhook:
- Open `js/contact.js` and replace the `ZAPIER_WEBHOOK` constant with your Zapier "Catch Hook" URL.

What I added
- `index.html` — SPA-style landing with hero, Services, How it works, Contact form.
- `css/styles.css` — Swiss‑Punk palette, fluid typography, responsive grid, parallax helpers, form styles.
- `js/main.js` — mobile nav toggle and parallax scroll handler (requestAnimationFrame-enabled).
- `js/contact.js` — client-side validation and POST to Zapier webhook with loading UI.
- `assets/` — add your console images here (placeholder names used in markup).

Parallax notes
- Elements with class `.parallax` and attribute `data-speed="<number>"` will translate vertically as the user scrolls. Speeds are relative multipliers; smaller values move less.
- For performance, parallax uses requestAnimationFrame throttling. On devices that prefer reduced motion, the effect respects OS settings.

Mobile-optimized service cards
- The services section stacks on small screens and displays as a three-column grid on larger viewports. Cards include a media area (background image), short details, price, and quick CTA.

Form-to-CRM (Zapier)
- The contact form sends a JSON body including `name`, `email`, `phone`, `message`, and `timestamp` to the Zapier webhook. From Zapier you can forward data to your CRM (HubSpot, Airtable, Google Sheets, etc.).
- Example Zap flow: Webhooks by Zapier (Catch Hook) → Formatter (optional) → CRM action (e.g., Create Contact in HubSpot).

Accessibility & UX
- Mobile-first responsive layout.
- Keyboard-accessible hamburger menu; opening focuses the first link.
- Form shows inline validation and a loading spinner to reflect network activity.

Next steps I can take
- Add example images into `assets/` and update `index.html` references.
- Wire a real Zapier webhook and test a sample submission.
- Add a small admin preview page (protected) to view incoming reservation payloads during testing.

If you'd like, I can commit this new repository into your existing workspace as a Git repo and create an initial commit. Tell me if you want me to:
- initialize `git` in the folder and make the first commit,
- add screenshots to the README,
- add a small deploy script or GitHub Pages instructions.
