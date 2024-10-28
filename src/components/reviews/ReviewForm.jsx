import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
    addDoc,
    collection,
    serverTimestamp,
    doc,
    getDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../config/firebaseConfig";
import { FaStar, FaRegStar } from "react-icons/fa";

// Composant pour afficher et gérer les étoiles
const StarRating = ({ rating, setRating, interactive = false }) => {
    const [hover, setHover] = useState(null);

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
                                ratingValue <= (hover || rating) ? "filled" : ""
                            }`}
                            onClick={() =>
                                interactive && setRating(ratingValue)
                            } // Met à jour la note si interactif
                            onMouseEnter={() =>
                                interactive && setHover(ratingValue)
                            } // Gère le survol si interactif
                            onMouseLeave={() => interactive && setHover(null)} // Réinitialise le survol
                            style={{
                                cursor: interactive ? "pointer" : "default",
                            }}
                        >
                            {ratingValue <= (hover || rating) ? (
                                <FaStar />
                            ) : (
                                <FaRegStar />
                            )}
                        </span>
                    );
                })}
        </div>
    );
};

// Composant pour afficher une carte de review
const ReviewCard = ({ reviewId }) => {
    const [reviewData, setReviewData] = useState(null);

    useEffect(() => {
        // Récupération des données de la revue depuis Firestore
        const fetchReview = async () => {
            const reviewRef = doc(db, "reviews", reviewId);
            const reviewSnap = await getDoc(reviewRef);

            if (reviewSnap.exists()) {
                setReviewData(reviewSnap.data());
            }
        };

        if (reviewId) {
            fetchReview();
        }
    }, [reviewId]);

    return (
        <div className="review-card">
            {reviewData && (
                <>
                    <h3>{reviewData.title}</h3>
                    <p>{reviewData.text}</p>
                    {/* Affichage statique des étoiles récupérées depuis la base de données */}
                    <StarRating
                        rating={reviewData.rating}
                        interactive={false}
                    />
                    <p>{reviewData.author}</p>
                </>
            )}
        </div>
    );
};

// Composant principal pour gérer le formulaire d'avis
const ReviewForm = ({ ip }) => {
    const [form, setForm] = useState({
        title: "",
        text: "",
        author: "",
        rating: 0, // Note initiale à 0
        imageUrls: [],
    });
    const [selectedImages, setSelectedImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);

    // Soumission du formulaire d'avis
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        if (!recaptchaVerified) {
            setError(
                "Veuillez compléter le reCAPTCHA pour vérifier que vous êtes un humain."
            );
            setIsSubmitting(false);
            return;
        }

        if (!form.title || !form.text || !form.author || form.rating === 0) {
            setError(
                "Tous les champs sont obligatoires et une évaluation est requise."
            );
            setIsSubmitting(false);
            return;
        }

        let imageUrls = [];
        if (selectedImages.length > 0) {
            for (const image of selectedImages) {
                try {
                    const storageRef = ref(storage, `reviews/${image.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, image);

                    const downloadUrl = await new Promise((resolve, reject) => {
                        uploadTask.on(
                            "state_changed",
                            null,
                            (error) => reject(error),
                            async () => {
                                const url = await getDownloadURL(
                                    uploadTask.snapshot.ref
                                );
                                resolve(url);
                            }
                        );
                    });

                    imageUrls.push(downloadUrl);
                } catch (error) {
                    setError(
                        "Erreur lors du téléchargement de l'une des images."
                    );
                    setIsSubmitting(false);
                    return;
                }
            }
        }

        try {
            await addDoc(collection(db, "reviews"), {
                ...form,
                imageUrls,
                ip,
                timestamp: serverTimestamp(),
                isSpam: false,
            });

            setForm({
                title: "",
                text: "",
                author: "",
                rating: 0,
                imageUrls: [],
            });
            setSelectedImages([]);
            setRecaptchaVerified(false);
        } catch (error) {
            setError("Erreur lors de la soumission de l'avis.");
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="review-form">
            <h2>Laissez votre avis</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="title">Titre de l'avis</label>
                    <input
                        type="text"
                        id="title"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="text">Votre avis</label>
                    <textarea
                        id="text"
                        value={form.text}
                        onChange={(e) =>
                            setForm({ ...form, text: e.target.value })
                        }
                        required
                    ></textarea>
                </div>
                <div className="form-field">
                    <label htmlFor="author">Votre nom</label>
                    <input
                        type="text"
                        id="author"
                        value={form.author}
                        onChange={(e) =>
                            setForm({ ...form, author: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-field">
                    <label>Évaluation</label>
                    {/* Interaction avec les étoiles pour l'évaluation */}
                    <StarRating
                        rating={form.rating}
                        setRating={(rating) => setForm({ ...form, rating })}
                        interactive
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="image">
                        Choisissez jusqu'à 5 images (max 2 Mo par image)
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => setSelectedImages([...e.target.files])}
                        multiple
                    />
                    <p>{selectedImages.length} images sélectionnées</p>
                </div>
                <ReCAPTCHA
                    sitekey="6LfOA0YqAAAAAEdJpwGLteasoKpgkiHmj5KVzO6k"
                    onChange={(value) => setRecaptchaVerified(true)}
                />
                <button
                    type="submit"
                    className="btn"
                    disabled={isSubmitting || !recaptchaVerified}
                >
                    {isSubmitting ? "Envoi..." : "Soumettre"}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
