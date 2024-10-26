// src/components/PromotionBanner.js
import React from "react";

const PromotionBanner = () => {
    return (
        <div style={styles.banner}>
            <p style={styles.text}>
                🎉 Promotion de 40% pour les 10 premiers clients ! Il reste
                seulement 7 places ! 🎉
            </p>
        </div>
    );
};

const styles = {
    banner: {
        backgroundColor: "#ffcc00", // Couleur de fond accrocheuse
        padding: "10px",
        textAlign: "center",
        fontSize: "14px",
        position: "fixed", // Position fixe pour toujours rester visible
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999, // Très haut z-index pour passer devant le header
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    text: {
        margin: 0,
        fontWeight: "bold",
        color: "#333",
    },
};

export default PromotionBanner;
