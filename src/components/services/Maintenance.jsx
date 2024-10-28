import React, { useState, useRef, useEffect } from "react";
import ContactForm from "../ContactForm.jsx";

const Maintenance = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);
    const formRef = useRef(null); // Référence pour le formulaire

    // Défilement vers le formulaire à l'étape 2
    useEffect(() => {
        if (step === 2 && formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [step]);

    // Liste des options de maintenance
    const options = [
        { name: "Mises à jour régulières", cost: "50 € - 150 € par mois" },
        { name: "Support 24/7", cost: "200 € - 500 €" },
        { name: "Sauvegardes automatiques", cost: "100 € - 300 €" },
        { name: "Sécurisation des données", cost: "200 € - 500 €" },
        { name: "Optimisation de la performance", cost: "100 € - 400 €" },
        { name: "Correction de bugs", cost: "50 € - 200 € par intervention" },
        {
            name: "Surveillance du site (Monitoring)",
            cost: "150 € - 350 € par mois",
        },
        { name: "SEO et améliorations techniques", cost: "300 € - 700 €" },
        { name: "Création et gestion de contenu", cost: "100 € - 500 €" },
        { name: "Refonte partielle du design", cost: "500 € - 1 500 €" },
        { name: "Autre", cost: "Variable" },
    ];

    const handleOptionChange = (optionName) => {
        setSelectedOptions((prevSelected) =>
            prevSelected.includes(optionName)
                ? prevSelected.filter((option) => option !== optionName)
                : [...prevSelected, optionName]
        );
    };

    const handleNext = () => {
        if (selectedOptions.length > 0) {
            setError("");
            setStep(2); // Changement d'étape
        } else {
            setError("Veuillez sélectionner au moins une option.");
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    return (
        <div className="section-content">
            {step === 1 && (
                <>
                    <h3>Maintenance et support - Détails et options</h3>
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
                                            handleOptionChange(option.name)
                                        }
                                        style={{ cursor: "pointer" }}
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
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                aria-label={`Sélectionner ${option.name} pour un coût de ${option.cost}`}
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
                    <button className="btn btn-next" onClick={handleNext}>
                        Suivant
                    </button>
                </>
            )}
            {step === 2 && (
                <>
                    <div ref={formRef}>
                        <ContactForm
                            selectedOptions={selectedOptions}
                            serviceType="Maintenance"
                            options={options}
                            submitUrl={
                                process.env.REACT_APP_SUBMIT_URL ||
                                "https://emiservice.fr/send-email-service.php"
                            } // Utilise une URL dynamique
                            successMessage="Votre demande de maintenance a été envoyée avec succès !"
                            errorMessage="Erreur lors de l'envoi de la demande de maintenance."
                        />
                    </div>
                    <button className="btn btn-back" onClick={handleBack}>
                        Retour
                    </button>
                </>
            )}
        </div>
    );
};

export default Maintenance;
