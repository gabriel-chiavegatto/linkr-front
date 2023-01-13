import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useRequest from "../../hooks/useRequest.js";
import ConfigContext from "../../configContext";


export default function TrendingList({ trendlist, setTrendSelected, gotoHashtag }) {

    const user = useContext(ConfigContext)
    const headers = { authorization: "Bearer " + user.token };
    const navigate = useNavigate();
    const { error, loading, value, request, setError } = useRequest();


    useEffect(() => {
        request('/hashtag', 'get', {}, { headers })
    }, [])



    return (
        <Main>
            <Title onClick={() => gotoHashtag()}>Hashtag</Title>
            <Contents>
                {!value && loading ? <Hashtag>LOADING...</Hashtag> :
                    (value?.data.length === 0 ?
                        <Hashtag>There is no hashtags</Hashtag> :
                        value?.data.map(el => {
                            return <Hashtag key={el.index} onClick={() => navigate(`/hashtag/${el.name}`)} ># {el.name}</Hashtag>
                        }))
                }
            </Contents>
        </Main>)
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
    cursor: pointer;
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