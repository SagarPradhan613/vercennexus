import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Flex from "../components/Flex";
import { MuiOtpInput } from "mui-one-time-password-input";
import Text from "../components/Text";
import { COLORS } from "../utils/colors";
import RegisterButton from "../components/RegisterButton";
import IconButton from "../components/IconButton";
import { FaArrowRight } from "react-icons/fa6";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "25px",
};

export default function BasicModal({ open,login, handleSubmit,inviteError,  setOtp, otp ,  handleClose }) {

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
        <Box sx={style}>
          <Flex direction={"column"} gap={"2rem"}>
            <Text color={COLORS.black}>Enter Invite code</Text>
            <MuiOtpInput value={otp} onChange={handleChange} length={5} />
            <RegisterButton
              bg={COLORS.blue}
              color={COLORS.white}
              onClick={handleSubmit}
            >
              Submit Now
              <IconButton>
                <FaArrowRight />
              </IconButton>
            </RegisterButton>

            <span style={{color: "red"}}>{inviteError}</span>
            <small>Already regsitered ? <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={login}>Sign in</span></small>
          </Flex>
        </Box>
      </Modal>
    </div>
  );
}
