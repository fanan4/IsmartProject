import React from "react";
import "./Spinner.scss";

import RotateLoader from "react-spinners/RotateLoader";

import colors from "../../utils/colors";

function Spinner({ init }) {
  return (
    <div className={init ? "init spinner" : "spinner"}>
      <RotateLoader
        color={colors.mainColor}
        loading={true}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
