import React from 'react'
import styled from 'styled-components'

function Title({children}) {
  return (
    <TitlePage>
      {children}
    </TitlePage>
  )
}

export default Title


const TitlePage = styled.h2`
  font-family: 'Oswald';
  font-size: 2.5rem;
  color: #fff;
  font-weight: bold;
`