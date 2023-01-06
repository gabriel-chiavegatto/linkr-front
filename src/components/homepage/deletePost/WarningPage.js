import { useState } from "react";
import styled from "styled-components";
import useRequest from "../../../hooks/useRequest";


export function WarningDeletePost({ postId, activeButton, setActiveButton }) {

    const { value, loadind, error, request, setError } = useRequest();

    const token = '257257'
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return (
        <WarningContainer>
            <section>
                <article>
                    <div>
                        <h1>Are you sure you want to delete this post?</h1>
                    </div>
                    <div>
                        <button className="go-back"
                            onClick={() => {
                                console.log('try');
                                setActiveButton(false);
                                console.log(activeButton)
                            }} >No, go back</button>
                        <button className="delete"
                            onClick={() => {
                                request(
                                    `/delete/:${postId}`,
                                    "delete",
                                    {},
                                    config
                                )
                            }}
                        >Yes,delete it</button>
                    </div>
                </article>
            </section>
        </WarningContainer>
    )
}

const WarningContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
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