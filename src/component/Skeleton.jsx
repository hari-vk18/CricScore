import React from 'react';
import './css/Skeleton.css'
const LoadingCard = ({ title, text }) => {
    return (
        <div className="loading-card" aria-busy="true" aria-label={title || 'Loading...'}>
            <div className="loading-card-content">
                <div className="loading-card-title">{title || 'Loading...'}</div>
                <div className="loading-card-text">{text || 'Loading...'}</div>
                <div className="loading-animation">
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingCard;