import React from 'react'
import styled from 'styled-components'
import BannerForm from '../components/authPages/BannerForm'
import BannerLinkr from '../components/authPages/BannerLinkr'

function LoginPage() {
  return (
    <ContainerLogin>
      <BannerLinkr></BannerLinkr>
      <BannerForm></BannerForm>
    </ContainerLogin>
  )
}

export default LoginPage

const ContainerLogin = styled.div`
  display: flex;
`