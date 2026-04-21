const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // In a real app, you'd use Nodemailer to send an email here
    console.log(`New Inquiry from ${name} (${email}): ${message}`);
    
    res.json({ status: "Success! I'll get back to you soon." });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});