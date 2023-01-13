import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ImgUser from "../ImgUser";
import {FiSend} from "react-icons/fi";
import Comment from './commentPost/Comment';
import ConfigContext from '../../configContext';

export default function Comments({perfilSrc, post_id, comments, getPostValueInfos}){
    const [text, setText] = useState();
    const global = useContext(ConfigContext);
    function sendMessage(){
        if(text !== '')
        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/comment`, {post_id, text}, {headers:{authorization: global.user.token }})
            .then(res => {
                getPostValueInfos()
            })
    }
    return(
        <Main>
            <CommentsList>
                {comments? comments.map((el, index) =>{

                   return (<Comment 
                        key={index}
                        user_id={el.user_id}
                        username={el.username}
                        pic_url={el.picture_url}
                        isFollower={false}
                        isOwner={false}
                        text={el.text}
                    />);
                }): ""}
                
            </CommentsList>
            <Send>
                <ImgUser src={perfilSrc} alt="perfil" size="32px" />
                <Forms type="text" placeholder='write a comment...' value={text} onChange={e => setText(e.target.value)} />
                <FiSend onKeyUp={sendMessage} onClick={sendMessage} />
            </Send>
        </Main>
    )
}

const Send = styled.div`
    display: flex;
    align-items: center;
    svg{color: white}
    *{margin: 0 .5rem}
`;
const CommentsList = styled.div`
    
`;
const Main = styled.div`
    position: relative;
    background: #1E1E1E;
    border-radius: 8px;
    min-height: 90px;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 1rem;
`;

const Forms = styled.textarea`
    outline: none;
    border: none;
    resize: none;
    padding: .5rem;
    width: 100%;
    background-color: #252525;
    color: #eee;
    &::placeholder{color: #888}
`;