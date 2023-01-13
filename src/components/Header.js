import genericPicture from '../assets/lula.jpg';
import styled from 'styled-components';
import arrow from '../assets/arrow.svg'
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Auth';
import Logo from './Logo';
import axios from "axios";
import ConfigContext from '../configContext';
import React from 'react';
import {DebounceInput} from 'react-debounce-input';

export default function Header() {

    const navigate = useNavigate();
    const [text, setText] = useState();
    const [logOutBar, setLogoutBar] = useState('none');
    const [arrowDirection, setArrowDirection] = useState('rotate(270deg)')

    const {user} = useContext(ConfigContext);
    console.log("header: ", user);
    const picture = user.picture_url || genericPicture;

    const {setQuest, quest} = useContext(AuthContext);
  

    function toggleLogoutBar() {
        if (logOutBar === 'none') {
            console.log('try')
            setLogoutBar('block');
            setArrowDirection('rotate(180deg)')
        } else {
            setLogoutBar('none');
            setArrowDirection('rotate(0deg)')
        }
    }
    async function Logout() {
        const api = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'
        try {
            const session_token = localStorage.getItem("session_token")
            const token = JSON.parse(session_token)
            const config = {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            }
            await axios.post(`${api}/logout`, {}, config);
            window.localStorage.clear();
            navigate('/')
        } catch (error) {
            console.log("AXIOS ERROR")
            window.localStorage.clear();
            navigate('/')
        }
    }

    const handleChange = (value => {

        
        const api = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'

        const session_token = localStorage.getItem("session_token")
        const token = JSON.parse(session_token)
        

        if(value.length >= 3){
            const config = {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            };
    
            const user = {
                search: value
            }

           const promise =  axios.post(`${api}/user`, user, config);
            promise.then(resp => 
                {
                    setQuest(resp.data); 
                });
            promise.catch((err => {alert(err.response?.data.message)}))

        } else {
            setQuest([]);
        }
    })

    return (
        <Head arrowDirection={arrowDirection}>
            <Logo size={'49px'} />
            <SeachBox>
                <DebounceInput
                    value={text}
                    minLength={3}
                    debounceTimeout={300}
                    placeholder={"Search for people"}
                    onChange={ event => handleChange(event.target.value)}
                />               
            </SeachBox>
            <Menu onClick={toggleLogoutBar} >
                <img className='arrow' src={arrow} alt='people' />
                <img className='user-picture' src={picture} alt='people' />
            </Menu>
            <LogoutAside logOutBar={logOutBar}><p onClick={Logout} >Logout</p></LogoutAside>
        </Head>
    )
}


const Head = styled.div`

    background: #151515;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    width: 100%;
    height: 72px;
    padding: 20px;
    justify-content: space-between;
    
`;
const Menu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    .arrow{
        width: 18.37px;
        margin: 0 17px;
        transform: ${props => props.arrowDirection};
        transform-origin: center;
    }
    .user-picture{
        width: 53px;
        height: 53px;
        border-radius: 50%;
    }
`;

const LogoutAside = styled.aside`
    display: ${props => props.logOutBar};
    position: absolute;
    top: 72px;
    right: 0;
    width: 133px;
    height: 47px;
    background: #171717;
    border-radius: 0px 0px 0px 20px;
    z-index: 9;
    p{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    
`;

const SeachBox = styled.div`
    width: 50%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    position: relative;
    & input{
        width: 80%;
        border-radius: 4px;
        border: none;
        height: 50px;
        font-family: 'Oswald';
        box-sizing: border-box;
        font-size: 1.1rem;
        padding: 10px;
        z-index: 1;
        &::placeholder {
            font-family: "Oswald";
            font-weight: bold;
            font-size: 1rem;
            color: #9f9f9f;
        }
    }
`;



