const express = require("express");
const router = express.Router();
const {
  register,
  login,
  googleLogin,
  resetPasswordMail,
  verifyOtp,
  resetPassword,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/googleLogin", googleLogin);
router.post("/reset", resetPasswordMail);
router.post("/verifyotp", verifyOtp);
router.patch("/resetPassword", resetPassword);
// router.get("/:userId/verify/:token", verifyToken);

module.exports = router;
