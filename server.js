import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
}));
app.use(express.json());

// Transporter setup with Gmail SMTP and Gmail App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'uditpatidar009@gmail.com',
    pass: 'jqgjebfbhckduutv', // Your 16-character Google App Password (without spaces)
  },
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  const mailOptions = {
    from: 'uditpatidar009@gmail.com',
    to: 'uditpatidar009@gmail.com', // Sends the message directly to your own inbox
    subject: `Portfolio Message from ${name}`,
    text: `You received a message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    replyTo: email // Allows you to reply directly to the sender
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Mailer backend server running on http://localhost:${PORT}`);
});
