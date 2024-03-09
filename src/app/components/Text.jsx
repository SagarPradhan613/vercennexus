import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/colors";

const StyledText = styled.h1`
  font-family: "SEN medium";
  font-size: ${({ size }) => size || "18px"};
  font-weight: ${({ weight }) => weight || 400};
  max-width: ${({ maxWidth }) => maxWidth || "100%"};
  color: ${({ color }) => color || COLORS.white};
  text-align: ${({ align }) => align || "start"};
  white-space: ${({ overflow }) => (overflow ? "nowrap" : "normal")};
  margin: ${({ m }) => m || "0px"};
  @media only screen and (max-width: 1300px) and (min-width: 720px) {
    font-size: ${({ size }) => size || "15px"};
  }
  @media screen and (max-width: 720px) {
    font-size: 15px;
  }
  @font-face {
    font-family: "SEN bold";
    src: url("/fonts/Sen-Bold.woff2") format("woff2");
  }
  @font-face {
    font-family: "SEN medium";
    src: url("/fonts/Sen-Medium.woff2") format("woff2");
  }
`;

const Text = ({
  children,
  size,
  weight,
  maxWidth,
  color,
  align,
  hover = false,
  overflow = false,
  m,
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
    >
      {children}
    </StyledText>
  );
};

export default Text;
