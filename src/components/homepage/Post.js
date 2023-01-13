import { Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
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
import { RepostButton } from "./repostPost/RepostButton";
import { EditPostButton } from "./editPost/EditPostButton";
import Comments from "./Comments";

function Post({
  id,
  src,
  username,
  description,
  descriptionLink,
  imageLink,
  titleLink,
  link,
  user_id,
  gotoHashtag,
  addOns
}) {
  const [state_description, setDescription] = React.useState(description);
  const [editMode, setEditMode] = React.useState(false);
  
  const [myUserIdByServer, setMyUserIdByServer] = React.useState();
  const [likes, setLikes] = React.useState();
  const [comments, setComments] = React.useState();
  const [reposts, setReposts] = React.useState();

  const [commentsSelection, setCommentsSelection] = React.useState(false);
  const tagStyle = {
    fontWeight: 700,
  };
  const [storage] = useLocalStorage("session_token");
  const headers = { authorization: "Bearer " + storage.token };
  const inputEl = React.useRef(null);

  const { error, loading, value, request, setError } = useRequest();

  const message = prepareTooltipMessage(value?.data, username, likes)
  
  const navigate = useNavigate()
  const tagClicked = (tag) => {
    let hashtag = (tag.split('#'))[1];
    gotoHashtag(hashtag)
  }

  function keyBoardListener(event){
    if(event.key === 'Escape'){
      setEditMode(false);
      setDescription(description);
    }
    if(event.key === 'Enter'){
      setEditMode(false);
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/edit`, {post_id: id, description: state_description}, {headers})
        .then(res => {
          navigate('/timeline');
        })
        .catch(err => console.error(err));
    }
  }
  function openComments(){
    setCommentsSelection(!commentsSelection);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/comments?post_id=${id}`)
      .then(res => {
        setComments(res.data);
      })
  }
  function startEditMode(){
    setDescription(description);
    setEditMode(true);
    inputEl.current.focus();
  }

  function doLike(bool){
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/like`, { post_id: id, user_id }, {headers})
      .then(res => {
        getPostValueInfos()
      })
      .catch(err => console.error(err));
  } 
  function getPostValueInfos(){
    let importer;
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/datainfos/${id}`, {headers})
      .then(res => {  
        importer = res.data
        setMyUserIdByServer(importer.user_id);
        setComments(importer.comments)
        setLikes(importer.likes)
        setReposts(importer.reposts) 
        console.log(importer);
      })
      .catch(err => console.error(err))
  }
  function verifyLike(){
    if(likes){
      const iLiked = likes.find(el => el.user_id === myUserIdByServer);
      if(iLiked){
        return true
      }
      return false;
    }
  }

  useEffect(()=>{
    getPostValueInfos();
  }, []);

  return (
    <ContainerPost>
       {addOns && (addOns.is_repost)? 
       <>
        <FaRetweet /> Re-posted by {addOns.username_repost}
       </>:
        ""}
      <PostArea>
        <ContainerLikeAndPhoto>
          <ImgUser src={src} />
          <Likes>
            {verifyLike() ? (
              <AiFillHeart color={"red"} onClick={() => doLike(false)} />
            ) : (
              <AiOutlineHeart onClick={() => doLike(true)} />
            )}
              {value && <Tooltip
                title={message}
                onMouseEnter={() => request(`/likes-post/${id}`, "get", {}, { headers })}
              >
            </Tooltip>}
              <CountLikes>
                {likes && likes.reduce( (a, b) => a + 1, 0 )} likes
              </CountLikes>
          </Likes>
          <Likes>
            <AiOutlineComment onClick={openComments} /> 
            <span>{comments && comments.reduce( (a, b) => a + 1 , 0 )} comments</span>
          </Likes>
          <Likes>
            <RepostButton id={id} repostsCount={reposts && reposts.reduce( (a, b) => a + 1, 0 )} />
          </Likes>
        </ContainerLikeAndPhoto>

        
        <ContainerInfoPost>
          <Username onClick={()=>navigate(`/user/${user_id}`)}>{username}</Username>
          {editMode? 
              <EditDescription 
                ref={inputEl} 
                value={state_description} 
                onChange={e => setDescription(e.target.value)}
                onKeyUp={e => keyBoardListener(e)}
              />:
              <ReactTagify tagStyle={tagStyle} tagClicked={tagClicked}>
                <Description>{state_description}</Description>
              </ReactTagify>}
          <ContainerClickPost href={link} target="_blank">
          <LinkPost
            description={descriptionLink}
            image={imageLink}
            title={titleLink}
            link={link}
          />
          </ContainerClickPost>
          </ContainerInfoPost>


          <EditPanel>
            <EditPostButton id={id} startEditMode={startEditMode} />
            <TrashButton id={id} />
          </EditPanel>
      </PostArea>
 

      <CommentsArea>
        <HiddenCommentArea>
          {commentsSelection? 
            <Comments 
              perfilSrc={src}
              post_id={id}
              comments={comments}
              getPostValueInfos={getPostValueInfos}
            />:
            ""
          }
        </HiddenCommentArea>
      </CommentsArea>

    </ContainerPost>
  );
}

export default Post;

const HiddenCommentArea = styled.div`
    z-index: 0;
`;
const CommentsArea = styled.div`
  position: relative;
  z-index: 0;
`;
const PostArea = styled.div`
  width: 100%;
  margin-top: 20px;
  border-radius: 16px;
  display: flex;
  position: relative;
  z-index: 1;
`;
const EditPanel = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-around;
  height: 1rem;
  width: 4rem;
`;
const ContainerPost = styled.div`
  width: 95%;
  padding: .5rem 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  background-color: #171717;
  color: #eee;
`;

const ContainerClickPost = styled.a`
  display: block;
  height: 150px;
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

const EditDescription = styled.textarea`
  color: #000;
  border-radius: 7px;
  outline: none;
  font-family: "Lato";
  font-size: 1.3rem;
  resize: none;
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
