


import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Flex from "@/components/Flex";
import { MuiOtpInput } from "mui-one-time-password-input";
import Text from "@/components/Text";
import { COLORS } from "@/utils/colors";
import RegisterButton from "@/components/RegisterButton";
import { FaArrowRight } from "react-icons/fa6";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa6";
import IconButton from "@/components/IconButton";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: ${COLORS.white};
  border: none;
  box-shadow: 24;
  padding: 2rem;
  border-radius: 35px;
  @media only screen and (max-width: 520px) {
    width: 350px;
  }
`;

const BackButton = styled.button`
  border-radius: 50%;
  padding: 10px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  border: none;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 1s ease;
  &:hover {
    background: ${COLORS.black};
  }
`;

export default function BasicModal({
  open,
  login,
  handleSubmit,
  inviteError,
  setOtp,
  otp,
  handleClose,
}) {
  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <Flex direction={"column"} gap={"1rem"}>
            <Flex justify={"start"} width={"100%"} gap={"3rem"} mb={"1rem"}>
              <BackButton onClick={handleClose}>
                <FaArrowLeft />
              </BackButton>
              <Text color={COLORS.black} fontFamily={"bold"} size={"23px"}>
                Enter Invite Code
              </Text>
            </Flex>
            <MuiOtpInput value={otp} onChange={handleChange} length={5} />
            <Flex mt={"3rem"} width={"100%"}>
              <RegisterButton
                bg={COLORS.blue}
                color={COLORS.white}
                onClick={handleSubmit}
                fullWidth={true}
                justify={"space-between"}
              >
                Sign Up
                <IconButton width={"40px"}>
                  <FaArrowRight />
                </IconButton>
              </RegisterButton>
            </Flex>

            <span style={{ color: "red" }}>{inviteError}</span>
            <small>
              Already regsitered?{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={login}
              >
                Sign in
              </span>
            </small>
          </Flex>
        </Container>
      </Modal>
    </div>
  );
}
