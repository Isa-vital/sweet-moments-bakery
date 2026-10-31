(function () {
  'use strict';

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
      menuButton.textContent = '☰';
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
      menuButton.textContent = '×';
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('menu-open');
      document.body.classList.add('menu-open');
    }

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
    { id: 'loaf-of-bread', name: 'Loaf of Bread', price: 5000, category: 'bread', image: 'images/artisan-breads.webp', description: 'An everyday loaf for breakfast, lunch and sharing at home.' },
    { id: 'birthday-cake', name: 'Birthday Cake', price: 60000, category: 'cakes', image: 'images/hero-celebration.webp', description: 'A celebration centrepiece proposed for birthdays and joyful milestones.' },
    { id: 'cupcake', name: 'Cupcake', price: 2000, category: 'small-bakes', image: 'images/cupcakes-muffins.webp', description: 'A single, easy-to-share bake for treats, gifts and small gatherings.' },
    { id: 'doughnuts-two', name: 'Doughnuts (2 Pieces)', price: 3000, category: 'small-bakes', image: 'images/pastries-assortment.webp', description: 'Two sweet doughnuts for a simple break-time or after-meal treat.' },
    { id: 'cookies-small-pack', name: 'Cookies (Small Pack)', price: 5000, category: 'small-bakes', image: 'images/pastries-assortment.webp', description: 'A convenient small pack for sharing, gifting or enjoying with a drink.' },
    { id: 'chocolate-cake', name: 'Chocolate Cake', price: 50000, category: 'cakes', image: 'images/cupcakes-muffins.webp', description: 'A rich-looking cake option for chocolate lovers and special gatherings.' },
    { id: 'wedding-cake', name: 'Wedding Cake', price: 250000, category: 'cakes', image: 'images/hero-celebration.webp', description: 'A proposed wedding cake starting point, with final design confirmed directly.' },
    { id: 'muffins-two', name: 'Muffins (2 Pieces)', price: 5000, category: 'small-bakes', image: 'images/cupcakes-muffins.webp', description: 'A pair of muffins for breakfast, meetings or an afternoon pause.' },
    { id: 'pastry-pack', name: 'Pastry Pack', price: 10000, category: 'pastries', image: 'images/pastries-assortment.webp', description: 'A mixed pastry option proposed for sharing at home, school or work.' },
    { id: 'office-snack-box', name: 'Office Snack Box', price: 25000, category: 'business', image: 'images/pastries-assortment.webp', description: 'A proposed mixed snack box for workplace meetings and team occasions.' }
  ];

  var paymentMethods = {
    mtn: {
      name: 'MTN Mobile Money',
      badge: 'SAMPLE MTN DETAILS',
      sample: ['Number: +256 7XX XXX XXX', 'Account name: SWEET MOMENTS SAMPLE'],
      steps: ['Review the proposed total shown in the order summary.', 'In a real operation, use only a bakery number independently verified by the customer.', 'Wait while the business checks its own MTN Mobile Money records before treating payment as cleared.'],
      verification: 'Verification would use the business MTN transaction records—not a customer screenshot alone.',
      refund: 'Any approved refund would be returned through an agreed traceable mobile-money process after eligibility is reviewed.'
    },
    airtel: {
      name: 'Airtel Money',
      badge: 'SAMPLE AIRTEL DETAILS',
      sample: ['Number: +256 7XX XXX XXX', 'Account name: SWEET MOMENTS SAMPLE'],
      steps: ['Review the proposed total shown in the order summary.', 'In a real operation, use only a bakery number independently verified by the customer.', 'Wait while the business checks its own Airtel Money records before treating payment as cleared.'],
      verification: 'Verification would use the business Airtel Money transaction records—not a customer screenshot alone.',
      refund: 'Any approved refund would be returned through an agreed traceable mobile-money process after eligibility is reviewed.'
    },
    bank: {
      name: 'Bank Transfer',
      badge: 'SAMPLE BANK DETAILS',
      sample: ['Bank: DEMONSTRATION BANK', 'Account: 0000 0000 0000', 'Name: SWEET MOMENTS SAMPLE'],
      steps: ['Review the proposed total and request verified business account details in a real operation.', 'Transfer only after independently checking the account name and bank information.', 'Wait while the business confirms cleared funds in its own bank records.'],
      verification: 'Verification would use the business bank statement or authorised banking records—not a transfer screenshot alone.',
      refund: 'Any approved refund would use an agreed traceable transfer method after the original payment and eligibility are verified.'
    },
    cash: {
      name: 'Cash on Delivery',
      badge: 'PROPOSED OPTION — SAMPLE',
      sample: ['Availability: NOT CONFIRMED', 'Delivery fee: NOT CALCULATED'],
      steps: ['Confirm in a real operation whether cash on delivery is available for the product and area.', 'Agree the final total, delivery fee and timing before dispatch.', 'Pay the confirmed amount only when the delivery is accepted.'],
      verification: 'A future business would verify cash through the authorised delivery handover and its internal sales records.',
      refund: 'If a cash refund were approved, the business would agree a documented, traceable return method with the customer.'
    }
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
      if (getProduct(productId) && Number.isFinite(quantity) && quantity > 0) {
        clean[productId] = Math.min(quantity, 99);
      }
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
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(memoryCart));
    } catch (error) {
      // The in-memory cart still works when browser storage is unavailable.
    }
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

  var productGrid = document.querySelector('[data-product-grid]');
  var renderProducts = function () {};
  if (productGrid) {
    var searchInput = document.querySelector('[data-product-search]');
    var filterButtons = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
    var resultCount = document.querySelector('[data-result-count]');
    var emptyState = document.querySelector('[data-empty-state]');
    var activeCategory = 'all';

    renderProducts = function () {
      var query = searchInput.value.trim().toLowerCase();
      var cart = readCart();
      var visible = products.filter(function (product) {
        var categoryMatches = activeCategory === 'all' || product.category === activeCategory;
        var textMatches = (product.name + ' ' + product.description).toLowerCase().indexOf(query) !== -1;
        return categoryMatches && textMatches;
      });

      productGrid.innerHTML = visible.map(function (product) {
        var quantity = cart[product.id] || 0;
        return '<article class="product-card">' +
          '<img src="' + product.image + '" alt="Illustrative bakery image for ' + product.name + '" width="900" height="675" loading="lazy">' +
          '<div class="product-card-body"><span class="product-card-meta">Proposed coursework price</span>' +
          '<h3>' + product.name + '</h3><p>' + product.description + '</p>' +
          '<div class="product-price-row"><span class="price">' + formatPrice(product.price) + '</span>' +
          (quantity ? '<span class="in-cart-label">' + quantity + ' in cart</span>' : '') + '</div>' +
          '<button class="button button-primary add-cart-button" type="button" data-add-to-cart="' + product.id + '" aria-label="Add ' + product.name + ' to cart">' + (quantity ? 'Add another' : 'Add to cart') + '</button></div></article>';
      }).join('');

      resultCount.textContent = visible.length + (visible.length === 1 ? ' product' : ' products');
      emptyState.classList.toggle('visible', visible.length === 0);
    };

    searchInput.addEventListener('input', renderProducts);
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        activeCategory = button.getAttribute('data-filter');
        filterButtons.forEach(function (item) { item.classList.toggle('active', item === button); });
        renderProducts();
      });
    });
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
    return '<div class="quantity-control" aria-label="Quantity for ' + productName + '">' +
      '<button type="button" data-cart-action="decrease" data-product-id="' + productId + '" aria-label="Decrease ' + productName + ' quantity">−</button>' +
      '<span aria-live="polite">' + quantity + '</span>' +
      '<button type="button" data-cart-action="increase" data-product-id="' + productId + '" aria-label="Increase ' + productName + ' quantity">+</button></div>';
  }

  function renderCartDrawer(details) {
    if (!cartDrawer) return;
    cartEmpty.hidden = details.items.length > 0;
    cartSummary.hidden = details.items.length === 0;
    cartItems.innerHTML = details.items.map(function (item) {
      return '<article class="cart-item"><img src="' + item.product.image + '" alt="" width="160" height="120">' +
        '<div class="cart-item-copy"><h3>' + item.product.name + '</h3><span>' + formatPrice(item.product.price) + ' each</span>' +
        '<div class="cart-item-actions">' + quantityControls(item.product.id, item.quantity, item.product.name) +
        '<button class="remove-item" type="button" data-cart-action="remove" data-product-id="' + item.product.id + '">Remove</button></div></div>' +
        '<strong class="cart-line-total">' + formatPrice(item.subtotal) + '</strong></article>';
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
    target.innerHTML = '<article class="selected-payment"><div class="selected-payment-header"><div><span class="sample-label">' + method.badge + '</span><h4>' + method.name + '</h4></div><span class="demo-lock">Demo only</span></div>' +
      '<div class="sample-box">' + method.sample.join('<br>') + '</div><ol class="payment-steps">' + method.steps.map(function (step, index) {
        return '<li><span>' + (index + 1) + '</span><p>' + step + '</p></li>';
      }).join('') + '</ol><div class="method-safeguards"><p><strong>How verification would work</strong>' + method.verification + '</p><p><strong>Proposed refund route</strong>' + method.refund + '</p></div></article>';
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

  function changeQuantity(productId, change, announce) {
    var product = getProduct(productId);
    if (!product) return;
    var cart = readCart();
    var nextQuantity = (cart[productId] || 0) + change;
    if (nextQuantity <= 0) delete cart[productId];
    else cart[productId] = Math.min(nextQuantity, 99);
    saveCart(cart);
    renderAll();
    if (announce) showToast(announce);
  }

  function openCart() {
    if (!cartDrawer || !cartBackdrop) return;
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
    window.setTimeout(function () {
      if (!cartDrawer.classList.contains('is-open')) cartBackdrop.hidden = true;
    }, 260);
    if (returnFocus && lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
  }

  function openSimulationDialog() {
    var dialog = document.querySelector('[data-simulation-dialog]');
    if (!dialog) return;
    var details = getCartDetails();
    if (!details.items.length) return;
    var method = paymentMethods[selectedPaymentKey()];
    var summary = dialog.querySelector('[data-simulation-summary]');
    summary.textContent = 'You reviewed ' + details.itemCount + (details.itemCount === 1 ? ' item' : ' items') + ' totalling ' + formatPrice(details.total) + ' with ' + method.name + ' selected. No further action was taken.';
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
      changeQuantity(addedProduct.id, 1, addedProduct.name + ' added to your cart.');
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
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  var simulationDialog = document.querySelector('[data-simulation-dialog]');
  if (simulationDialog) {
    simulationDialog.addEventListener('click', function (event) {
      if (event.target === simulationDialog) closeSimulationDialog();
    });
  }

  window.addEventListener('storage', function (event) {
    if (event.key === CART_KEY) renderAll();
  });

  renderPaymentDetails();
  renderAll();
})();
