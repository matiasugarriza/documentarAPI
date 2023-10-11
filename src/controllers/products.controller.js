const Product = require('../dao/classes/products.dao');
const productService = new Product();
const getProducts = async (req, res) => {
    let respuesta = await productService.getProducts(req);
    if (!respuesta) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    const resp = {
        props: respuesta,
        docs: respuesta.docs,
        req
    }
    console.log(resp)
    res.status(201).render('index', resp)
}
const getProductById = async (req, res) => {
    const { pid } = req.params;
    let respuesta = await productService.getProductById(pid);
    if (!respuesta) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    let product = {
        id: respuesta._id.toString,
        title: respuesta.title,
        description:respuesta.description,
        price:respuesta.price
    }
    res.status(201).render('index', product);
}

const getMockingProducts = async (req, res) => {
    let respuesta = await productService.getMockingProducts();
    console.log(respuesta)
    if (!respuesta) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    const resp = {
        docs: respuesta
    }
    res.status(201).render('index', resp)
}
const createProduct = async (req, res) => {
    const product = req.body;
    let result = await productService.createProduct(product);
    if (!result) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    res.send({ status: 'success', result: result });
}

/* const updateProduct = async (req, res) =>{
    const product = req.body;
    let result = await productService.createProduct(product);
    if(!result) return res.status(500).send({status:"error",error:'Algo salió mal, vuelva a intentarlo más tarde'});
    res.send({status:'success', result:result});
} */

const deleteProduct = async (req, res) => {
    const { oid } = req.params;
    await productService.deleteProduct(oid);
    res.send({ status: 'success', result: 'Orden de Compra eliminada!' })
}
module.exports = {
    getProducts, getProductById, createProduct, deleteProduct, getMockingProducts 
}