const nodemailer = require("nodemailer");
const createError = require("http-errors");

exports.getEmailTemplate = (email, subject, content) => {
  return {
    from: process.env.SMTP_SENDER,
    to: email,
    subject: subject,
    // text: `${subject} Otp for your account`,
    html: content,
  };
};

exports.nodeMailerCredentials = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
};

exports.sendMail = async (email, subject, content) => {
  console.log(content);
  try {
    const transporter = this.nodeMailerCredentials();
    const mailOptions = this.getEmailTemplate(email, subject, content);
    await transporter.sendMail(mailOptions);
  } catch (e) {
    throw createError(401, "Error in Sending mail, Please try later");
  }
};
exports.getForgetPasswordTemplate = (name, link) => {
  return `<p>Dear ${name},</p>
    <p>We have received a request to reset your password. If you did not initiate this request, please ignore this email.</p>
    <p>To reset your password, please click on the following link: <a href='${link}'>Reset Password</a></p>
    <p>The link will expire in 5 minutes, so please make sure to use it as soon as possible.</p>
    <p>If you have any issues or need further assistance, please contact our support team at <a href='mailto:contact@tutovia.com'>[Support Email]</a>.</p>
    <p>Thank you,</p>
    <p>Tutovia</p>`;
};
exports.getRegistrationTemplate = (name, link) => {
  return `<p>Dear ${name},</p>
    <p>Thank you for registering with us.</p>
    <p>To confirm your registration please click on the following link: <a href='${link}'>Confirm Registration</a></p>
    <p>The link will expire in 5 minutes, so please make sure to use it as soon as possible.</p>
    <p>If you have any issues or need further assistance, please contact our support team at  <a href='mailto:contact@tutovia.com'>[Support Email]</a>.</p>
    <p>Thank you,</p>
    <p>Tutovia</p>`;
};
