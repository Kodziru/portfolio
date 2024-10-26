import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, onRatingChange }) => {
    const [hoveredRating, setHoveredRating] = useState(null);

    const handleMouseOver = (ratingValue) => {
        setHoveredRating(ratingValue);
    };

    const handleMouseLeave = () => {
        setHoveredRating(null);
    };

    const handleClick = (ratingValue) => {
        onRatingChange(ratingValue);
    };

    const displayedRating = hoveredRating !== null ? hoveredRating : rating;

    return (
        <div className="star-rating">
            {Array(5)
                .fill()
                .map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <span
                            key={index}
                            className={`star ${
                                ratingValue <= displayedRating ? "filled" : ""
                            }`}
                            onClick={() => handleClick(ratingValue)}
                            onMouseOver={() => handleMouseOver(ratingValue)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <FaStar />
                        </span>
                    );
                })}
        </div>
    );
};

export default StarRating;
