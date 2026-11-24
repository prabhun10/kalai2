/* ==========================================================================
   Kalaifashion2 — UI Controllers, Filtering, Modals & Page Rendering
   ========================================================================== */

(function (global) {
  'use strict';

  function getData() {
    return global.KalaifashionData;
  }

  function getCartApi() {
    return global.KalaifashionCart;
  }

  /* ------------------------------------------------------------------------
     Shared Image Helper with Zero-Broken-Image Fallback
     ------------------------------------------------------------------------ */
  function attachImageFallbacks(root) {
    const scope = root || document;
    const imgs = scope.querySelectorAll('img[data-fallback-title]');
    imgs.forEach(function (img) {
      if (img.dataset.fallbackBound === 'true') return;
      img.dataset.fallbackBound = 'true';
      img.addEventListener('error', function () {
        const parent = img.parentElement;
        if (!parent || parent.querySelector('.image-fallback')) return;
        const title = img.getAttribute('data-fallback-title') || 'Kalaifashion2';
        img.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'image-fallback';
        fallback.innerHTML =
          '<i class="fa-solid fa-gem" aria-hidden="true"></i>' +
          '<span>' + getCartApi().escapeHtml(title) + '</span>';
        parent.appendChild(fallback);
      });
    });
  }

  /* ------------------------------------------------------------------------
     Product Card Renderer
     ------------------------------------------------------------------------ */
  function renderProductCardHtml(product) {
    const Data = getData();
    const Cart = getCartApi();
    const esc = Cart.escapeHtml;
    const discount = Data.getDiscountPercent(product.price, product.originalPrice);
    const defaultColor = product.colors[0] ? product.colors[0].name : 'Standard';
    const defaultSize = product.sizes[0] ? product.sizes[0] : 'Standard';

    const colorDotsHtml = product.colors.map(function (c) {
      return '<span class="color-dot" style="background-color:' + esc(c.hex) + ';" title="' + esc(c.name) + '"></span>';
    }).join('');

    const variantLabel = product.category === 'dhoti-kurta'
      ? esc(product.sizes.length + ' Sizes')
      : esc(product.colors.length + ' Shades');

    const statusText = product.isBestSeller
      ? 'Best Seller'
      : product.isNewArrival
        ? 'New Arrival'
        : esc(product.weave.split(' ').slice(0, 2).join(' '));

    const waMessage = Cart.buildProductEnquiryMessage(product, {
      color: defaultColor,
      size: defaultSize,
      quantity: 1
    });

    return (
      '<article class="product-card" data-product-id="' + esc(product.id) + '">' +
        '<div class="product-media-wrap">' +
          '<a href="product-details.html?id=' + encodeURIComponent(product.id) + '" aria-label="View ' + esc(product.name) + '">' +
            '<img src="' + esc(product.images[0]) + '" alt="' + esc(product.name) + '" loading="lazy" referrerpolicy="no-referrer" data-fallback-title="' + esc(product.name) + '" />' +
          '</a>' +
          '<button type="button" class="quick-view-trigger" data-quick-view="' + esc(product.id) + '">' +
            '<i class="fa-regular fa-eye" aria-hidden="true"></i> Quick View' +
          '</button>' +
        '</div>' +
        '<div class="product-body">' +
          '<div class="product-meta-line">' +
            '<span>' + esc(product.subCategory) + '</span>' +
            '<span aria-hidden="true">·</span>' +
            '<span>' + statusText + '</span>' +
          '</div>' +
          '<h3 class="product-title">' +
            '<a href="product-details.html?id=' + encodeURIComponent(product.id) + '">' + esc(product.name) + '</a>' +
          '</h3>' +
          '<p class="product-details-short">' + esc(product.shortDetails) + '</p>' +
          '<div class="product-variants-row">' +
            '<div class="color-dots" aria-label="Available colours">' + colorDotsHtml + '</div>' +
            '<span>' + variantLabel + '</span>' +
          '</div>' +
          '<div class="product-price-row">' +
            '<span class="price-current">' + Data.formatINR(product.price) + '</span>' +
            (product.originalPrice > product.price
              ? '<span class="price-original">' + Data.formatINR(product.originalPrice) + '</span>'
              : '') +
            (discount > 0
              ? '<span class="price-discount">' + discount + '% Off</span>'
              : '') +
          '</div>' +
          '<div class="product-card-actions">' +
            '<button type="button" class="btn btn-primary btn-sm" data-add-cart="' + esc(product.id) + '">' +
              '<i class="fa-solid fa-bag-shopping" aria-hidden="true"></i> Add to Cart' +
            '</button>' +
            '<a href="product-details.html?id=' + encodeURIComponent(product.id) + '" class="btn btn-secondary btn-sm">View Details</a>' +
            '<button type="button" class="btn btn-whatsapp-subtle btn-sm btn-full" data-wa-product="' + esc(product.id) + '" data-wa-msg="' + esc(waMessage) + '">' +
              '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp Enquiry' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  /* ------------------------------------------------------------------------
     Shared Navigation, Mobile Drawer, Floating WhatsApp & Modals
     ------------------------------------------------------------------------ */
  function initNavigation() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    const closeBtn = document.getElementById('mobile-drawer-close');

    if (menuBtn && drawer && backdrop) {
      const toggleDrawer = function (open) {
        drawer.classList.toggle('open', open);
        backdrop.classList.toggle('open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      };

      menuBtn.addEventListener('click', function () {
        toggleDrawer(true);
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          toggleDrawer(false);
        });
      }

      backdrop.addEventListener('click', function () {
        toggleDrawer(false);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
          toggleDrawer(false);
        }
      });
    }

    // Populate floating WhatsApp link with configured phone number
    const floatBtn = document.getElementById('floating-whatsapp-btn');
    if (floatBtn) {
      const greeting = 'Hello Kalaifashion2, I would like assistance with your Sarees & Dhoti Kurta collections.';
      floatBtn.setAttribute('href', getCartApi().buildWhatsAppUrl(greeting));
    }

    // Highlight active nav link cleanly (handle query filters like ?filter=new-arrivals)
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentSearch = window.location.search;
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(function (link) {
      const href = link.getAttribute('href') || '';
      if (currentSearch && href.indexOf(currentSearch) !== -1) {
        link.classList.add('active');
      } else if (!currentSearch && href === currentPath) {
        link.classList.add('active');
      }
    });
  }

  /* ------------------------------------------------------------------------
     Quick View Modal & WhatsApp Order Preview Modal
     ------------------------------------------------------------------------ */
  function ensureModals() {
    if (!document.getElementById('kf-quick-view-modal')) {
      const qv = document.createElement('div');
      qv.id = 'kf-quick-view-modal';
      qv.className = 'modal-backdrop';
      qv.setAttribute('role', 'dialog');
      qv.setAttribute('aria-modal', 'true');
      qv.setAttribute('aria-labelledby', 'qv-title');
      qv.innerHTML =
        '<div class="modal-dialog">' +
          '<button type="button" class="modal-close-btn" id="qv-close-btn" aria-label="Close quick view">' +
            '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' +
          '</button>' +
          '<div id="qv-content"></div>' +
        '</div>';
      document.body.appendChild(qv);

      qv.addEventListener('click', function (e) {
        if (e.target === qv || e.target.closest('#qv-close-btn')) {
          qv.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    if (!document.getElementById('kf-wa-modal')) {
      const wa = document.createElement('div');
      wa.id = 'kf-wa-modal';
      wa.className = 'modal-backdrop';
      wa.setAttribute('role', 'dialog');
      wa.setAttribute('aria-modal', 'true');
      wa.setAttribute('aria-labelledby', 'wa-modal-title');
      wa.innerHTML =
        '<div class="modal-dialog modal-dialog-narrow">' +
          '<button type="button" class="modal-close-btn" id="wa-close-btn" aria-label="Close WhatsApp preview">' +
            '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' +
          '</button>' +
          '<span class="section-kicker">WhatsApp Boutique Concierge</span>' +
          '<h3 id="wa-modal-title" style="margin:0 0 10px; font-family:var(--font-display); font-size:26px;">Confirm Your WhatsApp Message</h3>' +
          '<p style="margin:0 0 14px; font-size:14px; color:var(--ink-muted);">Review your enquiry details below and continue directly to WhatsApp, or copy the message to send manually.</p>' +
          '<pre class="wa-preview-box" id="wa-preview-text"></pre>' +
          '<div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:18px;">' +
            '<a id="wa-launch-link" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="flex:1;">' +
              '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Open in WhatsApp' +
            '</a>' +
            '<button type="button" id="wa-copy-btn" class="btn btn-secondary">' +
              '<i class="fa-regular fa-copy" aria-hidden="true"></i> Copy Text' +
            '</button>' +
          '</div>' +
          '<p id="wa-copy-feedback" style="margin:10px 0 0; font-size:13px; color:var(--whatsapp); min-height:20px;"></p>' +
        '</div>';
      document.body.appendChild(wa);

      wa.addEventListener('click', function (e) {
        if (e.target === wa || e.target.closest('#wa-close-btn')) {
          wa.classList.remove('open');
          document.body.style.overflow = '';
        }
      });

      const copyBtn = document.getElementById('wa-copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', function () {
          const text = document.getElementById('wa-preview-text').textContent || '';
          const feedback = document.getElementById('wa-copy-feedback');
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
              feedback.textContent = 'Message copied to clipboard.';
            }).catch(function () {
              feedback.textContent = 'Select and copy the message above.';
            });
          } else {
            feedback.textContent = 'Select and copy the message above.';
          }
        });
      }
    }
  }

  function openWhatsAppModal(messageText) {
    ensureModals();
    const modal = document.getElementById('kf-wa-modal');
    const preview = document.getElementById('wa-preview-text');
    const launch = document.getElementById('wa-launch-link');
    const feedback = document.getElementById('wa-copy-feedback');
    preview.textContent = messageText;
    launch.setAttribute('href', getCartApi().buildWhatsAppUrl(messageText));
    feedback.textContent = '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function openQuickView(productId) {
    const Data = getData();
    const Cart = getCartApi();
    const esc = Cart.escapeHtml;
    const product = Data.getProductById(productId);
    if (!product) return;

    ensureModals();
    const modal = document.getElementById('kf-quick-view-modal');
    const content = document.getElementById('qv-content');
    const discount = Data.getDiscountPercent(product.price, product.originalPrice);

    let selectedColor = product.colors[0] ? product.colors[0].name : 'Standard';
    let selectedSize = product.sizes[0] ? product.sizes[0] : 'Standard';

    const colorOptions = product.colors.map(function (c, idx) {
      return '<button type="button" class="swatch-btn ' + (idx === 0 ? 'active' : '') + '" data-qv-color="' + esc(c.name) + '">' +
        '<span class="color-dot" style="background-color:' + esc(c.hex) + ';"></span>' +
        '<span>' + esc(c.name) + '</span>' +
      '</button>';
    }).join('');

    const sizeOptions = product.sizes.map(function (s, idx) {
      return '<button type="button" class="size-btn ' + (idx === 0 ? 'active' : '') + '" data-qv-size="' + esc(s) + '">' + esc(s) + '</button>';
    }).join('');

    content.innerHTML =
      '<div class="quick-view-grid">' +
        '<div class="quick-view-media">' +
          '<img src="' + esc(product.images[0]) + '" alt="' + esc(product.name) + '" referrerpolicy="no-referrer" data-fallback-title="' + esc(product.name) + '" />' +
        '</div>' +
        '<div class="quick-view-body">' +
          '<div class="product-meta-line">' +
            '<span>' + esc(product.subCategory) + '</span>' +
            '<span aria-hidden="true">·</span>' +
            '<span>' + esc(product.fabric) + '</span>' +
          '</div>' +
          '<h3 id="qv-title" class="pdp-title" style="font-size:28px;">' + esc(product.name) + '</h3>' +
          '<div class="product-price-row" style="margin-top:0;">' +
            '<span class="price-current" style="font-size:21px;">' + Data.formatINR(product.price) + '</span>' +
            (product.originalPrice > product.price ? '<span class="price-original">' + Data.formatINR(product.originalPrice) + '</span>' : '') +
            (discount > 0 ? '<span class="price-discount">' + discount + '% Off</span>' : '') +
          '</div>' +
          '<p style="margin:0; font-size:14px; color:var(--ink-muted);">' + esc(product.description) + '</p>' +
          '<div class="pdp-variant-group">' +
            '<div class="pdp-variant-label">Colour: <span id="qv-selected-color">' + esc(selectedColor) + '</span></div>' +
            '<div class="swatch-list">' + colorOptions + '</div>' +
          '</div>' +
          '<div class="pdp-variant-group">' +
            '<div class="pdp-variant-label">Size / Length: <span id="qv-selected-size">' + esc(selectedSize) + '</span></div>' +
            '<div class="size-list">' + sizeOptions + '</div>' +
          '</div>' +
          '<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; padding-top:8px;">' +
            '<button type="button" class="btn btn-primary" id="qv-add-cart-btn">Add to Cart</button>' +
            '<button type="button" class="btn btn-whatsapp" id="qv-wa-btn"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Enquire</button>' +
            '<a href="product-details.html?id=' + encodeURIComponent(product.id) + '" class="btn btn-secondary" style="grid-column:1 / -1;">View Full Product Details</a>' +
          '</div>' +
        '</div>' +
      '</div>';

    attachImageFallbacks(content);

    content.querySelectorAll('[data-qv-color]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectedColor = btn.getAttribute('data-qv-color');
        content.querySelectorAll('[data-qv-color]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        document.getElementById('qv-selected-color').textContent = selectedColor;
      });
    });

    content.querySelectorAll('[data-qv-size]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectedSize = btn.getAttribute('data-qv-size');
        content.querySelectorAll('[data-qv-size]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        document.getElementById('qv-selected-size').textContent = selectedSize;
      });
    });

    document.getElementById('qv-add-cart-btn').addEventListener('click', function () {
      Cart.addToCart(product.id, { color: selectedColor, size: selectedSize, quantity: 1 });
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });

    document.getElementById('qv-wa-btn').addEventListener('click', function () {
      const msg = Cart.buildProductEnquiryMessage(product, {
        color: selectedColor,
        size: selectedSize,
        quantity: 1
      });
      modal.classList.remove('open');
      openWhatsAppModal(msg);
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* ------------------------------------------------------------------------
     Global Delegated Product Card Handlers
     ------------------------------------------------------------------------ */
  function bindProductCardDelegation() {
    document.addEventListener('click', function (e) {
      const addBtn = e.target.closest('[data-add-cart]');
      if (addBtn) {
        const productId = addBtn.getAttribute('data-add-cart');
        getCartApi().addToCart(productId, { quantity: 1 });
        return;
      }

      const qvBtn = e.target.closest('[data-quick-view]');
      if (qvBtn) {
        openQuickView(qvBtn.getAttribute('data-quick-view'));
        return;
      }

      const waBtn = e.target.closest('[data-wa-product]');
      if (waBtn) {
        const msg = waBtn.getAttribute('data-wa-msg');
        if (msg) openWhatsAppModal(msg);
      }
    });
  }

  /* ------------------------------------------------------------------------
     Home Page Renderer
     ------------------------------------------------------------------------ */
  function initHomePage() {
    const Data = getData();
    const Cart = getCartApi();
    const bestSellersEl = document.getElementById('home-best-sellers');
    const newArrivalsEl = document.getElementById('home-new-arrivals');
    const igGridEl = document.getElementById('instagram-gallery-grid');

    if (bestSellersEl) {
      const bestSellers = Data.PRODUCTS.filter(function (p) { return p.isBestSeller; }).slice(0, 4);
      bestSellersEl.innerHTML = bestSellers.map(renderProductCardHtml).join('');
      attachImageFallbacks(bestSellersEl);
    }

    if (newArrivalsEl) {
      const newArrivals = Data.PRODUCTS.filter(function (p) { return p.isNewArrival; }).slice(0, 4);
      newArrivalsEl.innerHTML = newArrivals.map(renderProductCardHtml).join('');
      attachImageFallbacks(newArrivalsEl);
    }

    if (igGridEl) {
      const esc = Cart.escapeHtml;
      igGridEl.innerHTML = Data.INSTAGRAM_GALLERY.map(function (tile) {
        return (
          '<a href="' + esc(Data.CONFIG.INSTAGRAM_URL) + '" target="_blank" rel="noopener noreferrer" class="instagram-tile" aria-label="View ' + esc(tile.caption) + ' on Kalaifashion2 Instagram">' +
            '<img src="' + esc(tile.image) + '" alt="' + esc(tile.caption) + '" loading="lazy" referrerpolicy="no-referrer" data-fallback-title="' + esc(tile.caption) + '" />' +
            '<div class="instagram-tile-overlay">' +
              '<i class="fa-brands fa-instagram fa-lg" aria-hidden="true"></i>' +
              '<span>' + esc(tile.caption) + '</span>' +
            '</div>' +
          '</a>'
        );
      }).join('');
      attachImageFallbacks(igGridEl);
    }
  }

  /* ------------------------------------------------------------------------
     Category Listing Page Controller (sarees.html & dhoti-kurta.html)
     ------------------------------------------------------------------------ */
  function initCatalogPage() {
    const catalogRoot = document.getElementById('catalog-page-root');
    if (!catalogRoot) return;

    const Data = getData();
    const category = catalogRoot.getAttribute('data-category'); // 'sarees' or 'dhoti-kurta'
    const gridEl = document.getElementById('catalog-products-grid');
    const countEl = document.getElementById('catalog-results-count');
    const searchInput = document.getElementById('filter-search');
    const typeSelect = document.getElementById('filter-type');
    const priceSelect = document.getElementById('filter-price');
    const colorSelect = document.getElementById('filter-color');
    const sizeSelect = document.getElementById('filter-size');
    const sortSelect = document.getElementById('filter-sort');
    const resetBtn = document.getElementById('filter-reset-btn');
    const tabsContainer = document.getElementById('category-quick-tabs');

    const params = new URLSearchParams(window.location.search);
    let activePreset = params.get('filter') || ''; // 'new-arrivals' | 'best-sellers' | 'offers'
    if (params.get('type') && typeSelect) {
      typeSelect.value = params.get('type');
    }

    const baseProducts = Data.PRODUCTS.filter(function (p) {
      return category === 'all' ? true : p.category === category;
    });

    function syncTabsUI() {
      if (!tabsContainer) return;
      tabsContainer.querySelectorAll('[data-preset]').forEach(function (tab) {
        const preset = tab.getAttribute('data-preset') || '';
        tab.classList.toggle('active', preset === activePreset);
      });
    }

    function applyFilters() {
      const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
      const selectedType = typeSelect ? typeSelect.value : 'all';
      const selectedPrice = priceSelect ? priceSelect.value : 'all';
      const selectedColor = colorSelect ? colorSelect.value.toLowerCase() : 'all';
      const selectedSize = sizeSelect ? sizeSelect.value : 'all';
      const sortBy = sortSelect ? sortSelect.value : 'featured';

      let filtered = baseProducts.filter(function (item) {
        if (activePreset === 'new-arrivals' && !item.isNewArrival) return false;
        if (activePreset === 'best-sellers' && !item.isBestSeller) return false;
        if (activePreset === 'offers' && !item.isSpecialOffer) return false;

        if (selectedType !== 'all' && item.subCategory !== selectedType) return false;

        if (q) {
          const haystack = [
            item.name,
            item.subCategory,
            item.shortDetails,
            item.fabric,
            item.weave
          ].join(' ').toLowerCase();
          if (haystack.indexOf(q) === -1) return false;
        }

        if (selectedPrice !== 'all') {
          if (selectedPrice === 'under-3000' && item.price >= 3000) return false;
          if (selectedPrice === '3000-10000' && (item.price < 3000 || item.price > 10000)) return false;
          if (selectedPrice === '10000-20000' && (item.price <= 10000 || item.price > 20000)) return false;
          if (selectedPrice === 'above-20000' && item.price <= 20000) return false;
        }

        if (selectedColor !== 'all') {
          const hasColor = item.colors.some(function (c) {
            return c.name.toLowerCase().indexOf(selectedColor) !== -1;
          });
          if (!hasColor) return false;
        }

        if (selectedSize !== 'all') {
          const hasSize = item.sizes.some(function (s) {
            return s.indexOf(selectedSize) !== -1;
          });
          if (!hasSize) return false;
        }

        return true;
      });

      filtered = filtered.slice().sort(function (a, b) {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return b.releaseOrder - a.releaseOrder;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.releaseOrder - a.releaseOrder;
      });

      if (countEl) {
        countEl.textContent = 'Showing ' + filtered.length + ' of ' + baseProducts.length + ' items';
      }

      if (filtered.length === 0) {
        gridEl.innerHTML =
          '<div class="empty-state" style="grid-column:1 / -1;">' +
            '<h3>No matching garments found</h3>' +
            '<p>Try clearing one or more filters to browse the full collection.</p>' +
            '<button type="button" class="btn btn-primary" id="inline-reset-filters">Reset All Filters</button>' +
          '</div>';
        const inlineBtn = document.getElementById('inline-reset-filters');
        if (inlineBtn) inlineBtn.addEventListener('click', resetAll);
      } else {
        gridEl.innerHTML = filtered.map(renderProductCardHtml).join('');
        attachImageFallbacks(gridEl);
      }

      syncTabsUI();
    }

    function resetAll() {
      activePreset = '';
      if (searchInput) searchInput.value = '';
      if (typeSelect) typeSelect.value = 'all';
      if (priceSelect) priceSelect.value = 'all';
      if (colorSelect) colorSelect.value = 'all';
      if (sizeSelect) sizeSelect.value = 'all';
      if (sortSelect) sortSelect.value = 'featured';
      applyFilters();
    }

    [searchInput, typeSelect, priceSelect, colorSelect, sizeSelect, sortSelect].forEach(function (ctrl) {
      if (!ctrl) return;
      const evt = ctrl.tagName === 'INPUT' ? 'input' : 'change';
      ctrl.addEventListener(evt, applyFilters);
    });

    if (tabsContainer) {
      tabsContainer.addEventListener('click', function (e) {
        const tab = e.target.closest('[data-preset]');
        if (!tab) return;
        activePreset = tab.getAttribute('data-preset') || '';
        applyFilters();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', resetAll);
    }

    applyFilters();
  }

  /* ------------------------------------------------------------------------
     Product Details Page Controller
     ------------------------------------------------------------------------ */
  function initProductDetailsPage() {
    const pdpRoot = document.getElementById('pdp-root');
    if (!pdpRoot) return;

    const Data = getData();
    const Cart = getCartApi();
    const esc = Cart.escapeHtml;
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = Data.getProductById(productId) || Data.PRODUCTS[0];

    document.title = product.name + ' — Kalaifashion2';

    const breadcrumbCategory = document.getElementById('pdp-breadcrumb-cat');
    const breadcrumbName = document.getElementById('pdp-breadcrumb-name');
    if (breadcrumbCategory) {
      breadcrumbCategory.textContent = product.category === 'dhoti-kurta' ? 'Dhoti & Kurta' : 'Sarees';
      breadcrumbCategory.setAttribute('href', product.category === 'dhoti-kurta' ? 'dhoti-kurta.html' : 'sarees.html');
    }
    if (breadcrumbName) {
      breadcrumbName.textContent = product.name;
    }

    let selectedColor = product.colors[0] ? product.colors[0].name : 'Standard';
    let selectedSize = product.sizes[0] ? product.sizes[0] : 'Standard';
    let quantity = 1;
    let activeImage = product.images[0];

    const discount = Data.getDiscountPercent(product.price, product.originalPrice);

    const thumbsHtml = product.images.map(function (imgSrc, idx) {
      return (
        '<button type="button" class="pdp-thumb-btn ' + (idx === 0 ? 'active' : '') + '" data-pdp-thumb="' + esc(imgSrc) + '" aria-label="View image ' + (idx + 1) + '">' +
          '<img src="' + esc(imgSrc) + '" alt="' + esc(product.name) + ' view ' + (idx + 1) + '" referrerpolicy="no-referrer" data-fallback-title="' + esc(product.name) + '" />' +
        '</button>'
      );
    }).join('');

    const colorsHtml = product.colors.map(function (c, idx) {
      return (
        '<button type="button" class="swatch-btn ' + (idx === 0 ? 'active' : '') + '" data-pdp-color="' + esc(c.name) + '">' +
          '<span class="color-dot" style="background-color:' + esc(c.hex) + ';"></span>' +
          '<span>' + esc(c.name) + '</span>' +
        '</button>'
      );
    }).join('');

    const sizesHtml = product.sizes.map(function (s, idx) {
      return '<button type="button" class="size-btn ' + (idx === 0 ? 'active' : '') + '" data-pdp-size="' + esc(s) + '">' + esc(s) + '</button>';
    }).join('');

    pdpRoot.innerHTML =
      '<div class="pdp-layout">' +
        '<div class="pdp-gallery">' +
          '<div class="pdp-main-image">' +
            '<img id="pdp-main-img" src="' + esc(activeImage) + '" alt="' + esc(product.name) + '" referrerpolicy="no-referrer" data-fallback-title="' + esc(product.name) + '" />' +
          '</div>' +
          (product.images.length > 1 ? '<div class="pdp-thumbs">' + thumbsHtml + '</div>' : '') +
        '</div>' +
        '<div class="pdp-info">' +
          '<div>' +
            '<span class="section-kicker">' + esc(product.subCategory) + '</span>' +
            '<h1 class="pdp-title">' + esc(product.name) + '</h1>' +
          '</div>' +
          '<div class="pdp-price-block">' +
            '<span class="pdp-price">' + Data.formatINR(product.price) + '</span>' +
            (product.originalPrice > product.price ? '<span class="price-original" style="font-size:16px;">' + Data.formatINR(product.originalPrice) + '</span>' : '') +
            (discount > 0 ? '<span class="price-discount" style="font-size:14px;">Save ' + discount + '%</span>' : '') +
          '</div>' +
          '<p style="margin:0; color:var(--ink-secondary); font-size:15px;">' + esc(product.description) + '</p>' +
          '<div class="pdp-variant-group">' +
            '<div class="pdp-variant-label">Colour: <span id="pdp-color-label">' + esc(selectedColor) + '</span></div>' +
            '<div class="swatch-list">' + colorsHtml + '</div>' +
          '</div>' +
          '<div class="pdp-variant-group">' +
            '<div class="pdp-variant-label">Size / Length: <span id="pdp-size-label">' + esc(selectedSize) + '</span></div>' +
            '<div class="size-list">' + sizesHtml + '</div>' +
          '</div>' +
          '<div class="pdp-variant-group">' +
            '<div class="pdp-variant-label">Quantity</div>' +
            '<div class="qty-stepper">' +
              '<button type="button" class="qty-btn" id="pdp-qty-minus" aria-label="Decrease quantity">-</button>' +
              '<span class="qty-value" id="pdp-qty-value">1</span>' +
              '<button type="button" class="qty-btn" id="pdp-qty-plus" aria-label="Increase quantity">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="pdp-actions">' +
            '<button type="button" class="btn btn-primary" id="pdp-add-cart">' +
              '<i class="fa-solid fa-bag-shopping" aria-hidden="true"></i> Add to Cart' +
            '</button>' +
            '<button type="button" class="btn btn-secondary" id="pdp-buy-now">Buy Now</button>' +
            '<button type="button" class="btn btn-whatsapp btn-full" id="pdp-wa-enquiry">' +
              '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp Enquiry for This Piece' +
            '</button>' +
          '</div>' +
          '<dl class="pdp-specs">' +
            '<div class="spec-row"><dt>Fabric</dt><dd>' + esc(product.fabric) + '</dd></div>' +
            '<div class="spec-row"><dt>Weave &amp; Craft</dt><dd>' + esc(product.weave) + '</dd></div>' +
            '<div class="spec-row"><dt>Care Instructions</dt><dd>' + esc(product.care) + '</dd></div>' +
            '<div class="spec-row"><dt>Shipping</dt><dd>Complimentary above ' + Data.formatINR(Data.CONFIG.FREE_SHIPPING_THRESHOLD) + '</dd></div>' +
          '</dl>' +
        '</div>' +
      '</div>';

    attachImageFallbacks(pdpRoot);

    pdpRoot.querySelectorAll('[data-pdp-thumb]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeImage = btn.getAttribute('data-pdp-thumb');
        document.getElementById('pdp-main-img').setAttribute('src', activeImage);
        pdpRoot.querySelectorAll('[data-pdp-thumb]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });

    pdpRoot.querySelectorAll('[data-pdp-color]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectedColor = btn.getAttribute('data-pdp-color');
        document.getElementById('pdp-color-label').textContent = selectedColor;
        pdpRoot.querySelectorAll('[data-pdp-color]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });

    pdpRoot.querySelectorAll('[data-pdp-size]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectedSize = btn.getAttribute('data-pdp-size');
        document.getElementById('pdp-size-label').textContent = selectedSize;
        pdpRoot.querySelectorAll('[data-pdp-size]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });

    const qtyValueEl = document.getElementById('pdp-qty-value');
    document.getElementById('pdp-qty-minus').addEventListener('click', function () {
      quantity = Math.max(1, quantity - 1);
      qtyValueEl.textContent = String(quantity);
    });
    document.getElementById('pdp-qty-plus').addEventListener('click', function () {
      quantity = Math.min(20, quantity + 1);
      qtyValueEl.textContent = String(quantity);
    });

    document.getElementById('pdp-add-cart').addEventListener('click', function () {
      Cart.addToCart(product.id, { color: selectedColor, size: selectedSize, quantity: quantity });
    });

    document.getElementById('pdp-buy-now').addEventListener('click', function () {
      Cart.addToCart(product.id, { color: selectedColor, size: selectedSize, quantity: quantity });
      window.location.href = 'cart.html';
    });

    document.getElementById('pdp-wa-enquiry').addEventListener('click', function () {
      const msg = Cart.buildProductEnquiryMessage(product, {
        color: selectedColor,
        size: selectedSize,
        quantity: quantity
      });
      openWhatsAppModal(msg);
    });

    // Related Products
    const relatedEl = document.getElementById('pdp-related-grid');
    if (relatedEl) {
      const related = Data.PRODUCTS.filter(function (p) {
        return p.category === product.category && p.id !== product.id;
      }).slice(0, 4);
      relatedEl.innerHTML = related.map(renderProductCardHtml).join('');
      attachImageFallbacks(relatedEl);
    }
  }

  /* ------------------------------------------------------------------------
     Shopping Cart Page Controller
     ------------------------------------------------------------------------ */
  function initCartPage() {
    const cartRoot = document.getElementById('cart-page-root');
    if (!cartRoot) return;

    const Data = getData();
    const Cart = getCartApi();
    const esc = Cart.escapeHtml;

    function renderCart() {
      const totals = Cart.getCartTotals();

      if (totals.items.length === 0) {
        cartRoot.innerHTML =
          '<div class="empty-state">' +
            '<h3>Your shopping bag is currently empty</h3>' +
            '<p>Explore our handcrafted Kanchipuram sarees and traditional dhoti &amp; kurta ensembles.</p>' +
            '<div style="display:flex; justify-content:center; flex-wrap:wrap; gap:12px;">' +
              '<a href="sarees.html" class="btn btn-primary">Explore Sarees</a>' +
              '<a href="dhoti-kurta.html" class="btn btn-secondary">Explore Dhoti &amp; Kurta</a>' +
            '</div>' +
          '</div>';
        return;
      }

      const itemsHtml = totals.items.map(function (item, idx) {
        const lineTotal = item.price * item.quantity;
        return (
          '<div class="cart-item-row" data-cart-index="' + idx + '">' +
            '<a href="product-details.html?id=' + encodeURIComponent(item.id) + '" class="cart-item-thumb">' +
              '<img src="' + esc(item.image) + '" alt="' + esc(item.name) + '" referrerpolicy="no-referrer" data-fallback-title="' + esc(item.name) + '" />' +
            '</a>' +
            '<div>' +
              '<h3 class="cart-item-title">' +
                '<a href="product-details.html?id=' + encodeURIComponent(item.id) + '">' + esc(item.name) + '</a>' +
              '</h3>' +
              '<div class="cart-item-variant">' +
                esc(item.subCategory) + ' · Colour: ' + esc(item.color) + ' · Size: ' + esc(item.size) +
              '</div>' +
              '<div class="cart-item-controls">' +
                '<div class="qty-stepper">' +
                  '<button type="button" class="qty-btn" data-cart-dec="' + idx + '" aria-label="Decrease quantity">-</button>' +
                  '<span class="qty-value">' + item.quantity + '</span>' +
                  '<button type="button" class="qty-btn" data-cart-inc="' + idx + '" aria-label="Increase quantity">+</button>' +
                '</div>' +
                '<button type="button" class="remove-item-btn" data-cart-remove="' + idx + '">Remove</button>' +
              '</div>' +
            '</div>' +
            '<div class="cart-item-total">' +
              '<div style="font-size:17px; font-weight:700; color:var(--ink-primary);">' + Data.formatINR(lineTotal) + '</div>' +
              '<div style="font-size:12.5px; color:var(--ink-muted);">' + Data.formatINR(item.price) + ' each</div>' +
            '</div>' +
          '</div>'
        );
      }).join('');

      cartRoot.innerHTML =
        '<div class="cart-layout">' +
          '<div class="cart-items-panel">' + itemsHtml + '</div>' +
          '<aside class="cart-summary-panel" aria-label="Order summary">' +
            '<h2 class="summary-title">Order Summary</h2>' +
            '<div class="summary-lines">' +
              '<div class="summary-line"><span>Items (' + totals.itemCount + ')</span><span>' + Data.formatINR(totals.subtotal) + '</span></div>' +
              '<div class="summary-line"><span>Estimated Shipping</span><span>' + (totals.shipping === 0 ? 'Complimentary' : Data.formatINR(totals.shipping)) + '</span></div>' +
              '<div class="summary-line total"><span>Total Amount</span><span>' + Data.formatINR(totals.total) + '</span></div>' +
            '</div>' +
            '<div class="checkout-fields">' +
              '<div class="form-field">' +
                '<label class="form-label" for="checkout-name">Full Name</label>' +
                '<input id="checkout-name" type="text" class="input-control" placeholder="Your name for WhatsApp order" />' +
              '</div>' +
              '<div class="form-field">' +
                '<label class="form-label" for="checkout-phone">Phone Number</label>' +
                '<input id="checkout-phone" type="tel" class="input-control" placeholder="+91 ..." />' +
              '</div>' +
              '<div class="form-field">' +
                '<label class="form-label" for="checkout-address">Delivery City / Address</label>' +
                '<input id="checkout-address" type="text" class="input-control" placeholder="City, state & pincode" />' +
              '</div>' +
              '<div class="form-field">' +
                '<label class="form-label" for="checkout-notes">Order Notes (Optional)</label>' +
                '<input id="checkout-notes" type="text" class="input-control" placeholder="Blouse tailoring or gift note" />' +
              '</div>' +
            '</div>' +
            '<button type="button" class="btn btn-whatsapp" id="cart-whatsapp-checkout" style="width:100%;">' +
              '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Checkout via WhatsApp' +
            '</button>' +
            '<button type="button" class="btn btn-secondary btn-sm" id="cart-clear-btn" style="width:100%;">Clear Cart</button>' +
          '</aside>' +
        '</div>';

      attachImageFallbacks(cartRoot);

      cartRoot.querySelectorAll('[data-cart-dec]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const i = parseInt(btn.getAttribute('data-cart-dec'), 10);
          const item = Cart.getCart()[i];
          if (item) {
            Cart.updateCartQuantity(i, item.quantity - 1);
            renderCart();
          }
        });
      });

      cartRoot.querySelectorAll('[data-cart-inc]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const i = parseInt(btn.getAttribute('data-cart-inc'), 10);
          const item = Cart.getCart()[i];
          if (item) {
            Cart.updateCartQuantity(i, item.quantity + 1);
            renderCart();
          }
        });
      });

      cartRoot.querySelectorAll('[data-cart-remove]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const i = parseInt(btn.getAttribute('data-cart-remove'), 10);
          Cart.removeFromCart(i);
          renderCart();
        });
      });

      document.getElementById('cart-clear-btn').addEventListener('click', function () {
        Cart.clearCart();
        renderCart();
      });

      document.getElementById('cart-whatsapp-checkout').addEventListener('click', function () {
        const customerInfo = {
          name: (document.getElementById('checkout-name').value || '').trim(),
          phone: (document.getElementById('checkout-phone').value || '').trim(),
          address: (document.getElementById('checkout-address').value || '').trim(),
          notes: (document.getElementById('checkout-notes').value || '').trim()
        };
        const orderMsg = Cart.buildCartOrderMessage(customerInfo);
        openWhatsAppModal(orderMsg);
      });
    }

    renderCart();
  }

  /* ------------------------------------------------------------------------
     Contact Page Controller
     ------------------------------------------------------------------------ */
  function initContactPage() {
    const form = document.getElementById('contact-enquiry-form');
    if (!form) return;

    const statusEl = document.getElementById('contact-form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = (document.getElementById('contact-name').value || '').trim();
      const phone = (document.getElementById('contact-phone').value || '').trim();
      const interest = (document.getElementById('contact-interest').value || '').trim();
      const message = (document.getElementById('contact-message').value || '').trim();

      const composed = [
        'Hello Kalaifashion2, Customer Enquiry:',
        'Name: ' + name,
        'Phone: ' + phone,
        'Collection Interest: ' + interest,
        'Message: ' + message
      ].join('\n');

      if (statusEl) {
        statusEl.textContent = 'Enquiry prepared. You can send it directly via WhatsApp now.';
        statusEl.classList.add('visible');
      }

      openWhatsAppModal(composed);
    });
  }

  /* ------------------------------------------------------------------------
     Boot on DOMContentLoaded
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    getCartApi().updateCartBadges();
    initNavigation();
    bindProductCardDelegation();
    initHomePage();
    initCatalogPage();
    initProductDetailsPage();
    initCartPage();
    initContactPage();
    attachImageFallbacks(document);
  });
})(window);
