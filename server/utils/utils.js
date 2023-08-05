const otp = require("../models/OTP");
const htmlBody = require("./resetPasswordhtml");
const sendEmail = require("./sendEmail");
const random = require("random-string-generator");

const sendOtpmail = async (email, id, typeOfMail) => {
  try {
    const subject =
      typeOfMail === "register"
        ? "Verification of email OTP"
        : "Reset Password OTP";
    const OTP = random((length = 4), (type = "numeric"));
    await otp.create({ userId: id, otp: OTP, type: typeOfMail });
    const html = htmlBody(OTP);
    await sendEmail(email, subject, "", html);
  } catch (error) {}
};

module.exports = { sendOtpmail };
