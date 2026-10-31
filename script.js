(function () {
  'use strict';

  function icon(name) {
    return '<span class="material-symbols-rounded" aria-hidden="true">' + name + '</span>';
  }

  var menuButton = document.querySelector('[data-menu-button]');
  var mobileMenu = document.querySelector('[data-mobile-menu]');
  if (menuButton && mobileMenu) {
    var siteHeader = menuButton.closest('.site-header');

    function updateMenuPosition() {
      if (!siteHeader) return;
      var headerBottom = Math.max(0, Math.round(siteHeader.getBoundingClientRect().bottom));
      document.documentElement.style.setProperty('--mobile-menu-top', headerBottom + 'px');
    }

    function closeMenu(returnFocus) {
      mobileMenu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
      menuButton.innerHTML = icon('menu');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      if (returnFocus) menuButton.focus();
    }

    function openMenu() {
      updateMenuPosition();
      mobileMenu.classList.add('is-open');
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'Close menu');
      menuButton.innerHTML = icon('close');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('menu-open');
      document.body.classList.add('menu-open');
    }

    menuButton.innerHTML = icon('menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuButton.addEventListener('click', function () {
      if (mobileMenu.classList.contains('is-open')) closeMenu(false);
      else openMenu();
    });
    mobileMenu.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) closeMenu(true);
    });
    window.addEventListener('resize', function () {
      updateMenuPosition();
      if (window.innerWidth > 1100) closeMenu(false);
    });
    window.addEventListener('orientationchange', updateMenuPosition);
    window.addEventListener('scroll', function () {
      if (mobileMenu.classList.contains('is-open')) updateMenuPosition();
    }, { passive: true });
    if (window.visualViewport) window.visualViewport.addEventListener('resize', updateMenuPosition);
    updateMenuPosition();
  }

  var products = [
    { id: 'loaf-of-bread', name: 'Loaf of Bread', price: 5000, category: 'bread', categoryLabel: 'Fresh bread', image: 'images/artisan-breads.webp', description: 'An everyday loaf with a golden crust, proposed for breakfast, lunch and sharing at home.' },
    { id: 'birthday-cake', name: 'Birthday Cake', price: 60000, category: 'cakes', categoryLabel: 'Celebration cakes', image: 'images/hero-celebration.webp', description: 'A celebratory centrepiece proposed for birthdays and joyful milestones, with final decoration confirmed separately.' },
    { id: 'cupcake', name: 'Cupcake', price: 2000, category: 'small-bakes', categoryLabel: 'Small bakes', image: 'images/cupcakes-muffins.webp', description: 'A single, easy-to-share bake proposed for treats, gifts and small gatherings.' },
    { id: 'doughnuts-two', name: 'Doughnuts (2 Pieces)', price: 3000, category: 'small-bakes', categoryLabel: 'Small bakes', image: 'images/pastries-assortment.webp', description: 'Two sweet doughnuts proposed for a simple break-time or after-meal treat.' },
    { id: 'cookies-small-pack', name: 'Cookies (Small Pack)', price: 5000, category: 'small-bakes', categoryLabel: 'Small bakes', image: 'images/pastries-assortment.webp', description: 'A convenient small pack proposed for sharing, gifting or enjoying with a drink.' },
    { id: 'chocolate-cake', name: 'Chocolate Cake', price: 50000, category: 'cakes', categoryLabel: 'Celebration cakes', image: 'images/cupcakes-muffins.webp', description: 'A rich-looking cake option proposed for chocolate lovers and special gatherings.' },
    { id: 'wedding-cake', name: 'Wedding Cake', price: 250000, category: 'cakes', categoryLabel: 'Celebration cakes', image: 'images/hero-celebration.webp', description: 'A proposed wedding cake starting point, with final size, design and decoration confirmed directly.' },
    { id: 'muffins-two', name: 'Muffins (2 Pieces)', price: 5000, category: 'small-bakes', categoryLabel: 'Small bakes', image: 'images/cupcakes-muffins.webp', description: 'A pair of muffins proposed for breakfast, meetings or an afternoon pause.' },
    { id: 'pastry-pack', name: 'Pastry Pack', price: 10000, category: 'pastries', categoryLabel: 'Pastries', image: 'images/pastries-assortment.webp', description: 'A mixed pastry option proposed for sharing at home, school or work.' },
    { id: 'office-snack-box', name: 'Office Snack Box', price: 25000, category: 'business', categoryLabel: 'Business orders', image: 'images/pastries-assortment.webp', description: 'A proposed mixed snack box for workplace meetings and team occasions.' }
  ];

  var paymentMethods = {
    mtn: { name: 'MTN Mobile Money', badge: 'SAMPLE MTN DETAILS', sample: ['Number: +256 7XX XXX XXX', 'Account name: SWEET MOMENTS SAMPLE'], steps: ['Review the proposed total shown in the order summary.', 'In a real operation, use only a bakery number independently verified by the customer.', 'Wait while the business checks its own MTN Mobile Money records before treating payment as cleared.'], verification: 'Verification would use the business MTN transaction records—not a customer screenshot alone.', refund: 'Any approved refund would be returned through an agreed traceable mobile-money process after eligibility is reviewed.' },
    airtel: { name: 'Airtel Money', badge: 'SAMPLE AIRTEL DETAILS', sample: ['Number: +256 7XX XXX XXX', 'Account name: SWEET MOMENTS SAMPLE'], steps: ['Review the proposed total shown in the order summary.', 'In a real operation, use only a bakery number independently verified by the customer.', 'Wait while the business checks its own Airtel Money records before treating payment as cleared.'], verification: 'Verification would use the business Airtel Money transaction records—not a customer screenshot alone.', refund: 'Any approved refund would be returned through an agreed traceable mobile-money process after eligibility is reviewed.' },
    bank: { name: 'Bank Transfer', badge: 'SAMPLE BANK DETAILS', sample: ['Bank: DEMONSTRATION BANK', 'Account: 0000 0000 0000', 'Name: SWEET MOMENTS SAMPLE'], steps: ['Review the proposed total and request verified business account details in a real operation.', 'Transfer only after independently checking the account name and bank information.', 'Wait while the business confirms cleared funds in its own bank records.'], verification: 'Verification would use the business bank statement or authorised banking records—not a transfer screenshot alone.', refund: 'Any approved refund would use an agreed traceable transfer method after the original payment and eligibility are verified.' },
    cash: { name: 'Cash on Delivery', badge: 'PROPOSED OPTION — SAMPLE', sample: ['Availability: NOT CONFIRMED', 'Delivery fee: NOT CALCULATED'], steps: ['Confirm in a real operation whether cash on delivery is available for the product and area.', 'Agree the final total, delivery fee and timing before dispatch.', 'Pay the confirmed amount only when the delivery is accepted.'], verification: 'A future business would verify cash through the authorised delivery handover and its internal sales records.', refund: 'If a cash refund were approved, the business would agree a documented, traceable return method with the customer.' }
  };

  var CART_KEY = 'sweetMomentsCartV1';
  var memoryCart = {};

  function getProduct(productId) {
    return products.find(function (product) { return product.id === productId; });
  }

  function sanitiseCart(candidate) {
    var clean = {};
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return clean;
    Object.keys(candidate).forEach(function (productId) {
      var quantity = Math.floor(Number(candidate[productId]));
      if (getProduct(productId) && Number.isFinite(quantity) && quantity > 0) clean[productId] = Math.min(quantity, 99);
    });
    return clean;
  }

  function readCart() {
    try {
      var stored = window.localStorage.getItem(CART_KEY);
      memoryCart = sanitiseCart(stored ? JSON.parse(stored) : {});
    } catch (error) {
      memoryCart = sanitiseCart(memoryCart);
    }
    return memoryCart;
  }

  function saveCart(cart) {
    memoryCart = sanitiseCart(cart);
    try { window.localStorage.setItem(CART_KEY, JSON.stringify(memoryCart)); } catch (error) { /* Memory fallback remains available. */ }
  }

  function formatPrice(number) {
    return 'UGX ' + number.toLocaleString('en-UG');
  }

  function getCartDetails() {
    var cart = readCart();
    var items = [];
    var itemCount = 0;
    var total = 0;
    Object.keys(cart).forEach(function (productId) {
      var product = getProduct(productId);
      if (!product) return;
      var quantity = cart[productId];
      itemCount += quantity;
      total += product.price * quantity;
      items.push({ product: product, quantity: quantity, subtotal: product.price * quantity });
    });
    return { items: items, itemCount: itemCount, total: total };
  }

  function ensureCartInterface() {
    var navShell = document.querySelector('.nav-shell');
    if (navShell && !navShell.querySelector('[data-header-cart]')) {
      var cartButton = document.createElement('button');
      cartButton.className = 'header-cart';
      cartButton.type = 'button';
      cartButton.setAttribute('data-header-cart', '');
      cartButton.setAttribute('data-cart-open', '');
      cartButton.setAttribute('aria-haspopup', 'dialog');
      cartButton.setAttribute('aria-controls', 'shopping-cart');
      cartButton.innerHTML = icon('shopping_bag') + '<span class="header-cart-label">Cart</span><span class="header-cart-count" data-cart-count aria-label="0 items in cart">0</span>';
      navShell.insertBefore(cartButton, navShell.querySelector('[data-menu-button]'));
    }

    if (!document.querySelector('[data-cart-drawer]')) {
      var footer = document.querySelector('.site-footer');
      var cartMarkup = '<div class="cart-backdrop" data-cart-backdrop hidden></div>' +
        '<aside class="cart-drawer" id="shopping-cart" data-cart-drawer role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-hidden="true"><div class="cart-drawer-header"><div><p class="eyebrow">Your selection</p><h2 id="cart-title">Shopping cart</h2></div><button class="icon-button" type="button" data-cart-close aria-label="Close shopping cart">' + icon('close') + '</button></div><div class="cart-drawer-body"><div class="cart-empty" data-cart-empty>' + icon('shopping_bag') + '<h3>Your cart is empty</h3><p>Add a treat to begin the checkout demonstration.</p><a class="button button-secondary" href="products.html">Browse products</a></div><div class="cart-items" data-cart-items></div></div><div class="cart-drawer-footer" data-cart-summary hidden><div class="cart-total-row"><span>Subtotal</span><strong data-cart-total>UGX 0</strong></div><p>Taxes and delivery are not calculated in this student demonstration.</p><a class="button button-primary" href="pay.html#checkout">Review simulated checkout</a><button class="cart-clear" type="button" data-cart-clear>Clear cart</button></div></aside><div class="cart-toast" data-cart-toast role="status" aria-live="polite" hidden></div>';
      if (footer) footer.insertAdjacentHTML('beforebegin', cartMarkup);
      else document.body.insertAdjacentHTML('beforeend', cartMarkup);
    }
  }

  ensureCartInterface();

  var productGrid = document.querySelector('[data-product-grid]');
  var renderProducts = function () {};
  var activeCategory = 'all';
  var maxPrice = 250000;
  var productSort = 'name-asc';

  if (productGrid) {
    var searchInput = document.querySelector('[data-product-search]');
    var filterButtons = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
    var resultCount = document.querySelector('[data-result-count]');
    var emptyState = document.querySelector('[data-empty-state]');
    var priceRange = document.querySelector('[data-price-range]');
    var priceOutput = document.querySelector('[data-price-output]');
    var sortSelect = document.querySelector('[data-product-sort]');
    var filterSummary = document.querySelector('[data-filter-summary]');

    renderProducts = function () {
      var query = searchInput.value.trim().toLowerCase();
      var cart = readCart();
      var visible = products.filter(function (product) {
        var categoryMatches = activeCategory === 'all' || product.category === activeCategory;
        var textMatches = (product.name + ' ' + product.description + ' ' + product.categoryLabel).toLowerCase().indexOf(query) !== -1;
        return categoryMatches && textMatches && product.price <= maxPrice;
      });

      visible.sort(function (first, second) {
        if (productSort === 'price-asc') return first.price - second.price;
        if (productSort === 'price-desc') return second.price - first.price;
        return first.name.localeCompare(second.name);
      });

      productGrid.innerHTML = visible.map(function (product) {
        var quantity = cart[product.id] || 0;
        return '<article class="product-card"><button class="product-image-button" type="button" data-view-details="' + product.id + '" aria-label="View details for ' + product.name + '"><img src="' + product.image + '" alt="Illustrative bakery image for ' + product.name + '" width="900" height="675" loading="lazy"><span class="image-action">' + icon('visibility') + 'View details</span></button><div class="product-card-body"><span class="product-card-meta">' + product.categoryLabel + '</span><h3><button type="button" data-view-details="' + product.id + '">' + product.name + '</button></h3><p>' + product.description + '</p><div class="product-price-row"><span class="price">' + formatPrice(product.price) + '</span>' + (quantity ? '<span class="in-cart-label">' + quantity + ' in cart</span>' : '') + '</div><div class="product-card-actions"><button class="button button-primary add-cart-button" type="button" data-add-to-cart="' + product.id + '" aria-label="Add ' + product.name + ' to cart">' + icon('add_shopping_cart') + (quantity ? 'Add another' : 'Add to cart') + '</button><button class="button button-secondary view-detail-button" type="button" data-view-details="' + product.id + '">View details</button></div></div></article>';
      }).join('');

      resultCount.textContent = 'Showing ' + visible.length + ' of ' + products.length + (products.length === 1 ? ' product' : ' products');
      emptyState.classList.toggle('visible', visible.length === 0);
      priceOutput.textContent = formatPrice(maxPrice);
      var activeButton = filterButtons.find(function (button) { return button.getAttribute('data-filter') === activeCategory; });
      var categoryName = activeButton ? activeButton.querySelector('span').textContent : 'All products';
      filterSummary.textContent = categoryName + (maxPrice < 250000 ? ' · under ' + formatPrice(maxPrice) : '');
    };

    function clearFilters() {
      activeCategory = 'all';
      maxPrice = 250000;
      productSort = 'name-asc';
      searchInput.value = '';
      priceRange.value = '250000';
      sortSelect.value = 'name-asc';
      filterButtons.forEach(function (button) { button.classList.toggle('active', button.getAttribute('data-filter') === 'all'); });
      renderProducts();
    }

    searchInput.addEventListener('input', renderProducts);
    priceRange.addEventListener('input', function () {
      maxPrice = Number(priceRange.value);
      renderProducts();
    });
    sortSelect.addEventListener('change', function () {
      productSort = sortSelect.value;
      renderProducts();
    });
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        activeCategory = button.getAttribute('data-filter');
        filterButtons.forEach(function (item) { item.classList.toggle('active', item === button); });
        renderProducts();
      });
    });
    document.querySelectorAll('[data-clear-filters]').forEach(function (button) { button.addEventListener('click', clearFilters); });

    var filterToggle = document.querySelector('[data-filter-toggle]');
    var filterPanel = document.querySelector('[data-filter-panel]');
    var filterClose = document.querySelector('[data-filter-close]');
    function closeFilters() {
      filterPanel.classList.remove('is-open');
      filterToggle.setAttribute('aria-expanded', 'false');
    }
    filterToggle.addEventListener('click', function () {
      var willOpen = !filterPanel.classList.contains('is-open');
      filterPanel.classList.toggle('is-open', willOpen);
      filterToggle.setAttribute('aria-expanded', String(willOpen));
      if (willOpen) searchInput.focus();
    });
    filterClose.addEventListener('click', closeFilters);
    window.addEventListener('resize', function () { if (window.innerWidth > 900) closeFilters(); });
  }

  var productDialog = document.querySelector('[data-product-dialog]');
  var detailProductId = null;
  var detailQuantity = 1;
  var detailReturnFocus = null;

  function renderProductDetail() {
    if (!productDialog) return;
    var product = getProduct(detailProductId);
    if (!product) return;
    productDialog.querySelector('[data-detail-breadcrumb]').textContent = product.name;
    productDialog.querySelector('[data-detail-category]').textContent = product.categoryLabel;
    productDialog.querySelector('[data-detail-name]').textContent = product.name;
    productDialog.querySelector('[data-detail-price]').textContent = formatPrice(product.price);
    productDialog.querySelector('[data-detail-description]').textContent = product.description;
    productDialog.querySelector('[data-detail-quantity]').textContent = detailQuantity;
    var image = productDialog.querySelector('[data-detail-image]');
    image.src = product.image;
    image.alt = 'Illustrative bakery image for ' + product.name;
    productDialog.querySelector('[data-detail-thumbnails]').innerHTML = '<button class="product-thumbnail active" type="button" aria-label="Primary image for ' + product.name + '"><img src="' + product.image + '" alt="" width="160" height="120"></button>';
    productDialog.querySelector('[data-detail-add]').setAttribute('aria-label', 'Add ' + detailQuantity + ' ' + product.name + ' to cart');
  }

  function openProductDetail(productId, trigger) {
    if (!productDialog || !getProduct(productId)) return;
    detailProductId = productId;
    detailQuantity = 1;
    detailReturnFocus = trigger || document.activeElement;
    renderProductDetail();
    if (typeof productDialog.showModal === 'function') productDialog.showModal();
    else productDialog.setAttribute('open', '');
    var closeButton = productDialog.querySelector('[data-product-close]');
    if (closeButton) closeButton.focus();
  }

  function closeProductDetail() {
    if (!productDialog) return;
    if (typeof productDialog.close === 'function') productDialog.close();
    else productDialog.removeAttribute('open');
    if (detailReturnFocus && typeof detailReturnFocus.focus === 'function') detailReturnFocus.focus();
  }

  var cartDrawer = document.querySelector('[data-cart-drawer]');
  var cartBackdrop = document.querySelector('[data-cart-backdrop]');
  var cartItems = document.querySelector('[data-cart-items]');
  var cartEmpty = document.querySelector('[data-cart-empty]');
  var cartSummary = document.querySelector('[data-cart-summary]');
  var cartToast = document.querySelector('[data-cart-toast]');
  var lastFocusedElement = null;
  var toastTimer = null;

  function renderCartCount(details) {
    document.querySelectorAll('[data-cart-count]').forEach(function (badge) {
      badge.textContent = details.itemCount;
      badge.setAttribute('aria-label', details.itemCount + (details.itemCount === 1 ? ' item in cart' : ' items in cart'));
    });
  }

  function quantityControls(productId, quantity, productName) {
    return '<div class="quantity-control" aria-label="Quantity for ' + productName + '"><button type="button" data-cart-action="decrease" data-product-id="' + productId + '" aria-label="Decrease ' + productName + ' quantity">−</button><span aria-live="polite">' + quantity + '</span><button type="button" data-cart-action="increase" data-product-id="' + productId + '" aria-label="Increase ' + productName + ' quantity">+</button></div>';
  }

  function renderCartDrawer(details) {
    if (!cartDrawer) return;
    cartEmpty.hidden = details.items.length > 0;
    cartSummary.hidden = details.items.length === 0;
    cartItems.innerHTML = details.items.map(function (item) {
      return '<article class="cart-item"><img src="' + item.product.image + '" alt="" width="160" height="120"><div class="cart-item-copy"><h3>' + item.product.name + '</h3><span>' + formatPrice(item.product.price) + ' each</span><div class="cart-item-actions">' + quantityControls(item.product.id, item.quantity, item.product.name) + '<button class="remove-item" type="button" data-cart-action="remove" data-product-id="' + item.product.id + '">Remove</button></div></div><strong class="cart-line-total">' + formatPrice(item.subtotal) + '</strong></article>';
    }).join('');
    var total = cartDrawer.querySelector('[data-cart-total]');
    if (total) total.textContent = formatPrice(details.total);
  }

  function selectedPaymentKey() {
    var checked = document.querySelector('input[name="payment-method"]:checked');
    return checked && paymentMethods[checked.value] ? checked.value : 'mtn';
  }

  function renderPaymentDetails() {
    var target = document.querySelector('[data-payment-details]');
    if (!target) return;
    var method = paymentMethods[selectedPaymentKey()];
    target.innerHTML = '<article class="selected-payment"><div class="selected-payment-header"><div><span class="sample-label">' + method.badge + '</span><h4>' + method.name + '</h4></div><span class="demo-lock">Demo only</span></div><div class="sample-box">' + method.sample.join('<br>') + '</div><ol class="payment-steps">' + method.steps.map(function (step, index) { return '<li><span>' + (index + 1) + '</span><p>' + step + '</p></li>'; }).join('') + '</ol><div class="method-safeguards"><p><strong>How verification would work</strong>' + method.verification + '</p><p><strong>Proposed refund route</strong>' + method.refund + '</p></div></article>';
  }

  function renderCheckout(details) {
    var checkoutItems = document.querySelector('[data-checkout-items]');
    if (!checkoutItems) return;
    var checkoutEmpty = document.querySelector('[data-checkout-empty]');
    var checkoutTotalRow = document.querySelector('[data-checkout-total-row]');
    var checkoutTotal = document.querySelector('[data-checkout-total]');
    var stopButton = document.querySelector('[data-stop-checkout]');
    checkoutEmpty.hidden = details.items.length > 0;
    checkoutTotalRow.hidden = details.items.length === 0;
    stopButton.disabled = details.items.length === 0;
    checkoutItems.innerHTML = details.items.map(function (item) {
      return '<article class="checkout-item"><img src="' + item.product.image + '" alt="" width="180" height="135"><div><h4>' + item.product.name + '</h4><p>' + formatPrice(item.product.price) + ' each</p><div class="checkout-item-actions">' + quantityControls(item.product.id, item.quantity, item.product.name) + '<button class="remove-item" type="button" data-cart-action="remove" data-product-id="' + item.product.id + '">Remove</button></div></div><strong>' + formatPrice(item.subtotal) + '</strong></article>';
    }).join('');
    checkoutTotal.textContent = formatPrice(details.total);
  }

  function renderAll() {
    var details = getCartDetails();
    renderCartCount(details);
    renderProducts();
    renderCartDrawer(details);
    renderCheckout(details);
  }

  function showToast(message) {
    if (!cartToast) return;
    window.clearTimeout(toastTimer);
    cartToast.textContent = message;
    cartToast.hidden = false;
    window.requestAnimationFrame(function () { cartToast.classList.add('is-visible'); });
    toastTimer = window.setTimeout(function () {
      cartToast.classList.remove('is-visible');
      window.setTimeout(function () { cartToast.hidden = true; }, 220);
    }, 2200);
  }

  function addToCart(productId, quantity, announce) {
    var product = getProduct(productId);
    if (!product) return;
    var cart = readCart();
    cart[productId] = Math.min((cart[productId] || 0) + quantity, 99);
    saveCart(cart);
    renderAll();
    if (announce) showToast(announce);
  }

  function changeQuantity(productId, change) {
    var product = getProduct(productId);
    if (!product) return;
    var cart = readCart();
    var nextQuantity = (cart[productId] || 0) + change;
    if (nextQuantity <= 0) delete cart[productId];
    else cart[productId] = Math.min(nextQuantity, 99);
    saveCart(cart);
    renderAll();
  }

  function openCart() {
    if (!cartDrawer || !cartBackdrop) return;
    if (productDialog && productDialog.open) closeProductDetail();
    lastFocusedElement = document.activeElement;
    cartBackdrop.hidden = false;
    cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-open');
    window.requestAnimationFrame(function () {
      cartBackdrop.classList.add('is-open');
      cartDrawer.classList.add('is-open');
      var closeButton = cartDrawer.querySelector('[data-cart-close]');
      if (closeButton) closeButton.focus();
    });
  }

  function closeCart(returnFocus) {
    if (!cartDrawer || !cartBackdrop) return;
    cartBackdrop.classList.remove('is-open');
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-open');
    window.setTimeout(function () { if (!cartDrawer.classList.contains('is-open')) cartBackdrop.hidden = true; }, 260);
    if (returnFocus && lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
  }

  function openSimulationDialog() {
    var dialog = document.querySelector('[data-simulation-dialog]');
    if (!dialog) return;
    var details = getCartDetails();
    if (!details.items.length) return;
    var method = paymentMethods[selectedPaymentKey()];
    dialog.querySelector('[data-simulation-summary]').textContent = 'You reviewed ' + details.itemCount + (details.itemCount === 1 ? ' item' : ' items') + ' totalling ' + formatPrice(details.total) + ' with ' + method.name + ' selected. No further action was taken.';
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  function closeSimulationDialog() {
    var dialog = document.querySelector('[data-simulation-dialog]');
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  document.addEventListener('click', function (event) {
    var addButton = event.target.closest('[data-add-to-cart]');
    if (addButton) {
      var addedProduct = getProduct(addButton.getAttribute('data-add-to-cart'));
      if (addedProduct) addToCart(addedProduct.id, 1, addedProduct.name + ' added to your cart.');
      return;
    }
    var detailButton = event.target.closest('[data-view-details]');
    if (detailButton) {
      openProductDetail(detailButton.getAttribute('data-view-details'), detailButton);
      return;
    }
    var actionButton = event.target.closest('[data-cart-action]');
    if (actionButton) {
      var action = actionButton.getAttribute('data-cart-action');
      var productId = actionButton.getAttribute('data-product-id');
      if (action === 'increase') changeQuantity(productId, 1);
      if (action === 'decrease') changeQuantity(productId, -1);
      if (action === 'remove') {
        var cart = readCart();
        delete cart[productId];
        saveCart(cart);
        renderAll();
      }
      return;
    }
    var detailQuantityButton = event.target.closest('[data-detail-quantity-change]');
    if (detailQuantityButton) {
      detailQuantity = Math.max(1, Math.min(99, detailQuantity + Number(detailQuantityButton.getAttribute('data-detail-quantity-change'))));
      renderProductDetail();
      return;
    }
    if (event.target.closest('[data-detail-add]')) {
      var detailProduct = getProduct(detailProductId);
      if (detailProduct) addToCart(detailProductId, detailQuantity, detailQuantity + ' × ' + detailProduct.name + ' added to your cart.');
      return;
    }
    if (event.target.closest('[data-product-close]')) closeProductDetail();
    if (event.target.closest('[data-cart-open]')) openCart();
    if (event.target.closest('[data-cart-close]') || event.target.closest('[data-cart-backdrop]')) closeCart(true);
    if (event.target.closest('[data-cart-clear]')) {
      saveCart({});
      renderAll();
      showToast('Cart cleared.');
    }
    if (event.target.closest('[data-stop-checkout]')) openSimulationDialog();
    if (event.target.closest('[data-simulation-close]')) closeSimulationDialog();
  });

  document.addEventListener('change', function (event) {
    if (event.target.matches('input[name="payment-method"]')) renderPaymentDetails();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && cartDrawer && cartDrawer.classList.contains('is-open')) closeCart(true);
    if (event.key !== 'Tab' || !cartDrawer || !cartDrawer.classList.contains('is-open')) return;
    var focusable = Array.prototype.slice.call(cartDrawer.querySelectorAll('a[href], button:not([disabled])'));
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  if (productDialog) {
    productDialog.addEventListener('click', function (event) { if (event.target === productDialog) closeProductDetail(); });
  }
  var simulationDialog = document.querySelector('[data-simulation-dialog]');
  if (simulationDialog) simulationDialog.addEventListener('click', function (event) { if (event.target === simulationDialog) closeSimulationDialog(); });
  window.addEventListener('storage', function (event) { if (event.key === CART_KEY) renderAll(); });

  renderPaymentDetails();
  renderAll();
})();
