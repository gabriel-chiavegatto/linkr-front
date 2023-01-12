import React, { useState, useEffect, useContext } from "react";
<<<<<<< HEAD
=======
import { AuthContext } from "../Auth";
>>>>>>> main
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
<<<<<<< HEAD
import ConfigContext from "../configContext";
=======
import UserSearched from "../components/userSearched";
import { ContainerHome, ThereAreNoPosts, ContainerFeed, Main, Timeline, Feed, Posts, Trendings } from '../style/styledFeed'
>>>>>>> main


<<<<<<< HEAD
function HomePage() {
    const global = useContext(ConfigContext);
  const { error, loading, value, request, setError } = useRequest();
=======
  const { error, loading, value, request, setError } = useRequest();  
>>>>>>> main
  const [ offsetPosts, setOffsetPost ] = useState();
  
  const [ trendSelected, setTrendSelected ] = useState();
  const [ trendlist, setTrendlist ] = useState();

  
	const { quest } = useContext(AuthContext)

	const session_token = localStorage.getItem("session_token")
	const user = JSON.parse(session_token)
	const headers = { authorization: "Bearer " + user.token };


	const navigate = useNavigate();

	useEffect(() => {
		let link = "/posts?";
		// if(trendSelected){
		// 	link += `trending=${trendSelected}&`;
		// }
		link += "page=1";

		if (!user.token) {
			navigate('/sign-in')
		}

		request(link, "get", {}, { headers });

<<<<<<< HEAD
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
=======
		// axios
		// 	.get(`${process.env.REACT_APP_API_BASE_URL}/hashtag`)
		// 	.then(res => {
		// 		setTrendlist(res.data);
		// 		console.log(trendlist)
		// 	})
		// 	.catch(err => console.error(err));

		// request(`/posts?page=1`, "get", {}, { headers });

	}, [offsetPosts, trendSelected]);

	let getTrendName = () => {
		return trendlist.find(el => el.id === trendSelected).name;
	}

	return (
>>>>>>> main
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
<<<<<<< HEAD
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
=======

								{!value && loading ?
									<SkeletonLoading /> :
									(
										value?.data.length === 0 ?
											<ThereAreNoPosts>There Are No Posts</ThereAreNoPosts> :
											value?.data.map((p) => {
												return (
													<Post
														key={p.index}
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
													/>
												);
											})
									)}
							</Posts>
						</Timeline>
						<Trendings>
							<TrendingList />
>>>>>>> main
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
