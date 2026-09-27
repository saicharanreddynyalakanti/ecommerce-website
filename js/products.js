/*
  products.js
  -----------
  Runs only on products.html.

  THE CORE IDEA:
  We never permanently delete items from the `products` array. Instead, every
  time the user searches or changes a filter, we:
    1. Start from the FULL `products` array
    2. Apply each active filter using Array.filter()
    3. Render whatever is left

  This "filter fresh each time" approach is simple and bug-resistant compared
  to trying to remove/add DOM elements one by one.
*/

document.addEventListener("DOMContentLoaded", function () {
  populateCategoryDropdown();
  applyFiltersFromURL(); // support links like products.html?category=Shoes
  applyAndRenderFilters();

  // Re-apply filters whenever any control changes
  document.getElementById("search-input").addEventListener("input", applyAndRenderFilters);
  document.getElementById("category-filter").addEventListener("change", applyAndRenderFilters);
  document.getElementById("price-filter").addEventListener("change", applyAndRenderFilters);
  document.getElementById("clear-filters").addEventListener("click", clearFilters);
});

// Fills the category <select> with every unique category from the data.
function populateCategoryDropdown() {
  const select = document.getElementById("category-filter");
  const categories = [...new Set(products.map(function (p) { return p.category; }))];

  categories.forEach(function (category) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });
}

// Reads ?search= and ?category= from the URL (e.g. coming from the homepage
// category tiles or the navbar search box) and pre-fills the controls.
function applyFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");
  const category = params.get("category");

  if (search) {
    document.getElementById("search-input").value = search;
  }
  if (category) {
    document.getElementById("category-filter").value = category;
  }
}

// The main function: reads all 3 controls, filters the array, renders the grid.
function applyAndRenderFilters() {
  const searchTerm = document.getElementById("search-input").value.trim().toLowerCase();
  const selectedCategory = document.getElementById("category-filter").value;
  const selectedPriceRange = document.getElementById("price-filter").value;

  let results = products;

  // 1. Search filter — keep products whose name includes the search text
  if (searchTerm !== "") {
    results = results.filter(function (product) {
      return product.name.toLowerCase().includes(searchTerm);
    });
  }

  // 2. Category filter
  if (selectedCategory !== "all") {
    results = results.filter(function (product) {
      return product.category === selectedCategory;
    });
  }

  // 3. Price filter — value is stored as "min-max", e.g. "1000-2000"
  if (selectedPriceRange !== "all") {
    const parts = selectedPriceRange.split("-");
    const min = Number(parts[0]);
    const max = Number(parts[1]);
    results = results.filter(function (product) {
      return product.price >= min && product.price <= max;
    });
  }

  renderProductGrid(results);
}

function renderProductGrid(list) {
  const grid = document.getElementById("product-grid");
  const resultsCount = document.getElementById("results-count");

  resultsCount.textContent = list.length + " product" + (list.length === 1 ? "" : "s") + " found";

  if (list.length === 0) {
    grid.innerHTML = '<p class="no-results">No products match your filters. Try clearing them.</p>';
    return;
  }

  // buildProductCardHTML() is defined in home.js and reused here so both
  // pages render identical-looking cards without duplicating the markup.
  grid.innerHTML = list.map(buildProductCardHTML).join("");
}

function clearFilters() {
  document.getElementById("search-input").value = "";
  document.getElementById("category-filter").value = "all";
  document.getElementById("price-filter").value = "all";
  applyAndRenderFilters();
}
