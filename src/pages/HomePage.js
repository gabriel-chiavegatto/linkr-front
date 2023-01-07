import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/homepage/Post";
import Publish from "../components/homepage/Publish";
import Title from "../components/Title";
import useRequest from "../hooks/useRequest";
import lula from '../assets/lula.jpg'

function HomePage() {
  const { error, loading, value, request, setError } = useRequest();
  const { offsetPosts, setOffsetPost } = React.useState();
  const session_token = localStorage.getItem("session_token")
  const token = JSON.parse(session_token)
  const headers = { authorization: "Bearer " + token };

  const offset = offsetPosts;
  useEffect(() => {
    request(`/posts?page=1`, "get", {}, { headers });
  }, [offsetPosts]);

  console.log(value?.data);
  console.log("error", error);

  return (
    <ContainerHome>
      <Header />
      <ContainerFeed>
        <Title>Timeline</Title>
        <Feed>
          <Publish />
          <Posts>
          
            {value &&
              value.data.map((p) => {
                return (
                  <Post
                    src={p.picture_url}
                    likes={p.number_of_likes}
                    username={p.username}
                    description={p.description}
                    descriptionLink={p.descriptionLink}
                    titleLink={p.titleLink}
                    link={p.link}
                    imageLink={p.imageLink}
                  />
                );
              })}
            
          </Posts>
          <Trendings></Trendings>
        </Feed>
      </ContainerFeed>
    </ContainerHome>
  );
}

export default HomePage;

const ContainerHome = styled.div``;

const ImgUser = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 50%;
  margin-top: 15px;
  margin-left: 40px;
`;

const ContainerFeed = styled.div`
  background-color: #333333;
  height: 100%;
  width: 100%;
  padding-top: 5%;
  padding-left: 15%;
  box-sizing: border-box;
`;

const Feed = styled.div``;

const Posts = styled.div``;

const Trendings = styled.div``;
