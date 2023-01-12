import React, { useState, useEffect, useContext } from "react";
import { Alert, Skeleton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/homepage/Post";
import Publish from "../components/homepage/Publish";
import SkeletonLoading from "../components/homepage/SkeletonLoading";
import Title from "../components/Title";
import useRequest from "../hooks/useRequest";
import TrendingList from "../components/homepage/TrendingList";
import axios from "axios";
import ConfigContext from "../configContext";


function HomePage() {
    const global = useContext(ConfigContext);
  const { error, loading, value, request, setError } = useRequest();
  const [ offsetPosts, setOffsetPost ] = useState();
  const [ trendSelected, setTrendSelected ] = useState();
  const [ trendlist, setTrendlist ] = useState();
  
  const session_token = localStorage.getItem("session_token")
  const token = JSON.parse(session_token)
  const headers = { authorization: "Bearer " + token };


  const offset = offsetPosts;
  const navigate = useNavigate();

  function gotoHashtag(id){
	  global.hashtag = id;
	  if(id){
		  navigate(`/hashtag/${id}`);
	  }else{
		  navigate(`/timeline`);
	  }
  }
  useEffect(() => {
	console.log(global.hashtag);

	let link = "/posts?";
	if(global.hashtag){
		link += `trending=${global.hashtag}&`;
	}
	link += "page=1";
	console.log(link);
    request(link, "get", {}, { headers });
    
    if(!token){
      navigate('/sign-in')
    }
	axios
		.get(`${process.env.REACT_APP_API_BASE_URL}/hashtag`)
		.then(res => {
			setTrendlist(res.data);
		})
		.catch(err => console.error(err));
    request(link, "get", {}, { headers });
  }, [offsetPosts, global.hashtag]);

  let getTrendName = () => {
	return trendlist.find(el => el.id === trendSelected).name;
  }
  	return (
		<ContainerHome>
			<Header />
			<ContainerFeed>
				<Main>
					<Title>{trendSelected ? "#" + getTrendName(): "Timeline"}</Title>
					<Feed>
						<Timeline>
							{!trendSelected && <Publish />} 
							<Posts>
				{ !value  && loading ? 
					<SkeletonLoading /> :
					(
					value?.data.length === 0 ? 
					<ThereAreNoPosts>There Are No Posts</ThereAreNoPosts> :
					value?.data.map((p, index) => {
							return (
								<Post
									key={index}
									user_id={p.user_id}
									id={p.id}
									youLiked={p.youLiked}
									src={p.picture_url}
									likes={p.Number_of_likes}
									username={p.username}
									description={p.description}
									descriptionLink={p.descriptionLink}
									titleLink={p.titleLink}
									link={p.link}
									imageLink={p.imageLink}
									gotoHashtag={gotoHashtag}
								/>
							);
						})
				)}
							</Posts>
						</Timeline>
						<Trendings>
							<TrendingList
								trendlist={trendlist}
								setTrendSelected={setTrendSelected} 
								gotoHashtag={gotoHashtag}
							/>
						</Trendings>
					</Feed>
				</Main>
			</ContainerFeed>
		</ContainerHome>
  	);
}

export default HomePage;

const ContainerHome = styled.div`
  background-color: #333333;
  height: 100%;
  width: 100%;
`;

const ThereAreNoPosts = styled.p`
  font-family: 'Lato';
  font-size: 1.5rem;
  color: #fff;
  margin-top: 20px;
`

const ContainerError = styled.div`
  width: 600px;
  position: fixed;
  top: 80px;
  right: 10px;
  z-index: 1;
`


const ContainerFeed = styled.div`
  background-color: #333333;
  height: 100%;
  width: 100%;
  padding-top: 5%;
  box-sizing: border-box;
	display: flex;
	justify-content: center;

	`;

const Main = styled.div`
	width: 75%;
`;

const Timeline = styled.div`
	width: 65%;

`;

const Feed = styled.div`
	display: flex;
	width: 100%;
`;

const Posts = styled.div`
	width: 100%;
`;

const Trendings = styled.div`
	width: 35%;
`;
