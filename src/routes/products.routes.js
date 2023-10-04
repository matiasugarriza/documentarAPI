const { Router } = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/products.controller');
const router = new Router();

/* Admin */
router.post('/', createProduct); // Crea producto
router.delete('/:pid', deleteProduct); // Elimina producto por id
//router.put('/:bid', updateProduct); // Actualiza producto por id

/* Users */
router.get('/', getProducts); // Obtiene todos los productos
router.get('/:pid', getProductById); // Obtiene producto por id

module.exports = router