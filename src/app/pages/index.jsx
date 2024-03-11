"use client";

import Image from "next/image";
import React from "react";
import styled, { keyframes } from "styled-components";
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
import Header from "../view/Header";
import Footer from "../view/Footer";
import Card from "../view/cards/ConnectedCard";
import BlueCard from "../view/cards/BlueCard";
import { SliderCarousal } from "../view/Slider";
import useIsBig from "../hooks/useIsBig";

const MoveFromLeft = keyframes`
  from {
    transform: translateX(-1000px);
  }
  to {
    transform: translateX(0px);
  }
`;

const MoveFromLeftWrapper = styled.div`
  animation: ${MoveFromLeft} 1s;
`;

const Section = styled.div`
  min-height: 95vh;
  background: linear-gradient(
    115.03deg,
    #ffffff 6.54%,
    #0075ff 27.97%,
    rgba(0, 70, 153, 0.25) 119.25%
  );
  background-repeat: no-repeat;
  background-size: cover;
  margin: 1rem;
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const IconButtonWrapper = styled.div`
  margin-right: 4rem;
  margin-top: 1rem;
`;

const Landing = () => {
  const isMobile = useIsMobile();
  const isTab = useIsTab();
  const isBig = useIsBig();
  return (
    <Section>
      <Header />
      <Flex direction={"column"} gap={isTab ? "3rem" : "10rem"}>
        <Flex
          justify={isTab ? "center" : "space-between"}
          width={"95%"}
          maxWidth={"1440px"}
          direction={isTab ? "column" : "row"}
        >
          <Flex
            direction={"column"}
            items={isMobile ? " start" : isTab ? "center" : "start"}
            gap={"0px"}
            height={isTab ? "fit-content" : "100%"}
          >
            <Heading lineHeight={"85px"}>Empowering</Heading>
            <Heading lineHeight={"85px"}>Innovation</Heading>
            <Flex height={"fit-content"} gap={isMobile ? "1rem" : "3rem"}>
              <Heading lineHeight={"45px"}>Futures</Heading>
              <IconButtonWrapper>
                <IconButton
                  width={isMobile ? "35px" : "65px"}
                  icon={isMobile ? "20px" : "25px"}
                  color={COLORS.blue}
                >
                  <FaArrowRight />
                </IconButton>
              </IconButtonWrapper>
            </Flex>
          </Flex>
          <Flex
            direction={"column"}
            height={isTab ? "fit-content" : "100%"}
            items={isMobile ? " start" : isTab ? "center" : "start"}
            m={isTab ? "0px" : "0px 50px 0px 0px"}
          >
            <Text
              align={isMobile ? " start" : isTab ? "center" : "start"}
              maxWidth={isMobile ? "380px" : "500px"}
              size={"25px"}
              color={COLORS.light}
              m={isMobile ? "0px 0px 0px 15px" : "0px"}
            >
              We provide straight forward tools that maximize financial
              opportunities. forward tools
            </Text>
            <Flex
              height={"fit-content"}
              mt={"5rem"}
              gap={isMobile ? "1rem" : "2rem"}
            >
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
        <Flex
          justify={"space-between"}
          items={isBig ? "center" : "start"}
          width={"100%"}
          maxWidth={"1440px"}
          direction={isBig ? "column" : "row"}
        >
          <MoveFromLeftWrapper>
            {isBig ? (
              <SliderCarousal>
                <Card />
                <Card />
                <Card />
                <Card />
              </SliderCarousal>
            ) : (
              <Flex gap={"0px"}>
                <Card />
                <Card />
                <Card />
                <Card isTail={false} />
              </Flex>
            )}
          </MoveFromLeftWrapper>

          <Flex width={"100%"}>
            <BlueCard />
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </Section>
  );
};

export default Landing;
