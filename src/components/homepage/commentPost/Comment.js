import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ImgUser from "../../ImgUser";

export default function Comment({user_id, username, pic_url, isFollower, isOwner, text}){
    function getTypeUser(){
        if(isOwner)
            return "post's author";
        else if(isFollower)
            return "following";
        else 
            return "";
    }
    return(
        <Main>
            <ImgUser src={pic_url} size="32px" />
            <InnerPost>
                <UserInfos>
                    <Username>{username}</Username>
                    <Title>• {getTypeUser()}</Title>
                </UserInfos>
                <CommentText>
                    {text}
                </CommentText>
            </InnerPost>
        </Main>
    );
}

const Main = styled.div`
    display: flex;
    border-bottom: 1px solid #7773;
    padding: 1rem;
    margin-bottom: 1rem;

    font-size: .8rem;
`;
const InnerPost = styled.div`
    margin-left: 1rem;
`;
const Username = styled.div`
    font-weight: 600;
    
    color: #eee;
`;
const Title = styled.div`
    color: #565656
`;
const UserInfos = styled.div`
    display: flex;
`;
const CommentText = styled.div`
    color: #acacac;
`;