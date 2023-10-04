document.addEventListener('DOMContentLoaded', function () {
  const deleteCartButton = document.getElementById('deleteCartButton');
  const cartId = deleteCartButton.parentElement.getAttribute('data-cart-id');

  deleteCartButton.addEventListener('click', function () {
    fetch(`/carts/${cartId}`, {
      method: 'DELETE',
    })
    localStorage.clear()
    location.reload()
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const buyCartButton = document.getElementById('buyCartButton');
  const cid = buyCartButton.parentElement.getAttribute('data-cart-id');

  if (buyCartButton) {
    buyCartButton.addEventListener('click', function () {
      fetch('/orders', {
        method: 'POST',
        body: JSON.stringify({ cid }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData && responseData.oid) {
            const oid = responseData.oid;
            window.location.href = `/orders/${oid}`;
          } else {
            console.error('No se pudo obtener el OID de la orden');
          }
        })
        .catch(error => {
          console.error('Error de red:', error);
        });
    });
  }
})