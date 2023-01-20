import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useForm from "../../hooks/useForm";
import useLocalStorage from "../../hooks/useLocalStorage";
import useRequest from "../../hooks/useRequest";
import Button from "../form/Button";
import Form from "../form/Form";
import Input from "../form/Input";
import ConfigContext from '../../configContext'

function BannerForm() {
  const email = useForm("email");
  const password = useForm("password");
  const { error, loading, value, request, setError } = useRequest();
  const [storage, setStorage] = useLocalStorage("session_token");
  const navigate = useNavigate();
  const context = useContext(ConfigContext)

  useEffect(() => {
    if (value) {
      setStorage(value.data);
    }
  }, [value]);

  if (value?.data && !error) {
    context.setUser(value.data)
    navigate("/timeline");
  }

  if (error) {
    alert(error.response.data);
    setError(null);
  }

  return (
    <Banner>
      <Form request={request} email={email} password={password}>
        <Input placeholder={"E-mail"} {...email} />
        <Input
          type={"password"}
          placeholder={"Password"}
          {...password}
          password={true}
        />
        <Button
          onClick={() =>
            request(
              "/sign-in",
              "post",
              { email: email.value, password: password.value },
              {}
            )
          }
          email={email}
          password={password}
          loading={loading}
        >
          Log In
        </Button>
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
  @media (max-width: 600px) {
    width: 100%;
    gap: 30px;
    height: 100vh;
    justify-content: start;
    margin-top: 60px;
  }
`;

const RedirectPage = styled.span`
  font-family: "Lato";
  font-size: 1.25rem;
  color: #fff;
  text-decoration: underline;
`;
