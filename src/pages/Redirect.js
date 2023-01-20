import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import styled from "styled-components";

export default function Redirect(){

    const navigate = useNavigate();
    const [storage] = useLocalStorage("session_token");
    
    useEffect(() => {
        if(storage){
            axios
                .post(`${process.env.REACT_APP_API_BASE_URL}/session`, {session_token: storage.token})
                .then(res => {
                    navigate("/timeline")
                })
                .catch(err => {
                    console.error(err)
                });
        }else{    
            navigate("/sign-in")
        }
    }, []);
    return(<Bg>521 Web server is Down</Bg>);
}

const Bg = styled.div`
    background-color: #333;
`;