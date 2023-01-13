
import { useState } from 'react';
import styled from 'styled-components';
import { FaRetweet } from "react-icons/fa";
import { WarningRepostPost } from './WarningPage';

export function RepostButton({id, repostsCount}) {
    const [activeButton, setActiveButton] = useState(false)
    return (
        <TrashContainer>
            <FaRetweet onClick={() => { setActiveButton(true) }} />
            <span>{repostsCount} re-tweets</span>
            {activeButton ? <WarningRepostPost postId={id} activeButton={activeButton} setActiveButton={setActiveButton} /> : <></>
            }
        </TrashContainer >
    )
}

const TrashContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;