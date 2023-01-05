import { useState } from "react";
import styled from "styled-components";

export function DeletePost({ status }) {

    const [warningPage, setWarningPage] = useState('none');
    const page = () => {
        status === true ? setWarningPage('flex') : setWarningPage('none')
    }
    return (
        <Container warningPage={warningPage}>
            <section>
                <article>
                    <div>
                        <h1>Are you sure you want to delete this post?</h1>
                    </div>
                    <div>
                        <button className="go-back" onClick={setWarning} >No, go back</button>
                        <button className="delete">Yes,delete it</button>
                    </div>
                </article>
            </section>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: ${props => props.warningPage};
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.85);
    section{
        width: 597px;
        height: 262px;
        background: #333333;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 34px;
        line-height: 41px;
        text-align: center;
        color: #FFFFFF;
        padding: 0px 129px;
    }
    button{
        width: 134px;
        height: 37px;
        border-radius: 5px;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        border: none;
        margin: 35px 14px;
    }
    .go-back{
        color: #1877F2;
        background: #FFFFFF;
    }
    .delete{
        color: #FFFFFF;
        background: #1877F2;
    }
`;