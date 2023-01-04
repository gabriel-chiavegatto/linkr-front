import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Title from "../components/Title";
import picture from '../logo.svg'

function HomePage() {
  return (
    <ContainerHome>
      <Header />
      <ContainerFeed>
        <Title>Timeline</Title>
        <Feed>
          <Posts>
            <ContainerPublish>
              <ContainerUserPhoto>
                <img src={picture}/>
              </ContainerUserPhoto>
              <Publish>
                <MessagePublish>
                  What are you going to share today?
                </MessagePublish>
                <InputPublish
                  size={"20%"}
                  placeholder="Put here your link for post!"
                ></InputPublish>
                <InputPublish
                  size={"50%"}
                  placeholder="Awesome article about #javascript"
                ></InputPublish>
                <ContainerButton>
                  <ButtonPublish>Publish</ButtonPublish>
                </ContainerButton>
              </Publish>
            </ContainerPublish>
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

const ContainerPublish = styled.div`
  width: 50%;
  height: 30vh;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
`;

const ContainerUserPhoto = styled.div`
  width: 20%;
  height: 100%;
`;

const Publish = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 15px;
  gap: 10px;
`;

const InputPublish = styled.input`
  width: 100%;
  height: ${(props) => props.size};
  border-radius: 4px;
  border: none;
  background-color: #efefef;
  &::placeholder {
    padding: 10px;
  }
`;

const MessagePublish = styled.span`
  font-family: "Lato";
  font-size: 1.1rem;
  color: #707070;
`;

const ContainerButton = styled.div`
  display: flex;
  justify-content: end;
  height: 25%;
`;

const ButtonPublish = styled.button`
  width: 30%;
  height: 100%;
  background-color: #1877f2;
  font-family: "Lato";
  font-size: 1.1rem;
  border: none;
  border-radius: 4px;
  color: #fff;
`;
