import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

// Composant pour afficher des étoiles statiques sans interaction
const StaticStarRating = ({ rating }) => {
    const validRating = Math.max(0, Math.min(rating || 0, 5)); // Limite la note entre 0 et 5

    return (
        <div className="static-star-rating">
            {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>
                    {index < validRating ? <FaStar /> : <FaRegStar />}
                </span>
            ))}
        </div>
    );
};

export default StaticStarRating;
