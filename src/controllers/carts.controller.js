const Cart = require('../dao/classes/carts.dao');
const jwt = require('jsonwebtoken')
const cartService = new Cart();

const getCarts = async (req, res) => {
    let result = await cartService.getCarts();
    if (!result) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    res.send({ status: 'success', result: result });
}
const updateCart = async (req, res) => {
    try {
        let cid = req.user.cart;
        let cart = req.body;
        await cartService.updateCart(cid, cart)
    } catch (err) {
        return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    }
}
const getCartById = async (req, res) => {
    const { cid } = req.params;
    let result = await cartService.getCartById(cid);
    if (result.products.length === 0) {
        let carritoVacio = {
            message: "Tu carrito está vacío, vamos llenarlo."
        }
        res.status(201).render('cart', { carritoVacio })
    } else {
        let { products, amount, total } = result
        res.status(201).render('cart', { cid, products, amount, total })
    }
};
const createCart = async (req, res) => {
    const cart = req.body;
    let result = await cartService.createCart(cart);
    if (!result) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    res.send({ status: 'success', result: result });
}
const addProduct = async (req, res) => {
    const { cid } = req.params;
    let product = req.body;
    let cart = await cartService.getCartById(cid);
    cart.products.push(product);
    await cartService.updateCart(cid, cart);
    res.send({ status: 'success', result: 'Carrito actualizado!' });
}
const deleteProduct = async (req, res) => {
    const { cid } = req.params;
    let product = req.body.id;
    let cart = await cartService.getCartById(cid);
    let index = cart.indexof(product)
    cart.products.slice(index, 1);
    await cartService.updateCart(cid, cart);
    res.send({ status: 'success', result: 'Producto Eliminado del Carrito!' });
}
const deleteCart = async (req, res) => {
    const { cid } = req.params;
    let cart = {
        $set: {
            products: [],
            amount: 0,
            total: 0
        }
    }
    let carritoVacio = {
        message: "Tu carrito está vacío, vamos llenarlo."
    }
    let result = await cartService.deleteCart(cid, cart);
    if (result){
        await res.status(201).render('cart', { carritoVacio })
    }
    

}
module.exports = {
    getCarts, updateCart, getCartById, createCart, addProduct, deleteProduct, deleteCart
}