import React from "react";
import "./dropDown.scss";

function DropDown({ children, styles, top }) {
  return (
    <div className="drop-down" style={{ ...styles, top: top }}>
      {children}
    </div>
  );
}

export default DropDown;
