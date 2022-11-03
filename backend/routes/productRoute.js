const express = require('express');
const { getAllProducts, createProduct } = require('../controllers/productController');

const router = express();

//route for the products
router.route('/products').get(getAllProducts);
router.route('/product/new').post(createProduct);

//exporting the router
module.exports = router