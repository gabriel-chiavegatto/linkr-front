import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Title from "../components/Title";
import useRequest from "../hooks/useRequest";
import userImage from '../assets/lula.jpg'
import { DeletePost } from "./deletePost";

function HomePage() {
  const [link, setLink] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { error, loading, value, request, setError } = useRequest();
  console.log('Value: ', value)
  console.log('Error: ', error)
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ildlc2xleUQiLCJwaWN0dXJlX3VybCI6Ind3dy5taW5oYWZvdG8uY29tIiwiaWF0IjoxNjcyODU4NjAzLCJleHAiOjE2NzU0NTA2MDN9.7D2ZZkFzy17qAGCjQmzVpEJZFoSNJX81zGhg474Sups";
  const headers = { authorization: "Bearer " + token };

  if (error) {
    alert('Houve um erro ao publicar seu link, tente novamente!')
    setError(null)
  }

  async function publishPost() {
    if (link.length === 0) {
      alert('Por favor, preencha o link corretamente!')
      return;
    }
    await request(
      "/post",
      "post",
      { link, description },
      { headers }
    )
    if (!error) {
      setDescription('')
      setLink('')
    }
  }

  return (
    <ContainerHome>
      <Header />
      <ContainerFeed>
        <Title>Timeline</Title>
        <Feed>
          <Posts>
            <ContainerPublish>
              <ContainerUserPhoto>
                <ImgUser src={userImage} />
              </ContainerUserPhoto>
              <Publish>
                <MessagePublish>
                  What are you going to share today?
                </MessagePublish>
                <InputPublish
                  disabled={loading}
                  value={link}
                  onChange={({ target }) => setLink(target.value)}
                  size={"20%"}
                  placeholder="Put here your link for post!"
                ></InputPublish>
                <InputPublish
                  disabled={loading}
                  value={description}
                  onChange={({ target }) => setDescription(target.value)}
                  size={"50%"}
                  placeholder="Awesome article about #javascript"
                ></InputPublish>
                <ContainerButton>
                  <ButtonPublish disabled={loading}
                    onClick={publishPost
                    }
                  >
                    {loading ? "Publishing..." : "Publish"}
                  </ButtonPublish>
                </ContainerButton>
              </Publish>
            </ContainerPublish>
          </Posts>
          <Trendings></Trendings>
        </Feed>
      </ContainerFeed>
      <DeletePost status={true}/>
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
`

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
  width: 13%;
  height: 100%;
  display: flex;
  justify-content: start;
  box-sizing: border-box;
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
