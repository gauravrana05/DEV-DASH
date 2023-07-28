/* IMPORT REQUIRED MODULES */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
const jwtDecode = require("jwt-decode");
const random = require("random-string-generator");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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
      verified: false,
      apps: [],
    });
    const savedUser = await newUser.save();

    const token = await new Token({
      userId: savedUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/auth/${savedUser._id}/verify/${token.token}`;
    await sendEmail(savedUser.email, "Verify Email", url);
    res.status(201).json({ msg: "Email Sent" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

/* VERIFY TOKEN */
const verifyToken = async (req, res) => {
  try {
    console.log("reached here");
    const { userId, token } = req.params;
    const user = await user.findOne({ _id: userId });
    console.log(user);
    if (!user) return res.status(400).json({ msg: "User Not found" });

    const isTokenValid = await Token.findOne({ userId, token });
    if (!isTokenValid) return res.status(400).json({ msg: "Invalid Link" });

    user.verified = true;
    await user.save();
    await isTokenValid.remove();

    const jwtToken = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return res.status(201).json({
      id: savedUser._id,
      name: savedUser.name,
      token: jwtToken,
      msg: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
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
    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: savedUser._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}/auth/${savedUser._id}/verify/${token.token}`;
        await sendEmail(savedUser.email, "Verify Email", url);
      }
      return res
        .status(400)
        .json({ msg: "An Email sent to your account, please verify" });
    }
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    return res
      .status(200)
      .json({ id: user._id, name: user.name, token: jwtToken });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
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
    return res.status(500).json({ msg: error.message });
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
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { resetPassword, login, register, googleLogin, verifyToken };
