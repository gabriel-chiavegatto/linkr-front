import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import { ContainerHome, ThereAreNoPosts, ContainerFeed, Main, Timeline, Feed, Posts, Trendings } from '../style/styledFeed'

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

    const user = JSON.parse(localStorage.getItem("session_token"));
    const headers = { authorization: "Bearer " + user.token };

    useEffect(() => {

        if (!user.token) {
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

