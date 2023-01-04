import picture from '../assets/lula.jpg';
import styled from 'styled-components';
import arrow from '../assets/arrow.png'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import axios from "axios";

export default function Header() {

    const navigate = useNavigate();
    const [logOutBar, setLogoutBar] = useState('none');
    const [arrowDirection, setArrowDirection] = useState('rotate(0deg)')

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
        const api = process.env.API;
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
        <>
            <Head arrowDirection={arrowDirection}>
                <Logo size={'49px'} />
                {/* <section>search</section> */}
                <section className='profile' onClick={toggleLogoutBar} >
                    <img className='arrow' src={arrow} alt='people' />
                    <img className='user-picture' src={picture} alt='people' />
                </section>
                <LogoutAside logOutBar={logOutBar}><p onClick={Logout} >Logout</p></LogoutAside>
            </Head>
        </>

    )
}


const Head = styled.div`

    background: #151515;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 72px;
    padding: 0 0 0 28px;
    .profile{
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .arrow{
        width: 18.37px;
        transform: ${props => props.arrowDirection};
    }
    .user-picture{
        margin: 0 17px;
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