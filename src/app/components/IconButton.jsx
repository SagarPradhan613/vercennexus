/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";
import { COLORS } from "../utils/colors";
import Flex from "./Flex";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ bg }) => bg || COLORS.white};
  color: ${({ color }) => color || COLORS.black};
  width: ${({ width }) => width || "50px"};
  height: ${({ width }) => width || "50px"};
  border-radius: 50%;
  cursor: pointer;
  transition: all 1s ease;
  position: relative;
  z-index: 10;
  border: none;
  font-size: ${({ icon }) => icon || "25px"};
  overflow: hidden;

  @media only screen and (max-width: 520px) {

  }

  ${({ toLeft }) =>
    toLeft &&
    `
      & > * {
        transform: translateX(-31px);
        transition: transform 1s ease;
      }
    `}

  &:hover {
    background: ${({ hoverbg }) => hoverbg || COLORS.white};
    color: ${({ hovercolor }) => hovercolor || COLORS.black};
    ${({ toLeft }) =>
      toLeft &&
      `
      & > * {
        transform: translateX(31px);
        transition: transform 1s ease;
      }
    `}
    ${({ toLeft }) =>
      !toLeft &&
      `
      & > * {
        transform: translateY(31px);
        transition: transform 1s ease;
      }
    `}
  }
`;

function IconButton({
  children,
  bg,
  color,
  hoverbg,
  hovercolor,
  width,
  bordercolor,
  onClick,
  ref,
  icon,
  disabled = false,
  toLeft = true,
}) {
  return (
    <StyledButton
      bg={bg}
      color={color}
      hoverbg={hoverbg}
      hovercolor={hovercolor}
      width={width}
      icon={icon}
      borderColor={bordercolor}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
      toLeft={toLeft}
    >
      {toLeft ? (
        <Flex direction={toLeft ? "row" : "column"} gap={"2rem"}>
          {children}
          {children}
        </Flex>
      ) : (
        <>{children}</>
      )}
    </StyledButton>
  );
}

export default IconButton;
