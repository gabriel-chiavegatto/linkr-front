import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/homepage/Post";
import Publish from "../components/homepage/Publish";
import Title from "../components/Title";
import useRequest from "../hooks/useRequest";
import TrendingList from "../components/homepage/TrendingList";

function HomePage() {
  const { error, loading, value, request, setError } = useRequest();
  const { offsetPosts, setOffsetPost } = React.useState();
  const session_token = localStorage.getItem("session_token")
  const token = JSON.parse(session_token)
  const headers = { authorization: "Bearer " + token };

  const offset = offsetPosts;
  useEffect(() => {
    request(`/posts?page=1`, "get", {}, { headers });
  }, [offsetPosts]);

  console.log(value?.data);
  console.log("error", error);

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
								{value && value.data.map((p, index) => {
									return (
										<Post
											key={index}
											src={p.picture_url}
											likes={p.number_of_likes}
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
							<TrendingList />
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
