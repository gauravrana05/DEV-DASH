const jwtDecode = require("jwt-decode");
const User = require("../models/User");
const otp = require("../models/OTP");
const bcrypt = require("bcrypt");
const random = require("random-string-generator");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { sendOtpmail } = require("../utils/utils");

const register = async (req, res) => {
  const email = req.body.email;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    //throw new error of user already registered
    return res.status(400).json({ msg: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  const user = await User.create({ ...req.body });
  await sendOtpmail(email, user._id, "register");
  res.status(201).json({ msg: "Email Sent" });
  // const token = user.createJWT();
  // res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  if (!user.verified) {
    // throw new user not verified error
    res.status(400).json({ msg: "User not verified" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
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
    user = await User.create({ email, name, password: hashPassword });
  }

  const token = user.createJWT();
  console.log({ user: { name: user.name }, token });
  return res.status(200).json({ user: { name: user.name }, token });
};

/* VERIFY EMAIL AND SEND OTP */
const resetPasswordMail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  console.log("reached here");
  await sendOtpmail(email, user._id, "resetPassword");
  console.log("mail sent");
  res.status(201).json({ msg: "Email Sent" });
};

/* VERIFY OTP */
const verifyOtp = async (req, res) => {
  const { OTP, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const verifyUserOtp = await otp.findOne({ otp: OTP, userId: user._id });
  if (!verifyUserOtp) {
    // make new error for invalid otp
    return res.status(400).json({ msg: "Invalid OTP." });
  }
  const currentTime = new Date();
  const createdAtTime = new Date(verifyUserOtp.createdAt);
  const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60 * 1000);
  if (createdAtTime < fiveMinutesAgo) {
    await otp.deleteOne({ _id: verifyUserOtp._id });
    return res.status(400).json({ msg: "OTP expired" });
  }
  if (verifyUserOtp.type === "register") {
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
