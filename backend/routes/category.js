const express = require("express");
const router = express.Router();

const {
  newCategroy,
  getCategories,
  getSingleCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth");

//user routes
router.route("/categories").get(getCategories);
router.route("/category/:id").get(getSingleCategory);

//admin routes

router
  .route("/admin/category/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), newCategroy);
router
  .route("/admin/category/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteCategory);

module.exports = router;
