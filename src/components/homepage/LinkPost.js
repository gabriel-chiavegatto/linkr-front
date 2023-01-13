import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function LinkPost({ title, description, link, image }) {
  const navigate = useNavigate()
  if(!title){title = 'error ao carregar'}
  if(!description){description = 'error ao carregar'}
  if(!link){link = 'https://www.google.com/'}
  if(!image){image = 'error ao carregar'}
  function clickPost(link){
    navigate(JSON.stringify(link))
  }
  return (
      <ContainerLinkPost onClick={clickPost}>
        <DescriptionLink>
          <TitleLink>{title}</TitleLink>
          <Description>{description}</Description>
          <LinkText>{link}</LinkText>
        </DescriptionLink>
        <ContainerImageLink>
          <ImgLink src={image} />
        </ContainerImageLink>
      </ContainerLinkPost>
  );
}

export default LinkPost;

const ContainerLinkPost = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid #c4c4c4;
  border-radius: 16px;
  display: flex;
  font-family: "Lato";
`;

const ImgLink = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0px 16px 16px 0;
`;

const Description = styled.p`
  font-size: 0.9rem;
  margin-left: 15px;
  margin-right: 5px;
  color: #9b9595;
  @media (max-width: 1440px) {
    font-size: 0.7rem;
    margin-left: 10px;
  }
`;

const TitleLink = styled.h3`
  font-size: 1rem;
  margin-left: 15px;
  margin-top: 10px;
  color: #eaeaea;
  @media (max-width: 1440px) {
    font-size: 0.8rem;
    margin-left: 10px;
    margin-top: 5px;
  }
`;

const LinkText = styled.span`
  font-size: 0.9rem;
  margin-left: 15px;
  margin-bottom: 10px;
  color: #eaeaea;
  @media (max-width: 1440px) {
    font-size: 0.7rem;
    margin-left: 10px;
    margin-bottom: 5px;
  }
`;

const DescriptionLink = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContainerImageLink = styled.div`
  width: 25%;
  height: 100%;
`;
