// src/App.js
import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
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

// MotionWrapper for animations on desktop only
const MotionWrapper = ({ children, isDesktop }) =>
    isDesktop ? (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            {children}
        </motion.div>
    ) : (
        <div>{children}</div>
    );

const AnimatedRoutes = ({ isDesktop }) => {
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
                isDesktop ? (
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
                    <Loader />
                )
            ) : (
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={<Navigate to="/explore" replace />}
                    />
                    <Route
                        path="/explore"
                        element={
                            <MotionWrapper isDesktop={isDesktop}>
                                <Explore />
                            </MotionWrapper>
                        }
                    />
                    <Route
                        path="/services"
                        element={
                            <MotionWrapper isDesktop={isDesktop}>
                                <Services />
                            </MotionWrapper>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <MotionWrapper isDesktop={isDesktop}>
                                <Contact />
                            </MotionWrapper>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <MotionWrapper isDesktop={isDesktop}>
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
    const [showHeader, setShowHeader] = useState(false);

    // Handle resize for desktop/mobile detection
    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 768);
        window.addEventListener("resize", handleResize);

        const timer = setTimeout(() => setLoading(false), 1000);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Debounced scroll detection
    useEffect(() => {
        let timeout = null;

        const handleScroll = () => {
            if (timeout) clearTimeout(timeout);
            setShowHeader(false); // Hide header while scrolling

            // Show header after user stops scrolling
            timeout = setTimeout(() => {
                setShowHeader(true);
            }, 300); // 300ms delay after scrolling stops
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Router>
            <AnimatePresence>
                {!loading && (
                    <>
                        <PromotionBanner />
                        {isDesktop ? (
                            <motion.div
                                initial="hidden"
                                animate={showHeader ? "visible" : "hidden"}
                                exit="hidden"
                                variants={headerVariants}
                                transition={{ duration: 0.5 }}
                            >
                                <Header />
                            </motion.div>
                        ) : (
                            <Header />
                        )}
                    </>
                )}
            </AnimatePresence>
            <main>
                <AnimatedRoutes isDesktop={isDesktop} />
                {isDesktop && <FollowPointerBox />}
            </main>
        </Router>
    );
};

export default App;
