import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  @media screen and (max-width: 720px) {
    height: 80px;
  }
`;

const BgWrapp = styled.div`
  position: absolute;
  top: -2px;
  left: 5%;
  display:flex;
  align-items:center;
  @media screen and (max-width: 720px) {
    left: 2%;
  }
`;

const Background = styled.div`
  width: 400px;
  height: 70px;
  position: relative;
  @media screen and (max-width: 720px) {
    width: 200px;
    height: 50px;
  }
  @media screen and (min-width:720px) and (max-width: 760px) {
    width: 300px;
    height: 50px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 720px) {
    top: 40%;
  }
`;

const Navbar = styled.div`
  background:black;
  border-radius:36px;
  display:flex;
  align-items:center;
  margin-left:-3.5rem;
  margin-top:1rem;
  @media only screen and (max-width: 760px) {
   margin-left:-2rem;
  }
`
const LeaderBoard = styled.div`
  background-color:black;
  color:white;
  font-weight:600;
 
  
  
  border-top-left-radius:36px;
  border-bottom-left-radius:36px;

  @media only screen and (max-width: 760px) {
    padding:0.5rem 1rem;
    font-size:12px;
  }
  
  /* For tablets (portrait and landscape) */
  @media only screen and (min-width: 761px) and (max-width: 1023px) {
    padding:1rem 2rem;
    font-size:16px;
  }
  
  @media only screen and (min-width:1024px){
    padding:1rem 2rem;
    font-size:16px;
  }
`
const AirDrop = styled.div`
background-color:black;
  color:white;
  font-weight:600;
  font-size:16px;

  @media only screen and (max-width: 760px) {
    padding:0.5rem 0rem;
    font-size:12px;
  }
  
  /* For tablets (portrait and landscape) */
  @media only screen and (min-width: 761px) and (max-width: 1023px) {
    padding:1rem 2rem;
    font-size:16px;
  }
  
  @media only screen and (min-width:1024px){
    padding:1rem 2rem;
    font-size:16px;
  }
`
const About = styled.div`
background-color:black;
color:white;
font-weight:600;


border-top-right-radius:36px;
border-bottom-right-radius:36px;

@media only screen and (max-width: 760px) {
  padding:0.5rem 1rem;
  font-size:12px;
}

/* For tablets (portrait and landscape) */
@media only screen and (min-width: 761px) and (max-width: 1023px) {
  padding:1rem 2rem;
  font-size:16px;
}

@media only screen and (min-width:1024px){
  padding:1rem 2rem;
  font-size:16px;
}
`
const Header = () => {
  return (
    <HeaderWrapper>
      <BgWrapp>
        <Background>
          <img src={"/Images/Top.png"} width={"100%"} />
          <IconWrapper>
            <img src={"/Images/nexus-icon.svg"} width={"100%"} />
          </IconWrapper>
        </Background>
        <Navbar>
          <LeaderBoard>
            Leaderboard
          </LeaderBoard>
          <AirDrop>
            AirDrop
          </AirDrop>
          <About>
            About
          </About>

        </Navbar>
      </BgWrapp>
    </HeaderWrapper>
  );
};

export default Header;
