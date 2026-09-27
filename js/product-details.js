/*
  product-details.js
  -------------------
  Runs only on product-details.html.

  How we know WHICH product to show:
  The link that brought us here looks like "product-details.html?id=7".
  We read the "id" from the URL using URLSearchParams, convert it to a
  Number, then use Array.find() to locate that product in `products`.
*/

let currentQuantity = 1; // tracks the quantity selected on this page

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("id"));

  const product = products.find(function (p) {
    return p.id === productId;
  });

  const container = document.getElementById("details-container");

  if (!product) {
    // No matching product (bad/missing id in the URL) -> show a friendly message
    container.innerHTML =
      '<p class="no-results">Product not found. <a href="products.html">Go back to products</a>.</p>';
    return;
  }

  renderProductDetails(product);
});

function renderProductDetails(product) {
  const container = document.getElementById("details-container");

  container.innerHTML =
    '<div class="product-details">' +
      '<div class="details-image">' + productImageHTML(product, "large", true) + "</div>" +
      '<div class="details-info">' +
        '<span class="product-category">' + product.category + "</span>" +
        "<h1>" + product.name + "</h1>" +
        starRatingHTML(product.rating) +
        '<p class="details-price">₹' + product.price + "</p>" +
        '<p class="details-description">' + product.description + "</p>" +

        '<div class="quantity-control">' +
          '<button class="qty-btn" id="qty-decrease" aria-label="Decrease quantity">-</button>' +
          '<span class="qty-value" id="qty-value">1</span>' +
          '<button class="qty-btn" id="qty-increase" aria-label="Increase quantity">+</button>' +
        "</div>" +

        '<button class="btn btn-accent btn-block" id="add-to-cart-btn">Add to Cart</button>' +
      "</div>" +
    "</div>";

  // Reset quantity each time a new product is rendered
  currentQuantity = 1;

  document.getElementById("qty-increase").addEventListener("click", function () {
    currentQuantity++;
    document.getElementById("qty-value").textContent = currentQuantity;
  });

  document.getElementById("qty-decrease").addEventListener("click", function () {
    if (currentQuantity > 1) {
      currentQuantity--;
      document.getElementById("qty-value").textContent = currentQuantity;
    }
  });

  document.getElementById("add-to-cart-btn").addEventListener("click", function () {
    addToCart(product.id, currentQuantity); // addToCart() is defined in main.js
    alert(currentQuantity + " × " + product.name + " added to cart.");
  });
}
