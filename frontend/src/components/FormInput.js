import React from 'react';
import './FormInput.css';

function FormInput({
  type,
  name,
  className,
  required,
  minLength,
  maxLength,
  placeholder,
  value,
  onChange,
  inputElement,
  isInputValid,
  errorMessageText,
  pattern,
  title,
  isMainPage
}) {

  function handleCheckValidity(ev) {
    onChange(ev, inputElement);
  }

  return (
    <>
      <input
        type={type}
        name={name}
        className={typeof isInputValid === "undefined"? `${className}` : isInputValid? `${className}` : `input_type_error ${className}`}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={handleCheckValidity}
        pattern={pattern? `${pattern}` : undefined}
        title={title? `${title}` : ''}
      />
      <span className={`popup__error ${name}-error ${typeof isMainPage === "undefined"? '' : isMainPage? '' : 'popup__error_extended-max-width'}`}>{errorMessageText}</span>
    </>
  );
}

export default FormInput;
