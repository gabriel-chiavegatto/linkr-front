import picture from '../assets/lula.jpg';
import styled from 'styled-components';
import arrow from '../assets/arrow.png'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import axios from "axios";
import Input from "./form/Input";

export default function Header() {

    const navigate = useNavigate();
    const [logOutBar, setLogoutBar] = useState('none');
    const [arrowDirection, setArrowDirection] = useState('rotate(0deg)')
    const [search, setSearch] = useState("");

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
    function Logout() {
        const api = process.env.API || 'http://localhost:5000'
        useEffect(() => {
            try {
                axios.post(`${api}/logout`);
                // forget data context
                navigate('/')
            } catch (error) {
                console.log("AXIOS ERROR")
                // forget data context
                navigate('/')
            }
        })
    }

    return (
            <Head arrowDirection={arrowDirection}>
                <Logo size={'49px'} />
                <SeachBox>
                    <Input
                        placeholder={"Search"}
                        value={search}
                        onChange={({ target }) => setSearch(target.value)}
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
    justify-content: center;
    align-items: center;
`;
