const products = [
   { name: 'Apple', price: 300, image: 'img/apple.jpg' },
  { name: 'Banana', price: 60, image: 'img/banana.jpg' },
  { name: 'Orange', price: 90, image: 'img/orange.jpg' },
  { name: 'Grapes', price: 670,image: 'img/grapes.jpg' },
  { name: 'strawberry', price: 95, image: 'img/strawberry.jpg' },
  { name: 'Broccoli', price: 75, image: 'img/Broccoli.jpg' },
  
];
let cart = [];

function renderProducts() {
  const container = document.getElementById('product-list');
  products.forEach((product, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$${product.price.toFixed(2)}</p>
          <button class="btn btn-success" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        </div>
      </div>`;
    container.appendChild(col);
  });
}

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCartCount();
  updateCheckout();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-count').textContent = count;
}

function updateCheckout() {
  const table = document.getElementById('checkout-items');
  table.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${subtotal.toFixed(2)}</td>`;
    table.appendChild(row);
  });
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function toggleCheckout() {
  const checkout = document.getElementById('checkout');
  checkout.style.display = checkout.style.display === 'none' ? 'block' : 'none';
}

window.onload = renderProducts;