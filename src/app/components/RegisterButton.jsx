/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";
import { COLORS } from "../utils/colors";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  white-space: nowrap;
  background: ${({ bg }) => bg || COLORS.white};
  color: ${({ color }) => color || COLORS.black};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  border: none;
  border-radius: 45px;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  font-family: "SEN bold";
  font-size: 20px;
  font-weight: 400;
  position: relative;
  z-index: 10;
  @media only screen and (max-width: 520px) {
    font-size: 15px;
    padding: 0.2rem 0.2rem 0.2rem 1rem;
    gap: .5rem;
  }
  &:hover {
    background: ${({ hoverbg }) => hoverbg || COLORS.black};
    color: ${({ hovercolor }) => hovercolor || COLORS.white};
  }
  @font-face {
    font-family: "SEN bold";
    src: url("/fonts/Sen-Bold.woff2") format("woff2");
  }
`;

function RegisterButton({
  children,
  bg,
  color,
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

export default RegisterButton;
