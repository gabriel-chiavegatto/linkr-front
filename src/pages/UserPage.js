
import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfigContext from "../configContext";

import axios from "axios";

import Header from "../components/Header";
import Title from "../components/Title";
import Post from "../components/homepage/Post";
import TrendingList from "../components/homepage/TrendingList";
import SkeletonLoading from "../components/homepage/SkeletonLoading";
import useRequest from '../hooks/useRequest.js';
import { AuthContext } from "../Auth";
import UserSearched from "../components/userSearched";


import { ContainerHome, ThereAreNoPosts, ContainerFeed, Main, Timeline, Feed, Posts, Trendings } from '../style/styledFeed'




export default function UserPage() {


    const { error, loading, value, request, setError } = useRequest();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("session_token"));
    const config = { headers: { authorization: "Bearer " + user.token } };


    const { id } = useParams();
    const req = useContext(ConfigContext)
	const headers = { authorization: "Bearer " + user.token };
    const { quest } = useContext(AuthContext)

    useEffect(() => {

        let link = `/user/${id}`
        request(link, "get", {}, config);
        
        if(!user.token){
          navigate('/sign-in')
        }
        
      }, []);

    if (error) console.log("REQUEST ERROR", error)

    return (
        <ContainerHome>
            <Header />
            <DivUsers>
				{quest?.map((item, i) => <UserSearched item={item} key={i} />)}
			</DivUsers>
            <ContainerFeed>
                <Main>
                    <TitleContainer>
                        <Title>{value ? <>{value && value.data.user + "'s posts"}</> : <>Loading...</>}</Title>
                        <button>Follow</button>
                    </TitleContainer>
                    <Feed>
                        <Timeline>
                            <Posts>
                                { !value  && loading ? 
                                    <SkeletonLoading /> :
                                    (
                                    value?.data.length === 0 ? 
                                    <ThereAreNoPosts>There Are No Posts</ThereAreNoPosts> :
                                    value?.data.map((p, index) => {
                                            const addons = (p.is_repost)? {is_repost: p.is_repost, username_repost: p.username_repost}: {};
                                            return (
                                                <Post
                                                    key={index}
                                                    user_id={p.user_id}
                                                    id={p.post_gid}
                                                    youLiked={p.youLiked}
                                                    src={p.picture_url}
                                                    likes={p.number_of_likes}
                                                    username={p.username}
                                                    description={p.description}
                                                    commentsCount={p.comments_post}
                                                    repostsCount={p.reposts_post}
                                                    descriptionLink={p.descriptionLink}
                                                    titleLink={p.titleLink}
                                                    link={p.link}
                                                    imageLink={p.imageLink}
                                                    addOns={addons}
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
const DivUsers = styled.div`

    position: relative;
    left: 0;
	top: -13px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`
