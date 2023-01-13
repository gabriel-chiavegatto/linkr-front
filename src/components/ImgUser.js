import React from 'react'
import styled from 'styled-components'

function ImgUser({src, alt, size}) {
  return <Img src={src} alt={alt} size={size} />
}

export default ImgUser


const Img = styled.img`
  width: ${({size}) => (size? size: "70px")};
  height: ${({size}) => (size? size: "70px")};
  border-radius: 50%;
  @media (max-width: 1440px) {
    width: ${({size}) => (size? size: "53px")};
    height: ${({size}) => (size? size: "53px")};
  }
`