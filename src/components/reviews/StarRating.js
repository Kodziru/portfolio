import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

// Composant pour afficher et gérer les étoiles
const StarRating = ({ rating, interactive = false, setRating = null }) => {
    const validRating = Math.max(0, Math.min(rating || 0, 5)); // Limite la note entre 0 et 5

    return (
        <div
            className={`star-rating ${interactive ? "interactive" : "static"}`}
        >
            {Array.from({ length: 5 }).map((_, index) => (
                <span
                    key={index}
                    // Supprimer complètement l'interaction si non interactif
                    {...(interactive &&
                        setRating && {
                            onClick: () => setRating(index + 1),
                            style: { cursor: "pointer" },
                        })}
                >
                    {index < validRating ? <FaStar /> : <FaRegStar />}
                </span>
            ))}
        </div>
    );
};

export default StarRating;
