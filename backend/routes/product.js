const express = require("express");

const router = express.Router();

// importing mathods from product controller
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProdcuctReview,
  getProductReviews,
  deleteProductReview,
} = require("../controllers/productController");

//middlewares to check authentication & authorization
const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth");

//user routes

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

//admin routes

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), newProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProdcuctReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;
