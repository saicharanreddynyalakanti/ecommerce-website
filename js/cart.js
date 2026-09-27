/*
  cart.js
  -------
  Runs only on cart.html.

  The cart in localStorage only stores { id, quantity } pairs — NOT full
  product details (name, price, image). This keeps localStorage small and
  avoids storing duplicate/stale data. Every time we render the cart, we
  "join" each cart entry with its full product info by looking it up in
  the `products` array using its id. This mirrors how a real app would
  join an order table with a products table.
*/

document.addEventListener("DOMContentLoaded", renderCartPage);

function renderCartPage() {
  const cart = getCart();
  const container = document.getElementById("cart-container");

  if (cart.length === 0) {
    container.innerHTML =
      '<div class="empty-cart">' +
        "<p>Your cart is empty.</p>" +
        '<a href="products.html" class="btn btn-primary">Browse Products</a>' +
      "</div>";
    return;
  }

  // Join each cart entry with its full product details.
  // .map() transforms [{id, quantity}, ...] into [{product, quantity}, ...]
  const cartItems = cart.map(function (entry) {
    const product = products.find(function (p) { return p.id === entry.id; });
    return { product: product, quantity: entry.quantity };
  }).filter(function (item) {
    return item.product !== undefined; // safety: drop entries whose product no longer exists
  });

  const rowsHTML = cartItems.map(buildCartRowHTML).join("");

  container.innerHTML =
    '<table class="cart-table">' +
      "<thead><tr>" +
        "<th>Product</th><th>Price</th><th>Quantity</th><th>Item Total</th><th></th>" +
      "</tr></thead>" +
      "<tbody>" + rowsHTML + "</tbody>" +
    "</table>" +
    '<div class="cart-summary" id="cart-summary"></div>';

  attachCartRowListeners();
  renderCartSummary(cartItems);
}

function buildCartRowHTML(item) {
  const product = item.product;
  const itemTotal = product.price * item.quantity;

  return (
    "<tr data-id='" + product.id + "'>" +
      "<td>" +
        '<div class="cart-product-cell">' +
          productImageHTML(product, "") +
          "<a href='product-details.html?id=" + product.id + "'>" + product.name + "</a>" +
        "</div>" +
      "</td>" +
      "<td>₹" + product.price + "</td>" +
      "<td>" +
        '<div class="quantity-control">' +
          "<button class='qty-btn cart-qty-decrease' data-id='" + product.id + "'>-</button>" +
          "<span class='qty-value'>" + item.quantity + "</span>" +
          "<button class='qty-btn cart-qty-increase' data-id='" + product.id + "'>+</button>" +
        "</div>" +
      "</td>" +
      "<td>₹" + itemTotal + "</td>" +
      "<td><button class='remove-btn' data-id='" + product.id + "'>Remove</button></td>" +
    "</tr>"
  );
}

// Attaches click listeners to every +, -, and Remove button in the table.
// We re-attach these every time the cart re-renders since the buttons are
// brand new DOM elements each time.
function attachCartRowListeners() {
  document.querySelectorAll(".cart-qty-increase").forEach(function (btn) {
    btn.addEventListener("click", function () {
      changeQuantity(Number(btn.dataset.id), 1);
    });
  });

  document.querySelectorAll(".cart-qty-decrease").forEach(function (btn) {
    btn.addEventListener("click", function () {
      changeQuantity(Number(btn.dataset.id), -1);
    });
  });

  document.querySelectorAll(".remove-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      removeFromCart(Number(btn.dataset.id));
    });
  });
}

function changeQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find(function (i) { return i.id === productId; });
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
  updateCartBadge();
  renderCartPage(); // re-render the whole cart section with updated numbers
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(function (item) {
    return item.id !== productId;
  });
  saveCart(cart);
  updateCartBadge();
  renderCartPage();
}

function renderCartSummary(cartItems) {
  const summary = document.getElementById("cart-summary");

  // reduce() walks the array once and builds a single running total
  const subtotal = cartItems.reduce(function (sum, item) {
    return sum + item.product.price * item.quantity;
  }, 0);

  const shipping = subtotal >= 2000 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  summary.innerHTML =
    '<div class="summary-row"><span>Subtotal</span><span>₹' + subtotal + "</span></div>" +
    '<div class="summary-row"><span>Shipping</span><span>' + (shipping === 0 ? "Free" : "₹" + shipping) + "</span></div>" +
    '<div class="summary-row total"><span>Total</span><span>₹' + total + "</span></div>" +
    '<button class="btn btn-primary btn-block" style="margin-top:16px" onclick="alert(\'This is a demo project — checkout is not implemented.\')">Checkout</button>';
}
