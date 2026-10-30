import { products, categories, formatUGX } from './products.js';
import { refreshIcons, showToast } from './main.js';

const grid = document.querySelector('[data-product-grid]');
const results = document.querySelector('[data-results-count]');
const search = document.querySelector('[data-product-search]');
const filterWrap = document.querySelector('[data-filters]');
const empty = document.querySelector('[data-empty-state]');
const dialog = document.querySelector('[data-product-dialog]');
let activeCategory = 'all';
let query = '';

function card(product) {
  return `<article id="${product.id}" class="product-card scroll-mt-48 overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-white" data-product-id="${product.id}">
    <div class="relative aspect-[4/3] overflow-hidden bg-cream"><img class="h-full w-full object-cover transition duration-700 hover:scale-105" src="${product.image}" alt="${product.alt}" loading="lazy" width="900" height="675"><span class="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-chocolate backdrop-blur">Proposed price</span></div>
    <div class="p-5 sm:p-6"><div class="flex items-start justify-between gap-4"><h2 class="text-3xl">${product.name}</h2><p class="shrink-0 pt-1 text-sm font-extrabold text-rose">${formatUGX(product.price)}</p></div><p class="mt-3 line-clamp-2 text-sm leading-6 text-chocolate/65">${product.description}</p><div class="mt-6 flex gap-3"><button class="btn-secondary flex-1 px-4" type="button" data-view-product="${product.id}"><i data-lucide="zoom-in" class="h-4 w-4"></i>Details</button><button class="btn-primary flex-1 px-4" type="button" data-demo-order="${product.id}"><i data-lucide="message-circle" class="h-4 w-4"></i>Order</button></div></div>
  </article>`;
}

function render() {
  const filtered = products.filter(product => {
    const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
    const queryMatch = `${product.name} ${product.description}`.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });
  grid.innerHTML = filtered.map(card).join('');
  grid.hidden = filtered.length === 0;
  empty.hidden = filtered.length !== 0;
  results.textContent = `${filtered.length} ${filtered.length === 1 ? 'product' : 'products'}`;
  refreshIcons();
}

function openProduct(product) {
  dialog.querySelector('[data-dialog-image]').src = product.image;
  dialog.querySelector('[data-dialog-image]').alt = product.alt;
  dialog.querySelector('[data-dialog-name]').textContent = product.name;
  dialog.querySelector('[data-dialog-price]').textContent = `${formatUGX(product.price)} · proposed coursework price`;
  dialog.querySelector('[data-dialog-description]').textContent = product.description;
  dialog.querySelector('[data-dialog-order]').dataset.demoOrder = product.id;
  dialog.showModal();
  document.body.classList.add('overflow-hidden');
}

const requestedCategory = new URLSearchParams(window.location.search).get('category');
if (categories.some(category => category.id === requestedCategory)) activeCategory = requestedCategory;
filterWrap.innerHTML = categories.map((category) => `<button type="button" class="filter-btn min-h-11 shrink-0 rounded-full border border-chocolate/15 bg-white px-5 text-sm font-bold text-chocolate transition hover:border-rose" data-category="${category.id}" aria-pressed="${category.id === activeCategory}">${category.label}</button>`).join('');
filterWrap.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  filterWrap.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  render();
});
search.addEventListener('input', () => { query = search.value.trim().toLowerCase(); render(); });
grid.addEventListener('click', (event) => {
  const detail = event.target.closest('[data-view-product]');
  if (detail) openProduct(products.find(product => product.id === detail.dataset.viewProduct));
});
document.querySelector('[data-clear-search]').addEventListener('click', () => { search.value = ''; query = ''; activeCategory = 'all'; filterWrap.querySelectorAll('button').forEach((button, index) => button.setAttribute('aria-pressed', String(index === 0))); render(); search.focus(); });
dialog.addEventListener('close', () => document.body.classList.remove('overflow-hidden'));
dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog.querySelector('[data-dialog-order]').addEventListener('click', () => showToast('Demo only: this product would open a pre-filled WhatsApp message after an approved business number is configured.'));
render();
if (window.location.hash) {
  const product = products.find(item => `#${item.id}` === window.location.hash);
  if (product) requestAnimationFrame(() => openProduct(product));
}
