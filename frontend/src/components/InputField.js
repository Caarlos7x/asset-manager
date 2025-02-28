// src/components/InputField.js

import React from 'react';

const InputField = ({ label, name, value, onChange }) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputField;
