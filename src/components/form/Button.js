import React from "react";
import styled from "styled-components";

function Button({ loading, request, email, password }) {
  return (
    <ButtonStyle
      disabled={loading}
      onClick={() =>
        request(
          "/sign-in",
          "post",
          { email: email.value, password: password.value },
          {}
        )
      }
      stateButton={loading}
    >
      {loading ? 'loading...' : 'Log in'}
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
`;
