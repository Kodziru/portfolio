import React, { useState } from "react";
import "../styles/services/common.css"; //
import "../styles/Styles.css"; //
import Vitrine from "../components/services/Vitrine.js"; // Importer la section "Vitrine"
import Ecommerce from "../components/services/Ecommerce.js"; // Importer la section "Ecommerce"
import Maintenance from "../components/services/Maintenance.js"; // Importer la section "Maintenance"
import Testimonials from "../components/reviews/Testimonials.js"; // Importer la section des avis
import TestimonialsColumn from "../components/reviews/ReviewList.js"; // Importer la nouvelle section TestimonialsColumn
import { motion, AnimatePresence } from "framer-motion";

// Définition des variantes d'animation pour chaque section
const sectionVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
};
const Services = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [showTestimonialsForm, setShowTestimonialsForm] = useState(false);

    // Fonction pour passer à l'étape suivante
    const handleNextStep = (serviceData) => {
        console.log("Service sélectionné:", serviceData);
    };

    // Activer la section sélectionnée
    const handleServiceClick = (service) => {
        setActiveSection(service);
    };

    // Afficher ou masquer le formulaire des avis
    const toggleTestimonialsForm = () => {
        setShowTestimonialsForm(!showTestimonialsForm);
    };

    return (
        <div className="services-container">
            {/* Section principale des services */}
            <section className="services-section glass-effect">
                <h2 className="services-title">Nos Services et Prestations</h2>
                <div className="cards-container">
                    {/* Card pour "Création de site vitrine" */}
                    <div
                        className={`service-card ${
                            activeSection === "vitrine" ? "active" : ""
                        }`}
                        onClick={() => handleServiceClick("vitrine")}
                    >
                        <h3>Création de site vitrine</h3>
                        <p>
                            Un site vitrine professionnel pour présenter votre
                            activité.
                        </p>
                    </div>

                    {/* Card pour "Création de site e-commerce" */}
                    <div
                        className={`service-card ${
                            activeSection === "ecommerce" ? "active" : ""
                        }`}
                        onClick={() => handleServiceClick("ecommerce")}
                    >
                        <h3>Création de site e-commerce</h3>
                        <p>
                            Votre boutique en ligne avec gestion des paiements
                            et produits.
                        </p>
                    </div>

                    {/* Card pour "Maintenance et support" */}
                    <div
                        className={`service-card ${
                            activeSection === "maintenance" ? "active" : ""
                        }`}
                        onClick={() => handleServiceClick("maintenance")}
                    >
                        <h3>Maintenance et support</h3>
                        <p>
                            Maintenance régulière de votre site avec mise à jour
                            et assistance.
                        </p>
                    </div>
                </div>

                {/* Section des services */}
                <div className="sections-container">
                    <AnimatePresence mode="wait">
                        {activeSection === "vitrine" && (
                            <motion.div
                                key="vitrine"
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={sectionVariants}
                                transition={{ duration: 0.5 }}
                            >
                                <Vitrine onNext={handleNextStep} />
                            </motion.div>
                        )}
                        {activeSection === "ecommerce" && (
                            <motion.div
                                key="ecommerce"
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={sectionVariants}
                                transition={{ duration: 0.5 }}
                            >
                                <Ecommerce onNext={handleNextStep} />
                            </motion.div>
                        )}
                        {activeSection === "maintenance" && (
                            <motion.div
                                key="maintenance"
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={sectionVariants}
                                transition={{ duration: 0.5 }}
                            >
                                <Maintenance onNext={handleNextStep} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Section des avis */}
            <section className="testimonials-section glass-effect">
                <div className="marquee-wrapper">
                    <div className="marquee">
                        <div className="marquee-content">
                            <Testimonials showForm={false} />
                        </div>
                    </div>
                </div>
                {showTestimonialsForm && (
                    <section className="testimonials-form-section glass-effect">
                        <Testimonials showForm={true} />
                    </section>
                )}
                <TestimonialsColumn />
                <button className="btn " onClick={toggleTestimonialsForm}>
                    Laissez votre avis
                </button>
            </section>

            {/* Affichage conditionnel du formulaire d'avis */}

            {/* Icônes animées */}
            <i className="fas fa-cog animated-icon"></i>
            <i
                className="fas fa-star animated-icon"
                style={{ top: "100px", left: "200px" }}
            ></i>
        </div>
    );
};

export default Services;
