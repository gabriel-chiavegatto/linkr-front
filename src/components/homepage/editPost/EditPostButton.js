import { useEffect } from "react";
import styled from "styled-components";
import { TiEdit } from "react-icons/ti";
import axios from "axios";

export function EditPostButton({startEditMode}){ 
    return(
        <Main onClick={()=>startEditMode()}>
            <TiEdit />
        </Main>
    )
}

const Main = styled.div`
    color: #fff;
`;