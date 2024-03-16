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
      </BgWrapp>
    </HeaderWrapper>
  );
};

export default Header;
