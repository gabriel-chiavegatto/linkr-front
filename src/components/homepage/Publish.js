import React from "react";
import styled from "styled-components";
import userImage from "../../assets/lula.jpg";
import useRequest from "../../hooks/useRequest";
import ImgUser from '../ImgUser'

function Publish() {
  const [link, setLink] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { error, loading, value, request, setError } = useRequest();

  const session_token = localStorage.getItem("session_token")
  const token = JSON.parse(session_token)
  const headers = { authorization: "Bearer " + token };


  if (error) {
    alert("Houve um erro ao publicar seu link, tente novamente!");
    setError(null);
  }

  async function publishPost() {
    if (link.length === 0) {
      alert("Por favor, preencha o link corretamente!");
      return;
    }
    await request("/post", "post", { link, description }, { headers });
    if (!error) {
      setDescription("");
      setLink("");
    }
  }
  return (
    <ContainerPublish>
      <ContainerUserPhoto>
        <ImgUser src={userImage} />
      </ContainerUserPhoto>
      <PublishBox>
        <MessagePublish>What are you going to share today?</MessagePublish>
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
          <ButtonPublish disabled={loading} onClick={publishPost}>
            {loading ? "Publishing..." : "Publish"}
          </ButtonPublish>
        </ContainerButton>
      </PublishBox>
    </ContainerPublish>
  );
}

export default Publish;

const ContainerPublish = styled.div`
  width: 95%;
  height: 30vh;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
`;

const ContainerUserPhoto = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: end;
`;

const PublishBox = styled.div`
  width: 100%;
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
