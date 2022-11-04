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


// Get one product details - 
exports.getProductDetail = async(req, res,next) => {
  const product = await Product.findById(req.params.id);
  //check if product does not exist
  if(!product){
    res.status(500).json({
      success: false,
      message: `Product with id ${req.params.id} is not found`
    });
  }
    //otherwise product with id exists
    res.status(200).json({
      success: true,
      product
    });
}

//function to update the product, only ADMIN can update Product details
exports.updateProduct = async (req, res) => {
  //using let so that same variable can updated
  let product = await Product.findById(req.params.id);
  //check if product with specified id is not found
  if (!product) {
    return res.status(500).json({
      success: false,
      message: `Product with id ${req.params.id} is not found`,
    });
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
};

//function to delete the product based on id - ADMIN
exports.deleteProduct = async(req, res) => {
  const product = await Product.findById(req.params.id);
  //check if product does not exist
  if(!product){
    return res.status(500).json({
      success: false,
      message: `Product with id ${req.params.id} is not found`,
    });
  }

  //otherwise product is found, now delete that product
  //works since product is still connected to the collection
  await product.remove();
  //return success now
  res.status(200).json({
    success: true, 
    message: `Product with id ${req.params.id } is deleted successfully`
  });
}
