import React, { useRef, useState } from "react";
import SecureInput from "./SecureInput";
import "../styles/contact.css";
import { FaInfoCircle } from "react-icons/fa";

const Tooltip = ({ message }) => <span className="tooltip">{message}</span>;

const ContactForm = ({
    selectedOptions = [],
    serviceType = "Service",
    options = [],
    submitUrl = "http://localhost:5000/send-email-service",
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
        message: "",
    });

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

        const dataToSend = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            serviceType,
            selectedOptions,
            priceRange,
        };

        try {
            const response = await fetch(submitUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                setFormMessage(successMessage);
                setIsSuccess(true);
                setFormData({ name: "", email: "", message: "" });
            } else {
                setFormMessage(errorMessage);
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
                    <label htmlFor="name" className="form-label"></label>
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
                    <label htmlFor="email" className="form-label"></label>
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
                    <label htmlFor="message" className="form-label">
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
