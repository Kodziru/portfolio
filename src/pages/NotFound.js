// src/pages/NotFound.js
import React from "react";
import { useNavigate } from "react-router-dom";
import PlanetLoader from "../PlanetLoader"; // Importez PlanetLoader

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <PlanetLoader /> {/* Intégration de PlanetLoader */}
            <h1 style={styles.title}>404 - Page Non Trouvée</h1>
            <p style={styles.message}>
                Désolé, la page que vous recherchez n'existe pas.
            </p>
            <button style={styles.button} onClick={() => navigate("/")}>
                Retour à l'accueil
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        color: "#f5f5f5",
        backgroundColor: "#180161", // Couleur d'arrière-plan personnalisée
    },
    title: {
        fontSize: "2rem",
        margin: "1rem 0",
    },
    message: {
        fontSize: "1.2rem",
        marginBottom: "1.5rem",
    },
    button: {
        padding: "0.5rem 1rem",
        backgroundColor: "#4f1787", // Couleur primaire pour le bouton
        color: "#ffffff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1rem",
        transition: "background-color 0.3s ease",
    },
};

export default NotFound;
