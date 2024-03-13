import React from "react";
import styled from "styled-components";
import Flex from "../components/Flex";
import Text from "../components/Text";
import { COLORS } from "../utils/colors";
import useIsMobile from "../hooks/useIsMobile";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { MdOutlineWallet } from "react-icons/md";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  margin-top: 20px;
  @media screen and (max-width: 520px) {
    height: 80px;
  }
`;

const BgWrapp = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

const Background = styled.div`
  width: 490px;
  height: 92px;
  position: relative;
  @media screen and (max-width: 520px) {
    width: 350px;
    height: 65px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 520px) {
    left: 55%;
  }
`;

const Icon = styled.a`
  color: ${COLORS.white};
  cursor: pointer;
  transition: transform 1s ease;
  &:hover {
    color: ${COLORS.blue};
  }
`;

const Footer = () => {
  const isMobile = useIsMobile();
  return (
    <HeaderWrapper>
      <BgWrapp>
        <Background>
          <img src={"/Images/Bottom.png"} width={"100%"} />
          <IconWrapper>
            <Flex justify={"space-between"} width={"100%"}>
              <Text color={COLORS.light} overflow={true} size={"20px"}>
                Follow on our socials
              </Text>
              <Flex>
                <Icon href="https://twitter.com/NexusLaunchpad" target="_blank">
                  <FaXTwitter />
                </Icon>
                <Icon href="https://t.me/NexusLaunchpad" target="_blank">
                  <FaTelegramPlane />
                </Icon>
              </Flex>
            </Flex>
          </IconWrapper>
        </Background>
      </BgWrapp>
    </HeaderWrapper>
  );
};

export default Footer;
