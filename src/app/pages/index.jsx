"use client"

import React, { useEffect, useState } from "react";
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
import { FaArrowDown } from "react-icons/fa6";

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
  const [textAnim, setTextAnim] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextAnim((prev) => [...prev, 1]);
    }, 250);

    // Clear the interval when the array length reaches 3
    if (textAnim.length === 3) {
      clearInterval(interval);
    }
    console.log(textAnim);
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [textAnim]); // Add textAnim to dependencies to ensure effect is updated
  if (typeof window !== 'undefined') {
    const cursor = document.querySelector(".cursor");
  
    document.addEventListener("mousemove", (e) => {
      cursor?.setAttribute(
        "style",
        "top: " + (e.pageY - 20) + "px; left: " + (e.pageX - 20) + "px;"
      );
      if (e.target.tagName.toLowerCase() === "button") {
        cursor?.setAttribute(
          "style",
          "top: " +
            (e.pageY - 20) +
            "px; left: " +
            (e.pageX - 20) +
            "px; background-color: " +
            (e.target.tagName.toLowerCase() === "button"
              ? "#0075FF"
              : "transparent") +
            ";"
        );
      }
    });
  
    document.addEventListener("click", (e) => {
      cursor?.classList.add("expand");
      setTimeout(() => {
        cursor?.classList.remove("expand");
      }, 500);
    });
  }
  
  return (
    <div className="gradient-background">
      <div class="cursor"></div>
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
            m={isMobile ? "0px 50px 0px 0px" : "0px"}
          >
            <div
              className={textAnim.length >= 1 ? "swiftup" : "swiftupdisable"}
            >
              <Heading lineHeight={"85px"}>Empowering</Heading>
            </div>
            <div
              className={textAnim.length >= 2 ? "swiftup" : "swiftupdisable"}
            >
              <Heading lineHeight={"85px"}>Innovation</Heading>
            </div>
            <div
              className={textAnim.length >= 3 ? "swiftup" : "swiftupdisable"}
            >
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
            </div>
          </Flex>
          <Flex
            direction={"column"}
            height={isTab ? "fit-content" : "100%"}
            items={isMobile ? " start" : isTab ? "center" : "start"}
          >
            <Text
              align={isMobile ? " start" : isTab ? "center" : "start"}
              maxWidth={isMobile ? "380px" : "500px"}
              size={"25px"}
              color={COLORS.light}
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
                How to Join?
                <IconButton
                  bg={COLORS.blue}
                  color={COLORS.white}
                  width={"40px"}
                  icon={"20px"}
                  toLeft={false}
                >
                  <FaArrowDown />
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
                <Card title={"Engage"} />
                <Card title={"Snapshot"} />
                <Card title={"Lottery"} />
                <Card title={"Contibute"} isTail={false} />
              </SliderCarousal>
            ) : (
              <Flex gap={"0px"}>
                <Card title={"Engage"} />
                <Card title={"Snapshot"} />
                <Card title={"Lottery"} />
                <Card title={"Contibute"} isTail={false} />
              </Flex>
            )}
          </MoveFromLeftWrapper>

          <Flex width={"100%"}>
            <BlueCard />
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </div>
  );
};

export default Landing;
