const { Router } = require('express');
const route = Router();
const { showAllProducts, addNewProduct, getByCategory, getCar, editCar, deleteCar, searchCarByName } = require('../Controllers/Products');

route
    .get('/all-produtc', showAllProducts)
    .post('/save-product', addNewProduct)
    .get('/get-by-category', getByCategory)
    .get('/get-by-car', getCar)
    .post('/edit-product', editCar)
    .delete('/delete-product', deleteCar)
    .get('/search/:name', searchCarByName)

module.exports = route;