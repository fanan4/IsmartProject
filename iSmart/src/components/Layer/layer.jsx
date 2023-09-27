import React from "react";
import "./layer.scss";

function Layer({ children, onClick }) {
  return (
    <div onClick={onClick} className="layer">
      <div className="popup">{children}</div>
    </div>
  );
}

export default Layer;
