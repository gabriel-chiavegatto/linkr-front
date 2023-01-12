import styled from "styled-components"
import { Link } from "react-router-dom";


export default function UserSearched({item}){

    const {id, username, picture_url } = item;

    return (
        <>
            <Link to={`/user/${id}`}>
                <Div>
                    <img src={picture_url}/>
                    <p>{username}</p>
                </Div>
            </Link>
        </>
    )
}

const Div = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 10px;
    width: 524px;
    background-color: #E7E7E7;
    margin-left: 5px;
    border-radius: 2px;
    img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-top: 5px;
    }
    p{
        color: black;
        margin-left: 10px;
    }
`