import React from "react";
import "../../styles/mainPage/Explore.css"; // Styles séparés pour les animations
import imageSrc from "../../assets/image1.jpg"; // Renommé image1 en imageSrc

const ExploreContainer = () => {
    return (
        <div className="explore-container flex flex-col md:flex-row items-center justify-between p-6 space-y-6 md:space-y-0 transition-height">
            <div className="explore-text flex-1 md:mr-10">
                <h3 className="explore-title fade-in-up text-3xl md:text-4xl font-bold mb-4">
                    Développeur Web Full Stack
                </h3>
                <p
                    className="explore-description fade-in-up text-lg md:text-xl leading-relaxed"
                    style={{ animationDelay: "0.5s" }}
                >
                    Bonjour! <br /> Je suis un développeur full-stack
                    extrêmement passionné par le développement d'applications
                    web modernes, allant de la conception de l'interface
                    utilisateur en HTML et CSS à la gestion des données côté
                    serveur. Chaque nouvelle technologie et défi que je découvre
                    à travers mes recherches personnelles me pousse à créer des
                    solutions innovantes, rendant chaque projet unique et
                    puissant.
                </p>
            </div>
            <div className="explore-image-container flex-1 md:w-1/2">
                <img
                    src={imageSrc}
                    alt="Portfolio image"
                    className="img-profile fade-in-up object-cover w-full h-auto rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default ExploreContainer;
