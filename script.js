(function () {
  'use strict';

  var menuButton = document.querySelector('[data-menu-button]');
  var mobileMenu = document.querySelector('[data-mobile-menu]');
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      menuButton.textContent = isOpen ? '×' : '☰';
      document.body.classList.toggle('menu-open', isOpen);
    });
  }

  var products = [
    { name: 'Loaf of Bread', price: 5000, category: 'bread', image: 'images/artisan-breads.webp', description: 'An everyday loaf for breakfast, lunch and sharing at home.' },
    { name: 'Birthday Cake', price: 60000, category: 'cakes', image: 'images/hero-celebration.webp', description: 'A celebration centrepiece proposed for birthdays and joyful milestones.' },
    { name: 'Cupcake', price: 2000, category: 'small-bakes', image: 'images/cupcakes-muffins.webp', description: 'A single, easy-to-share bake for treats, gifts and small gatherings.' },
    { name: 'Doughnuts (2 Pieces)', price: 3000, category: 'small-bakes', image: 'images/pastries-assortment.webp', description: 'Two sweet doughnuts for a simple break-time or after-meal treat.' },
    { name: 'Cookies (Small Pack)', price: 5000, category: 'small-bakes', image: 'images/pastries-assortment.webp', description: 'A convenient small pack for sharing, gifting or enjoying with a drink.' },
    { name: 'Chocolate Cake', price: 50000, category: 'cakes', image: 'images/cupcakes-muffins.webp', description: 'A rich-looking cake option for chocolate lovers and special gatherings.' },
    { name: 'Wedding Cake', price: 250000, category: 'cakes', image: 'images/hero-celebration.webp', description: 'A proposed wedding cake starting point, with final design confirmed directly.' },
    { name: 'Muffins (2 Pieces)', price: 5000, category: 'small-bakes', image: 'images/cupcakes-muffins.webp', description: 'A pair of muffins for breakfast, meetings or an afternoon pause.' },
    { name: 'Pastry Pack', price: 10000, category: 'pastries', image: 'images/pastries-assortment.webp', description: 'A mixed pastry option proposed for sharing at home, school or work.' },
    { name: 'Office Snack Box', price: 25000, category: 'business', image: 'images/pastries-assortment.webp', description: 'A proposed mixed snack box for workplace meetings and team occasions.' }
  ];

  var productGrid = document.querySelector('[data-product-grid]');
  if (productGrid) {
    var searchInput = document.querySelector('[data-product-search]');
    var filterButtons = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
    var resultCount = document.querySelector('[data-result-count]');
    var emptyState = document.querySelector('[data-empty-state]');
    var activeCategory = 'all';

    function formatPrice(number) {
      return 'UGX ' + number.toLocaleString('en-UG');
    }

    function renderProducts() {
      var query = searchInput.value.trim().toLowerCase();
      var visible = products.filter(function (product) {
        var categoryMatches = activeCategory === 'all' || product.category === activeCategory;
        var textMatches = (product.name + ' ' + product.description).toLowerCase().indexOf(query) !== -1;
        return categoryMatches && textMatches;
      });

      productGrid.innerHTML = visible.map(function (product) {
        return '<article class="product-card">' +
          '<img src="' + product.image + '" alt="Illustrative bakery image for ' + product.name + '" width="900" height="675" loading="lazy">' +
          '<div class="product-card-body"><span class="product-card-meta">Proposed coursework price</span>' +
          '<h3>' + product.name + '</h3><p>' + product.description + '</p>' +
          '<div class="product-price-row"><span class="price">' + formatPrice(product.price) + '</span>' +
          '<a class="text-link" href="pay.html">How to order →</a></div></div></article>';
      }).join('');

      resultCount.textContent = visible.length + (visible.length === 1 ? ' product' : ' products');
      emptyState.classList.toggle('visible', visible.length === 0);
    }

    searchInput.addEventListener('input', renderProducts);
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        activeCategory = button.getAttribute('data-filter');
        filterButtons.forEach(function (item) { item.classList.toggle('active', item === button); });
        renderProducts();
      });
    });
    renderProducts();
  }
})();
