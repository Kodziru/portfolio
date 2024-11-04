import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css"; // Importation du CSS ajusté

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    // Utilisation de useEffect pour ajouter ou retirer la classe 'no-scroll' du body et 'nav-open' du header
    useEffect(() => {
        const header = document.querySelector(".header");
        if (isMenuOpen) {
            document.body.classList.add("no-scroll");
            header.classList.add("nav-open");
        } else {
            document.body.classList.remove("no-scroll");
            header.classList.remove("nav-open");
        }
    }, [isMenuOpen]); // Se déclenche lorsque isMenuOpen change

    return (
        <header className={`header ${isMenuOpen ? "nav-open" : ""}`}>
            <div className="header-container">
                {/* Menu burger button */}
                <button
                    className={`menu-button ${isMenuOpen ? "open" : ""}`}
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation menu"
                >
                    <span className="menu-icon"></span>
                    <span className="menu-icon"></span>
                    <span className="menu-icon"></span>
                </button>

                {/* Navigation Menu */}
                <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
                    <ul>
                        <li>
                            <Link to="/explore" onClick={handleLinkClick}>
                                Exploration
                            </Link>
                        </li>
                        <li>
                            <Link to="/services" onClick={handleLinkClick}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={handleLinkClick}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
