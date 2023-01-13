import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useRequest from "../../../hooks/useRequest";


export function WarningDeletePost({ postId, activeButton, setActiveButton }) {

    const { value, loading, error, request, setError } = useRequest();

    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('session_token'))
    const config = {
        headers: { authorization: `Bearer ${token}` }
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
                                setActiveButton(false);
                            }} >No, go back</button>
                        <button className="delete"
                            onClick={() => {
                                const deleteProcess = request(
                                    `/delete-post/${postId}`,
                                    "post",
                                    {},
                                    config
                                )
                                if (error) { alert("Não foi possivel excluir o post"); setActiveButton(false); }
                                else { window.location.reload() }
                            }}
                        >{loading ? <>loading...</> : <>Yes,delete it</>}</button>
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