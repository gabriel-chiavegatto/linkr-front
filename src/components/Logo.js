import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

function Logo({size}) {
  const navigate = useNavigate();
  return (
    <Linkr size={size} onClick={() => navigate('/timeline')}>
      linkr
    </Linkr>
  )
}

export default Logo

const Linkr = styled.h1`
  color: #fff;
  font-family: "Passion One";
  font-weight: bold;
  font-size: ${props => props.size};
  letter-spacing: 0.05em;
`