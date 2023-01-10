import useRequest from "../hooks/useRequest";
import styled from "styled-components";
import Header from "../components/Header";
import Title from "../components/Title";
import Post from "../components/homepage/Post";
import SkeletonLoading from "../components/homepage/SkeletonLoading";


export default function UserPage() {

    const { error, loading, value, request, setError } = useRequest();

    return (
        <ContainerHome>
            <Header />
            <Main>
                <Title>Gabriel's posts</Title>
                <Feed>
                    <Posts>
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
                </Feed>
            </Main>
        </ContainerHome>
    )
}


const ContainerHome = styled.div`
    background-color: #000000;
    height: 100%;
    width: 100vh;
    
`;
const Main = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    background-color: blue;
`;
const Feed = styled.div`
    height: 80%;
    width: 100%;
    padding-top: 5%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    overflow-y: scroll;
`;
const ThereAreNoPosts = styled.p`
  font-family: 'Lato';
  font-size: 1.5rem;
  color: #fff;
  margin-top: 20px;
`
const Posts = styled.div`
	width: 100%;
`;
