import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/homepage/Post";
import Publish from "../components/homepage/Publish";
import Title from "../components/Title";
import useRequest from "../hooks/useRequest";
import TrendingList from "../components/homepage/TrendingList";
import axios from "axios";

function HomePage() {
  const { error, loading, value, request, setError } = useRequest();
  const [ offsetPosts, setOffsetPost ] = useState();
  const [ trendSelected, setTrendSelected ] = useState();
  const [ trendlist, setTrendlist ] = useState();
  
  const session_token = localStorage.getItem("session_token")
  const token = JSON.parse(session_token)
  const headers = { authorization: "Bearer " + token };

  const offset = offsetPosts;


  useEffect(() => {
	let link = "/posts?";
	if(trendSelected){
		link += `trending=${trendSelected}&`;
	}
	link += "page=1";
    request(link, "get", {}, { headers });

	axios
		.get(`${process.env.REACT_APP_API_BASE_URL}/hashtag`)
		.then(res => {
			setTrendlist(res.data);
			console.log(trendlist)
		})
		.catch(err => console.error(err));
  }, [offsetPosts, trendSelected]);

  let getTrendName = () => {
	return trendlist.find(el => el.id === trendSelected).name;
  }

  console.log(value?.data);
  console.log("error", error);

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
								{value && value.data.map((p, index) => {
									return (
										<Post
											key={index}
											user_id={p.user_id}
											post_id={p.id}
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
								})}
							</Posts>
						</Timeline>
						<Trendings>
							<TrendingList
								trendlist={trendlist}
								setTrendSelected={setTrendSelected} 
							/>
						</Trendings>
					</Feed>
				</Main>
			</ContainerFeed>
		</ContainerHome>
  	);
}

export default HomePage;

const ContainerHome = styled.div``;

const ImgUser = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 50%;
  margin-top: 15px;
  margin-left: 40px;
`;

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
