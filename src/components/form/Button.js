import React from "react";
import styled from "styled-components";

function Button({ children, activeButton, request }) {
  return <ButtonStyle disabled={!activeButton} onClick={request} stateButton={activeButton}>{children}</ButtonStyle>;
}

export default Button;

const ButtonStyle = styled.button`
  width: 81%;
  background-color: ${(props) => (props.stateButton ? "#1877F2" : "#004195")};
  border: none;
  border-radius: 4px;
  height: 50px;
  font-family: "Oswald";
  font-weight: bold;
  font-size: 1rem;
  color: #fff;
`;
