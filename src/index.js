import React from "react";
import ReactDOM from "react-dom/client"; // Import depuis react-dom/client pour React 18
import "./styles/Styles.css";
import App from "./App.js"; // Ajout de l'extension .js

if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {});
    ro.observe(document.body);
}

// Utilisation de createRoot pour le rendu de l'application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
