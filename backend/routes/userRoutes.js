const express = require("express");
const UserController = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { isResetTokenValid } = require("../middlewares/tokenMiddleware");

const router = express.Router();

router.route("/register").post(UserController.registerUser);
router.route("/verify-email").post(UserController.verifyEmail);
router.route("/forget-password").post(UserController.forgetPassword);
router
  .route("/reset-password")
  .post(isResetTokenValid, UserController.resetPassword);
router.route("/login").post(UserController.authUser);
router.route("/profile").put(protect, UserController.updateProfile);

router.route("/verify-token").get(isResetTokenValid, (req, res) => {
  res.json({ success: true });
});

module.exports = router;
