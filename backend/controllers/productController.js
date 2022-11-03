const Product = require("../models/productModel");

//creating the product, only ADMINS can create it
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  //on successfully creating product 201 status given
  res.status(201).json({
    success: true,
    product,
  });
};

//function to get all the products stored in database
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};
