import React from "react";
import styled from "styled-components";

function Button({ loading, request, email, password, children, onClick }) {
  return (
    <ButtonStyle
      disabled={loading}
      onClick={onClick
      }
      stateButton={loading}
    >
      <div>{loading ? 'loading...' : children}</div>
    </ButtonStyle>
  );
}

export default Button;

const ButtonStyle = styled.button`
  width: 81%;
  background-color: ${(props) => (props.stateButton ? "#004195" : "#1877F2")};
  border: none;
  border-radius: 4px;
  height: 50px;
  font-family: "Oswald";
  font-weight: bold;
  font-size: 1rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  &:hover{
    background-color: #0058c4;
    transition: 0.3s;
  }
`;
