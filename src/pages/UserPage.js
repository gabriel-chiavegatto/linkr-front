
import styled from "styled-components";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ConfigContext from "../configContext";

import Header from "../components/Header";
import Title from "../components/Title";
import Post from "../components/homepage/Post";
import TrendingList from "../components/homepage/TrendingList";
import SkeletonLoading from "../components/homepage/SkeletonLoading";
import useRequest from '../hooks/useRequest.js';


import { ContainerHome, ThereAreNoPosts, ContainerFeed, Main, Timeline, Feed, Posts, Trendings } from '../style/styledFeed'



export default function UserPage() {

    const { error, loading, value, request, setError } = useRequest();

    const token = JSON.parse(localStorage.getItem("session_token"));
    const config = { headers: { authorization: "Bearer " + token } };

    const { id } = useParams();
    const req = useContext(ConfigContext)
    console.log("req", req)

    useEffect(() => {
        request(`/user/${id}`, "get", {}, config)
    }, [])

    console.log("HERE", value)
    if (error) console.log("REQUEST ERROR", error)

    return (
        <ContainerHome>
            <Header />
            <ContainerFeed>
                <Main>
                    <TitleContainer>
                        <Title>{value ? <>{value.data[0].username + "'s posts"}</> : <>Loading...</>}</Title>
                        <button>Follow</button>
                    </TitleContainer>
                    <Feed>
                        <Timeline>
                            <Posts>
                                {!value && loading ?
                                    <SkeletonLoading /> :
                                    (
                                        value?.data.length === 0 ?
                                            <ThereAreNoPosts>There Are No Posts</ThereAreNoPosts> :
                                            value?.data.map((p) => {

                                                return (
                                                    <Post
                                                        key={p.index}
                                                        user_id={p.user_id}
                                                        id={p.id}
                                                        youLiked={p.youLiked}
                                                        src={p.picture_url}
                                                        likes={p.Number_of_likes}
                                                        username={p.username}
                                                        description={p.description}
                                                        descriptionLink={p.descriptionLink}
                                                        titleLink={p.titleLink}
                                                        link={p.link}
                                                        imageLink={p.imageLink}
                                                    />
                                                );
                                            })
                                    )}
                            </Posts>
                        </Timeline>
                        <Trendings>
                            <TrendingList />
                        </Trendings>
                    </Feed>
                </Main>
            </ContainerFeed>
        </ContainerHome>
    );
}

const TitleContainer = styled.div`
    width: 100%;
    padding: 50px 0 40px;
    display: flex;
    justify-content: space-between;

    button{
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
    }
`;