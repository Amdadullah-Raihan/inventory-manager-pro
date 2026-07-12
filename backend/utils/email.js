const nodemailer = require("nodemailer");

function createTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.log(
      "[email] EMAIL_USER/EMAIL_PASS not set — OTPs logged to console only",
    );
    return null;
  }

  console.log(`[email] Creating transporter for ${user}`);
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

/**
 * Sends an OTP email. Falls back to console.log if email is not configured or fails.
 */
async function sendOTPEmail(email, code) {
  const transporter = createTransporter();

  if (!transporter) {
    console.log(`\n📧 [DEV] OTP for ${email}: ${code}\n`);
    return;
  }

  try {
    const info = await transporter.sendMail({
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
    console.log(`[email] OTP sent to ${email} (messageId: ${info.messageId})`);
  } catch (err) {
    console.error(`[email] FAILED to send to ${email}:`, err.message);
    // If Gmail blocked it, it might be a "sign-in attempt was blocked" issue
    if (err.message?.includes("Invalid login")) {
      console.error(
        "[email] → App Password may be wrong or have spaces. Remove all spaces.",
      );
    }
    console.log(`\n📧 [FALLBACK] OTP for ${email}: ${code}\n`);
  }
}

module.exports = { sendOTPEmail };
