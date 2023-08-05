const nodemailer = require("nodemailer");

module.exports = async (email, subject, text, html = "") => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: process.env.EMAIL_PORT,
      secure: process.env.SECURE,
      auth: {
        user: process.env.U,
        pass: process.env.PASSWORD,
      },
    });
    const mail = await transporter.sendMail({
      from: process.env.U,
      to: email,
      subject: subject,
      text: text,
      html,
    });
  } catch (error) {
    // add email not sent internal server 500 error
  }
};
