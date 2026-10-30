# Sweet Moments Bakery

A premium, responsive five-page e-commerce frontend for a proposed Kampala bakery. This project was created for the BUC3106 E-Commerce Capstone Project at Makerere University Business School (MUBS).

> Student project only. The website does not take live orders, collect customer information or process payments.

## Pages

- `index.html` — brand-led home page
- `products.html` — searchable and filterable product catalogue
- `about.html` — proposed story, mission, vision and customer segments
- `order.html` — ordering demonstration, sample payment methods and delivery/refund guidance
- `policies.html` — draft privacy, terms, delivery, returns and contact policies

## Technology

- Semantic HTML5
- Tailwind CSS 3
- Vanilla ES modules
- Vite multi-page build
- Lucide icons

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build and validate

```bash
npm run check
npm run build
npm run preview
```

The production output is written to `dist/`.

## Product data

Product names, descriptions, categories, prices and image mappings live in `src/js/products.js`. Update that file to change the catalogue; `src/js/products-page.js` handles rendering, search, filtering and details.

All supplied prices are presented as proposed coursework prices in UGX. Do not add a live checkout or payment credential without a separate, properly reviewed implementation.

## Ordering configuration

No business WhatsApp number was supplied. Product ordering buttons therefore show a demonstration notice instead of linking to an invented number. When an approved business number becomes available, update the shared ordering handler in `src/js/main.js`.

## Visual assets

The product and hero images are AI-generated illustrative assets, not photographs of a real Sweet Moments Bakery. Their generation notes are documented in `docs/ASSETS.md`.

Run `node scripts/optimize-assets.mjs` after replacing a source PNG. The website references WebP versions for delivery performance while retaining original PNG source assets.

## Deployment

### GitHub Pages

1. Run `npm run build`.
2. Configure GitHub Actions to build the project and upload `dist/` as the Pages artifact.
3. The Vite `base: './'` setting supports repository subpaths.

### Cloudflare Pages

1. Connect the Git repository in Cloudflare Pages.
2. Set the build command to `npm run build`.
3. Set the output directory to `dist`.
4. Use a current Node.js runtime.

No deployment or remote push has been performed.

## Proposed domain

`sweetmomentsbakery.co.ug` is a sensible proposed domain because it matches the business name, communicates the bakery category and uses Uganda's commercial namespace. It is a suggestion only; availability and ownership have not been checked or claimed.

## Known limitations

- The business is proposed and no verified operating contact, address or social profile is published.
- WhatsApp ordering is demonstrated but not active.
- Payment details are conspicuous samples and no payment gateway exists.
- Product ingredients, allergens, customisations and availability require future confirmation.
- Delivery fees and timelines are not calculated.
- Generated images represent product categories and may be reused across catalogue entries.
- External Google Fonts require a network connection; system fallbacks remain usable when offline.

## Project structure

```text
sweet_moments/
├── index.html
├── products.html
├── about.html
├── order.html
├── policies.html
├── src/
│   ├── assets/images/
│   ├── js/main.js
│   ├── js/products.js
│   ├── js/products-page.js
│   └── styles.css
├── scripts/
├── docs/
└── vite.config.js
```
