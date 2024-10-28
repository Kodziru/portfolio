import React, { useState, useRef, useEffect } from "react";
import { SiWordpress, SiVisualstudiocode } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "../ContactForm";
import ecommerceData from "./ecommerceData.json";

const Ecoommerce = ({
    categories = [
        { name: "CMS", icon: <SiWordpress size={36} /> },
        { name: "Custom", icon: <SiVisualstudiocode size={36} /> },
    ],
    serviceType = "Service",
    submitUrl = process.env.REACT_APP_SUBMIT_URL ||
        "https://emiservice.fr/send-email-service.php",
    successMessage = "Votre message a été envoyé avec succès !",
    errorMessage = "Erreur lors de l'envoi du message.",
}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [importantOptions, setImportantOptions] = useState([]);
    const [category, setCategory] = useState(null);
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const formRef = useRef(null);

    // Initialiser `options` en fonction de la catégorie sélectionnée
    const options =
        category === "CMS"
            ? ecommerceData.cmsOptions
            : category === "Custom"
            ? ecommerceData.customDevelopmentOptions
            : [];

    // Calcul des prix minimum et maximum pour les options sélectionnées
    const calculatePriceRange = () => {
        let minTotal = 0;
        let maxTotal = 0;

        selectedOptions.forEach((optionName) => {
            const selectedOption = options.find(
                (opt) => opt.name === optionName
            );
            if (selectedOption && selectedOption.cost !== "Variable") {
                const [minCost, maxCost] = selectedOption.cost
                    .replace("€", "")
                    .split(" - ")
                    .map((cost) => parseFloat(cost));
                minTotal += minCost;
                maxTotal += maxCost;
            }
        });

        return { minTotal, maxTotal };
    };

    const { minTotal, maxTotal } = calculatePriceRange();

    useEffect(() => {
        if (step === 2 && formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [step]);

    useEffect(() => {
        if (category) {
            const optionsForCategory =
                category === "CMS"
                    ? ecommerceData.cmsOptions
                    : ecommerceData.customDevelopmentOptions;

            const important = optionsForCategory
                .filter((option) => option.important)
                .map((option) => option.name);

            setSelectedOptions(important);
            setImportantOptions(important);
        }
    }, [category]);

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const handleOptionChange = (optionName) => {
        if (importantOptions.includes(optionName)) return;

        setSelectedOptions((prevSelected) =>
            prevSelected.includes(optionName)
                ? prevSelected.filter((option) => option !== optionName)
                : [...prevSelected, optionName]
        );
    };

    const handleNext = () => {
        if (selectedOptions.length > 0) {
            setError("");
            setStep(2);
        } else {
            setError("Veuillez sélectionner au moins une option.");
        }
    };

    const handleBack = () => {
        setStep(1);
        setCategory(null);
        setSelectedOptions([]);
        setImportantOptions([]);
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
                                        aria-label={`Choisir ${cat.name}`}
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
                                            {options.map((option, idx) => {
                                                const isSelected =
                                                    selectedOptions.includes(
                                                        option.name
                                                    );
                                                const isDisabled =
                                                    importantOptions.includes(
                                                        option.name
                                                    );

                                                return (
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
                                                        aria-selected={
                                                            isSelected
                                                        }
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
                                                                value={
                                                                    option.name
                                                                }
                                                                checked={
                                                                    isSelected
                                                                }
                                                                onChange={() =>
                                                                    handleOptionChange(
                                                                        option.name
                                                                    )
                                                                }
                                                                disabled={
                                                                    isDisabled
                                                                }
                                                                aria-disabled={
                                                                    isDisabled
                                                                }
                                                                aria-checked={
                                                                    isSelected
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                {error && (
                                    <p className="error-message" role="alert">
                                        {error}
                                    </p>
                                )}
                                <div className="button-group">
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
                                </div>
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
                        options={options} // Transmet les options complètes avec les coûts
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
