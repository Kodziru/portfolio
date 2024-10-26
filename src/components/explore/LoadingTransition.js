import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

// Keyframes for fading in the parent container after loading
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Circular loader styles
const LoaderWrapper = styled.div`
    position: relative;
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--background-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const CircleBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 8px solid #e6e6e6; /* Light grey background */
`;

const CircleProgress = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 8px solid transparent; /* Transparent center */
    border-top-color: var(--primary-color); /* Solid progress color */
    border-right-color: var(--primary-color);
    clip: rect(0px, 160px, 160px, 80px); /* Clip circle into two halves */
    transform: rotate(${(props) => props.progress}deg);
    transition: transform 0.4s ease-in-out;
`;

const ProgressText = styled.div`
    position: absolute;
    font-size: 24px;
    font-weight: 600;
    color: var(--primary-color);
    z-index: 1;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* Light shadow for clarity */
`;

const ParentContainer = styled.div`
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transition: opacity 1s ease;
    ${(props) =>
        props.visible &&
        css`
            animation: ${fadeIn} 1s ease forwards;
        `}
`;

// Main Loader Component
const LoadingTransition = ({ setLoading }) => {
    const [progress, setProgress] = useState(0);
    const [loading, setInternalLoading] = useState(true); // State to manage loading

    useEffect(() => {
        const fastProgressTimer = setInterval(() => {
            if (progress < 96) {
                setProgress((prev) => prev + 1);
            }
        }, 20); // Faster increment to 96%

        const slowProgressTimer = () => {
            if (progress >= 96 && progress < 100) {
                setTimeout(() => {
                    setProgress((prev) => prev + 1);
                }, Math.random() * (500 - 300) + 300); // Slightly faster increment from 96% to 100%
            }
        };

        if (progress >= 96 && progress < 100) {
            clearInterval(fastProgressTimer); // Stop fast increment at 96%
            slowProgressTimer();
        }

        if (progress === 100) {
            setTimeout(() => {
                setInternalLoading(false); // Set internal loading to false after 100%
                setLoading(false); // Notify the parent component that loading is complete
            }, 1000); // Keep the progress at 100% for 1 second
        }

        return () => {
            clearInterval(fastProgressTimer); // Cleanup timers
        };
    }, [progress, setLoading]);

    // Convert progress percentage to degrees (0% = 0deg, 100% = 360deg)
    const progressInDegrees = (progress / 100) * 360;

    return (
        <>
            {loading && (
                <LoaderWrapper>
                    {/* Empty circle outline */}
                    <CircleBackground />
                    {/* Progress circle */}
                    <CircleProgress progress={progressInDegrees} />
                    {/* Percentage text */}
                    <ProgressText>{progress}%</ProgressText>
                </LoaderWrapper>
            )}
        </>
    );
};

export default LoadingTransition;
