import React, { useEffect, useState, useRef } from "react";

import ReviewForm from "./ReviewForm";
import "../../styles/testimonials/ReviewList.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

const Testimonials = ({ showForm }) => {
    const [reviews, setReviews] = useState([]);
    const [ip, setIp] = useState("");

    useEffect(() => {
        fetchIp();
        const unsubscribe = onSnapshot(
            collection(db, "reviews"),
            (snapshot) => {
                const reviewsData = snapshot.docs.map((doc) => doc.data());
                setReviews(reviewsData);
            }
        );

        return () => unsubscribe();
    }, []);

    const fetchIp = async () => {
        try {
            const response = await fetch("https://api64.ipify.org?format=json");
            const data = await response.json();
            setIp(data.ip);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération de l'adresse IP:",
                error
            );
        }
    };

    const handleFormSuccess = () => {
        // Action à effectuer après la soumission réussie du formulaire
    };

    return (
        <div className="testimonials-container">
            {showForm && (
                <ReviewForm ip={ip} onSubmitSuccess={handleFormSuccess} />
            )}
        </div>
    );
};

export default Testimonials;
