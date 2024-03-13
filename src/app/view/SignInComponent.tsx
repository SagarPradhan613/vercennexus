import React, { useEffect, useState } from "react";
import RegisterButton from '../components/RegisterButton';
import IconButton from '../components/IconButton';
import { FaArrowDown } from "react-icons/fa6";
import { COLORS } from "../utils/colors";
import { IoMdLogOut } from "react-icons/io";
import { Box, Modal, Typography } from '@mui/material';
import Text from "../components/Text";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Person } from '@mui/icons-material';
import ReferralModal from "./RefferalModal";
import Button from "../components/Button";
import Flex from "../components/Flex";
import useIsMobile from "../hooks/useIsMobile";
import useIsTab from "../hooks/useIsTab";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderColor: "white",
  padding: '10px',
  borderRadius: '15px',
  width: '100%',
  maxWidth: '1000px',
  '@media (max-width: 768px)': {
    width: '90%',
    maxWidth: '90%'
  }
};

const SignIn = () => {
  const [viewMore, setViewMore] = useState(false)
  const isBig = useIsTab()
  const searchParams = useSearchParams()
  const [isModal, setIsmodal] = useState<boolean>(false);
  const refId = searchParams.get('refId');

  const [referrals, setReferrals] = useState<any>([]);
  const [profile, setProfile] = useState<any>(null);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [errorText, setErrorText] = useState<any>(null);
  const clientId: any = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENTID
  const isMobile = useIsMobile()
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [access_token, setAccessToken] = useState<string | null>(localStorage?.getItem('access_token'));
  const [copied, setCopied] = useState(false)


  useEffect(() => {
    // setWeb3auth(1)
    // console.log(web3auth); 



 


  }, []);


  useEffect(() => {
  


  }, [web3auth?.status])


  useEffect(() => {
   
  }, [access_token])

  useEffect(() => {

  }, [refId])

  const copy = (text: any) => {

  }

  const getReferer = async () => {


    try {
      let config = {
        method: "get",
        url: API_URL + `/get/referer?id=${refId}`,
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json"
        }
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.status === "OK") {
            // setProfile(response.data.profile)
          }
          if (response.data.status === "NOT OK") {
            setErrorText(response.data.message)
          }
        })
        .catch((error) => {

          console.log("axios", error);
          // setStatusText("Internal Error");
        });
    } catch (e) {
      console.log(e);

    }
  }

  const getUser = async () => {


    
  }


  const isConnected = async () => {

  };

  const login = async () => {
    


  }

  const loginSignup = async (_web3auth: Web3Auth | null, _provider: IProvider | null | undefined) => {

  }

  const logout = async () => {



  }


  const handleClose = () => {
 
  }



  return (

    <Box flexDirection="column" justifyContent="start" alignItems="start" >
      {web3auth?.status === "connected" ? (
        <>
          <Text color={COLORS.white} fontFamily="SEN Bold" size="30px" align="center" weight={undefined} maxWidth={undefined} m={undefined}>Whitelisted!</Text>
          <Box maxWidth={isMobile ? '270px' : '100%'} width={'100%'}>

            <Button
              bordercolor={COLORS.white}
              bg={COLORS.transperant}
              color={COLORS.white}
              fullWidth={true}
              onClick={() => setIsmodal(true)} hoverbg={undefined} hovercolor={undefined} ref={undefined}              >
              Referal Details
            </Button>
          </Box>
          <Flex justify={undefined} items={undefined} direction={undefined} maxWidth={undefined} m={undefined} p={undefined} bg={undefined} mt={undefined} mb={undefined} pt={undefined} pb={undefined} width={undefined} gap={undefined} height={undefined} z={undefined} left={undefined}>
            {profile && (

              <RegisterButton onClick={logout} bg={undefined} color={undefined} fullWidth={undefined} bordercolor={undefined} ref={undefined}>
                Disconnect
                <IconButton
                  bg={COLORS.blue}
                  color={COLORS.white}
                  width="40px"
                  icon="20px"
                  toLeft={false}
                  isHover={false} hoverbg={undefined} hovercolor={undefined} onClick={undefined}                    >
                  <IoMdLogOut />
                </IconButton>
              </RegisterButton>

            )}
            <Button
              bordercolor={COLORS.white}
              bg={COLORS.transperant}
              color={COLORS.white} hoverbg={undefined} hovercolor={undefined} fullWidth={undefined} onClick={undefined} ref={undefined}              >
              Read Docs
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Text color={COLORS.white} fontFamily="SEN Bold" size="30px" align={isMobile ? 'start' : 'start'} weight={undefined} maxWidth={undefined} m={undefined}>Sign up</Text>
          <Box mb="1rem">
            <Text color={COLORS.light} size="15px" fontFamily="SEN Bold" align={isMobile ? 'start' : 'start'} maxWidth={isMobile ? '250px' : '300px'} weight={undefined} m={undefined}>Your Nexus experience is one click away</Text>
          </Box>
          <Box >
            {errorText && (
              <Text color={"red"} size="15px" fontFamily="SEN Bold" align={isMobile ? 'start' : 'start'} weight={undefined} maxWidth={undefined} m={undefined}>{errorText}</Text>
            )}
          </Box>
          <Box mt="0rem">
            {errorText && refId ? (
              <Button
                bordercolor={COLORS.white}
                bg={COLORS.transperant}
                color={COLORS.white} hoverbg={undefined} hovercolor={undefined} fullWidth={undefined} onClick={undefined} ref={undefined}                >
                Please try a valid referral code
              </Button>

            ) : (
              <Flex justify={undefined} items={undefined} direction={undefined} maxWidth={undefined} m={undefined} p={undefined} bg={undefined} mt={undefined} mb={undefined} pt={undefined} pb={undefined} width={undefined} gap={undefined} height={undefined} z={undefined} left={undefined}>
                <RegisterButton onClick={login} bg={undefined} color={undefined} fullWidth={undefined} bordercolor={undefined} ref={undefined}>
                  Register Now
                  <IconButton
                    bg={COLORS.blue}
                    color={COLORS.white}
                    width="40px"
                    icon="20px"
                    toLeft={false} hoverbg={undefined} hovercolor={undefined} onClick={undefined}                    >
                    <FaArrowDown />
                  </IconButton>
                </RegisterButton>
                <Button
                  bordercolor={COLORS.white}
                  bg={COLORS.transperant}
                  color={COLORS.white} hoverbg={undefined} hovercolor={undefined} fullWidth={undefined} onClick={undefined} ref={undefined}                  >
                  Read Docs
                </Button>
              </Flex>
            )}
          </Box>
        </>
      )}
      <Box mt="1rem">
        <Text color={COLORS.darkLight} size="15px" align="start" weight={undefined} maxWidth={undefined} m={undefined} fontFamily={undefined} >We do not store any personal information</Text>
      </Box>
      {isModal && (
        <Modal
          open={isModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ReferralModal referrals={referrals} setIsmodal={setIsmodal} id={profile?._id} />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default SignIn;
