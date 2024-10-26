// PlanetLoader.js
import React from "react";
import "./styles/Loader.css"; // Assurez-vous que ce fichier contient les styles nécessaires

const PlanetLoader = () => {
    return (
        <div className="loader-body-404">
            <div className="loader-content">
                <div className="loader-planet">
                    <div className="loader-ring"></div>
                    <div className="loader-cover-ring"></div>
                    <div className="loader-spots">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanetLoader;
