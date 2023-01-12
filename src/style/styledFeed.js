import styled from "styled-components";

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

export { ContainerHome, ThereAreNoPosts, ContainerFeed, Main, Timeline, Feed, Posts, Trendings }