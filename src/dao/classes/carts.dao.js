const cartsModel = require('../models/carts.model');
const productsModel = require('../models/products.model');

class Cart {
    getCarts = async () => {
        try {
            let result = await cartsModel.find()
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    getCartById = async (id) => {
        try {
            const result = await cartsModel.findOne({ _id: id }).populate('products.product').lean();
            const productsPromises = result.products.map((element) => ({
                id: element._id,
                price: element.product.price,
                title: element.product.title,
                quantity: element.quantity,
                subtotal: element.subtotal
            }));

            const products = await Promise.all(productsPromises);

            const cart = {
                products,
                amount: result.amount,
                total: result.total
            };
            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    createCart = async (cart) => {
        try {
            let result = await cartsModel.create(cart)
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    updateCart = async (cartId, cart) => {
        try {
            const { products, amount } = cart;

            const productsCartData = await Promise.all(products.map(async (element) => {
                const product = await productsModel.findById(element.id);
                return {
                    product: product,
                    quantity: element.quantity,
                    subtotal: product.price * element.quantity,
                };
            }));

            const total = productsCartData.reduce((acc, product) => acc + product.subtotal, 0);

            const updateData = {
                $set: {
                    products: productsCartData,
                    amount: amount,
                    total: total,
                },
            };
            await cartsModel.updateOne({ _id: cartId }, updateData);
            return productsCartData;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    deleteCart = async (id, cart) => {
        try {
            let result = await cartsModel.updateOne({ _id: id }, cart);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
module.exports = Cart