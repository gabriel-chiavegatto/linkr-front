import React from "react";
import styled from "styled-components";

function Form({ children, email, password, request }) {
  function sendForm(e) {
    e.preventDefault();
    const emailError = email.validate();
    const passwordError = password.validate();
    if (!emailError || !passwordError) {
      alert("Preencha todos os campos corretamente!")
      return;
    } else {
      request('/sign-in', 'post', {email: email.value, password: password.value}, {});
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
