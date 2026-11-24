/* ==========================================================================
   Kalaifashion2 — Shopping Cart & WhatsApp Order Generator
   ========================================================================== */

(function (global) {
  'use strict';

  const STORAGE_KEY = 'kalaifashion2_cart_v1';

  function readCart() {
    try {
      const raw = global.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_err) {
      return [];
    }
  }

  function writeCart(items) {
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (_err) {
      // Ignore storage quota errors cleanly
    }
    updateCartBadges();
  }

  function getCart() {
    return readCart();
  }

  function getCartCount() {
    return readCart().reduce(function (sum, item) {
      return sum + (Number(item.quantity) || 0);
    }, 0);
  }

  function addToCart(productId, options) {
    const Data = global.KalaifashionData;
    if (!Data) return false;
    const product = Data.getProductById(productId);
    if (!product) return false;

    const opts = options || {};
    const color = opts.color || (product.colors[0] ? product.colors[0].name : 'Standard');
    const size = opts.size || (product.sizes[0] ? product.sizes[0] : 'Standard');
    const quantity = Math.max(1, parseInt(opts.quantity, 10) || 1);

    const items = readCart();
    const existingIndex = items.findIndex(function (entry) {
      return entry.id === product.id && entry.color === color && entry.size === size;
    });

    if (existingIndex >= 0) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        category: product.category,
        subCategory: product.subCategory,
        price: product.price,
        image: product.images[0] || '',
        color: color,
        size: size,
        quantity: quantity
      });
    }

    writeCart(items);
    showToast(product.name + ' added to cart');
    return true;
  }

  function updateCartQuantity(index, newQuantity) {
    const items = readCart();
    if (index < 0 || index >= items.length) return;
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      items.splice(index, 1);
    } else {
      items[index].quantity = Math.min(99, qty);
    }
    writeCart(items);
  }

  function removeFromCart(index) {
    const items = readCart();
    if (index < 0 || index >= items.length) return;
    items.splice(index, 1);
    writeCart(items);
  }

  function clearCart() {
    writeCart([]);
  }

  function getCartTotals() {
    const CONFIG = global.KalaifashionData.CONFIG;
    const items = readCart();
    const subtotal = items.reduce(function (sum, item) {
      return sum + (Number(item.price) || 0) * (Number(item.quantity) || 1);
    }, 0);
    const shipping = subtotal === 0 || subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD
      ? 0
      : CONFIG.SHIPPING_FEE;
    return {
      items: items,
      itemCount: getCartCount(),
      subtotal: subtotal,
      shipping: shipping,
      total: subtotal + shipping
    };
  }

  function updateCartBadges() {
    const count = getCartCount();
    const badges = document.querySelectorAll('[data-cart-count]');
    badges.forEach(function (el) {
      el.textContent = String(count);
    });
  }

  function buildWhatsAppUrl(messageText) {
    const phone = global.KalaifashionData.CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(messageText);
  }

  function buildProductEnquiryMessage(product, options) {
    const Data = global.KalaifashionData;
    const opts = options || {};
    const color = opts.color || (product.colors[0] ? product.colors[0].name : 'Standard');
    const size = opts.size || (product.sizes[0] ? product.sizes[0] : 'Standard');
    const quantity = Math.max(1, parseInt(opts.quantity, 10) || 1);
    const total = product.price * quantity;

    const lines = [
      'Hello Kalaifashion2, I would like to enquire about this product:',
      '',
      'Customer Enquiry: Product Availability & Order',
      'Product Name: ' + product.name,
      'Category: ' + product.subCategory,
      'Price: ' + Data.formatINR(product.price),
      'Selected Colour: ' + color,
      'Selected Size / Length: ' + size,
      'Quantity: ' + quantity,
      'Total Amount: ' + Data.formatINR(total)
    ];

    return lines.join('\n');
  }

  function buildCartOrderMessage(customerInfo) {
    const Data = global.KalaifashionData;
    const totals = getCartTotals();
    const info = customerInfo || {};

    const lines = [
      'Hello Kalaifashion2, I would like to place an order:',
      ''
    ];

    totals.items.forEach(function (item, idx) {
      const lineTotal = item.price * item.quantity;
      lines.push(
        (idx + 1) + '. ' + item.name +
        ' | Colour: ' + item.color +
        ' | Size: ' + item.size +
        ' | Qty: ' + item.quantity +
        ' | Price: ' + Data.formatINR(item.price) +
        ' | Line Total: ' + Data.formatINR(lineTotal)
      );
    });

    lines.push('');
    lines.push('Subtotal: ' + Data.formatINR(totals.subtotal));
    lines.push(
      'Delivery: ' + (totals.shipping === 0 ? 'Complimentary' : Data.formatINR(totals.shipping))
    );
    lines.push('Total Amount: ' + Data.formatINR(totals.total));

    if (info.name || info.phone || info.address || info.notes) {
      lines.push('');
      lines.push('Customer Details:');
      if (info.name) lines.push('Name: ' + info.name);
      if (info.phone) lines.push('Phone: ' + info.phone);
      if (info.address) lines.push('Delivery Address: ' + info.address);
      if (info.notes) lines.push('Notes: ' + info.notes);
    }

    return lines.join('\n');
  }

  let toastTimer = null;
  function showToast(message) {
    let toast = document.getElementById('kf-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'kf-toast';
      toast.className = 'toast-banner';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    toast.innerHTML =
      '<span>' + escapeHtml(message) + '</span>' +
      '<a href="cart.html">View Cart</a>';

    toast.classList.add('visible');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('visible');
    }, 3200);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  global.KalaifashionCart = {
    getCart: getCart,
    getCartCount: getCartCount,
    addToCart: addToCart,
    updateCartQuantity: updateCartQuantity,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    getCartTotals: getCartTotals,
    updateCartBadges: updateCartBadges,
    buildWhatsAppUrl: buildWhatsAppUrl,
    buildProductEnquiryMessage: buildProductEnquiryMessage,
    buildCartOrderMessage: buildCartOrderMessage,
    showToast: showToast,
    escapeHtml: escapeHtml
  };
})(window);
