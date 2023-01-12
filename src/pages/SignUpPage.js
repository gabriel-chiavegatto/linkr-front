import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import BannerLinkr from "../components/authPages/BannerLinkr";
import Button from "../components/form/Button";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import useForm from "../hooks/useForm";

export default function SignUp() {
  const email = useForm("email");
  const password = useForm("password");
  const confirmPassword = useForm("confirm password");
  const username = useForm("username");
  const picture_url = useForm("");
  const [habilit, setHabilit] = useState(false);
  const [disabled, setDisabled] = useState(false);

  let navigate = useNavigate();


  function signUp(event) {
    event.preventDefault();

    setHabilit(true);
    setDisabled(true);

    const registration = {
      username,
      email,
      password,
      confirmPassword,
      picture_url,
    };

    const promise = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/sign-up`,
      registration
    );

    promise.then((resp) => {
      alert("Parabéns por ter criado sua conta");
      navigate("/");
      setHabilit(false);
      setDisabled(false);
    });

    promise.catch((err) => {
      if(err?.response.data.message){
        alert(err.response.data.message);
      }else{
        alert("Unfortunately, it was not possible to complete your registration, please try again later!");
      }
      setHabilit(false);
      setDisabled(false);
    });
  }

  return (
   <ContainerLogin>
    <BannerLinkr></BannerLinkr>
    <BannerForm>
        <Form onSubmit={signUp}>
            <Input disabled={disabled} placeholder={"E-mail"} {...email}/>
            <Input disabled={disabled} placeholder={"Password"} {...password} password={true} type={"password"}/>
            <Input disabled={disabled} placeholder={"Confirm Password"} {...confirmPassword} password={true} type={"password"}/>
            <Input disabled={disabled} placeholder={"Username"} {...username}/>
            <Input disabled={disabled} placeholder={"Picture URL"}/>
            <Button disabled={disabled} onClick={signUp}>{habilit? <ThreeDots color="#ffffff" width={100} height={50}/> :  "Sign Up"}</Button>
        </Form>
        <Link to={"/"}>
          <RedirectPage>Switch back to log in</RedirectPage>
        </Link>
    </BannerForm>
   </ContainerLogin>
  );
}

const ContainerLogin = styled.div`
  display: flex;
  @media (max-width: 600px){
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #3e3e3e;
  }
`

const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & input {
    width: 303px;
    height: 45px;
    margin-top: 10px;
    border: 1px solid rgb(207, 207, 207);
    border-radius: 3px;
    padding-left: 10px;
    font-size: 20px;
    ::placeholder {
      font-size: 20px;
      color: black;
    }
  }
  & a {
    text-decoration: none;
  }
`;

const RedirectPage = styled.span`
  font-family: "Lato";
  font-size: 1.25rem;
  color: #fff;
  text-decoration: underline;
`;

const BannerForm = styled.div`
    background-color: #3e3e3e;
  width: 40%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  @media (max-width: 600px){
    width: 100%;
    gap: 30px;
    height: 100vh;
    justify-content: start;
    margin-top: 60px;
  }
`
