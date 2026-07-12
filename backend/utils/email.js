const nodemailer = require("nodemailer");

const transporter =
  process.env.EMAIL_USER && process.env.EMAIL_PASS
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })
    : null;

/**
 * Sends an OTP email. In development (no EMAIL_USER/PASS), logs to console.
 */
async function sendOTPEmail(email, code) {
  if (transporter) {
    await transporter.sendMail({
      from: `"Invoice Maker" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Invoice Maker Registration",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
          <h2>Verify your email</h2>
          <p>Your one-time password is:</p>
          <h1 style="letter-spacing: 8px; font-size: 32px; color: #5A5FE0;">${code}</h1>
          <p>This code expires in 5 minutes.</p>
          <p style="color: #888;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });
  } else {
    console.log(`\n📧 [DEV] OTP for ${email}: ${code}\n`);
  }
}

module.exports = { sendOTPEmail };
