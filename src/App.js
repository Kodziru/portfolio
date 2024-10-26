// src/App.js
import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import PromotionBanner from "./components/PromotionBanner";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import Loader from "./loader";
import FollowPointerBox from "./components/globalPage/FollowPointerBox";

const pageVariants = {
    initial: { opacity: 0, x: 50, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -50, scale: 0.95 },
};

const pageTransition = {
    type: "spring",
    damping: 25,
    stiffness: 120,
    duration: 0.6,
};

const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};

const MotionWrapper = ({ children }) => (
    <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
    >
        {children}
    </motion.div>
);

const AnimatedRoutes = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Loader />
                </motion.div>
            ) : (
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/explore"
                        element={
                            <MotionWrapper>
                                <Explore />
                            </MotionWrapper>
                        }
                    />
                    <Route
                        path="/services"
                        element={
                            <MotionWrapper>
                                <Services />
                            </MotionWrapper>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <MotionWrapper>
                                <Contact />
                            </MotionWrapper>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <MotionWrapper>
                                <Explore />
                            </MotionWrapper>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <MotionWrapper>
                                <NotFound />
                            </MotionWrapper>
                        }
                    />
                </Routes>
            )}
        </AnimatePresence>
    );
};

const App = () => {
    const [loading, setLoading] = useState(true);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 768);
        window.addEventListener("resize", handleResize);

        const timer = setTimeout(() => setLoading(false), 1000);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Router>
            <AnimatePresence>
                {!loading && (
                    <>
                        <PromotionBanner />
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={headerVariants}
                            transition={{ duration: 0.5 }}
                            style={{ paddingTop: "50px" }} // Adjusts for PromotionBanner height
                        >
                            <Header />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <main>
                <AnimatedRoutes />
                {isDesktop && <FollowPointerBox />}
            </main>
        </Router>
    );
};

export default App;
