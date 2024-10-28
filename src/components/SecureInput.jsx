import React, { useState } from "react";
import validator from "validator"; // Pour validation et assainissement

const SecureInput = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    required = false,
    errorMessages = {}, // Prop pour personnaliser les messages d'erreurs
}) => {
    const [error, setError] = useState("");

    // Fonction de validation et assainissement
    const validateInput = (inputValue) => {
        let isValid = true;
        let errorMessage = "";

        // Validation en fonction du type d'input
        switch (type) {
            case "email":
                if (!validator.isEmail(inputValue)) {
                    isValid = false;
                    errorMessage =
                        errorMessages.email ||
                        "Veuillez entrer un email valide.";
                }
                break;

            case "number":
                if (!validator.isNumeric(inputValue)) {
                    isValid = false;
                    errorMessage =
                        errorMessages.number ||
                        "Veuillez entrer un numéro valide.";
                }
                break;

            case "text":
            default:
                if (required && validator.isEmpty(inputValue)) {
                    isValid = false;
                    errorMessage =
                        errorMessages.required || "Ce champ est requis.";
                }
                inputValue = validator.escape(inputValue); // Nettoyage de l'input
                break;
        }

        // Mise à jour de l'état de l'erreur
        if (!isValid) {
            setError(errorMessage);
        } else {
            setError("");
        }

        return isValid;
    };

    // Gestion du changement d'input
    const handleChange = (e) => {
        const inputValue = e.target.value;
        validateInput(inputValue); // Validation en temps réel
        onChange(inputValue); // Propager la valeur nettoyée au parent
    };

    return (
        <div className={`form-field ${error ? "has-error" : ""}`}>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className={`form-input ${error ? "input-error" : ""}`}
                aria-invalid={error ? "true" : "false"}
                required={required}
            />
            {error && (
                <p className="error-message" role="alert" aria-live="assertive">
                    {error}
                </p>
            )}
        </div>
    );
};

export default SecureInput;
