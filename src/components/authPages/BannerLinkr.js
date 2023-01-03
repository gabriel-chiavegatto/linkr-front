import React from 'react'
import styled from 'styled-components'
import Logo from '../Logo'

function BannerLinkr() {
  return (
    <Banner>
      <ContainerContent>
        <Logo size={'6rem'}/>
        <Content>
          save, share and discover
        </Content>
        <Content>
          the best links on the web
        </Content>
      </ContainerContent>
    </Banner>
  )
}

export default BannerLinkr

const Banner = styled.div`
  background-color: #151515;
  height: 100vh;
  width: 60%;
`

const Content = styled.span`
  color: #fff;
  font-family: "Oswald";
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 5px;
`

const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 25%;
  padding-left: 20%;
`