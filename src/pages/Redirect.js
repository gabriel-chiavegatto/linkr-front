import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import styled from "styled-components";

export default function Redirect(){

    const navigate = useNavigate();
    const [storage] = useLocalStorage("session_token");
    
    useEffect(() => {
        console.log(storage);
        if(storage){
            axios
                .post(`${process.env.REACT_APP_API_BASE_URL}/session`, {session_token: storage})
                .then(res => {
                    navigate("/timeline")
                    console.log(res)
                })
                .catch(err => {
                    console.error(err)
                });
        }else{    
            navigate("/sign-in")
        }
    }, []);

    return(<Bg>abc</Bg>);
}

const Bg = styled.div`
    background-color: #333;
`;