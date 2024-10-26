const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Afficher les identifiants pour vérifier qu'ils sont bien chargés
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
    "EMAIL_PASS:",
    process.env.EMAIL_PASS ? "Mot de passe chargé" : "Mot de passe manquant"
);

// Configurer CORS pour autoriser les requêtes de votre frontend
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Configuration de multer pour les fichiers joints
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configurer le transporteur Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Route POST pour l'envoi du formulaire de contact général
app.post("/send-email-contact", upload.single("file"), (req, res) => {
    const { fullName, email, subject, message, contactPreference } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Nouvelle demande de contact: ${subject}`,
        text: `Nom complet : ${fullName}\nEmail : ${email}\nMessage : ${message}\nPréférence de contact : ${contactPreference}`,
    };

    if (req.file) {
        mailOptions.attachments = [
            {
                filename: req.file.originalname,
                content: req.file.buffer,
                contentType: req.file.mimetype,
            },
        ];
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
            return res
                .status(500)
                .json({ message: "Erreur lors de l'envoi de l'e-mail." });
        } else {
            console.log("E-mail envoyé avec succès :", info.response);
            return res
                .status(200)
                .json({ message: "E-mail envoyé avec succès." });
        }
    });
});

// Route POST pour l'envoi du formulaire de service spécifique
app.post("/send-email-service", (req, res) => {
    const { name, email, message, serviceType, selectedOptions, priceRange } =
        req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Nouvelle demande de service: ${serviceType}`,
        text: `
            Nom : ${name}
            Email : ${email}
            Message : ${message}
            Type de service : ${serviceType}
            Options sélectionnées : ${selectedOptions.join(", ")}
            Estimation de prix : ${priceRange} €`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
            return res
                .status(500)
                .json({ message: "Erreur lors de l'envoi de l'e-mail." });
        } else {
            console.log("E-mail envoyé avec succès :", info.response);
            return res
                .status(200)
                .json({ message: "E-mail envoyé avec succès." });
        }
    });
});

// Démarrer le serveur
app.listen(5000, () => {
    console.log("Serveur backend démarré sur le port 5000");
});
