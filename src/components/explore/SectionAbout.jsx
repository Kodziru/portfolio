import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importer pour accéder à la route actuelle
import { motion } from "framer-motion";
import "../../styles/mainPage/Explore.css";
import imageSrc from "../../assets/image1.jpg";

const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.6 } },
};

const ExploreContainer = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Applique height: 100vh si l'utilisateur est sur la route /explore
    const containerStyle = location.pathname === "/explore" ? {} : {};

    return (
        <motion.div
            className="explore-container flex flex-col md:flex-row items-center justify-between p-6 space-y-6 md:space-y-0 transition-height"
            style={containerStyle} // Appliquer le style en ligne
            initial={isDesktop ? "hidden" : "visible"}
            animate={isDesktop ? "visible" : "visible"}
            viewport={{ once: true, amount: 0.5 }}
        >
            <motion.div
                className="explore-text flex-1 md:mr-10"
                variants={isDesktop ? fadeUpVariants : {}}
            >
                <motion.h3
                    className="explore-title text-3xl md:text-4xl font-bold mb-4"
                    variants={isDesktop ? fadeUpVariants : {}}
                >
                    Développeur Web Full Stack
                </motion.h3>
                <motion.p
                    className="explore-description text-lg md:text-xl leading-relaxed"
                    variants={isDesktop ? fadeUpVariants : {}}
                >
                    Bonjour! <br /> Je suis un développeur full-stack
                    extrêmement passionné par le développement d'applications
                    web modernes, allant de la conception de l'interface
                    utilisateur en HTML et CSS à la gestion des données côté
                    serveur. Chaque nouvelle technologie et défi que je découvre
                    à travers mes recherches personnelles me pousse à créer des
                    solutions innovantes, rendant chaque projet unique et
                    puissant.
                </motion.p>
            </motion.div>
            <motion.div
                className="explore-image-container flex-1 md:w-1/2"
                variants={isDesktop ? fadeUpVariants : {}}
            >
                <motion.img
                    src={imageSrc}
                    alt="Portfolio image"
                    className="img-profile object-cover w-full h-auto rounded-lg shadow-lg"
                    loading="lazy"
                    width="600"
                    height="400"
                    variants={isDesktop ? fadeUpVariants : {}}
                />
            </motion.div>
        </motion.div>
    );
};

export default ExploreContainer;
