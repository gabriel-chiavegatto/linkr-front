import React from "react";
import styled from "styled-components";

function Input({ placeholder, type, name, value, onChange, error, onBlur }) {
  return (
    <>
      <InputStyle
        onChange={onChange}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

export default Input;

const InputStyle = styled.input`
  width: 80%;
  border-radius: 4px;
  border: none;
  height: 50px;
  font-family: 'Oswald';
  box-sizing: border-box;
  font-size: 1.1rem;
  padding: 10px;
  &::placeholder {
    font-family: "Oswald";
    font-weight: bold;
    font-size: 1rem;
    color: #9f9f9f;
  }
`;

const ErrorMessage = styled.span`
  font-family: "Lato";
  font-size: 1.1rem;
  color: #D6582F;
`;
