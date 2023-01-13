import { useState, useContext, useEffect } from "react";
import styled from "styled-components"
import ConfigContext from "../../configContext";
import useRequest from "../../hooks/useRequest";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function FollowButton() {

    const { user } = useContext(ConfigContext);
    const config = { headers: { authorization: "Bearer " + user.token } };
    const [statusButton, setStatusButton] = useState("Loading...");
    const [colorButton, setColorButton ] = useState("background: #FFFFFF")
    const userPageId = (useParams()).id;
    const { error, loading, value, request, setError } = useRequest();

    useEffect(() => {
        console.log("TRYYYYY")
        request(`/relationship/${userPageId}`, 'get', {}, config);
    },[]);

    if(value) console.log("value",value)
    if(error) console.log("error",error)


    async function changeRelationship() {
        try {
            let newRelationship;
            newRelationship = "follow";

            console.log('try');

            axios.post(`/${newRelationship}/${userPageId}`, {}, config)

            // setColorButton()

        } catch (error) {
            alert("Algo deu errado, tente novamente")
            console.log(error)
        }
    }

    return (
        <Container onClick={changeRelationship}>
            {statusButton}
        </Container>
    )
}

const Container = styled.button`

    width: 112px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
    border: none;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
`;