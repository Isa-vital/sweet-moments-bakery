# Sweet Moments Bakery Website

This is a five-page demonstration website for the BUC3106 E-Commerce Capstone Project at Makerere University Business School (MUBS).

Sweet Moments Bakery is a proposed bakery business in Kampala, Uganda. The website lets visitors explore products, build a simulated cart, review a frontend-only checkout, compare proposed payment methods, and read delivery information and draft policies.

Important: this is a student project. It does not accept real orders, collect customer details or process payments.

## Website files

- `index.html` — the Home page.
- `products.html` — all ten products, proposed prices, search, category filters and the simulated cart.
- `about.html` — the proposed business concept, mission, vision, values and customers.
- `pay.html` — simulated checkout, order summary, sample payment methods, verification, refunds and delivery.
- `policies.html` — proposed privacy, terms, delivery and refund policies.
- `style.css` — all colours, spacing, layouts, mobile design and hover/focus styles.
- `script.js` — the mobile menu, product catalogue, local cart and simulated checkout functions.
- `images/` — local, optimised website images and their source record.
- `TESTING_RECORD.md` — a blank sheet for the required five-person test.
- `AI_USE_LOG.md` — prompts and AI use notes for the coursework record.

## How to open the website

1. Open the project folder.
2. Double-click `index.html`.
3. The website will open in your normal web browser.

No installation, command, server or build step is needed. An internet connection is useful for the Google fonts, but system-font fallbacks keep the site usable without them.

## Simulated cart and checkout

- The cart stores only product IDs and quantities in the browser's `localStorage` under `sweetMomentsCartV1`.
- Customers can add products, adjust quantities, remove products and see totals in Uganda Shillings.
- The checkout offers MTN Mobile Money, Airtel Money, Bank Transfer and Cash on Delivery as non-functional demonstrations.
- Every method shows three sample steps plus proposed verification and refund guidance.
- The journey deliberately stops at a safety notice before any payment confirmation.
- No names, phone numbers, addresses, card details, PINs or OTPs are requested or stored.
- No network payment request, database order or real confirmation is created.

To reset the demonstration manually, clear the site's browser storage or use **Clear cart** in the cart drawer.

## Change a product name or price

1. Open `script.js` in a text editor.
2. Find the `products` list.
3. Find the product you want to change.
4. Change the text after `name:` or the number after `price:`.
5. Save the file and refresh `products.html`.

The four featured products on the Home page are written directly in `index.html`. Update those too if one of their prices changes.

## Replace an image

1. Prepare a JPG or WebP image with a descriptive filename.
2. Keep it approximately 1,800 pixels or less on its longest side.
3. Aim for a file size below 300 KB where quality allows.
4. Put it inside `images/`.
5. Update the matching `src="images/filename.webp"` path in the HTML or `script.js`.
6. Update `images/SOURCES.md`.

Do not present stock or generated images as photographs of the real bakery.

## WhatsApp ordering

No approved business phone number was supplied. Buttons therefore lead to `pay.html` and explain the proposed process. Do not invent or publish a personal number.

When the group approves a business number, a link can use `https://wa.me/256XXXXXXXXX`. Use digits only and test it before publishing.

## Publish on GitHub Pages

1. Create a public GitHub repository.
2. Upload the five HTML files, `style.css`, `script.js`, `images/` and documentation.
3. Open the repository **Settings**.
4. Select **Pages**.
5. Choose **Deploy from a branch**.
6. Choose the `main` branch and root (`/`) folder.
7. Save, wait for the published link, then test every page.

No build command is required.

## Required screenshots

1. Open the website in Chrome or Edge.
2. Press `F12` to open Developer Tools.
3. Select the device toolbar icon.
4. Capture a mobile view around 390 px wide.
5. Capture a desktop view around 1440 px wide.
6. Include the screenshots in the coursework evidence as instructed.

## Proposed domain

`sweetmomentsbakery.co.ug` would be memorable, relevant to the business name and connected to Uganda. This is only a suggestion; availability and ownership have not been checked or claimed.

## Limitations

- Sweet Moments Bakery is proposed, not a verified operating bakery.
- Payment details are samples and do not accept money.
- The cart and checkout are browser-only demonstrations. There is no database, account system, payment gateway or real order processing.
- No approved phone number, email or physical shop address was supplied.
- WhatsApp ordering remains informational until the group approves a business number.
- Product imagery is illustrative and reused for related product categories.
- Ingredients, allergens, custom designs and availability need future confirmation.
- Delivery fees and times are not calculated or guaranteed.

## Before submission

- Complete real testing with five people using `TESTING_RECORD.md`.
- Add approved contact details only if the group may publish them.
- Replace illustrative images with approved bakery photography if available.
- Review the policies with the lecturer; they are not legal advice.
- Test all pages again after any change.
