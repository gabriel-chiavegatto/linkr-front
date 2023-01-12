import { useState } from "react";
import styled from "styled-components"

export default function FollowButton({ id }) {

    const [statusButton, setStatusButton] = useState("");
    function changeRelationship(){

    }
    return (
        <Container onClick={changeRelationship}>
            Follow
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