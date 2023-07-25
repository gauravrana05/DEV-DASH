/* IMPORT REQUIRED MODULES */
const express = require("express");
const {
  login,
  register,
  resetPassword,
  googleLogin,
} = require("../controllers/authController");

const router = express.Router();

/* CREATING REQUIRED ROUTES */
router.post("/login", login);
router.post("/register", register);
router.post("/googleLogin", googleLogin);
router.patch("/resetPassword", resetPassword);

module.exports = router;
