import React, {useState} from "react";
import styled from "styled-components";

export default function TrendingList(){



    return (
    <Main>
        <Title>Hashtag</Title>
        <Contents>
            <Hashtag># chess</Hashtag>
            <Hashtag># chess</Hashtag>
            <Hashtag># chess</Hashtag>
            <Hashtag># chess</Hashtag>
        </Contents>
    </Main>);
}

const Main = styled.div`
    width: 95%;
    background-color: #171717;
    margin-top: 20px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
`;
const Contents = styled.div`
    height: 100%;
    padding: 1.2rem 0;
`;
const Hashtag = styled.div`
    font-weight: 600;
    font-size: 1.1rem;
    color: #fff;
    padding: .3rem 1rem;
`;
const Title = styled.div`
    display: flex;
    align-items: center;
    padding-left: 1rem;
    height: 3rem;
    color: #fff;
    border-bottom: 1px solid #555;
    width: 100%;
    font-size: 1.6rem;
`;