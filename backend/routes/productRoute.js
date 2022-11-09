const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
} = require("../controllers/productController");
const isAuthenticatedUser = require("../middlewares/auth");

const router = express();

//route for the products
router.route("/products").get(isAuthenticatedUser, getAllProducts);
router.route("/product/new").post(createProduct);
router
  .route("/product/:id")
  .get(getProductDetail)
  .put(updateProduct)
  .delete(deleteProduct);

//exporting the router
module.exports = router;
