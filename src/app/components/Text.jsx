import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/colors";

const StyledText = styled.h1`
  font-family: ${({ fontFamily }) => fontFamily || "medium"};
  font-size: ${({ size }) => size || "18px"};
  font-weight: ${({ weight }) => weight || 400};
  max-width: ${({ maxWidth }) => maxWidth || "100%"};
  color: ${({ color }) => color || COLORS.white};
  text-align: ${({ align }) => align || "start"};
  white-space: ${({ overflow }) => (overflow ? "nowrap" : "normal")};
  margin: ${({ m }) => m || "0px"};
  @media screen and (max-width: 720px) {
  }
  @font-face {
    font-family: "bold";
    src: url("/fonts/Sen-Bold.woff2") format("woff2");
  }
  @font-face {
    font-family: "medium";
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
      fontFamily={fontFamily}
    >
      {children}
    </StyledText>
  );
};

export default Text;
