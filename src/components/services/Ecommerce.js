import React, { useState, useRef, useEffect } from "react";
import { SiWordpress, SiVisualstudiocode } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "../ContactForm.jsx";
import ecommerceData from "./ecommerceData.json"; // Import des données JSON

const Ecoommerce = ({
    categories = [
        { name: "CMS", icon: <SiWordpress size={36} /> },
        { name: "Custom", icon: <SiVisualstudiocode size={36} /> },
    ],
    serviceType = "Service",
    submitUrl = "http://localhost:5000/send-email-service",
    successMessage = "Votre message a été envoyé avec succès !",
    errorMessage = "Erreur lors de l'envoi du message.",
}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [importantOptions, setImportantOptions] = useState([]); // Options importantes non désactivables
    const [category, setCategory] = useState(null);
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const formRef = useRef(null);

    useEffect(() => {
        if (step === 2 && formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [step]);

    // Définir automatiquement les options importantes lorsqu'une catégorie est sélectionnée
    useEffect(() => {
        if (category) {
            const optionsForCategory =
                category === "CMS"
                    ? ecommerceData.cmsOptions
                    : ecommerceData.customDevelopmentOptions;

            const important = optionsForCategory
                .filter((option) => option.important)
                .map((option) => option.name);

            setSelectedOptions(important); // Cocher les options importantes par défaut
            setImportantOptions(important); // Enregistrer les options importantes pour éviter la désélection
        }
    }, [category]);

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const handleOptionChange = (optionName) => {
        // Empêcher la désélection des options importantes
        if (importantOptions.includes(optionName)) return;

        setSelectedOptions((prevSelected) =>
            prevSelected.includes(optionName)
                ? prevSelected.filter((option) => option !== optionName)
                : [...prevSelected, optionName]
        );
    };

    const handleNext = () => {
        if (selectedOptions.length > 0) {
            setError(""); // Réinitialiser le message d'erreur
            setStep(2);
        } else {
            setError("Veuillez sélectionner au moins une option.");
        }
    };

    const handleBack = () => {
        setStep(1);
        setCategory(null);
        setSelectedOptions([]);
        setImportantOptions([]); // Réinitialiser les options importantes
    };

    const fadeSlideVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 },
    };

    const options =
        category === "CMS"
            ? ecommerceData.cmsOptions
            : ecommerceData.customDevelopmentOptions;

    return (
        <div className="section-content">
            {step === 1 && (
                <>
                    <h3>
                        Création de {serviceType} - Choisissez une catégorie
                    </h3>
                    <AnimatePresence mode="wait">
                        {!category ? (
                            <motion.div
                                key="category-selection"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={fadeSlideVariants}
                                transition={{ duration: 0.5 }}
                                className="category-selection"
                            >
                                {categories.map((cat) => (
                                    <button
                                        key={cat.name}
                                        className="category-btn"
                                        onClick={() =>
                                            handleCategorySelect(cat.name)
                                        }
                                    >
                                        {cat.icon} {cat.name}
                                    </button>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="category-options"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={fadeSlideVariants}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="table-responsive">
                                    <table className="table services-table">
                                        <thead>
                                            <tr>
                                                <th>Option</th>
                                                <th>Coût estimé</th>
                                                <th>Sélection</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {options.map((option, idx) => (
                                                <tr
                                                    key={idx}
                                                    onClick={() =>
                                                        handleOptionChange(
                                                            option.name
                                                        )
                                                    }
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <td data-label="Option">
                                                        {option.name}
                                                    </td>
                                                    <td data-label="Coût estimé">
                                                        {option.cost}
                                                    </td>
                                                    <td data-label="Sélection">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-checkbox"
                                                            value={option.name}
                                                            checked={selectedOptions.includes(
                                                                option.name
                                                            )}
                                                            onChange={() =>
                                                                handleOptionChange(
                                                                    option.name
                                                                )
                                                            }
                                                            aria-label={`Sélectionner ${option.name} pour un coût de ${option.cost}`}
                                                            disabled={importantOptions.includes(
                                                                option.name
                                                            )}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {error && (
                                    <p
                                        className="error-message"
                                        role="alert"
                                        aria-live="assertive"
                                    >
                                        {error}
                                    </p>
                                )}
                                <button
                                    className="btn btn-back"
                                    onClick={handleBack}
                                >
                                    Retour
                                </button>
                                <button
                                    className="btn btn-next"
                                    onClick={handleNext}
                                >
                                    Suivant
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
            {step === 2 && (
                <div ref={formRef}>
                    <ContactForm
                        selectedOptions={selectedOptions}
                        serviceType={serviceType}
                        options={options}
                        submitUrl={submitUrl}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                    />
                    <button className="btn btn-back" onClick={handleBack}>
                        Retour
                    </button>
                </div>
            )}
        </div>
    );
};

export default Ecoommerce;
