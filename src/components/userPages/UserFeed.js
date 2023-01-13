import styled from "styled-components";
import Title from "../Title"
import Post from "../homepage/Post";
import SkeletonLoading from "../homepage/SkeletonLoading";
import useRequest from "../../hooks/useRequest";
// import TrendingList from "../homepage/TrendingList";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ConfigContext from "../../configContext";


export function UserFeed() {

    const token = JSON.parse(localStorage.getItem("session_token"));
    const config = { headers: { authorization: "Bearer " + token } };
    const { id } = useParams();
    const req = useContext(ConfigContext)
    const { error, loading, value, request, setError } = useRequest();
    useEffect(() => {
        request(`/user/${id}`, "get", {}, config)
    }, [])

    return (
        <Container>
            <Main>
                <TitleBar>
                    <Title>User's posts</Title>
                    <button>Follow</button>
                </TitleBar>
                <Feed>
                    <Posts>
                        {error ? <h1 onClick={()=>console.log(error)}>ERROR</h1>: <></>}
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
                            )
                        }
                    </Posts>
                    <Trendings>
                        {/* <TrendingList
                            trendlist={trendlist}
                            setTrendSelected={setTrendSelected}
                        /> */}
                        trending
                    </Trendings>
                </Feed>
            </Main>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;
const Main = styled.div`
    width: 973px;
    height: 100%;
`;
const Feed = styled.div`
    width: 100%;
    padding-top: 5%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
`;

const TitleBar = styled.div`
    width: 100%;
    padding: 50px 0 40px;
    display: flex;
    justify-content: space-between;

    button{
        width: 112px;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;
        border: none;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
    }
`;
const ThereAreNoPosts = styled.p`
  font-family: 'Lato';
  font-size: 1.5rem;
  color: #fff;
  margin-top: 20px;
`
const Posts = styled.div`
	width: 65%;
`;
const Trendings = styled.div`
	width: 35%;
`;