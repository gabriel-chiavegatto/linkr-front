import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Auth";
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
import ConfigContext from "../configContext";
import axios from "axios";
import UserSearched from "../components/userSearched";
import { ContainerHome, ThereAreNoPosts, ContainerFeed, Main, Timeline, Feed, Posts, Trendings } from '../style/styledFeed'


function HomePage() {
    const global = useContext(ConfigContext);
  const { error, loading, value, request, setError } = useRequest();
  const [ offsetPosts, setOffsetPost ] = useState();
  
  const [ trendSelected, setTrendSelected ] = useState();
  const [ trendlist, setTrendlist ] = useState();

  
	const { quest } = useContext(AuthContext)

	const session_token = localStorage.getItem("session_token")
	const user = JSON.parse(session_token)
	const headers = { authorization: "Bearer " + user.token };


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

	let link = "/posts?";
	if(global.hashtag){
		link += `trending=${global.hashtag}&`;
	}
	link += "page=1";
    request(link, "get", {}, { headers });
    
    if(!user.token){
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
			<DivUsers>
				{quest?.map((item, i) => <UserSearched item={item} key={i} />)}
			</DivUsers>
			<ContainerFeed>
				<Main>
					<Title>{trendSelected ? "#" + getTrendName() : "Timeline"}</Title>
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
							const addons = (p.is_repost)? {is_repost: p.is_repost, username_repost: p.username_repost}: {};
							return (
								<Post
									key={index}
									user_id={p.user_id}
									id={p.post_gid}
									youLiked={p.youLiked}
									src={p.picture_url}
									likes={p.number_of_likes}
									username={p.username}
									description={p.description}
									commentsCount={p.comments_post}
									repostsCount={p.reposts_post}
									descriptionLink={p.descriptionLink}
									titleLink={p.titleLink}
									link={p.link}
									imageLink={p.imageLink}
									gotoHashtag={gotoHashtag}
									addOns={addons}
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

const DivUsers = styled.div`

    position: relative;
    left: 0;
	top: -13px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`
