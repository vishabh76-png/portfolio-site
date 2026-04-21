const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'vishabh76@gmail.com', 
        pass: 'wqekzusqrqzjeswz' // Paste the code here (no spaces)
    }
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Sending email for: ${name}...`);

    const mailOptions = {
        from: 'vishabh76@gmail.com',
        to: 'vishabh76@gmail.com',
        subject: `Nexora Web Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error occurred:", error.message);
            return res.status(500).json({ status: "Error: " + error.message });
        }
        console.log("Email sent successfully!");
        res.json({ status: "Success! I'll get back to you soon." });
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));