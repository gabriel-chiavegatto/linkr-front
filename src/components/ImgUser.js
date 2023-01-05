import React from 'react'
import styled from 'styled-components'

function ImgUser({src, alt}) {
  return <Img src={src} alt={alt}/>
}

export default ImgUser


const Img = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-top: 15px;
  @media (max-width: 1440px) {
    width: 53px;
    height: 53px;
  }
`