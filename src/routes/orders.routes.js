const { Router } = require('express');
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/orders.controller');
const router = new Router();

/* Admin */
router.get('/', getOrders); // Obtiene todas las órdenes

/* Users */
router.post('/', createOrder); // Crea una órden de compra
router.get('/:oid', getOrderById); // Obtiene órden de compra por id
router.put('/:oid', updateOrder); // Modifica órden de compra por id
router.delete('/:oid', deleteOrder); // Elimina órden de compra por id

module.exports = router;