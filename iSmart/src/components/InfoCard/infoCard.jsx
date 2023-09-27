import React from "react";
import "./infoCard.scss";

// local components
import TextHeader from "../TextHeader/textHeader";

// external components
import { FiTrendingUp } from "react-icons/fi";

const numberStyles = {
  fontWeight: "500",
};

const titleStyles = {
  fontWeight: "500",
  fontSize: "16px",
};

const iconStyles = {
  position: "absolute",
  fontSize: "15px",
  left: "0",
  top: "0.1rem",
  color: "#32CD32",
};

function InfoCard({ title, number, progress }) {
  return (
    <div className="info-card">
      <TextHeader level="small" value={title} styles={titleStyles} />
      <TextHeader level="mid" value={number} styles={numberStyles} />
      <span className="progress">
        <FiTrendingUp style={iconStyles} />
        {progress} %
      </span>
    </div>
  );
}

export default InfoCard;
