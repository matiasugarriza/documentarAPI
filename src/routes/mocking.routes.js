const { Router } = require('express');
const { getMockingProducts } = require('../controllers/products.controller');
const router = new Router();

router.get('/', getMockingProducts);

module.exports = router