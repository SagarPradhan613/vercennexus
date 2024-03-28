"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/colors";
import Flex from "../../components/Flex";
import IconButton from "../../components/IconButton";
import { FaArrowRight } from "react-icons/fa6";
import Text from "../../components/Text";
import useIsTab from "../../hooks/useIsTab";
import useIsMobile from "../../hooks/useIsMobile";
import './Card.css';

const Container = styled.div`
  border-radius: 35px;
  padding: 2rem;
  background-color: ${({ bg }) => bg};
  min-width: ${({ width }) => width || "auto"};
  transition: all 0.4s ease-in-out;

  @media screen and (max-width: 520px) {
    padding: 1rem;
  }
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
const ConnectorDisable = styled.div`
  width: 10px;
  height: 20px;
  background-color: ${COLORS.transperant};
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

function ConnectedCard({ isTail = true, title, description }) {
  const isTab = useIsTab();
  const isMobile = useIsMobile();
  const [hover, setHover] = useState(false);
  return (
    <div className="CardContainerFlex">
      <div className="CardContainer"
        width={isTab ? "240px" : "250px"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        bg={hover ? COLORS.blue : COLORS.white}
      >
        <div className="CardFlex " direction={"column"} gap={'1.5rem'}>
          <p className="CardTitle "
            size={"30px"}
            color={hover ? COLORS.white : COLORS.black}
            fontFamily={"bold"}
          >
            {title}
          </p>
          <button className="CardIconButton"
            bg={hover ? COLORS.white : COLORS.blue}
            color={hover ? COLORS.blue : COLORS.white}
            isHover={false}
          >
           <svg className="arrowsvg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
          </button>
          <h1 className="CardParaText"
            color={hover ? COLORS.light : COLORS.darkLight}
            align={"center"}
            maxWidth={"190px"}
            size={"15px"}
          >
            {description}
          </h1>
        </div>
      </div>

      {isTail && !isMobile ? <div className="Connector" /> : <div className="ConnectorDisable" />}
    </div>
  );
}

export default ConnectedCard;
