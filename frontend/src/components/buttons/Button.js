import React from "react";
import "./Button.css"; // O arquivo CSS para estilizar os botões

const Button = ({ type, onClick, text, className, disabled }) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
