/*
  main.js
  -------
  Shared logic that runs on EVERY page:
  1. localStorage helper functions for the cart (getCart / saveCart)
  2. A function to build a real <img> product photo, with an automatic
     fallback to a colored initials tile if the image file is missing
  3. A click-to-zoom lightbox (used on the product details page)
  4. A function that updates the little cart-count badge in the navbar
  5. Mobile nav toggle (hamburger menu)

  Every HTML page loads this file so these functions are available everywhere.
*/

// ---------- CART STORAGE HELPERS ----------

// Reads the cart from localStorage and returns it as a JavaScript array.
// The cart is stored as a JSON STRING in localStorage (localStorage can only
// store strings), so we use JSON.parse() to turn it back into an array.
function getCart() {
  const cartJSON = localStorage.getItem("cart"); // returns null if nothing saved yet
  if (cartJSON === null) {
    return []; // no cart saved yet -> start with an empty array
  }
  return JSON.parse(cartJSON);
}

// Takes a cart array, converts it to a JSON string, and saves it in localStorage.
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Adds a product to the cart (or increases its quantity if it's already there).
function addToCart(productId, quantity) {
  quantity = quantity || 1; // default to 1 if not provided
  const cart = getCart();

  // Look for this product already in the cart
  const existingItem = cart.find(function (item) {
    return item.id === productId;
  });

  if (existingItem) {
    existingItem.quantity += quantity; // already in cart -> just bump quantity
  } else {
    cart.push({ id: productId, quantity: quantity }); // new item -> add it
  }

  saveCart(cart);
  updateCartBadge();
}

// ---------- CART BADGE (the little number on the cart icon) ----------

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return; // page might not have a badge element, so exit safely

  const cart = getCart();
  // reduce() walks through the array and builds a single total value
  const totalItems = cart.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);

  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? "inline-block" : "none";
}

// ---------- PRODUCT IMAGE (real photo, with a safe fallback) ----------
// Builds a <div class="product-image"> containing a real <img>.
// If the image file at product.image is missing or fails to load, the
// browser fires the img's "error" event, and handleImageError() below
// swaps in the same colored-initials tile the project used before —
// so the layout never breaks even if a photo hasn't been added yet.
//
// Pass zoomable = true (used on the product details page) to make the
// image open in a click-to-zoom lightbox.
function productImageHTML(product, sizeClass, zoomable) {
  sizeClass = sizeClass || "";
  const zoomClass = zoomable ? " zoomable" : "";
  const zoomClick = zoomable ? ' onclick="openImageZoom(this.src, this.alt)"' : "";

  return (
    '<div class="product-image ' + sizeClass + '">' +
      '<img src="' + product.image + '" alt="' + product.name + '"' +
        ' class="product-photo' + zoomClass + '"' +
        ' data-color="' + product.color + '" data-initial="' + product.initial + '"' +
        ' loading="lazy"' +
        zoomClick +
        ' onerror="handleImageError(this)" />' +
    "</div>"
  );
}

// Runs automatically when an <img> fails to load.
// Replaces the broken image with the same colored-tile fallback the
// project used to show for every product, so a missing photo file
// never shows a broken-image icon to the user.
function handleImageError(img) {
  img.onerror = null; // stop this from looping if the fallback also fails
  const wrapper = img.parentElement;
  wrapper.style.backgroundColor = img.dataset.color;
  wrapper.innerHTML = "<span>" + img.dataset.initial + "</span>";
}

// ---------- CLICK-TO-ZOOM LIGHTBOX ----------
// One modal element is created once and reused for every zoom click,
// rather than building a new modal every time. This is a common,
// easy-to-explain pattern: "build once, reuse many times."
function openImageZoom(src, alt) {
  let modal = document.getElementById("image-zoom-modal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "image-zoom-modal";
    modal.className = "zoom-modal";
    modal.innerHTML =
      '<button class="zoom-close" aria-label="Close zoomed image">&times;</button>' +
      '<img class="zoom-modal-img" id="zoom-modal-img" src="" alt="" />';
    document.body.appendChild(modal);

    // Clicking the dark backdrop OR the close button closes the modal.
    modal.addEventListener("click", function (event) {
      if (event.target === modal || event.target.classList.contains("zoom-close")) {
        closeImageZoom();
      }
    });

    // Pressing Escape also closes it.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeImageZoom();
    });
  }

  document.getElementById("zoom-modal-img").src = src;
  document.getElementById("zoom-modal-img").alt = alt;
  modal.classList.add("zoom-open");
  document.body.style.overflow = "hidden"; // stop the page scrolling behind the modal
}

function closeImageZoom() {
  const modal = document.getElementById("image-zoom-modal");
  if (modal) modal.classList.remove("zoom-open");
  document.body.style.overflow = "";
}

// ---------- STAR RATING ----------
// Turns a number like 4.3 into a simple "★★★★☆ (4.3)" style string.
function starRatingHTML(rating) {
  const fullStars = Math.round(rating);
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= fullStars ? "★" : "☆";
  }
  return '<span class="rating">' + stars + " (" + rating + ")</span>";
}

// ---------- MOBILE NAV TOGGLE ----------
function setupMobileNav() {
  const toggleBtn = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", function () {
    navLinks.classList.toggle("nav-open");
  });
}

// ---------- RUN ON EVERY PAGE LOAD ----------
// DOMContentLoaded fires once the HTML is fully loaded, before images etc.
// This is the safe place to run code that touches the page's elements.
document.addEventListener("DOMContentLoaded", function () {
  updateCartBadge();
  setupMobileNav();
});
