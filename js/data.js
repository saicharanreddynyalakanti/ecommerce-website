/*
  data.js
  -------
  This file holds all product data as a single JavaScript array of objects.
  Think of this as our "mock database" since we have no backend/server.
  Every page (products.html, product-details.html, index.html) includes
  this file BEFORE its own script, so the `products` array is available
  everywhere as a global variable.

  IMAGES:
  Each product now has an `image` field pointing to a LOCAL file inside
  images/products/. This keeps the project self-contained (no external
  URLs that can break or change) and matches how a real small e-commerce
  frontend would reference its assets.

  `color` and `initial` are kept as a FALLBACK. If an image file is missing
  or fails to load, main.js swaps in a colored tile with the product's
  initials instead of showing a broken image icon. This is a simple,
  interview-friendly example of "graceful degradation."
*/

const products = [
  { id: 1, name: "Men's Casual Shirt", category: "Shirts", price: 899, rating: 4.2,
    image: "images/products/shirt-1.jpg", color: "#4A6FA5", initial: "MS",
    description: "A comfortable cotton-blend casual shirt, perfect for everyday wear or a relaxed office look." },
  { id: 2, name: "Formal White Shirt", category: "Shirts", price: 1199, rating: 4.5,
    image: "images/products/shirt-2.jpg", color: "#6C7A89", initial: "FS",
    description: "Crisp white formal shirt with a tailored fit, ideal for interviews and office wear." },
  { id: 3, name: "Graphic Print T-Shirt", category: "T-Shirts", price: 499, rating: 4.0,
    image: "images/products/tshirt-1.jpg", color: "#E07A5F", initial: "GT",
    description: "Soft cotton t-shirt with a modern graphic print, great for casual outings." },
  { id: 4, name: "Plain Round Neck T-Shirt", category: "T-Shirts", price: 349, rating: 4.1,
    image: "images/products/tshirt-2.jpg", color: "#3D9970", initial: "PT",
    description: "A wardrobe essential — soft, breathable round neck t-shirt in a solid color." },
  { id: 5, name: "Chino Trousers", category: "Pants", price: 1399, rating: 4.3,
    image: "images/products/pants-1.jpg", color: "#B08968", initial: "CT",
    description: "Slim-fit chino trousers made from stretchable fabric for all-day comfort." },
  { id: 6, name: "Formal Trousers", category: "Pants", price: 1599, rating: 4.2,
    image: "images/products/pants-2.jpg", color: "#495057", initial: "FT",
    description: "Classic formal trousers with a straight fit, suitable for office and formal events." },
  { id: 7, name: "Slim Fit Jeans", category: "Jeans", price: 1799, rating: 4.4,
    image: "images/products/jeans-1.jpg", color: "#3B5998", initial: "SJ",
    description: "Stretchable slim-fit denim jeans that combine comfort with a sharp look." },
  { id: 8, name: "Distressed Denim Jeans", category: "Jeans", price: 1999, rating: 4.1,
    image: "images/products/jeans-2.jpg", color: "#2C3E50", initial: "DJ",
    description: "Trendy distressed denim jeans with a relaxed fit for a casual streetwear vibe." },
  { id: 9, name: "Floral Maxi Dress", category: "Dresses", price: 1699, rating: 4.6,
    image: "images/products/dress-1.jpg", color: "#D46A9F", initial: "FD",
    description: "A flowy floral maxi dress made from lightweight fabric, perfect for summer days." },
  { id: 10, name: "A-Line Party Dress", category: "Dresses", price: 2199, rating: 4.5,
    image: "images/products/dress-2.jpg", color: "#9B5DE5", initial: "PD",
    description: "An elegant A-line party dress with a flattering silhouette for special occasions." },
  { id: 11, name: "Banarasi Silk Saree", category: "Sarees", price: 3499, rating: 4.7,
    image: "images/products/saree-1.jpg", color: "#C2185B", initial: "BS",
    description: "Traditional Banarasi silk saree with intricate zari work, ideal for festive occasions." },
  { id: 12, name: "Cotton Handloom Saree", category: "Sarees", price: 1299, rating: 4.3,
    image: "images/products/saree-2.jpg", color: "#00897B", initial: "CS",
    description: "Lightweight handloom cotton saree, comfortable for daily and office wear." },
  { id: 13, name: "Embroidered Churidar Suit", category: "Churidars", price: 1899, rating: 4.4,
    image: "images/products/churidar-1.jpg", color: "#8E44AD", initial: "EC",
    description: "A graceful embroidered churidar suit set with matching dupatta." },
  { id: 14, name: "Printed Salwar Suit", category: "Churidars", price: 1499, rating: 4.2,
    image: "images/products/churidar-2.jpg", color: "#16A085", initial: "PS",
    description: "Comfortable printed salwar suit made from soft cotton fabric." },
  { id: 15, name: "Running Sports Shoes", category: "Shoes", price: 2499, rating: 4.5,
    image: "images/products/shoes-1.jpg", color: "#E63946", initial: "RS",
    description: "Lightweight running shoes with cushioned soles for everyday sports and jogging." },
  { id: 16, name: "Formal Leather Shoes", category: "Shoes", price: 2999, rating: 4.4,
    image: "images/products/shoes-2.jpg", color: "#3E2723", initial: "LS",
    description: "Genuine leather formal shoes with a classic design, perfect for office and events." },
  { id: 17, name: "Analog Wrist Watch", category: "Watches", price: 1599, rating: 4.3,
    image: "images/products/watch-1.jpg", color: "#B8860B", initial: "AW",
    description: "Elegant analog wrist watch with a leather strap and scratch-resistant glass." },
  { id: 18, name: "Chronograph Watch", category: "Watches", price: 2899, rating: 4.6,
    image: "images/products/watch-2.jpg", color: "#212529", initial: "CW",
    description: "A stylish chronograph watch with a stainless steel body and water resistance." },
  { id: 19, name: "Leather Handbag", category: "Bags", price: 1999, rating: 4.4,
    image: "images/products/bag-1.jpg", color: "#6F4E37", initial: "LH",
    description: "Spacious leather handbag with multiple compartments, ideal for daily use." },
  { id: 20, name: "Travel Backpack", category: "Bags", price: 1699, rating: 4.5,
    image: "images/products/bag-2.jpg", color: "#264653", initial: "TB",
    description: "Durable travel backpack with padded straps and a dedicated laptop sleeve." },
  { id: 21, name: "Smartphone 128GB", category: "Mobiles", price: 15999, rating: 4.3,
    image: "images/products/mobile-1.jpg", color: "#1D3557", initial: "SP",
    description: "A reliable smartphone with 128GB storage, a large display, and a long-lasting battery." },
  { id: 22, name: "Budget Smartphone", category: "Mobiles", price: 8999, rating: 4.0,
    image: "images/products/mobile-2.jpg", color: "#457B9D", initial: "BS",
    description: "An affordable smartphone with all essential features for everyday use." },
  { id: 23, name: "Wireless Earphones", category: "Headphones", price: 1499, rating: 4.2,
    image: "images/products/headphones-1.jpg", color: "#2A9D8F", initial: "WE",
    description: "Bluetooth wireless earphones with noise isolation and long battery backup." },
  { id: 24, name: "Over-Ear Headphones", category: "Headphones", price: 2499, rating: 4.4,
    image: "images/products/headphones-2.jpg", color: "#E76F51", initial: "OH",
    description: "Comfortable over-ear headphones with deep bass and a foldable design." },
  { id: 25, name: "15-inch Laptop", category: "Laptops", price: 42999, rating: 4.5,
    image: "images/products/laptop-1.jpg", color: "#023047", initial: "LT",
    description: "A powerful 15-inch laptop suitable for study, office work, and light gaming." },
  { id: 26, name: "Lightweight Notebook Laptop", category: "Laptops", price: 34999, rating: 4.2,
    image: "images/products/laptop-2.jpg", color: "#219EBC", initial: "NL",
    description: "A slim and lightweight laptop, perfect for students and daily productivity." },
  { id: 27, name: "Fitness Smartwatch", category: "Smartwatches", price: 2299, rating: 4.3,
    image: "images/products/smartwatch-1.jpg", color: "#FF6B6B", initial: "FW",
    description: "Track your steps, heart rate, and sleep with this everyday fitness smartwatch." },
  { id: 28, name: "Premium Smartwatch", category: "Smartwatches", price: 4499, rating: 4.6,
    image: "images/products/smartwatch-2.jpg", color: "#4361EE", initial: "PW",
    description: "A premium smartwatch with AMOLED display, calling feature, and multiple sport modes." }
];
