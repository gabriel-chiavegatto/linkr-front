import React from 'react'
import styled from 'styled-components'

function Logo({size}) {
  return (
    <Linkr size={size}>
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
`