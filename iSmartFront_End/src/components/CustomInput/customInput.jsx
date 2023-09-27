import React from "react";
import "./customInput.scss";

function CustomInput({
  name,
  inputStyles,
  labelStyles,
  children,
  noLabel,
  pass,
  placeholder,
  styles,
  value,
  onChange,
  label,
}) {



  return (
    <div className="custom-input" style={styles}>
      {noLabel ? null : (
        <label className="label" htmlFor={name} style={labelStyles}>
          {label}
        </label>
      )}
      {children}
      <input
        name={name}
        className="input"
        style={inputStyles}
        placeholder={placeholder}
        type={pass ? "password" : "text"}
        value={value}
        onChange={(e)=>onChange(e)} 
      />
    </div>
  );
}

export default CustomInput;
