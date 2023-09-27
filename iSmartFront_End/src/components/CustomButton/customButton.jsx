import React from "react";
import "./customButton.scss";

function CustomButton({ value, styles, onClick, children }) {
  return (
    <div>
      <button type="button" className="btn" style={styles} onClick={onClick}>
        {children || value} 
      </button>
    </div>
  );
}

export default CustomButton;
