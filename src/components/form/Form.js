import React from "react";
import styled from "styled-components";

function Form({ children, email, password, request }) {
  function sendForm(e) {
    e.preventDefault();
    console.log("TENTEI");
    const emailError = email.validate();
    const passwordError = password.validate();
    if (!emailError || !passwordError) {
      console.log("Falta preencher algo");
      return;
    } else {
      console.log("pode ir pra requisição");
      request();
    }
  }

  return (
    <ContainerForm onSubmit={(e) => sendForm(e)}>{children}</ContainerForm>
  );
}

export default Form;

const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100%;
`;
