const jwtDecode = require("jwt-decode");
const User = require("../models/User");
const otp = require("../models/OTP");
const bcrypt = require("bcrypt");
const random = require("random-string-generator");
const htmlBody = require("../utils/resetPasswordhtml");
const sendEmail = require("../utils/sendEmail");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
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

  const tatoo = await jwtDecode(credentials);
  console.log(tatoo);
  const { email, name } = tatoo;

  let user = await User.findOne({ email: email });

  if (!user) {
    const password = random((length = 16), (type = "alphanumeric"));
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user = await User.create({ email, name, password });
  }

  const token = user.createJWT();
  console.log({ user: { name: user.name }, token });
  return res.status(200).json({ user: { name: user.name }, token });
};

/* VERIFY EMAIL AND SEND OTP */
const resetMail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const OTP = random((length = 4), (type = "numeric"));
  await otp.create({ userId: user._id, otp: OTP });
  const html = htmlBody(OTP);
  await sendEmail(email, "Reset Password OTP", "", html);
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
    // make new eeror for invalid otp
    // return res.status(400).json({ msg: "Invalid OTP." });
  }
  const currentTime = new Date();
  const createdAtTime = new Date(verifyUserOtp.createdAt);
  const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60 * 1000);
  if (createdAtTime < fiveMinutesAgo) {
    await otp.deleteOne({ _id: verifyUserOtp._id });
    return res.status(400).json({ msg: "OTP expired" });
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
  resetMail,
};
