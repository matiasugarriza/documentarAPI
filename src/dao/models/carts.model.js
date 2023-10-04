const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business'
    },
    products: {
        type: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
                quantity: { type: Number, default: 0 },
                subtotal: { type: Number, default: 0 }
            }
        ],
        default: []
    },
    amount: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
});

const cartsModel = mongoose.model('carts', CartSchema);
module.exports = cartsModel;