import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const pages = ['index.html', 'products.html', 'about.html', 'order.html', 'policies.html'];
const errors = [];
const productPrices = new Map([
  ['Loaf of Bread', 5000], ['Birthday Cake', 60000], ['Cupcake', 2000],
  ['Doughnuts (2 Pieces)', 3000], ['Cookies (Small Pack)', 5000],
  ['Chocolate Cake', 50000], ['Wedding Cake', 250000], ['Muffins (2 Pieces)', 5000],
  ['Pastry Pack', 10000], ['Office Snack Box', 25000]
]);

const mainJs = await readFile(resolve('src/js/main.js'), 'utf8');
const productsJs = await readFile(resolve('src/js/products.js'), 'utf8');
if (!mainJs.includes('Student project for BUC3106 at MUBS')) errors.push('Shared footer disclaimer is missing.');
if (!mainJs.includes('No phone number is configured')) errors.push('Missing unconfigured ordering-channel notice.');

for (const page of pages) {
  const source = await readFile(resolve(page), 'utf8');
  if (!source.includes('data-site-header') || !source.includes('data-site-footer')) errors.push(`${page}: shared shell hook missing.`);
  if (!source.includes('<main')) errors.push(`${page}: main landmark missing.`);
  if (!source.match(/<meta name="description"/)) errors.push(`${page}: meta description missing.`);
  for (const href of source.matchAll(/href="([^"#?]+\.html)(?:[?#][^"]*)?"/g)) {
    try { await access(resolve(href[1])); } catch { errors.push(`${page}: broken internal link ${href[1]}.`); }
  }
}

for (const [name, price] of productPrices) {
  if (!productsJs.includes(`name: '${name}'`) || !productsJs.includes(`price: ${price}`)) errors.push(`Product data mismatch: ${name} / ${price}.`);
}
if (!productsJs.includes('export const products')) errors.push('Structured product data export missing.');
if (errors.length) {
  console.error(`Validation failed with ${errors.length} issue(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Validation passed: ${pages.length} pages, shared disclaimers, internal HTML links, and ${productPrices.size} coursework products checked.`);
