import { Alert, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/homepage/Post";
import Publish from "../components/homepage/Publish";
import SkeletonLoading from "../components/homepage/SkeletonLoading";
import Title from "../components/Title";
import useRequest from "../hooks/useRequest";
import TrendingList from "../components/homepage/TrendingList";

function HomePage() {

  const { error, loading, value, request, setError } = useRequest();
  const { offsetPosts, setOffsetPost } = React.useState();
  const session_token = localStorage.getItem("session_token");
  const token = JSON.parse(session_token);
  const headers = { authorization: "Bearer " + token };
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!token){
      navigate('/sign-in')
    }
    request(`/posts?page=1`, "get", {}, { headers });
  }, [offsetPosts]);

  	return (
		<ContainerHome>
			<Header />
			<ContainerFeed>
				<Main>
					<Title>Timeline</Title>
					<Feed>
						<Timeline>
							<Publish />
							<Posts>
              { !value  && loading ? 
                  <SkeletonLoading /> :
                (
                  value?.data.length === 0 ? 
                  <ThereAreNoPosts>There Are No Posts</ThereAreNoPosts> :
                  value?.data.map((p) => {
									return (
										<Post
                      key={p.id}
                      id={p.id}
                      src={p.picture_url}
                      likes={p.Number_of_likes}
                      username={p.username}
                      description={p.description}
                      descriptionLink={p.descriptionLink}
                      titleLink={p.titleLink}
                      link={p.link}
                      imageLink={p.imageLink}
                      // postId={postId}
										/>
									);
								})
              )}
							</Posts>
						</Timeline>
						<Trendings>
							<TrendingList />
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
