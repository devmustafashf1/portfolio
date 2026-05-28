import nodemailer from 'nodemailer';

export const sendContactEmail = async (req, res) => {
  const { name, email, github, linkedin, subject, message } = req.body;

  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const subjectLabels = {
    fix: 'Fix a broken product',
    build: 'Build something new',
    retainer: 'Ongoing retainer',
    other: 'Other',
  };

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: 'devmustafashf@gmail.com',
    replyTo: email,
    subject: `[Portfolio] ${subjectLabels[subject] || subject || 'New message'} — from ${name || email}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111">
        <h2 style="margin-bottom:4px">New message from your portfolio</h2>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#888;width:100px">Name</td><td style="padding:6px 0">${name || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#888">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
          ${github ? `<tr><td style="padding:6px 0;color:#888">GitHub</td><td style="padding:6px 0">${github}</td></tr>` : ''}
          ${linkedin ? `<tr><td style="padding:6px 0;color:#888">LinkedIn</td><td style="padding:6px 0">${linkedin}</td></tr>` : ''}
          <tr><td style="padding:6px 0;color:#888">Subject</td><td style="padding:6px 0">${subjectLabels[subject] || subject || '—'}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <p style="white-space:pre-wrap;line-height:1.6">${message || '—'}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
};
