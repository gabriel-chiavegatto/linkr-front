import { Tooltip } from "@mui/material";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";
import { prepareTooltipMessage } from "../../utils/createMessageTooltip";
import ImgUser from "../ImgUser";
import { ReactTagify } from 'react-tagify'
import LinkPost from "./LinkPost";
import useLocalStorage from "../../hooks/useLocalStorage";
import axios from "axios";
import useRequest from "../../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import { TrashButton } from "./deletePost/TrashButton";

function Post({
  id,
  src,
  youLiked,
  likes,
  username,
  description,
  descriptionLink,
  imageLink,
  titleLink,
  link,
  user_id
}) {
  const [liked, setLiked] = React.useState(youLiked);
  const [likeCount, setLikeCount] = React.useState(Number(likes));
  
  const tagStyle = {
    fontWeight: 700,
  };
  const [storage, setStorage] = useLocalStorage("session_token");
  const headers = { authorization: "Bearer " + storage };

  const { error, loading, value, request, setError } = useRequest();

  const message = prepareTooltipMessage(value?.data, username, likes)
  
  
  const navigate = useNavigate()
  const tagClicked = (tag) => {
    let hashtag = (tag.split('#'))[1];
    navigate(`/hashtag/${hashtag}`)
  }

  function doLike(bool){
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/like`, { id, user_id }, {headers: {authorization: `Bearer ${storage}`}})
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
        <ImgUser src={src} />
        <Likes>
          {liked ? (
            <AiFillHeart color={"red"} onClick={() => setLiked(false)} />
          ) : (
            <AiOutlineHeart onClick={() => setLiked(true)} />
          )}
            {value && <Tooltip
              title={message}
              onMouseEnter={() => request(`/likes-post/${id}`, "get", {}, { headers })}
            >
            <CountLikes>
              {liked ? Number(likes) + 1 : Number(likes)} likes
            </CountLikes>
          </Tooltip>}
        </Likes>
      </ContainerLikeAndPhoto>

      <ContainerClickPost href={link} target="_blank">
        <ContainerInfoPost>
          <Username onClick={()=>navigate(`/user/${user_id}`)}>{username}</Username>
          <ReactTagify 
              tagStyle={tagStyle}
              tagClicked={tagClicked}
          >
            <Description>{description}</Description>
          </ReactTagify>
          <LinkPost
            description={descriptionLink}
            image={imageLink}
            title={titleLink}
            link={link}
          />
        </ContainerInfoPost>
      </ContainerClickPost>
 

      <TrashButton id={id} />
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
  position: relative;
`;

const ContainerClickPost = styled.a`
  display: block;
  width: 100%;
`;

const Description = styled.p`
  color: #fff;
  font-family: "Lato";
  font-size: 1.3rem;
  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;

const Username = styled.span`
  font-family: "Lato";
  color: #fff;
  font-size: 1.4rem;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
`;

const Likes = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-family: "Lato";
  font-size: 0.9rem;
  gap: 10px;
  margin-right: 15px;
  @media (max-width: 1440px) {
    font-size: 0.7rem;
    gap: 5px;
  }
  svg{
    font-size: 1.5rem;
  }
`

const CountLikes = styled.span``;

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
