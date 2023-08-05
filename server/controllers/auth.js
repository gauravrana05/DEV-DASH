const jwtDecode = require("jwt-decode");
const User = require("../models/User");
const otp = require("../models/OTP");
const bcrypt = require("bcrypt");
const random = require("random-string-generator");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { sendOtpmail } = require("../utils/utils");
const ExpiredError = require("../errors/expired-otp");
const UserExistsError = require("../errors/user-exists");

const register = async (req, res) => {
  const email = req.body.email;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    //throw new error of user already registered
    throw new UserExistsError("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  const user = await User.create({ ...req.body });
  await sendOtpmail(email, user._id, "register");
  res.status(201).json({ msg: "Email Sent" });
};

const login = async (req, res) => {
  const { email, password, remember } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  if (!user.verified) {
    throw new UnauthenticatedError("User not verified");
  }
  const token = user.createJWT(remember);
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

/* GOOGLE LOGIN */
const googleLogin = async (req, res) => {
  const { credentials } = req.body;

  const { email, name } = await jwtDecode(credentials);

  let user = await User.findOne({ email: email });

  if (!user) {
    const password = random((length = 16), (type = "alphanumeric"));
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user = await User.create({
      email,
      name,
      password: hashPassword,
      verified: true,
    });
  } else if (!user.verified) {
    user.verified = true;
    await user.save();
  }

  const token = user.createJWT();
  return res.status(200).json({ user: { name: user.name }, token });
};

/* VERIFY EMAIL AND SEND OTP */
const resetPasswordMail = async (req, res) => {
  const { email, type } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  await sendOtpmail(
    email,
    user._id,
    type === "password" ? "resetPassword" : "register"
  );
  res.status(201).json({ msg: "Email Sent" });
};

/* VERIFY OTP */
const verifyOtp = async (req, res) => {
  const { OTP, email, type } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const verifyUserOtp = await otp.findOne({ otp: OTP, userId: user._id });
  if (!verifyUserOtp) {
    throw new UnauthenticatedError("Invalid OTP");
  }
  const currentTime = new Date();
  const createdAtTime = new Date(verifyUserOtp.createdAt);
  const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60 * 1000);
  if (createdAtTime < fiveMinutesAgo) {
    await otp.deleteOne({ _id: verifyUserOtp._id });
    throw new ExpiredError("OTP Expired");
  }
  if (type === "register") {
    user.verified = true;
    await user.save();
  }
  await otp.findOneAndDelete({ userId: user._id });

  res.status(201).json({ msg: "User Verified" });
};

/* RESET PASSWORD */
const resetPassword = async (req, res) => {
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
    throw new UnauthenticatedError("Invalid Credentials");
  }
  return res.status(200).json({ msg: "Password updated successfully" });
};

module.exports = {
  register,
  login,
  googleLogin,
  verifyOtp,
  resetPassword,
  resetPasswordMail,
};
