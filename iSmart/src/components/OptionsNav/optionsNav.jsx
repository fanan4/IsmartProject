import React from "react";
import "./optionsNav.scss";

function OptionsNav({ options, active, setActive,onClick }) {
  const arr = options.split(",");
  return (
    <div className="options-nav">
      {arr.map((item, idx) => {
        return (
          <span
            className={active === item ? "active option" : "option"}
            key={idx}
            onClick={() =>{
              setActive(item)
              onClick(item)     
             }   
          }
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}

export default OptionsNav;
