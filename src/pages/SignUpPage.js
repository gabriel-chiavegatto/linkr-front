import styled from "styled-components";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import BannerLinkr from '../components/authPages/BannerLinkr';
import Input from "../components/form/Input";
import Button from "../components/form/Button";

export default function SignUp(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [picture_url, setPicture_url] = useState("");
    const [habilit, setHabilit] = useState(false);
    const [disabled, setDisabled] = useState(false);

    let navigate = useNavigate();

    function signUp(event){

        event.preventDefault();

        setHabilit(true);
        setDisabled(true);

        const registration = {
            username,
            email,
            password,
            confirmPassword,
            picture_url
        };

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-up`, registration);

        promise.then((resp => { alert('Parabéns por ter criado sua conta'); navigate("/");}));

        promise.catch((err) => {alert(err.response.data.message); setHabilit(false); setDisabled(false)});
    }

    return (
        <>
            <ContainerLogin>
                <BannerLinkr></BannerLinkr>

            <Banner>
                <form onSubmit={signUp} >
                    <DivInput>
                        <Input disabled={disabled} placeholder="Nome" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required></Input>
                        <Input disabled={disabled} placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></Input>
                        <Input disabled={disabled} placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></Input>
                        <Input disabled={disabled} placeholder="Confirme a senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></Input>
                        <Input disabled={disabled} placeholder="Foto" type="text" value={picture_url} onChange={(e) => setPicture_url(e.target.value)} required></Input>
                        <Button disabled={disabled} type="submit"> {!habilit ? "Criar Conta" : <ThreeDots color={"white"}/>} </Button>
                    </DivInput>
                </form>
            
                <Link to={"/"}>
                    <RedirectPage>Switch back to login!</RedirectPage>
                </Link>
            </Banner>
            </ContainerLogin>
        </>
    )
}

const ContainerLogin = styled.div`
  display: flex;
`

const DivInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & input{
        width: 303px;
        height: 45px;
        margin-top: 10px;
        border: 1px solid rgb(207,207,207);
        border-radius: 3px;
        padding-left: 10px;
        font-size: 20px;
        ::placeholder{
            font-size: 20px;
            color: black;
        }
    }
    & a{
        text-decoration: none;
    }
   
`

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
