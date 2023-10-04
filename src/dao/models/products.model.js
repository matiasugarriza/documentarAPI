const mongoosePaginate = require('mongoose-paginate-v2')
const mongoose = require('mongoose')


const productsModel = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    inCart: { type: Boolean, default: false },
})
productsModel.plugin(mongoosePaginate)
const ProductsModel = mongoose.model('products', productsModel)
module.exports = ProductsModel