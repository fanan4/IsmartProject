import React from "react";
import "./textHeader.scss";

const renderSwitch = (level, value, styles) => {
  switch (level) {
    case "big":
      return <h1 style={styles}>{value}</h1>;
    case "mid":
      return <h2 style={styles}>{value}</h2>;
    case "small":
      return <h3 style={styles}>{value}</h3>;
  }
};

function TextHeader({ level, value, styles }) {
  return renderSwitch(level, value, styles);
}

export default TextHeader;
