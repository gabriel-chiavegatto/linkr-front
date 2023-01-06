import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/homepage/Post";
import Publish from "../components/homepage/Publish";
import Title from "../components/Title";
import UserImg from '../assets/lula.jpg'

function HomePage() {
  const postId = 1;

  return (
    <ContainerHome>
      <Header />
      <ContainerFeed>
        <Title>Timeline</Title>
        <Feed>
          <Publish />
          <Posts>
            <Post src={UserImg}
              likes={230000}
              username={'Wesley Dias'}
              description={'Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material'}
              postId={postId} />
          </Posts>
          <Trendings></Trendings>
        </Feed>
      </ContainerFeed>
    </ContainerHome>
  );
}

export default HomePage;

const ContainerHome = styled.div``;


const ContainerFeed = styled.div`
  background-color: #333333;
  height: 100vh;
  width: 100%;
  padding-top: 5%;
  padding-left: 15%;
  box-sizing: border-box;
`;

const Feed = styled.div``;

const Posts = styled.div``;

const Trendings = styled.div``;
