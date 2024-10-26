import React, { useState, useCallback } from "react";
import {
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaPhp,
    FaWordpress,
    FaShopify,
    FaFigma,
    FaDatabase,
} from "react-icons/fa";
import { SiFirebase, SiScikitlearn } from "react-icons/si";
import classNames from "classnames";
import "../../styles/mainPage/Skills.css";

// Composant pour afficher chaque skill
const SkillItem = ({ skill, lockedSkill, handleLockSkill }) => {
    const isLocked = lockedSkill === skill.name;

    return (
        <div
            className={classNames("skill-item", { locked: isLocked })}
            onClick={() => handleLockSkill(skill.name)}
            onKeyPress={(e) => e.key === "Enter" && handleLockSkill(skill.name)}
            tabIndex={0}
            role="button"
            aria-pressed={isLocked}
            aria-label={
                isLocked
                    ? `${skill.name} is locked. Press Enter to unlock.`
                    : `${skill.name} is unlocked. Press Enter to lock.`
            }
        >
            <div className="icon-container">{skill.icon}</div>
            <div className="skill-text">
                <span>{skill.name}</span>
                {isLocked && <p className="skill-details">{skill.details}</p>}
            </div>
        </div>
    );
};

// Séparation des données des compétences avec descriptions personnalisées
const skillData = [
    {
        name: "HTML5",
        icon: <FaHtml5 />,
        details:
            "Je maîtrise parfaitement HTML5. C'est la base de toute structure web que je construis. J'ai une solide expérience dans la création de sites robustes et performants avec ce langage.",
    },
    {
        name: "CSS3",
        icon: <FaCss3Alt />,
        details:
            "Le design web est l'un de mes points forts grâce à ma parfaite maîtrise de CSS3. Je sais créer des interfaces élégantes et adaptées à tous les appareils.",
    },
    {
        name: "SCSS",
        icon: <SiScikitlearn />,
        details:
            "Avec SCSS, je peux écrire des styles de manière plus modulaire et réutilisable. Cela me permet de créer des feuilles de style maintenables et efficaces pour des projets à grande échelle.",
    },
    {
        name: "JavaScript",
        icon: <FaJs />,
        details:
            "J'ai un bon niveau en JavaScript. Je l'utilise régulièrement pour rendre les sites web interactifs et dynamiques. Je continue d'améliorer mes compétences dans ce domaine.",
    },
    {
        name: "React",
        icon: <FaReact />,
        details:
            "J'ai un niveau intermédiaire en React. Je suis à l'aise pour construire des interfaces utilisateur modernes et performantes, tout en explorant constamment de nouvelles approches pour améliorer mes compétences.",
    },
    {
        name: "PHP",
        icon: <FaPhp />,
        details:
            "PHP fait partie de mes compétences débutantes, principalement utilisé pour des projets WordPress. Je continue à explorer ses possibilités pour le développement backend.",
    },
    {
        name: "WordPress",
        icon: <FaWordpress />,
        details:
            "J'ai une bonne expérience dans la création de sites WordPress. Que ce soit pour des blogs ou des sites vitrine, je sais tirer parti des thèmes et des plugins pour offrir des solutions sur mesure.",
    },
    {
        name: "Shopify",
        icon: <FaShopify />,
        details:
            "Je suis capable de créer des boutiques Shopify à un niveau intermédiaire. J'aime rendre l'expérience utilisateur fluide et agréable pour les e-commerces.",
    },
    {
        name: "Figma",
        icon: <FaFigma />,
        details:
            "Figma est mon outil de prédilection pour le design UI/UX. Je suis capable de traduire des idées en prototypes interactifs, offrant ainsi des designs intuitifs et engageants.",
    },
    {
        name: "NoSQL",
        icon: <FaDatabase />,
        details:
            "Je suis débutant en NoSQL, mais j'ai déjà utilisé des bases de données non relationnelles pour des projets spécifiques. J'apprends constamment pour renforcer mes compétences dans ce domaine.",
    },
    {
        name: "Firebase",
        icon: <SiFirebase />,
        details:
            "Firebase est un outil que j'utilise à un niveau débutant. Je l'ai utilisé principalement pour des applications simples en temps réel, et je suis en train de perfectionner mes connaissances.",
    },
];

// Composant principal Skills
const Skills = () => {
    const [lockedSkill, setLockedSkill] = useState(null);

    const handleLockSkill = useCallback(
        (skill) => {
            setLockedSkill(skill === lockedSkill ? null : skill);
        },
        [lockedSkill]
    );

    return (
        <div className="skills-icons">
            {skillData.map((skill) => (
                <SkillItem
                    key={skill.name}
                    skill={skill}
                    lockedSkill={lockedSkill}
                    handleLockSkill={handleLockSkill}
                />
            ))}
        </div>
    );
};

export default Skills;
