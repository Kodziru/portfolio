const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer();

app.use(cors()); // Allow cross-origin requests
app.use(express.json());

// Endpoint to handle email sending
app.post("/send-email", upload.single("file"), async (req, res) => {
    const { fullName, email, subject, message, contactPreference } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "kodzirun@gmail.com",
            pass: "kodzirun@gmail.com",
        },
    });

    const mailOptions = {
        from: email,
        to: "kodzirun@gmail.com",
        subject: `Contact Form: ${subject}`,
        text: `Nom: ${fullName}\nEmail: ${email}\nPréférence de contact: ${contactPreference}\nMessage: ${message}`,
        attachments: req.file
            ? [
                  {
                      filename: req.file.originalname,
                      content: req.file.buffer,
                  },
              ]
            : [],
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
