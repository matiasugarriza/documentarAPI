const ProductsModel = require('../models/products.model');
const generateProducts = require('../../utils/faker')
class Product {

    create(res, ProductsModel, data, url) {
        ProductsModel.create(data)
            .then(respuesta => {
                res.status(201).redirect(url)
                console.log(respuesta)
            }).catch(err => {
                console.log(err)
            })
    }
    getProducts = async (req, res) => {
        try {
            if (req.query.filter == undefined) {
                const options = {
                    limit: parseInt(req.query.limit),
                    page: parseInt(req.query.page),
                    lean: true,
                    sort: { price: (req.query.price), category: (req.query.category) }
                }
                let respuesta = await ProductsModel.paginate({}, options)
                return respuesta
            } else {
                const options = {
                    lean: true,
                    sort: { price: (req.query.price), category: (req.query.category) }
                }
                let respuesta = await ProductsModel.paginate({ title: { $regex: '.*' + req.query.filter + '.*', $options: 'i' } }, options)
                return respuesta
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    getProductById = async (pid) => {
        try {
            let respuesta = await ProductsModel.findById(pid).lean();
            return respuesta;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getMockingProducts = async () => {
        try {
            let products = [];
            let numProducts = 100;
            for (let index = 0; index < numProducts; index++) {
               products.push(generateProducts());
            }
            console.log(products)
            return products
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    /*     updateProducts = async (req, res) =>{
            if (req.params.id) {
                paramsId = req.params.id
                data = req.body
            } else {
                paramsId = req.params.cid
                data = req.params.pid
            }
        } */
    delete(res, ProductsModel, params) {
        ProductsModel.deleteOne({ _id: params })
            .then(respuesta => {
                res.status(201).send({ msg: 'Documento Eliminado con Éxito' })
                console.log(respuesta)
            }).catch(err => {
                console.log(err)
            })
    }
}
module.exports = Product