"use client";

import Image from "next/image";
import React from "react";
import styled from "styled-components";
import Heading from "../components/Heading";
import Flex from "../components/Flex";
import IconButton from "../components/IconButton";
import { FaArrowRight } from "react-icons/fa6";
import { COLORS } from "../utils/colors";
import Text from "../components/Text";
import Button from "../components/Button";
import RegisterButton from "../components/RegisterButton";
import useIsMobile from "../hooks/useIsMobile";
import useIsTab from "../hooks/useIsTab";

const Section = styled.div`
  height: 95vh;
  background-color: black;
  background-image: url("/Images/background-main.svg");
  background-repeat: no-repeat;
  background-size: cover;
  margin: 1rem;
  border-radius: 20px;
  position: relative;
`;

const HeadWrapper = styled.div`
  position: absolute;
  left: 14%;
  top: -14px;
`;
const IconButtonWrapper = styled.div`
  margin-right: 4rem;
  margin-top: 1rem;
`;

const Landing = () => {
  const isMobile = useIsMobile();
  const isTab = useIsTab();
  return (
    <Section>
      <HeadWrapper>
        <Image
          src={"/Images/nexus-icon.svg"}
          width={100}
          height={100}
          alt="icon"
        />
      </HeadWrapper>
      <Flex>
        <Flex
          justify={isTab ? "center" : "space-between"}
          width={"100%"}
          maxWidth={"1440px"}
          p={"0rem 3rem"}
          direction={isTab ? "column" : "row"}
        >
          <Flex
            direction={"column"}
            items={isMobile ? " start" : isTab ? "center" : "start"}
            gap={"1px"}
            height={isTab ? "fit-content" : "100%"}
          >
            <Heading>Empowering</Heading>
            <Heading>Innovation</Heading>
            <Flex height={"fit-content"}>
              <Heading>Futures</Heading>
              <IconButtonWrapper>
                <IconButton width={"65px"} icon={"25px"} color={COLORS.blue}>
                  <FaArrowRight />
                </IconButton>
              </IconButtonWrapper>
            </Flex>
          </Flex>
          <Flex
            direction={"column"}
            height={isTab ? "fit-content" : "100%"}
            items={isMobile ? " start" : isTab ? "center" : "start"}
          >
            <Text
              align={isMobile ? " start" : isTab ? "center" : "start"}
              maxWidth={isMobile ? "250px" : "500px"}
              size={"25px"}
              color={COLORS.light}
            >
              We provide straight forward tools that maximize financial
              opportunities. forward tools
            </Text>
            <Flex height={"fit-content"} mt={"7rem"} gap={"2rem"}>
              <RegisterButton>
                Register Now
                <IconButton
                  bg={COLORS.blue}
                  color={COLORS.white}
                  width={"40px"}
                  icon={"20px"}
                >
                  <FaArrowRight />
                </IconButton>
              </RegisterButton>
              <Button
                bordercolor={COLORS.white}
                bg={COLORS.transperant}
                color={COLORS.white}
              >
                Read Docs
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Section>
  );
};

export default Landing;
