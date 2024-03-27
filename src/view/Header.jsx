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
  top: -12px;
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
    width: 300px;
    height: 50px;
  }
  @media screen and (min-width:720px) and (max-width: 760px) {
    width: 300px;
    height: 50px;
  }
`;

const IconWrapper = styled.a`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 720px) {
    top: 50%;
  }
`;

const Navbar = styled.div`
  background:black;
  gap:5px;
  border-radius:36px;
  align-items:center;
  margin-left:-3.5rem;
  padding:10px;
  padding-right:15px;
  margin-top:1.5rem;
  @media only screen and (max-width: 760px) {
   margin-left:-2rem;
  }
  @media screen and (max-width: 1024px) {
    display:none;
  }
  @media screen and (min-width: 1024px) {
    display:flex;
  }
`
const LeaderBoard = styled.a`
  background-color:black;
  color:white;
  font-weight:600;
  transition:all;
  transition-duration:300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
 
  &:hover {
    background-color: #0075FF;
  }
  
  
  border-radius:36px;

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
    padding:0.5rem 2rem;
    font-size:16px;
  }
`
const AirDrop = styled.a`
background-color:black;
  color:white;
  font-weight:600;
  font-size:16px;
  border-radius:36px;
  transition:all;
  transition-duration:300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
 
  &:hover {
    background-color: #0075FF;
  }

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
    padding:0.5rem 2rem;
    font-size:16px;
  }
`
const About = styled.a`
background-color: ${props => props.pathname === '/about' ? '#0075FF' : 'black'};
color:white;
font-weight:600;
transition:all;
transition-duration:300ms;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

&:hover {
  background-color: #0075FF;
}


border-radius:36px;

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
  padding:0.5rem 2rem;
  font-size:16px;
}
`
const Header = ({ pathname }) => {
  return (
    <div className="headwrapper">
      <div className="BgWrapp">
        <div className="Background">
          <img src={"/Images/Top.png"} width={"100%"} />
          <a className="IconWrapper" href="/">
            <img src={"/Images/nexus-icon.svg"} width={"100%"} />
          </a>
        </div>
        <div className="Navbar">
          <a className={`${pathname === 'leaderboard' ? 'bg-[#0075FF] LeaderBoard' : 'LeaderBoard black'}`} href="/leaderboard">
            Leaderboard
          </a>
          <a className="AirDrop" href="/airdrop">
            Airdrop
          </a>
          <a className={`${pathname === 'about' ? 'bg-[#0075FF] About' : 'About black'}`} pathname={pathname} href="/about">
            About
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
