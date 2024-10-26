import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
const app = express();
app.use(express.json());

app.post("/verify-recaptcha", async (req, res) => {
    const { token } = req.body;
    const secretKey = "6LdV9kUqAAAAAJt_FDdi8Ius5K94xRUSOwVzv30R"; // clé secrète reCAPTCHA

    const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${secretKey}&response=${token}`,
        }
    );
    const data = await response.json();

    if (data.success) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(5000, () => {
    console.log("Serveur backend démarré sur le port 5000");
});
