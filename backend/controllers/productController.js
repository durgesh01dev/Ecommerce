const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const AsyncErrorHandler = require("../middlewares/AsyncErrorHandler");
const ApiFeatures = require('../utils/apiFeatures');


//creating the product, only ADMINS can create it
exports.createProduct = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  //on successfully creating product 201 status given
  res.status(201).json({
    success: true,
    product,
  });
});

//function to get all the products stored in database
exports.getAllProducts = AsyncErrorHandler(async (req, res) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();
  const products = await apiFeature.query;
  
  res.status(200).json({
    success: true,
    products,
  });
});

// Get one product details -
exports.getProductDetail = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  //check if product does not exist
  if (!product) {
    //concise way to handle product not found issue with ErrorHandler class as the middleware
    return next(
      new ErrorHandler(`Product with id ${req.params.id} is not found`, 404)
      // return next( new ErrorHandler(`Product not found`, 404)
    );
  }
  //otherwise product with id exists
  res.status(200).json({
    success: true,
    product,
  });
});

//function to update the product, only ADMIN can update Product details
exports.updateProduct = AsyncErrorHandler(async (req, res, next) => {
  //using let so that same variable can updated
  let product = await Product.findById(req.params.id);
  //check if product with specified id is not found
  if (!product) {
    return next(
      new ErrorHandler(`Product with id ${req.params.id} is not found`, 404)
    );
  }
  //product with id is found
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//function to delete the product based on id - ADMIN
exports.deleteProduct = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  //check if product does not exist
  if (!product) {
    return next(
      new ErrorHandler(`Product with id ${req.params.id} is not found`, 404)
    );
  }

  //otherwise product is found, now delete that product
  //works since product is still connected to the collection
  await product.remove();
  //return success now
  res.status(200).json({
    success: true,
    message: `Product with id ${req.params.id} is deleted successfully`,
  });
});
