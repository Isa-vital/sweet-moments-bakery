import '../styles.css';
import {
  ArrowRight, Building2, CalendarHeart, Check, ChevronRight, Clock3,
  Heart, Instagram, Mail, MapPin, Menu, MessageCircle, PackageCheck,
  Search, ShieldCheck, ShoppingBag, Sparkles, Store, Truck, Users,
  Wheat, X, ZoomIn
} from 'lucide';

const iconSet = {
  ArrowRight, Building2, CalendarHeart, Check, ChevronRight, Clock3,
  Heart, Instagram, Mail, MapPin, Menu, MessageCircle, PackageCheck,
  Search, ShieldCheck, ShoppingBag, Sparkles, Store, Truck, Users,
  Wheat, X, ZoomIn
};

const pages = [
  ['Home', 'index.html'],
  ['Products', 'products.html'],
  ['About Us', 'about.html'],
  ['How to Pay & Order', 'order.html'],
  ['Policies', 'policies.html']
];

const pageName = window.location.pathname.split('/').pop() || 'index.html';

function headerTemplate() {
  const links = pages.map(([label, href]) => `<a class="nav-link text-sm font-bold text-chocolate/80 transition hover:text-chocolate" href="${href}" ${pageName === href ? 'aria-current="page"' : ''}>${label}</a>`).join('');
  const mobileLinks = pages.map(([label, href]) => `<a class="border-b border-chocolate/10 py-4 font-display text-3xl font-semibold text-chocolate" href="${href}" ${pageName === href ? 'aria-current="page"' : ''}>${label}</a>`).join('');
  return `
    <div class="announcement px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.15em] sm:text-xs">Student project for BUC3106 at MUBS · Payments are not active</div>
    <header class="site-header sticky top-0 z-40 border-b border-chocolate/5 bg-ivory/90" data-header>
      <div class="container-shell flex h-[76px] items-center justify-between gap-5">
        <a class="flex shrink-0 items-center gap-3" href="index.html" aria-label="Sweet Moments Bakery home">
          <span class="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-white text-gold" aria-hidden="true"><i data-lucide="wheat" class="h-5 w-5"></i></span>
          <span><strong class="block font-display text-[1.55rem] leading-none text-chocolate">Sweet Moments</strong><span class="mt-1 block text-[9px] font-extrabold uppercase tracking-[0.32em] text-rose">Bakery · Kampala</span></span>
        </a>
        <nav class="hidden items-center gap-7 xl:flex" aria-label="Main navigation">${links}</nav>
        <div class="flex items-center gap-3">
          <a class="btn-primary hidden lg:inline-flex" href="order.html#ordering-demo"><i data-lucide="message-circle" class="h-4 w-4"></i>Order information</a>
          <button class="grid h-12 w-12 place-items-center rounded-full border border-chocolate/15 bg-white xl:hidden" type="button" data-menu-button aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><i data-lucide="menu" class="menu-icon h-5 w-5"></i></button>
        </div>
      </div>
      <div id="mobile-menu" class="fixed inset-x-0 bottom-0 top-[117px] hidden overflow-y-auto bg-ivory px-6 py-8 xl:hidden" data-mobile-menu>
        <nav class="flex flex-col" aria-label="Mobile navigation">${mobileLinks}</nav>
        <a class="btn-primary mt-8 w-full" href="order.html#ordering-demo"><i data-lucide="message-circle" class="h-4 w-4"></i>View ordering demo</a>
        <p class="mt-5 text-center text-xs leading-5 text-chocolate/60">No phone number is configured. This coursework site does not accept live orders.</p>
      </div>
    </header>`;
}

function footerTemplate() {
  const links = pages.map(([label, href]) => `<li><a class="transition hover:text-white" href="${href}">${label}</a></li>`).join('');
  return `
    <footer class="bg-chocolate text-ivory/75">
      <div class="container-shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_.7fr_.9fr_1fr]">
        <div><a class="inline-flex items-center gap-3 text-white" href="index.html"><i data-lucide="wheat" class="h-7 w-7 text-gold"></i><span class="font-display text-3xl font-semibold">Sweet Moments</span></a><p class="mt-5 max-w-sm text-sm leading-7">A proposed Kampala bakery concept for celebration cakes, everyday bakes and business snack orders.</p><span class="mt-6 inline-flex rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">Coursework concept</span></div>
        <div><h2 class="font-sans text-xs font-extrabold uppercase tracking-[.2em] text-white">Explore</h2><ul class="mt-5 space-y-3 text-sm">${links}</ul></div>
        <div><h2 class="font-sans text-xs font-extrabold uppercase tracking-[.2em] text-white">Proposed hours</h2><ul class="mt-5 space-y-3 text-sm leading-6"><li>Mon–Sat<br><strong class="text-white">8:00 AM–7:00 PM</strong></li><li>Sunday<br><strong class="text-white">9:00 AM–4:00 PM</strong></li></ul></div>
        <div><h2 class="font-sans text-xs font-extrabold uppercase tracking-[.2em] text-white">Service area</h2><p class="mt-5 flex gap-2 text-sm leading-6"><i data-lucide="map-pin" class="mt-0.5 h-4 w-4 shrink-0 text-gold"></i>Kampala and surrounding areas, subject to confirmation.</p><a class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blush" href="order.html">How ordering works <i data-lucide="arrow-right" class="h-4 w-4"></i></a></div>
      </div>
      <div class="border-t border-white/10"><div class="container-shell flex flex-col gap-3 py-5 text-xs sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Sweet Moments Bakery coursework concept.</p><p class="font-bold text-white">Student project for BUC3106 at MUBS. Payments are not active.</p></div></div>
    </footer>`;
}

export function refreshIcons() {
  document.querySelectorAll('[data-lucide]').forEach((node) => {
    const key = node.dataset.lucide.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('');
    const Icon = iconSet[key];
    if (!Icon) return;
    const svg = Icon.toSvg({ class: node.getAttribute('class') || '', 'aria-hidden': 'true' });
    node.outerHTML = svg;
  });
}

function initShell() {
  const header = document.querySelector('[data-site-header]');
  const footer = document.querySelector('[data-site-footer]');
  if (header) header.innerHTML = headerTemplate();
  if (footer) footer.innerHTML = footerTemplate();
  refreshIcons();

  const button = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-mobile-menu]');
  button?.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    button.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    menu.classList.toggle('hidden', open);
    document.body.classList.toggle('menu-open', !open);
    button.innerHTML = `<i data-lucide="${open ? 'menu' : 'x'}" class="h-5 w-5"></i>`;
    refreshIcons();
  });

  const siteHeader = document.querySelector('[data-header]');
  const setHeader = () => siteHeader?.classList.toggle('is-scrolled', window.scrollY > 20);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  const policyLinks = [...document.querySelectorAll('.policy-nav a')];
  if (policyLinks.length) {
    const sections = policyLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      policyLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, .25, .6] });
    sections.forEach(section => observer.observe(section));
  }
}

let toastTimer;
export function showToast(message) {
  let toast = document.querySelector('[data-toast]');
  if (!toast) {
    toast = document.createElement('div');
    toast.dataset.toast = '';
    toast.className = 'toast fixed bottom-6 left-1/2 z-[70] w-[min(92vw,30rem)] rounded-2xl bg-chocolate px-5 py-4 text-center text-sm font-bold text-white shadow-soft';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 4500);
}

document.addEventListener('click', (event) => {
  const demo = event.target.closest('[data-demo-order]');
  if (!demo) return;
  event.preventDefault();
  showToast('Demo only: no WhatsApp number is configured and no live order has been placed.');
});

initShell();
