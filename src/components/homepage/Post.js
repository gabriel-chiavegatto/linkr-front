import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";
import ImgUser from "../ImgUser";
import {ReactTagify} from 'react-tagify'
import LinkPost from "./LinkPost";
import axios from "axios";
import useLocalStorage from "../../hooks/useLocalStorage";


function Post({ src, youLiked, likes, username, description, descriptionLink, imageLink, titleLink, link, post_id, user_id }) {
  const [liked, setLiked] = React.useState(youLiked);
  const [likeCount, setLikeCount] = React.useState(Number(likes));
  const [storage, setStorage] = useLocalStorage("session_token");

  const tagStyle = {
    fontWeight: 700,
  };

  function doLike(bool){
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/like`, { post_id, user_id }, {headers: {authorization: `Bearer ${storage}`}})
      .then(res => {
        setLiked(bool);

        if(liked){
          setLikeCount(likeCount-1);
        }else{
          setLikeCount(likeCount+1);
        }
      })
      .catch(err => console.error(err));
  }

  return (
    
    <ContainerPost>
      <ContainerLikeAndPhoto>
        <ImgUser src={src}/>
        <Likes>
          {liked ? <AiFillHeart color={"red"} onClick={() => doLike(false)}/> : <AiOutlineHeart onClick={() => doLike(true)}/>}
          <CountLikes>{likeCount} likes</CountLikes>
        </Likes>
      </ContainerLikeAndPhoto>
      
      <ContainerInfoPost>
        <Username>{username}</Username>
        <ReactTagify
          tagStyle={tagStyle}
        >
          <Description>{description}</Description>
        </ReactTagify>
          <LinkPost description={descriptionLink} image={imageLink} title={titleLink} link={link}/>
      </ContainerInfoPost>
    </ContainerPost>
  );
}

export default Post;

const ContainerPost = styled.div`
  width: 95%;
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
  svg{
    font-size: 1.5rem;
  }
`

const CountLikes = styled.span`
`

const ContainerLikeAndPhoto = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
