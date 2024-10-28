import React, { useState, useRef } from "react";

// Helper function to escape user input (to prevent XSS attacks)
const escapeHTML = (str) => {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
};

// Reusable TextInput Component
const TextInput = ({
    label,
    name,
    value,
    onChange,
    error,
    required,
    type = "text",
}) => (
    <div className="form-group">
        <label className="form-label">
            {label} {required && "*"}
        </label>
        <input
            type={type}
            name={name}
            className="form-input"
            value={value}
            onChange={onChange}
            required={required}
        />
        {error && <small className="error">{error}</small>}
    </div>
);

// Reusable CheckboxGroup Component
const CheckboxGroup = ({
    label,
    name,
    values,
    options,
    onChange,
    required,
}) => (
    <div className="form-group ">
        <label className="form-label">
            {label} {required && "*"}
        </label>
        <div className="form-checkbox-group">
            {options.map((option) => (
                <div
                    key={option.value}
                    className="checkbox-container checkbox-container-align"
                >
                    <input
                        type="checkbox"
                        name={name}
                        value={option.value}
                        checked={values.includes(option.value)}
                        onChange={onChange}
                        className="custom-checkbox"
                    />
                    {option.label}
                </div>
            ))}
        </div>
    </div>
);

// Reusable TextArea Component
const TextArea = ({ label, name, value, onChange, error, required }) => (
    <div className="form-group">
        <label className="form-label">
            {label} {required && "*"}
        </label>
        <textarea
            name={name}
            className="form-textarea"
            value={value}
            onChange={onChange}
            required={required}
        />
        {error && <small className="error">{error}</small>}
    </div>
);

// Reusable SelectInput Component
const SelectInput = ({
    label,
    name,
    value,
    onChange,
    options,
    error,
    required,
}) => (
    <div className="form-group">
        <label className="form-label">
            {label} {required && "*"}
        </label>
        <select
            name={name}
            className="form-select"
            value={value}
            onChange={onChange}
            required={required}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && <small className="error">{error}</small>}
    </div>
);

// Reusable CheckboxInput Component
const CheckboxInput = ({ label, name, checked, onChange, required }) => (
    <div className="form-group form-checkbox">
        <label className="form-label">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="checkbox-container"
                required={required}
            />
            {label} {required && "*"}
        </label>
    </div>
);
const ContactForm = () => {
    const [formData, setFormData] = useState({
        contactPreferences: [],
        fullName: "",
        email: "",
        subject: "",
        otherSubject: "",
        message: "",
        acceptPolicy: false,
        files: [], // Gérer plusieurs fichiers
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formMessage, setFormMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);

    // Référence pour le champ d'entrée de fichier
    const fileInputRef = useRef(null);

    const validate = () => {
        let newErrors = {};
        if (!formData.fullName) newErrors.fullName = "Nom complet requis.";
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
            newErrors.email = "Adresse e-mail invalide.";
        if (!formData.message) newErrors.message = "Le message est requis.";
        if (!formData.acceptPolicy)
            newErrors.acceptPolicy =
                "Vous devez accepter la politique de confidentialité.";
        return newErrors;
    };

    const handleChangeCheckbox = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            let updatedPreferences;
            if (value === "none") {
                updatedPreferences = checked ? ["none"] : [];
            } else {
                updatedPreferences = checked
                    ? [
                          ...prevData.contactPreferences.filter(
                              (pref) => pref !== "none"
                          ),
                          value,
                      ]
                    : prevData.contactPreferences.filter(
                          (pref) => pref !== value
                      );
            }
            return { ...prevData, contactPreferences: updatedPreferences };
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            files,
        }));
    };

    const handleRemoveFile = (index) => {
        setFormData((prevData) => {
            const updatedFiles = prevData.files.filter((_, i) => i !== index);
            return { ...prevData, files: updatedFiles };
        });
        resetFileInput(); // Réinitialiser l'entrée de fichier après suppression
    };

    const resetFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        // Préparation des données à envoyer
        const dataToSend = new FormData();
        dataToSend.append("fullName", formData.fullName);
        dataToSend.append("email", formData.email);
        dataToSend.append("subject", formData.subject);
        dataToSend.append("message", formData.message);
        dataToSend.append(
            "contactPreference",
            formData.contactPreferences.join(", ")
        );

        try {
            const response = await fetch(
                "https://emiservice.fr/send-email-contact.php", // URL PHP sur Hostinger
                {
                    method: "POST",
                    body: dataToSend,
                }
            );

            if (response.ok) {
                setFormMessage("Votre message a été envoyé avec succès !");
                setIsSuccess(true);
                setFormData({
                    contactPreferences: [],
                    fullName: "",
                    email: "",
                    subject: "",
                    message: "",
                    acceptPolicy: false,
                    files: [],
                });
            } else {
                setFormMessage("Erreur lors de l'envoi du message.");
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi:", error);
            setFormMessage("Erreur lors de l'envoi du message.");
            setIsSuccess(false);
        } finally {
            setLoading(false);
            setSubmitted(true);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <TextInput
                label="Nom complet"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                required
            />
            <TextInput
                label="Adresse e-mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
            />
            <SelectInput
                label="Objet du message"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                options={[
                    { value: "", label: "Sélectionnez..." },
                    {
                        value: "collaboration",
                        label: "Demande de collaboration",
                    },
                    { value: "devis", label: "Demande de devis" },
                    { value: "information", label: "Demande d'information" },
                    { value: "feedback", label: "Feedback sur le site" },
                    { value: "autre", label: "Autre" },
                ]}
                error={errors.subject}
                required
            />
            {formData.subject === "autre" && (
                <TextInput
                    label="Préciser l'objet"
                    name="otherSubject"
                    value={formData.otherSubject}
                    onChange={handleChange}
                    required
                />
            )}
            <TextArea
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                required
            />
            <label className="form-file-upload">
                <span className="form-file-label">Joindre des fichiers</span>
                <input
                    type="file"
                    name="files"
                    multiple
                    ref={fileInputRef} // Attacher la référence au champ de fichier
                    onChange={handleFileChange}
                />
            </label>

            {/* Afficher les fichiers téléchargés avec option de suppression */}
            {formData.files.length > 0 && (
                <div className="uploaded-files">
                    <h4>Fichiers téléchargés :</h4>
                    <ul>
                        {formData.files.map((file, index) => (
                            <li key={index} className="uploaded-file-item">
                                {file.name}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(index)}
                                    className="remove-file-button"
                                >
                                    Supprimer
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <CheckboxGroup
                label="Préférence de contact"
                name="contactPreferences"
                values={formData.contactPreferences}
                onChange={handleChangeCheckbox}
                options={[
                    { value: "email", label: "E-mail" },
                    { value: "phone", label: "Téléphone" },
                    { value: "none", label: "Aucune préférence" },
                ]}
            />
            <CheckboxInput
                label="J'accepte la politique de confidentialité"
                name="acceptPolicy"
                checked={formData.acceptPolicy}
                onChange={handleChange}
                required
            />
            <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Envoi en cours..." : "Envoyer"}
            </button>
            {formMessage && (
                <p
                    className={`form-message ${
                        isSuccess ? "success" : "error"
                    }`}
                >
                    {formMessage}
                </p>
            )}
        </form>
    );
};

export default ContactForm;
