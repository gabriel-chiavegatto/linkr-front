import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';

import useRequest from "../hooks/useRequest";

import Header from "../components/Header";
import Title from "../components/Title";
import Post from "../components/homepage/Post";
import TrendingList from "../components/homepage/TrendingList";
import SkeletonLoading from "../components/homepage/SkeletonLoading";

export default function HashtagPage() {

    const { hashtag } = useParams();
    console.log('hashtag >>', hashtag);
    const { error, loading, value, request, setError } = useRequest();
    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem("session_token"));
    const headers = { authorization: "Bearer " + token };

    useEffect(() => {

        if (!token) {
            navigate('/sign-in')
        }

        request(`/hashtag/${hashtag}`, 'get', {}, { headers });

    }, [hashtag]);

    console.log("HERE", value)
    if (error) console.log("REQUEST ERROR", error)
    return (
        <ContainerHome>
            <Header />
            <ContainerFeed>
                <Main>
                    <Title>#{hashtag}</Title>
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

const ContainerHome = styled.div`
  background-color: #333333;
  height: 100%;
  width: 100%;
`;

const ThereAreNoPosts = styled.p`
  font-family: 'Lato';
  font-size: 1.5rem;
  color: #fff;
  margin-top: 20px;
`

const ContainerError = styled.div`
  width: 600px;
  position: fixed;
  top: 80px;
  right: 10px;
  z-index: 1;
`


const ContainerFeed = styled.div`
  background-color: #333333;
  height: 100%;
  width: 100%;
  padding-top: 5%;
  box-sizing: border-box;
	display: flex;
	justify-content: center;

	`;

const Main = styled.div`
	width: 75%;
`;

const Timeline = styled.div`
	width: 65%;

`;

const Feed = styled.div`
	display: flex;
	width: 100%;
`;

const Posts = styled.div`
	width: 100%;
`;

const Trendings = styled.div`
	width: 35%;
`;
