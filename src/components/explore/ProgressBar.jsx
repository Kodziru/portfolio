import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "../../styles/variables.css";

// Styled components
const ProgressBarWrapper = styled.div`
    width: 100%;
    height: 10px;
    background-color: var(--background-color);
    border-radius: 20px;
    position: relative;
    overflow: visible;
    margin-bottom: 30px;
`;

const FullWidthBar = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ddd;
    border-radius: 20px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`;

const BackgroundBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.width}%;
    background-color: ${(props) => props.color};
    border-radius: 20px;
    z-index: 2;
    transition: width 1.5s ease-in-out;
`;

const ForegroundBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.width}%;
    background: ${(props) => props.gradient};
    border-radius: 20px;
    z-index: 3;
    transition: width 1.5s ease-in-out;
`;

const StatusBubble = styled.div`
    position: absolute;
    top: calc(50% - 40px);
    left: ${(props) => props.left}%;
    transform: translateX(-50%);
    background-color: ${(props) => props.color};
    color: white;
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    white-space: nowrap;
    transition: opacity 0.4s ease, transform 0.4s ease;
    opacity: ${(props) => (props["data-is-visible"] ? 1 : 0)};
    transform: ${(props) =>
        props["data-is-visible"]
            ? "translateX(-60%)"
            : "translate(-50%, -30px)"};
`;

const StatusBubbleBelow = styled.div`
    position: absolute;
    top: calc(50% + 10px);
    left: ${(props) => props.left}%;
    transform: translateX(-50%);
    background-color: ${(props) => props.color};
    color: white;
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    white-space: nowrap;
    transition: opacity 0.4s ease, transform 0.4s ease;
    opacity: ${(props) => (props["data-is-visible"] ? 1 : 0)};
    transform: ${(props) =>
        props["data-is-visible"]
            ? "translateX(-50%)"
            : "translate(-50%, 30px)"};
`;

const ProgressBar = ({
    backgroundProgress = 70,
    foregroundProgress = 30,
    backgroundColor = "",
    foregroundGradient = "",
    backgroundStatus = "",
    foregroundStatus = "",
    showBackgroundStatus = true,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const progressBarRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        if (progressBarRef.current) {
            observer.observe(progressBarRef.current);
        }
        return () => {
            if (progressBarRef.current) {
                observer.unobserve(progressBarRef.current);
            }
        };
    }, []);

    return (
        <ProgressBarWrapper ref={progressBarRef}>
            <FullWidthBar />
            <BackgroundBar
                width={isVisible ? backgroundProgress : 0}
                color={backgroundColor}
            />
            <ForegroundBar
                width={isVisible ? foregroundProgress : 0}
                gradient={foregroundGradient}
            />
            <StatusBubble
                data-is-visible={isVisible}
                left={foregroundProgress}
                color={foregroundGradient}
            >
                {foregroundStatus}
            </StatusBubble>
            {showBackgroundStatus && (
                <StatusBubbleBelow
                    data-is-visible={isVisible}
                    left={backgroundProgress}
                    color={backgroundColor}
                >
                    {backgroundStatus} - {backgroundProgress}%
                </StatusBubbleBelow>
            )}
        </ProgressBarWrapper>
    );
};

export default ProgressBar;
