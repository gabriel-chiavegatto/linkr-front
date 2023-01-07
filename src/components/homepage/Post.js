import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";
import ImgUser from "../ImgUser";
import { ReactTagify } from 'react-tagify'
import LinkPost from "./LinkPost";
import useRequest from "../../hooks/useRequest";
import { useNavigate } from "react-router-dom";


function Post({ src, likes, username, description, descriptionLink, imageLink, titleLink, link }) {
  const [liked, setLiked] = React.useState(false);
  
  const tagStyle = {
    fontWeight: 700,
  };
  const navigate = useNavigate()
  const tagClicked = (tag) => {
    let hashtag = (tag.split('#'))[1];
    navigate(`/hashtag/${hashtag}`)
  }

  return (

    <ContainerPost>
      <ContainerLikeAndPhoto>
        <ImgUser src={src} />
        <Likes>
          {liked ? <AiFillHeart onClick={() => setLiked(false)} /> : <AiOutlineHeart onClick={() => setLiked(true)} />}
          <CountLikes>{liked ? likes + 1 : likes} likes</CountLikes>
        </Likes>
      </ContainerLikeAndPhoto>

      <ContainerInfoPost>
        <Username>{username}</Username>
        <ReactTagify
          tagStyle={tagStyle}
          tagClicked={tagClicked}
        >
          <Description>{description}</Description>
        </ReactTagify>
        <LinkPost description={descriptionLink} image={imageLink} title={titleLink} link={link} />
      </ContainerInfoPost>
    </ContainerPost>
  );
}

export default Post;

const ContainerPost = styled.div`
  width: 50%;
  height: 30vh;
  background-color: #171717;
  margin-top: 20px;
  border-radius: 16px;
  display: flex;
`;

const Description = styled.p`
  color: #fff;
  font-family: 'Lato';
  font-size: 1.3rem;
  @media (max-width: 1440px){
    font-size: 1rem;
  }
`

const Username = styled.span`
  font-family: 'Lato';
  color: #fff;
  font-size: 1.4rem;
  @media (max-width: 1440px){
    font-size: 1.2rem;
  }
`

const Likes = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-family: 'Lato';
  font-size: 0.9rem;
  gap: 10px;
  @media (max-width: 1440px){
    font-size: 0.7rem;
    gap: 5px;
  }
`

const CountLikes = styled.span`
`

const ContainerLikeAndPhoto = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 20px;
`;

const ContainerInfoPost = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 15px;
  gap: 10px;
`;
