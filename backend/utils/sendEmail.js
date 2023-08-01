const nodemailer = require("nodemailer");

module.exports = async (email, subject, text, html = "") => {
  try {
    console.log(process.env.U, " Fuck you im the user");
    console.log(process.env.PASSWORD);
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
    console.log("email not sent");
    console.log(error);
  }
};
