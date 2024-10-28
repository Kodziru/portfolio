const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Ajoute le middleware CORS
require("dotenv").config(); // Charger les variables d'environnement

const app = express();

// Middleware pour activer CORS
app.use(cors()); // Autoriser les requêtes entre différents domaines

// Middleware pour parser le JSON des requêtes
app.use(express.json());

// Configuration de Nodemailer avec Gmail et mot de passe d'application
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Ton email Gmail
        pass: process.env.EMAIL_PASS, // Le mot de passe d'application généré
    },
});

// Route POST pour recevoir les informations du formulaire et envoyer un email
app.post("/send-email", (req, res) => {
    const { name, email, message, serviceType } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER, // Ton email
        to: process.env.EMAIL_USER, // Où tu veux recevoir les emails
        subject: `Nouvelle demande de service: ${serviceType}`,
        text: `
        Détails de la demande :

        Nom : ${name}
        Email : ${email}
        Message : ${message}
        Service choisi : ${serviceType}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erreur lors de l'envoi de l'email :", error); // Log plus détaillé
            return res
                .status(500)
                .json({ message: "Erreur lors de l'envoi de l'email." });
        }
        console.log("Email envoyé avec succès :", info.response); // Log de succès
        res.status(200).json({ message: "Email envoyé avec succès." });
    });
});

// Démarrer le serveur backend sur le port 5000
app.listen(5000, () => {
    console.log("Serveur backend démarré sur le port 5000");
});
