
import styled from "styled-components";
import Header from "../components/Header";
import { UserFeed } from "../components/userPages/UserFeed";


export default function UserPage() {

    return (
        <ContainerPage>
            <Header />
            <UserFeed />
        </ContainerPage>
    )
}


const ContainerPage = styled.div`
    height: 100vh;
    width: 100%;
    
`;