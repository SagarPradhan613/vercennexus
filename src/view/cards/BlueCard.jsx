import React from "react";
import styled, { keyframes } from "styled-components";
import { COLORS } from "../../utils/colors";
import Flex from "../../components/Flex";
import IconButton from "../../components/IconButton";
import { FaArrowRight } from "react-icons/fa6";
import Text from "../../components/Text";
import useIsTab from "../../hooks/useIsTab";
import useIsBig from "../../hooks/useIsBig";
import './Card.css';

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
    max-width: 1000px;
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
  const isBig = useIsBig()
  return (
    <div className="BlueCardContainer" width={isBig ? "1040px" : "720px"}>
      <div className="BlueCardFlexHome">
        <h1 className="BlueCardHeader"
          size={"30px"}
          maxWidth={isBig ? "100%" : "200px"}
          fontFamily={"bold"}
        >
          DAPP Coming Soon!
        </h1>
        <div className="BlueCardIconButton group">
          {/* <FaArrowRight /> */}
          <div className="-translate-x-12 absolute transition-all duration-700 ease-in-out group-hover:translate-x-0 ">
            <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.0607 12.1603C26.6464 11.5745 26.6464 10.6247 26.0607 10.0389L16.5147 0.493008C15.9289 -0.0927784 14.9792 -0.0927783 14.3934 0.493009C13.8076 1.0788 13.8076 2.02854 14.3934 2.61433L22.8787 11.0996L14.3934 19.5849C13.8076 20.1707 13.8076 21.1204 14.3934 21.7062C14.9792 22.292 15.9289 22.292 16.5147 21.7062L26.0607 12.1603ZM1.83591 9.59961C1.00749 9.59961 0.335913 10.2712 0.335913 11.0996C0.335913 11.928 1.00749 12.5996 1.83591 12.5996L1.83591 9.59961ZM25 9.59961L1.83591 9.59961L1.83591 12.5996L25 12.5996L25 9.59961Z" fill="black" />
            </svg>

          </div>
          <div className="translate-x-0 absolute transition-all duration-700 ease-in-out group-hover:translate-x-12 ">
            <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.0607 12.1603C26.6464 11.5745 26.6464 10.6247 26.0607 10.0389L16.5147 0.493008C15.9289 -0.0927784 14.9792 -0.0927783 14.3934 0.493009C13.8076 1.0788 13.8076 2.02854 14.3934 2.61433L22.8787 11.0996L14.3934 19.5849C13.8076 20.1707 13.8076 21.1204 14.3934 21.7062C14.9792 22.292 15.9289 22.292 16.5147 21.7062L26.0607 12.1603ZM1.83591 9.59961C1.00749 9.59961 0.335913 10.2712 0.335913 11.0996C0.335913 11.928 1.00749 12.5996 1.83591 12.5996L1.83591 9.59961ZM25 9.59961L1.83591 9.59961L1.83591 12.5996L25 12.5996L25 9.59961Z" fill="black" />
            </svg>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueCard;
