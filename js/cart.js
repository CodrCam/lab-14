/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

//* TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() { 
  const tableBody = document.querySelector('#cart tbody');
  tableBody.innerHTML = '';
}

function showCart() {
  const tableBody = document.querySelector('#cart tbody');
  for (let i = 0; i < state.cart.items.length; i++) {
    const item = state.cart.items[i];
    const row = document.createElement('tr');
    tableBody.appendChild(row);
    const deleteCell = document.createElement('td');
    const quantityCell = document.createElement('td');
    const nameCell = document.createElement('td');
    row.appendChild(deleteCell);
    row.appendChild(quantityCell);
    row.appendChild(nameCell);
    deleteCell.innerHTML = '<a href="#">X</a>';
    quantityCell.textContent = item.quantity;
    nameCell.textContent = item.product;
  }
}

function removeItemFromCart(event) {
  const row = event.target.parentNode.parentNode;
  const itemName = row.querySelector('td:last-child').textContent;
  state.cart.removeItem(itemName);
  state.cart.saveToLocalStorage();
  row.remove();
}

// This will initialize the page and draw the cart on screen
renderCart();
