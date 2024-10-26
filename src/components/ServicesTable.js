import React, { useState } from "react";
import "../styles/ServicesTable.css"; // Import du fichier CSS

const ServicesTable = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const services = [
        {
            id: 1,
            name: "Cahier des charges et conception",
            description:
                "Définition des besoins, des pages, des fonctionnalités e-commerce (produits, panier, paiement).",
            cost: "300 € - 600 €",
        },
        {
            id: 2,
            name: "Conception graphique (UI/UX)",
            description:
                "Création de la charte graphique, design des pages de produit, du panier et du checkout.",
            cost: "500 € - 1500 €",
        },
        {
            id: 3,
            name: "Développement frontend (HTML/CSS/JS)",
            description:
                "Intégration des maquettes en HTML/CSS, responsive design pour mobile et desktop.",
            cost: "600 € - 1500 €",
        },
        {
            id: 4,
            name: "Développement backend",
            description:
                "Développement des fonctionnalités spécifiques (gestion des commandes, factures, paiement en ligne, etc.).",
            cost: "800 € - 2000 €",
        },
        {
            id: 5,
            name: "Installation et configuration CMS (WooCommerce, Prestashop, Shopify)",
            description: "Installation et configuration d'un CMS e-commerce.",
            cost: "300 € - 800 €",
        },
        // Ajouter d'autres services ici
    ];

    const handleOptionChange = (id) => {
        if (selectedOptions.includes(id)) {
            setSelectedOptions(
                selectedOptions.filter((optionId) => optionId !== id)
            );
        } else {
            setSelectedOptions([...selectedOptions, id]);
        }
    };

    return (
        <div className="services-table-container">
            <h2 className="services-table-title">
                Tableau des services et coûts estimés
            </h2>
            <table className="services-table">
                <thead>
                    <tr>
                        <th>Choisir</th>
                        <th>Élément à prendre en compte</th>
                        <th>Description</th>
                        <th>Coût estimé (€)</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes(
                                        service.id
                                    )}
                                    onChange={() =>
                                        handleOptionChange(service.id)
                                    }
                                />
                            </td>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td>{service.cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="selected-options-summary">
                <h3>Résumé des options choisies :</h3>
                <ul>
                    {selectedOptions.map((optionId) => {
                        const selectedService = services.find(
                            (service) => service.id === optionId
                        );
                        return (
                            <li key={optionId}>
                                {selectedService.name} - {selectedService.cost}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ServicesTable;
