const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yourgmail@gmail.com",
        pass: "your_app_password"
      }
    });

    await transporter.sendMail({
      from: email,
      to: "yourgmail@gmail.com",
      subject: "New Client Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.send("Message sent successfully!");
  } catch (err) {
    console.log(err);
    res.send("Error sending message");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});