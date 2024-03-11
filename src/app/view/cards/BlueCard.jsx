import React from "react";
import styled, { keyframes } from "styled-components";
import { COLORS } from "../../utils/colors";
import Flex from "../../components/Flex";
import IconButton from "../../components/IconButton";
import { FaArrowRight } from "react-icons/fa6";
import Text from "../../components/Text";
import useIsTab from "../../hooks/useIsTab";

const MoveFromLeft = keyframes`
  from {
    transform: translateX(1000px);
  }
  to {
    transform: translateX(0px);
  }
`;

const Container = styled.div`
  border-radius: 35px;
  padding: 3rem;
  background-color: ${COLORS.blue};
  width: 100%;
  max-width: ${({ width }) => width || "fit-content"};
  margin: 0px;
  animation: ${MoveFromLeft} 1s;
  transition: all 0.4s ease-in-out;
  @media only screen and (max-width: 1240px) {
    margin: 10px 7px;
  }
  @media screen and (max-width: 720px) {
    padding: 2rem;
  }

  &:hover {
    background-color: ${COLORS.black};
  }
`;

const BlueCard = () => {
  const isTab = useIsTab();
  return (
    <Container width={isTab ? "1000px" : "720px"}>
      <Flex justify={"space-between"}>
        <Text
          size={"35px"}
          maxWidth={isTab ? "220px" : "220px"}
          fontFamily={"bold"}
        >
          Get part of this now!
        </Text>
        <IconButton>
          <FaArrowRight />
        </IconButton>
      </Flex>
    </Container>
  );
};

export default BlueCard;
