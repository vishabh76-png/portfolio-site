const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS  // Your 16-char App Password
    }
});

app.post('/contact', (req, res) => {
    // 1. Make sure 'phone' is included in this list:
    const { name, email, phone, message } = req.body; 

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Nexora Inquiry: ${name}`,
        // 2. Update the 'text' to include the phone number:
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: "Error" });
        }
        res.json({ status: "Success" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));