// src/components/ui/input.js
import React from 'react';

const Input = ({ value, onChange, placeholder }) => {
  return (
    <input 
      type="text" 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      className="input" 
    />
  );
};

export { Input };
