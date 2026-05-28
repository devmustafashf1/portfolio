import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "All fields required" });

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { username } });
};

export const forgotPassword = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Admin" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Your admin credentials",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;color:#111">
          <h2 style="margin-bottom:4px">Admin credentials</h2>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:8px 0;color:#888;width:120px">Username</td>
              <td style="padding:8px 0;font-weight:600">${process.env.ADMIN_USERNAME}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#888">Password</td>
              <td style="padding:8px 0;font-weight:600">${process.env.ADMIN_PASSWORD}</td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
          <p style="color:#888;font-size:13px">This email was sent from your portfolio server.</p>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Forgot password email error:", err);
    res.status(500).json({ message: "Failed to send email." });
  }
};
