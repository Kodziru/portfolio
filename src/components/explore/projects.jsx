import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "../../styles/mainPage/Explore.css";
import ProgressBar from "./ProgressBar";

// Utilitaire pour vérifier si un élément est visible dans le viewport
const useInView = (ref, threshold = 0.1) => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold }
        );

        if (ref.current) observer.observe(ref.current);
        return () => ref.current && observer.unobserve(ref.current);
    }, [ref, threshold]);

    return isInView;
};

// Variantes d'animation
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Délai entre chaque enfant
        },
    },
};

const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeInOut" },
    },
};

// Composant principal avec les projets
const Projects = ({ openModal }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, 0.1);
    const controls = useAnimation();
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 768);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isInView && isDesktop) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls, isDesktop]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isDesktop ? controls : "visible"} // Pas d'animation sur mobile
            variants={isDesktop ? containerVariants : {}}
            className="explore-projects-container"
        >
            {/* Project 1 */}
            <motion.div
                className="explore-container explore-project"
                style={{ cursor: "pointer" }}
                onClick={() => openModal("project1")}
                variants={isDesktop ? fadeUpVariants : {}}
            >
                <h4 className="explore-project-title">Next Step</h4>
                <ProgressBar
                    backgroundProgress={70}
                    foregroundProgress={30}
                    backgroundColor="#DC3545"
                    foregroundGradient="#3795BD"
                    backgroundStatus="V. alpha"
                    foregroundStatus="En cours"
                />
                <p>L'application mobile fonctionnelle avec une IA</p>
            </motion.div>

            {/* Project 2 */}
            <motion.div
                className="explore-container explore-project"
                style={{ cursor: "pointer" }}
                onClick={() => openModal("project2")}
                variants={isDesktop ? fadeUpVariants : {}}
            >
                <h4 className="explore-project-title">Clim Time</h4>
                <ProgressBar
                    foregroundProgress={100}
                    foregroundGradient="#ff4800"
                    foregroundStatus="Ready"
                    showBackgroundStatus={false}
                />
                <p>Site vitrine sur commande</p>
            </motion.div>

            {/* Project 3 */}
            <motion.div
                className="explore-container explore-project"
                style={{ cursor: "pointer" }}
                onClick={() => openModal("project3")}
                variants={isDesktop ? fadeUpVariants : {}}
            >
                <h4 className="explore-project-title">HAROLD</h4>
                <ProgressBar
                    showBackgroundStatus={false}
                    foregroundProgress={80}
                    foregroundGradient="#ff4800"
                    foregroundStatus="En cours"
                />
                <p>Web application E-Commerce</p>
            </motion.div>
        </motion.div>
    );
};

export default Projects;
