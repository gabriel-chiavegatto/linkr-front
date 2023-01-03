import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useForm from "../../hooks/useForm";
import Button from "../form/Button";
import Form from "../form/Form";
import Input from "../form/Input";

function BannerForm() {
  const email = useForm('email')
  const password = useForm('password')
  const [activeButton, setActiveButton] = React.useState(true);

  function request(){
    setActiveButton(false)
    setTimeout(() => {
      setActiveButton(true)
    }, 3000)
  }

  return (
    <Banner>
      <Form request={request} email={email} password={password}>
        <Input placeholder={"E-mail"} {...email}/>
        <Input placeholder={"Password"} {...password}/>
        <Button request={request} activeButton={activeButton}>Log In</Button>
      </Form>
      <Link to={"/feed"}>
        <RedirectPage>First time? Create an account!</RedirectPage>
      </Link>
    </Banner>
  );
}

export default BannerForm;

const Banner = styled.div`
  background-color: #3e3e3e;
  width: 40%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const RedirectPage = styled.span`
  font-family: "Lato";
  font-size: 1.25rem;
  color: #fff;
  text-decoration: underline;
`;
