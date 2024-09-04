// src/services/emailService.js
const nodemailer = require("nodemailer");

/**
 * 이메일을 발송하는 서비스 함수
 * @param {string} to - 수신자 이메일 주소
 * @param {string} subject - 이메일 제목
 * @param {string} text - 이메일 본문
 */
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
