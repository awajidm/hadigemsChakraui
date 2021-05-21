const express = require("express");

const router = express.Router();

//imports mathods from auth controller

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getCurrentUser);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//admin Routes
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRole("admin"), allUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizeRole("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteUser);

module.exports = router;
