import React from "react";
import styled from "styled-components";
import eye from "../../assets/Eye.svg";
import eyeSlash from "../../assets/EyeSlash.svg";

function Input({
  placeholder,
  name,
  value,
  onChange,
  error,
  onBlur,
  type = "text",
}) {
  const [typeInput, setTypeInput] = React.useState(type);
  function changeInput() {
    if (typeInput === "password") {
      setTypeInput("text");
    } else {
      setTypeInput("password");
    }
  }
  return (
    <ContainerInput>
      <InputStyle
        onChange={onChange}
        value={value}
        name={name}
        type={typeInput}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      {type === "password" ? (
        <Icon
          onClick={changeInput}
          src={typeInput === "password" ? eye : eyeSlash}
        />
      ) : (
        ""
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </ContainerInput>
  );
}

export default Input;

const ContainerInput = styled.div`
  width: 80%;
  position: relative;
`;

const InputStyle = styled.input`
  width: 100%;
  border-radius: 4px;
  border: none;
  height: 50px;
  font-family: "Oswald";
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

const Icon = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 27px;
  height: 27px;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  font-family: "Lato";
  font-size: 1.1rem;
  color: #d6582f;
`;
