const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

const generateProducts = () => {
    return {
        _id: new mongoose.Types.ObjectId(),
        title: faker.commerce.productName(),
        description: faker.lorem.paragraphs(2),
        price: faker.commerce.price()
    }
}

module.exports = generateProducts;
