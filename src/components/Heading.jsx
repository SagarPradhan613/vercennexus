/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/colors";

const StyledText = styled.h1`
  font-family: ${({ fontFamily }) => fontFamily || "bold"};
  font-size: ${({ size }) => size || "100px"};
  font-weight: ${({ weight }) => weight || 200};
  max-width: ${({ maxWidth }) => maxWidth || "100%"};
  color: ${({ color }) => color || COLORS.white};
  text-align: ${({ align }) => align || "start"};
  white-space: ${({ overflow }) => (overflow ? "nowrap" : "normal")};
  margin: ${({ m }) => m || "0px"};
  line-height: ${({ lineHeight }) => lineHeight};
  @media only screen and (max-width: 1300px) and (min-width: 520px) {
    font-size: ${({ size }) => size || "75px"};
  }
  @media screen and (max-width: 520px) {
    font-size: 40px;
    line-height: 50px;
  }
  @font-face {
    font-family: "bold";
    src: url("/fonts/Sen-Bold.woff2") format("woff2");
  }
  @font-face {
    font-family: "extrabold";
    src: url("/fonts/Sen-ExtraBold.woff2") format("woff2");
  }
`;

const Heading = ({
  children,
  size,
  weight,
  maxWidth,
  color,
  align,
  hover = false,
  overflow = false,
  m,
  lineHeight,
  isGradient = false,
  fontFamily,
}) => {
  return (
    <StyledText
      size={size}
      weight={weight}
      maxWidth={maxWidth}
      color={color}
      align={align}
      hover={hover}
      overflow={overflow}
      m={m}
      lineHeight={lineHeight}
      fontFamily={fontFamily}
      className={isGradient ? "grad-text" : ""}
    >
      {children}
    </StyledText>
  );
};

export default Heading;
