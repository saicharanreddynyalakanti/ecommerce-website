/*
  home.js
  -------
  Runs only on index.html.
  Job 1: show a handful of "featured" products on the homepage.
  Job 2: build the category tiles from the unique categories found in `products`.
*/

document.addEventListener("DOMContentLoaded", function () {
  renderFeaturedProducts();
  renderCategoryGrid();
});

function renderFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  // Take the first 8 products from the array as "featured".
  const featured = products.slice(0, 8);

  // Build one HTML string for all cards, then set it once (fast + simple).
  const cardsHTML = featured.map(buildProductCardHTML).join("");
  container.innerHTML = cardsHTML;
}

// Builds the HTML for a single product card.
// Reused by home.js and products.js so both pages look identical.
function buildProductCardHTML(product) {
  return (
    '<div class="product-card">' +
      '<a href="product-details.html?id=' + product.id + '">' +
        productImageHTML(product, "") +
      "</a>" +
      '<div class="product-info">' +
        '<span class="product-category">' + product.category + "</span>" +
        '<a href="product-details.html?id=' + product.id + '"><h3 class="product-name">' + product.name + "</h3></a>" +
        starRatingHTML(product.rating) +
        '<span class="product-price">₹' + product.price + "</span>" +
        '<div class="product-actions">' +
          '<a href="product-details.html?id=' + product.id + '" class="btn btn-outline btn-small">View</a>' +
          '<button class="btn btn-accent btn-small" onclick="addToCart(' + product.id + ', 1)">Add to Cart</button>' +
        "</div>" +
      "</div>" +
    "</div>"
  );
}

function renderCategoryGrid() {
  const container = document.getElementById("category-grid");
  if (!container) return;

  // Get a list of UNIQUE category names from the products array.
  // map() pulls out just the category from each product,
  // then `new Set(...)` removes duplicates, then we spread it back into an array.
  const categories = [...new Set(products.map(function (p) { return p.category; }))];

  const tilesHTML = categories
    .map(function (category) {
      return (
        '<a class="category-card" href="products.html?category=' + encodeURIComponent(category) + '">' +
          category +
        "</a>"
      );
    })
    .join("");

  container.innerHTML = tilesHTML;
}
