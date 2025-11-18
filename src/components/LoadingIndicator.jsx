import React from "react";
import "./LoadingIndicator.css";

function LoadingIndicator({ message = "Loading..." }) {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
}

export default LoadingIndicator;