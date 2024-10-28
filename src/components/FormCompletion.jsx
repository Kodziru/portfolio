import React, { useState } from "react";
import ContactForm from "./ContactForm";

const FormCompletion = ({ selectedService, onSubmit }) => {
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleNext = () => {
        // Valider le message si nécessaire
        setError("");
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleContactSubmit = (contactInfo) => {
        // Combiner les données du service et les informations de contact
        onSubmit({
            selectedService,
            message,
            contactInfo,
        });
    };

    return (
        <div className="section-content">
            {step === 1 && (
                <>
                    <h3>Complétez vos informations pour être contacté</h3>
                    {error && (
                        <p
                            className="error-message"
                            role="alert"
                            aria-live="assertive"
                        >
                            {error}
                        </p>
                    )}
                    <div className="form-field">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                        />
                    </div>
                    <button className="btn btn-next" onClick={handleNext}>
                        Suivant
                    </button>
                </>
            )}
            {step === 2 && (
                <>
                    <ContactForm onSubmit={handleContactSubmit} />
                    <button className="btn btn-back" onClick={handleBack}>
                        Retour
                    </button>
                </>
            )}
        </div>
    );
};

export default FormCompletion;
