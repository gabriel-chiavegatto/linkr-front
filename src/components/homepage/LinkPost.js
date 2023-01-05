import React from 'react'
import styled from 'styled-components'

function LinkPost() {
  return (
    <ContainerLinkPost>
      <DescriptionLink></DescriptionLink>
      <ContainerImageLink></ContainerImageLink>
    </ContainerLinkPost>
  )
}

export default LinkPost

const ContainerLinkPost = styled.div`
  height: 70%;
  width: 100%;
  border: 1px solid #C4C4C4;
  border-radius: 16px;
  display: flex;
`

const DescriptionLink = styled.div`
  width: 75%;
  height: 100%;
`

const ContainerImageLink = styled.div`
  width: 25%;
  height: 100%;
`