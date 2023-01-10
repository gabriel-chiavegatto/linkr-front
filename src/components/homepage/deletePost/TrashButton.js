
import { useState } from 'react';
import styled from 'styled-components';
import trashImage from '../../../assets/trash.svg';
import { WarningDeletePost } from './WarningPage';

export function TrashButton({postId}) {
    const [activeButton, setActiveButton] = useState(false)
    return (
        <TrashContainer>
            <img
                src={trashImage}
                alt="trash"
                onClick={() => { setActiveButton(true) }}>
            </img>

            {activeButton ? <WarningDeletePost postId={postId} activeButton={activeButton} setActiveButton={setActiveButton} /> : <></>
            }
        </TrashContainer >
    )
}

const TrashContainer = styled.div`
    width: 14px;
    height: 14px;
    position: absolute;
    top: 23px;
    right: 23px;
`;