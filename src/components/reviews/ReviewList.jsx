import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { FaAngleDown, FaAngleUp, FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import "../../styles/Styles.css";
import "../../styles/testimonials/ReviewList.css";
import StaticStarRating from "./StaticStarRating"; // Import du composant d'étoiles statiques

const TestimonialsColumn = () => {
    const [reviews, setReviews] = useState([]);
    const [visibleReviewsCount, setVisibleReviewsCount] = useState(3);
    const [averageRating, setAverageRating] = useState(0);
    const [modalImageIndex, setModalImageIndex] = useState(null);
    const [currentReviewImages, setCurrentReviewImages] = useState([]);
    const [expandedReviews, setExpandedReviews] = useState([]); // État pour gérer les avis étendus

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const reviewsSnapshot = await getDocs(collection(db, "reviews"));
            const reviewsData = reviewsSnapshot.docs.map((doc) => doc.data());
            setReviews(reviewsData);

            if (reviewsData.length > 0) {
                const totalRating = reviewsData.reduce(
                    (sum, review) => sum + (review.rating || 0),
                    0
                );
                const avgRating = totalRating / reviewsData.length;
                setAverageRating(avgRating.toFixed(1));
            } else {
                setAverageRating(0);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des avis:", error);
        }
    };

    const openModal = (images, index) => {
        setCurrentReviewImages(images);
        setModalImageIndex(index);
    };

    const closeModal = () => {
        setModalImageIndex(null);
        setCurrentReviewImages([]);
    };

    // Fonction pour basculer l'état "étendu" des avis
    const toggleExpandReview = (index) => {
        setExpandedReviews((prevExpandedReviews) =>
            prevExpandedReviews.includes(index)
                ? prevExpandedReviews.filter((i) => i !== index)
                : [...prevExpandedReviews, index]
        );
    };

    const showMoreReviews = () => {
        setVisibleReviewsCount((prevCount) => prevCount + 3);
    };

    const showLessReviews = () => {
        setVisibleReviewsCount(3);
    };

    return (
        <div className=".testimonials-section">
            <div className="testimonials-column-container">
                <h2 className="testimonials-column-title">
                    Avis des utilisateurs
                </h2>

                {reviews.length > 0 && (
                    <div className="testimonials-average-rating">
                        <h3>Note moyenne: {averageRating} / 5</h3>
                        <div className="testimonials-average-star-rating">
                            <StaticStarRating rating={averageRating} />
                        </div>
                    </div>
                )}

                <div className="testimonials-column-list">
                    {reviews.map((review, index) => {
                        const isExpanded = expandedReviews.includes(index);
                        const shouldShowToggleBtn = review.text.length > 40; // Afficher le bouton si plus de 40 caractères
                        const displayedText = isExpanded
                            ? review.text
                            : review.text.substring(0, 40); // Limite à 40 caractères

                        return (
                            <article
                                key={index}
                                className={`testimonials-column-item ${
                                    index < visibleReviewsCount
                                        ? "visible"
                                        : "hidden"
                                } ${
                                    isExpanded
                                        ? "expanded-item"
                                        : "collapsed-item"
                                }`}
                            >
                                <header className="testimonials-column-header">
                                    <h3 className="testimonials-column-title-item">
                                        {review.title}
                                    </h3>
                                    <div className="testimonials-column-star-rating">
                                        <StaticStarRating
                                            rating={review.rating}
                                        />
                                    </div>
                                </header>

                                <div className="testimonials-column-text">
                                    "{displayedText}"
                                    {shouldShowToggleBtn &&
                                        !isExpanded &&
                                        "..."}
                                </div>

                                {/* Affichage des images en tant que vignettes */}
                                {review.imageUrls?.length > 0 && (
                                    <div className="testimonials-column-images">
                                        {review.imageUrls.map((imageUrl, i) => (
                                            <div
                                                key={i}
                                                className="testimonials-column-image-preview"
                                            >
                                                <img
                                                    src={imageUrl}
                                                    alt="User review"
                                                    onClick={() =>
                                                        openModal(
                                                            review.imageUrls,
                                                            i
                                                        )
                                                    }
                                                    className="testimonials-column-review-image"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <footer className="testimonials-column-author">
                                    - {review.author}
                                </footer>

                                {/* Bouton pour afficher ou masquer le texte */}
                                {shouldShowToggleBtn && (
                                    <button
                                        className="toggle-review-btn"
                                        onClick={() =>
                                            toggleExpandReview(index)
                                        }
                                    >
                                        {isExpanded ? "Cacher" : "Lire plus"}
                                    </button>
                                )}
                            </article>
                        );
                    })}
                </div>

                <div className="testimonials-btn-container">
                    {visibleReviewsCount < reviews.length && (
                        <button
                            onClick={showMoreReviews}
                            className="testimonials-column-show-more-btn"
                        >
                            Voir plus d'avis
                            <FaAngleDown className="testimonials-column-icon" />
                        </button>
                    )}

                    {visibleReviewsCount > 3 && (
                        <button
                            onClick={showLessReviews}
                            className="testimonials-column-show-less-btn"
                        >
                            Voir moins d'avis
                            <FaAngleUp className="testimonials-column-icon" />
                        </button>
                    )}
                </div>

                {/* Modal pour l'aperçu des images */}
                {modalImageIndex !== null && (
                    <div className="testimonials-column-modal">
                        <div className="testimonials-column-modal-content">
                            <FaTimes
                                className="testimonials-column-close-modal"
                                onClick={closeModal}
                            />
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={10}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                initialSlide={modalImageIndex}
                            >
                                {currentReviewImages.map((imageUrl, i) => (
                                    <SwiperSlide key={i}>
                                        <img
                                            src={imageUrl}
                                            alt={`Image ${i + 1}`}
                                            className="testimonials-column-modal-image"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestimonialsColumn;
