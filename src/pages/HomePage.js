import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/homepage/Post";
import Publish from "../components/homepage/Publish";
import Title from "../components/Title";
import UserImg from '../assets/lula.jpg'

function HomePage() {
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
                  description={'Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material'} />
          </Posts>
          <Trendings></Trendings>
        </Feed>
      </ContainerFeed>
      <DeletePost status={true} />
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
  height: 100vh;
  width: 100%;
  padding-top: 5%;
  padding-left: 15%;
  box-sizing: border-box;
`;

const Feed = styled.div``;

const Posts = styled.div``;

const Trendings = styled.div``;
