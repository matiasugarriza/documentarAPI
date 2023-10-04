const { Router } = require('express');
const { getCarts, updateCart, getCartById, createCart, addProduct, deleteProduct, deleteCart } = require('../controllers/carts.controller');
const router = new Router();

/* Admin */
router.get('/', getCarts); // Obtiene todos los carts

/* Users */
//Gestión del cart
router.post('/', createCart); // Crea un nuevo cart
router.put('/', updateCart); 
router.get('/:cid', getCartById); // Obtiene un cart por id
router.delete('/:cid', deleteCart); // Elimina o vacía un cart por id
//Productos en cart
//router.put('/:cid/product/:pid', updateCart); // Agrega producto del cart
router.put('/:cid/product/:pid', addProduct); // Modifica cantidad de un producto del cart
router.put('/:cid/product/:pid', deleteProduct); // Elimina producto del cart

module.exports = router;