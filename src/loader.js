import React from "react";
import "./styles/Loader.css";

const Loader = () => {
    return (
        <div className="loader-body">
            <div className="loader-content">
                <div className="loader-planet">
                    <div className="loader-ring"></div>
                    <div className="loader-cover-ring"></div>
                    <div className="loader-spots">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
