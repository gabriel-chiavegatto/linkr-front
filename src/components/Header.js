import picture from '../assets/lula.jpg';
import styled from 'styled-components';
import arrow from '../assets/arrow.png'
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate();

    return (
        <>
            <Head>
                <h1>LINKR</h1>
                <section>search</section>
                <section className='profile'>
                    <img className='arrow' src={arrow} alt='people' onClick={LogOutBar} />
                    <img className='user-picture' src={picture} alt='people' />
                </section>
            </Head>
        </>

    )
}
function LogOutBar() {
    console.log("TRY")
    return (
        <>
            <logOutSection>LOGOUT</logOutSection >
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

    h1{
        padding: 0 28px;
    }
    .profile{
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .arrow{
        width: 18.37px;
        transform: rotate(270deg);
    }
    .user-picture{
        margin: 0 17px;
        width: 53px;
        height: 53px;
        border-radius: 50%;
    }
`;

const logOutSection = styled.section`
    position: static;
    bottom: 0;
    right: 0;
    width: 133px;
    height: 47px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: brown;
    z-index: 10;
`;