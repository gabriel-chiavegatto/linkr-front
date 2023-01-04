import { useEffect } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useLocalStorage from "../../hooks/useLocalStorage";
import useForm from "../../hooks/useForm";
import Button from "../form/Button";
import Form from "../form/Form";
import Input from "../form/Input";

function BannerForm() {	
  const email = useForm('email')
  const password = useForm('password')
  const [activeButton, setActiveButton] = React.useState(true);

  const [storage, setStorage] = useLocalStorage("session_token", "");
  console.log(storage);

  	useEffect(()=>{}, [])
	function request(){ 
		
		const req = { 
			email: email.value, 
			password: password.value 
		}; 		

		const whenPromised = (response) => {
			setStorage(response.data);
		};

		axios
			.post("http://localhost:5000/sign-in", req)
			.then(res => whenPromised(res))
			.catch(err => console.error(err));
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
      <Link to={"/sign-up"}>
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
