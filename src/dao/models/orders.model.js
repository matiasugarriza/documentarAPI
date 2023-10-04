const mongoose = require('mongoose')

const collection = 'orders'
const schema = new mongoose.Schema({
    number: Number,
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    products: [],
    status: {
        type: String,
        enum: ['Pendiente de pago', 'Confirmado', 'En preparación', 'Listo para retirar', 'Despachado', 'Entregado'],
        default: 'Pendiente de pago'
    },
    totalPrice: Number
})

const ordersModel = mongoose.model(collection, schema);
module.exports = ordersModel;