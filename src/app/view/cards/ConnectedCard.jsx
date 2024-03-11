import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/colors";
import Flex from "../../components/Flex";
import Heading from "../../components/Heading";
import IconButton from "../../components/IconButton";
import { FaArrowRight } from "react-icons/fa6";
import Text from "../../components/Text";
import useIsTab from "../../hooks/useIsTab";

const Container = styled.div`
  border-radius: 35px;
  padding: 2rem;
  background-color: ${COLORS.white};
  min-width: ${({ width }) => width || "auto"};


`;
const Connector = styled.div`
  width: 10px;
  height: 20px;
  background-color: ${COLORS.white};
  clip-path: polygon(
    0 0,
    0% 20%,
    0 51%,
    0% 80%,
    0 100%,
    50% 70%,
    100% 100%,
    100% 80%,
    100% 51%,
    100% 20%,
    100% 0,
    50% 30%
  );
`;

function ConnectedCard({ isTail = true }) {
  const isTab = useIsTab();
  return (
    <Flex gap={"0px"}>
      <Container width={isTab ? "250px" : "230px"}>
        <Flex direction={"column"} gap={"2em"}>
          <Text size={"30px"} color={COLORS.black} fontFamily={"bold"}>
            Engage
          </Text>
          <IconButton bg={COLORS.blue} color={COLORS.white}>
            <FaArrowRight />
          </IconButton>
          <Text color={COLORS.darkLight} align={"center"} maxWidth={"190px"}>
            We provide straight forward tools forward
          </Text>
        </Flex>
      </Container>
      {isTail && <Connector />}
    </Flex>
  );
}

export default ConnectedCard;
