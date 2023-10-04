const Business = require('../dao/classes/business.dao');
const businessService = new Business();
const getBusinesses = async (req, res) => {
    let result = await businessService.getBusinesses();
    if (!result) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    res.send({ status: 'success', result: result });
}
const getBusinessById = async (req, res) => {
    const { bid } = req.params;
    let result = await businessService.getBusinessById(bid);
    if (!result) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    res.send({ status: 'success', result: result });
}
const createBusiness = async (req, res) => {
    const business = req.body;
    let result = await businessService.createBusiness(business);
    if (!result) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    res.send({ status: 'success', result: result });
}
const addProduct = async (req, res) => {
    const { bid } = req.params;
    let product = req.body;
    let business = await businessService.getBusinessById(bid);
    business.products.push(product);
    await businessService.updateBusiness(bid, business);
    res.send({ status: 'success', result: 'Business actualizado!' });
}
const deleteProduct = async (req, res) => {
    const { bid } = req.params;
    let product = req.body.id;
    let business = await businessService.getBusinessById(bid);
    let index = business.indexof(product)
    business.products.slice(index,1);
    await businessService.updateBusiness(bid, business);
    res.send({ status: 'success', result: 'Business actualizado!' });
}
const deleteBusiness = async (req, res) => {
    const { bid } = req.params;
    await businessService.deleteBusiness(bid);
    res.send({ status: 'success', result: 'Business eliminado!' })
}

module.exports = {
    getBusinesses, getBusinessById, createBusiness, addProduct, deleteProduct, deleteBusiness
}