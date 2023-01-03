import picture from '../logo.svg';
import styled from 'styled-components';

export default function Header() {
    return (
        <Head>
            <h1>LINKER</h1>
            <section>search</section>
            <img src={picture} alt='people' />
        </Head>
    )
}

const Head = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 72px;

    img{
        width: 53px;
        height: 53px;
    }
`;