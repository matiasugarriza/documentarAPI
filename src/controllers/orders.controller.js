const Order = require('../dao/classes/orders.dao');
const Cart = require('../dao/classes/carts.dao')
const orderService = new Order();
const cartService = new Cart();
const getOrders = async (req, res) => {
    let result = await orderService.getOrders();
    if (!result) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    res.send({ status: 'success', result: result });
}
const getOrderById = async (req, res) => {
    const { oid } = req.params;
    let order = await orderService.getOrderById(oid);
    if (!order) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    res.status(201).render('order', { order });
}
const createOrder = async (req, res) => {
    const { cid } = req.body;
    let cart = await cartService.getCartById(cid)
    let order = await orderService.createOrder(cart)
    if (!order) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });

    res.status(201).send({ oid: order });
}

const updateOrder = async (req, res) => {
    let { oid, status } = req.query;
    let result = await orderService.updateStatusOfOrder(oid, status);
    res.send({ status: 'success' });
};


const deleteOrder = async (req, res) => {
    const { oid } = req.params;
    await orderService.deleteOrder(oid);
    res.send({ status: 'success', result: 'Orden de Compra eliminada!' })
}
module.exports = {
    getOrders, getOrderById, createOrder, updateOrder, deleteOrder
}