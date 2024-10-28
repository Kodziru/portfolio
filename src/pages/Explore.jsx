import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import ReusableModal from "../components/modal/ReusableModal";
import ProgressBar from "../components/explore/ProgressBar";
import Skills from "../components/explore/Skills";
import ExploreContainer from "../components/explore/SectionAbout.jsx";
import Projects from "../components/explore/projects";

const Explore = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: "",
        body: "",
        imgSrc: "",
        progress: 0,
        technologies: [],
        features: [],
        challenges: "",
        futureGoals: "",
        lessonsLearned: "",
        impact: "",
        teamMembers: [],
        launchDate: "",
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (isModalOpen) {
            // Désactive le défilement du corps lorsque le modal est ouvert
            document.body.style.overflow = "hidden";
        } else {
            // Réactive le défilement du corps lorsque le modal est fermé
            document.body.style.overflow = "auto";
        }

        // Nettoyage lors du démontage du composant
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);
    const sectionRefs = useRef([]);

    const setSectionRef = useCallback((el, index) => {
        if (el && !sectionRefs.current.includes(el)) {
            sectionRefs.current[index] = el;
        }
    }, []);

    const openModal = async (projectPath) => {
        if (!projectPath) {
            console.error("Aucun chemin de projet fourni");
            return;
        }

        setModalOpen(true);
        try {
            const projectModule = await import(`../data/${projectPath}.json`);
            const projectData = projectModule.default;

            setModalContent({
                title: projectData.title || "",
                body: projectData.description || "",
                imgSrc: projectData.imgSrc || "",
                progress: projectData.progress || 0,
                technologies: projectData.technologies || [],
                features: projectData.features || [],
                challenges: projectData.challenges || "",
                futureGoals: projectData.futureGoals || "",
                lessonsLearned: projectData.lessonsLearned || "",
                impact: projectData.impact || "",
                teamMembers: projectData.teamMembers || [],
                launchDate: projectData.launchDate || "",
            });
        } catch (error) {
            console.error("Erreur de chargement du projet:", error);
        }
    };
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sectionRefs.current.indexOf(entry.target);
                        if (index !== -1) {
                            setActiveSection(index);
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        sectionRefs.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sectionRefs.current.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    return (
        <div className="explore-main">
            <div>
                {/* Section About */}
                <section
                    className="explore-extern-section"
                    ref={(el) => setSectionRef(el, 0)}
                >
                    <ExploreContainer />
                </section>

                {/* Section Skills */}
                <section
                    className="explore-extern-section"
                    ref={(el) => setSectionRef(el, 1)}
                >
                    <h3 className="explore-section-title">Mes compétences</h3>
                    <Skills />
                </section>

                {/* Section Projects */}
                <section
                    className="explore-extern-section"
                    ref={(el) => setSectionRef(el, 2)}
                >
                    <Projects openModal={openModal} />
                </section>
            </div>

            <ReusableModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                title={modalContent.title}
                projectInfo={modalContent} // Ajoutez cette ligne
            >
                {loading ? (
                    <p>Chargement...</p>
                ) : (
                    <>
                        {modalContent.imgSrc ? (
                            <img
                                src={modalContent.imgSrc}
                                alt={modalContent.title}
                                style={{
                                    width: "100%",
                                    borderRadius: "12px",
                                    marginBottom: "20px",
                                }}
                            />
                        ) : (
                            <p>Aucune image disponible</p>
                        )}

                        {modalContent.body ? (
                            <p>{modalContent.body}</p>
                        ) : (
                            <p>Aucune description</p>
                        )}

                        {modalContent.progress > 0 ? (
                            <>
                                <h3>Progression</h3>
                                <ProgressBar
                                    foregroundProgress={modalContent.progress}
                                    backgroundProgress={
                                        100 - modalContent.progress
                                    }
                                />
                            </>
                        ) : (
                            <p>Aucune progression</p>
                        )}

                        {modalContent.technologies?.length > 0 ? (
                            <>
                                <h3>Technologies utilisées</h3>
                                <ul>
                                    {modalContent.technologies.map(
                                        (tech, index) => (
                                            <li key={index}>{tech}</li>
                                        )
                                    )}
                                </ul>
                            </>
                        ) : (
                            <p>Aucune technologie utilisée</p>
                        )}

                        {modalContent.features?.length > 0 ? (
                            <>
                                <h3>Fonctionnalités</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Fonctionnalité</th>
                                            <th>Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {modalContent.features.map(
                                            (feature, index) => (
                                                <tr key={index}>
                                                    <td>{feature.feature}</td>
                                                    <td>{feature.status}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <p>Aucune fonctionnalité spécifiée</p>
                        )}

                        {modalContent.challenges ? (
                            <>
                                <h3>Challenges rencontrés</h3>
                                <p>{modalContent.challenges}</p>
                            </>
                        ) : (
                            <p>Aucun challenge rencontré</p>
                        )}

                        {modalContent.futureGoals ? (
                            <>
                                <h3>Objectifs futurs</h3>
                                <p>{modalContent.futureGoals}</p>
                            </>
                        ) : (
                            <p>Aucun objectif futur</p>
                        )}

                        {modalContent.lessonsLearned ? (
                            <>
                                <h3>Leçons apprises</h3>
                                <p>{modalContent.lessonsLearned}</p>
                            </>
                        ) : (
                            <p>Aucune leçon apprise</p>
                        )}

                        {modalContent.impact ? (
                            <>
                                <h3>Impact du projet</h3>
                                <p>{modalContent.impact}</p>
                            </>
                        ) : (
                            <p>Aucun impact</p>
                        )}

                        {modalContent.teamMembers?.length > 0 ? (
                            <>
                                <h3>Membres de l'équipe</h3>
                                <ul>
                                    {modalContent.teamMembers.map(
                                        (member, index) => (
                                            <li key={index}>{member}</li>
                                        )
                                    )}
                                </ul>
                            </>
                        ) : (
                            <p>Aucun membre de l'équipe spécifié</p>
                        )}
                        {modalContent.launchDate ? (
                            <>
                                <h3>Date de lancement prévue</h3>
                                <p>{modalContent.launchDate}</p>
                            </>
                        ) : (
                            <p>Aucune date de lancement spécifiée</p>
                        )}
                    </>
                )}
            </ReusableModal>
        </div>
    );
};

export default Explore;
