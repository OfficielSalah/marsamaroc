const express = require("express");
const {
  registerUser,
  authUser,
  updateProfile,
  verifyEmail,
  forgetPassword,
  resetPassword,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { isResetTokenValid } = require("../middlewares/tokenMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/verify-email").post(verifyEmail);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password").post(isResetTokenValid, resetPassword);

router.route("/login").post(authUser);
router.route("/profile").put(protect, updateProfile);

router.route("/verify-token").get(isResetTokenValid, (req, res) => {
  res.json({ success: true });
});

module.exports = router;
