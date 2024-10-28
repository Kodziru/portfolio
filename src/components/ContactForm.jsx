import React, { useRef, useState } from "react";
import SecureInput from "./SecureInput";
import "../styles/contact.css";

import { FaInfoCircle } from "react-icons/fa";

const Tooltip = ({ message }) => <span className="tooltip">{message}</span>;

const ContactForm = ({
    selectedOptions = [],
    serviceType = "Service",
    options = [],
    submitUrl = "https://emiservice.fr/send-email-service.php",
    successMessage = "Votre message a été envoyé avec succès !",
    errorMessage = "Erreur lors de l'envoi de l'e-mail.",
}) => {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [formMessage, setFormMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "", // Ajout du champ pour le numéro de téléphone
        message: "",
    });
    const [contactPermission, setContactPermission] = useState(false); // État pour la case à cocher

    // Fonction pour calculer l'estimation des coûts
    const calculatePriceRange = () => {
        let minTotal = 0;
        let maxTotal = 0;

        selectedOptions.forEach((option) => {
            const selectedOption = options.find((opt) => opt.name === option);
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

    const handleInputChange = (name) => (value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const priceRange = `${minTotal} € - ${maxTotal} €`;

        // Préparation des données du formulaire
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("message", formData.message);
        formDataToSend.append("serviceType", serviceType);
        formDataToSend.append(
            "selectedOptions",
            JSON.stringify(selectedOptions)
        );
        formDataToSend.append("priceRange", priceRange);
        formDataToSend.append(
            "contactPermission",
            contactPermission ? "Oui" : "Non"
        ); // Ajouter la permission de contact

        try {
            const response = await fetch(submitUrl, {
                method: "POST",
                body: formDataToSend,
            });

            const text = await response.text();
            let result;
            try {
                result = text ? JSON.parse(text) : {};
            } catch (error) {
                throw new Error("Réponse du serveur non valide");
            }

            if (response.ok) {
                setFormMessage(result.message || successMessage);
                setIsSuccess(true);
                setFormData({ name: "", email: "", phone: "", message: "" });
                setContactPermission(false); // Réinitialiser la case à cocher
            } else {
                setFormMessage(result.message || errorMessage);
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("Erreur de soumission:", error);
            setFormMessage(errorMessage);
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-form-container">
            <form
                ref={form}
                onSubmit={handleSubmit}
                className="contact-form"
                aria-label="Formulaire de contact"
            >
                <div className="form-group">
                    <SecureInput
                        label="Nom"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange("name")}
                        required
                    />
                </div>

                <div className="form-group">
                    <SecureInput
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        required
                    />
                </div>

                <div className="form-group">
                    <SecureInput
                        label="Numéro"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange("phone")}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message" className="form-label label-ico">
                        Message{" "}
                        <span className="icon-with-tooltip">
                            <FaInfoCircle className="info-icon" />
                            <Tooltip message="Décrivez votre demande en détail." />
                        </span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className="form-textarea"
                        value={formData.message}
                        onChange={(e) =>
                            handleInputChange("message")(e.target.value)
                        }
                        required
                    />
                </div>

                <div className="form-group">
                    <label
                        htmlFor="contactPermission"
                        className="form-checkbox"
                    >
                        <input
                            type="checkbox"
                            id="contactPermission"
                            className="custom-checkbox"
                            style={{ marginRight: "7px" }}
                            name="contactPermission"
                            checked={contactPermission}
                            onChange={(e) =>
                                setContactPermission(e.target.checked)
                            }
                        />

                        <span>
                            Je souhaite être contacté(e) pour des informations
                            supplémentaires
                        </span>
                    </label>
                </div>

                {formMessage && (
                    <p
                        className={`form-message ${
                            isSuccess ? "success" : "error"
                        }`}
                        aria-live="polite"
                    >
                        {formMessage}
                    </p>
                )}

                <p className="price-range">
                    Estimation de prix : {minTotal} € - {maxTotal} €
                </p>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? (
                        <div className="loading-spinner"></div>
                    ) : (
                        "Envoyer"
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
