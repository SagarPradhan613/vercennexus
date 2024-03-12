/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";
import { COLORS } from "../utils/colors";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  background: ${({ bg }) => bg || COLORS.white};
  color: ${({ color }) => color || COLORS.black};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  border: 2px solid;
  border-color: ${({ bordercolor }) => bordercolor || COLORS.white};
  border-radius: 45px;
  padding: 0.9rem 1.6rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  font-family: "SEN bold";
  font-size: 20px;
  font-weight: 400;
  position: relative;
  z-index: 10;
  @media only screen and (max-width: 520px) {
    font-size: 15px;
    padding: 0.7rem 1rem;
  }
  &:hover {
    background: ${({ hoverbg }) => hoverbg || COLORS.white};
    color: ${({ hovercolor }) => hovercolor || COLORS.black};
  }
  @font-face {
    font-family: "SEN bold";
    src: url("/fonts/Sen-Bold.woff2") format("woff2");
  }
`;

function Button({
  children,
  bg,
  color,
  hoverbg,
  hovercolor,
  fullWidth,
  bordercolor,
  onClick,
  ref,
  disabled = false,
}) {
  return (
    <StyledButton
      bg={bg}
      color={color}
      hoverbg={hoverbg}
      hovercolor={hovercolor}
      fullWidth={fullWidth}
      borderColor={bordercolor}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
