import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ImgUser from "../ImgUser";
import {FiSend} from "react-icons/fi";
import Comment from './commentPost/Comment';

export default function Comments({perfilSrc}){
    
    return(
        <Main>
            <CommentsList>
                <Comment 
                    user_id={2}
                    username={"Titanzinho"}
                    pic_url={perfilSrc}
                    isFollower={true}
                    isOwner={false}
                    text={"o melhor do mundo"}
                />
                <Comment 
                    user_id={2}
                    username={"Titanico"}
                    pic_url={perfilSrc}
                    isFollower={true}
                    isOwner={true}
                    text={"lionel messi"}
                />
            </CommentsList>
            <Send>
                <ImgUser src={perfilSrc} alt="perfil" size="32px" />
                <Forms type="text" placeholder='write a comment...'/>
                <FiSend />
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