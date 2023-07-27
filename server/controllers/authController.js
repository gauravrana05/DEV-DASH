/* IMPORT REQUIRED MODULES */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const jwtDecode = require("jwt-decode");
const random = require("random-string-generator");

/* REGISTER */
const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    const isExistingUser = await User.exists({ email });
    if (isExistingUser) {
      return res.status(409).json({ msg: "Email already registered" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      name: fullName,
      password: hashPassword,
      apps: [],
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return res.status(201).json({
      id: savedUser._id,
      name: savedUser.name,
      token,
      msg: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* LOGIN */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    return res.status(200).json({ id: user._id, name: user.name, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* GOOGLE LOGIN */

const googleLogin = async (req, res) => {
  try {
    const { credentials } = req.body;
    const { email, email_verified, name } = await jwtDecode(credentials);

    if (!email_verified)
      return res.status(501).json({ msg: "Emai not verified" });

    const user = await User.findOne({ email: email });

    if (!user) {
      const password = random((length = 16), (type = "alphanumeric"));
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        name,
        password: hashPassword,
        apps: [],
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });
      return res
        .status(200)
        .json({ msg: "user created succesfully", id: savedUser._id, token });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });
      return res.status(200).json({ id: user._id, token, name });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

/* RESET PASSWORD */
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    const user = await User.findOneAndUpdate(
      { email: email },
      { password: hashPassword },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }
    return res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { resetPassword, login, register, googleLogin };
