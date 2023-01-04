import React from "react";
import styled from "styled-components";
import picture from "../logo.svg";
import Input from "./form/Input";
import Logo from "./Logo";

export default function Header() {
  const [search, setSearch] = React.useState("");
  console.log(search)
  return (
    <Head>
      <Logo size={"2.5rem"} />
      <ContainerSearch>
        <Input
          placeholder={"Search"}
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </ContainerSearch>
      <ContainerUser>
        <Username>Wesley</Username>
        <img src={picture} alt="people" />
      </ContainerUser>
      
    </Head>
  );
}

const Head = styled.header`
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 72px;
  background-color: #000;
  img {
    width: 53px;
    height: 53px;
  }
`;

const ContainerSearch = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;

const ContainerUser = styled.div`
    max-width: 33%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`

const Username = styled.span`
    color: #fff;
    font-family: 'Oswald';
    font-size: 1.4rem;
`