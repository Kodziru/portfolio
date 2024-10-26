import React, { useState } from "react";
import Modal from "react-modal";
import './ReusableModal.css';

Modal.setAppElement("#root");

const ReusableModal = ({ isOpen, onRequestClose, title, projectInfo = {} }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onRequestClose();
        }, 300); // Doit correspondre à la durée de l'animation
    };

    const {
        imgSrc,
        description,
        progress,
        features,
        challenges,
        technologies,
        futureGoals,
        lessonsLearned,
        impact,
        teamMembers,
        launchDate
    } = projectInfo;

    // Section wrapper pour éviter la répétition
    const renderSection = (sectionTitle, content, isList = false) => (
        content && (
            <div>
                <h3 className="modal-section-title">{sectionTitle}</h3>
                {isList ? (
                    <ul className="modal-list">
                        {content.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="modal-description">{content}</p>
                )}
            </div>
        )
    );

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            className={`custom-modal-content ${isClosing ? 'closing' : ''}`}
            overlayClassName="custom-modal-overlay"
            closeTimeoutMS={300}
        >
            <div className="modal-header">
                <h2 className="modal-title">{title}</h2>
                <button onClick={handleClose} className="modal-close-button">
                    &times;
                </button>
            </div>

            <hr className="modal-separator" />

            {/* Image du projet */}
            {imgSrc ? (
                <img
                    src={imgSrc}
                    alt={title}
                    className="modal-image"
                />
            ) : (
                <p>Aucune image disponible</p>
            )}

            {/* Description */}
            {renderSection("Description du projet", description)}

            {/* Barre de progression */}
            {progress > 0 ? (
                <div>
                    <h3 className="modal-section-title">Progression du projet</h3>
                    <div className="modal-progress-bar-background">
                        <div
                            className="modal-progress-bar"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="modal-progress-percentage">{progress}% terminé</p>
                </div>
            ) : (
                <p>Aucune progression spécifiée</p>
            )}

            {/* Fonctionnalités */}
            {features?.length > 0 ? (
                <div>
                    <h3 className="modal-section-title">Fonctionnalités</h3>
                    <table className="modal-features-table">
                        <thead>
                            <tr>
                                <th>Fonctionnalité</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, index) => (
                                <tr key={index}>
                                    <td>{feature.feature}</td>
                                    <td>{feature.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Aucune fonctionnalité spécifiée</p>
            )}

            {/* Challenges rencontrés */}
            {renderSection("Challenges rencontrés", challenges)}

            {/* Technologies utilisées */}
            {renderSection("Technologies utilisées", technologies, true)}

            {/* Objectifs futurs */}
            {renderSection("Objectifs futurs", futureGoals)}

            {/* Leçons apprises */}
            {renderSection("Leçons apprises", lessonsLearned)}

            {/* Impact */}
            {renderSection("Impact du projet", impact)}

            {/* Membres de l'équipe */}
            {teamMembers?.length > 0 ? (
                <div>
                    <h3 className="modal-section-title">Membres de l'équipe</h3>
                    <ul className="modal-list">
                        {teamMembers.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Aucun membre de l'équipe spécifié</p>
            )}

            {/* Date de lancement */}
            {renderSection("Date de lancement prévue", launchDate)}

            <div className="modal-footer">
                <button
                    onClick={handleClose}
                    className="modal-close-button-footer"
                >
                    Fermer
                </button>
            </div>
        </Modal>
    );
};

export default ReusableModal;
