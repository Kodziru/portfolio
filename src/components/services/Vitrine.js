import React, { useState, useEffect } from "react";
import { SiWordpress, SiVisualstudiocode } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "../ContactForm"; // Importer le formulaire dynamique
import vitrineData from "./vitrineData.json"; // Import des données JSON

const Vitrine = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [importantOptions, setImportantOptions] = useState([]); // Options importantes non désactivables
    const [category, setCategory] = useState(null); // Gérer la catégorie sélectionnée
    const [step, setStep] = useState(1); // Gérer les étapes
    const [error, setError] = useState("");

    const categories = [
        { name: "CMS", icon: <SiWordpress size={36} /> },
        { name: "Custom", icon: <SiVisualstudiocode size={36} /> },
    ];

    // Filtrer les options par catégorie en fonction de la sélection de l'utilisateur
    const options =
        category === "CMS"
            ? vitrineData.cmsOptions
            : vitrineData.customDevelopmentOptions;

    // Initialiser les options importantes lorsque la catégorie est sélectionnée
    useEffect(() => {
        if (category) {
            const important = options
                .filter((option) => option.important)
                .map((option) => option.name);

            setSelectedOptions(important); // Cocher les options importantes par défaut
            setImportantOptions(important); // Enregistrer les options importantes pour éviter la désélection
        }
    }, [category, options]);

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setSelectedOptions([]);
        setImportantOptions([]);
        setError("");
    };

    // Gestion de la sélection d'options
    const handleOptionChange = (optionName) => {
        if (importantOptions.includes(optionName)) return;

        setSelectedOptions((prevSelected) =>
            prevSelected.includes(optionName)
                ? prevSelected.filter((option) => option !== optionName)
                : [...prevSelected, optionName]
        );
    };

    // Passer à l'étape suivante si au moins une option est sélectionnée
    const handleNext = () => {
        if (selectedOptions.length > 0) {
            setError("");
            setStep(2); // Aller à l'étape 2 (affichage du formulaire)
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

    return (
        <div className="section-content">
            {step === 1 && (
                <>
                    <h3>Création de site vitrine - Choisissez une catégorie</h3>
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
                <ContactForm
                    selectedOptions={selectedOptions}
                    serviceType={category}
                    options={options}
                    submitUrl="http://localhost:5000/send-email-service"
                    successMessage="Votre message a été envoyé avec succès !"
                    errorMessage="Erreur lors de l'envoi du message."
                />
            )}
        </div>
    );
};

export default Vitrine;
