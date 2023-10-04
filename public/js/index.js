function updateCartNumber() {
  const cartNumber = document.querySelector('.cartNumber');
  const cart = JSON.parse(localStorage.cart || '[]');
  const amount = cart.reduce((total, product) => total + product.quantity, 0);
  cartNumber.innerText = amount;
  return amount;
}

function sendCart(products, amount) {
  const data = {
    products: products,
    amount: amount
  };

  fetch('/carts', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

document.addEventListener('click', (e) => {
  if (e.target && e.target.className.includes('addToCart')) {
    const products = JSON.parse(localStorage.cart || '[]');
    const index = products.findIndex((prod) => prod.id == e.target.id);
    if (index == -1) {
      products.push({ id: e.target.id, quantity: 1 });
    } else {
      products[index].quantity++;
    }
    localStorage.setItem('cart', JSON.stringify(products));
    const amount = updateCartNumber();
    sendCart(products, amount);
  }
});

updateCartNumber();