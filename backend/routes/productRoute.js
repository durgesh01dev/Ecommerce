const express = require('express');
const { getAllProducts } = require('../controllers/productController');

const router = express();

//route for the products
router.route('/products').get(getAllProducts);

//exporting the router
module.exports = router