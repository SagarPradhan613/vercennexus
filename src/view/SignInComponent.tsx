"use client"

import React, { useEffect, useState } from "react";
import RegisterButton from '../components/RegisterButton';
import IconButton from '../components/IconButton';
import { FaArrowDown } from "react-icons/fa6";
import { COLORS } from '@/utils/colors'
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
import useIsMobile from "@/hooks/useIsMobile";
import useIsTab from "@/hooks/useIsTab";
import Heading from "../components/Heading";
import InviteModal from './InviteModal'
import styled from "styled-components";

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
  const [copied, setCopied] = useState(false)
  const [isModal, setIsmodal] = useState<boolean>(false);
  const [referrals, setReferrals] = useState<any>([]);
  const [profile, setProfile] = useState<any>(null);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [errorText, setErrorText] = useState<any>(null);
  const [codes, setCodes] = useState<Array<string>>([]);
  const [totalCodes, setTotalCodes] = useState<Array<string>>([]);
  const isMobile = useIsMobile()


  const clientId: any = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENTID
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const searchParams = useSearchParams()
  const refId = searchParams ? searchParams.get('refId') : null;
  const adminOverride = searchParams ? searchParams.get('adminOverride') : null;
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [otp, setOtp] = React.useState("");
  const [inviteError, setInviteError] = React.useState("");

  useEffect(() => {
    // Check if window object is defined (i.e., we're on the client side)
    if (typeof window !== 'undefined') {
      // Access localStorage
      const storedAccessToken = localStorage.getItem('access_token');
      setAccessToken(storedAccessToken);
    }
  }, []); // Empty dependency array ensures this effect runs only once, after mount


  useEffect(() => {
    // setWeb3auth(1)
    // console.log(web3auth); 

    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET, // import {WEB3AUTH_NETWORK} from "@web3auth/base";
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth",
          },

          uiConfig: {
            //   appName: "Nexus",
            //   mode: "light", // light, dark or auto
            //   loginMethodsOrder: ["google", "twitter", "facebook", "apple",],
            //   logoLight: "https://nexusprotocol.s3.eu-north-1.amazonaws.com/NexusImages/Nexus+logo+mark+Dark.svg",
            //   logoDark: "https://nexusprotocol.s3.eu-north-1.amazonaws.com/NexusImages/Nexus+logo+mark+Dark.svg",
            //   defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
            //   loginGridCol: 3,
            //   primaryButton: "socialLogin", // "externalLogin" | "socialLogin" | "emailLogin"
          },
        });
        //   console.log(web3auth);

        await web3auth.initModal();
        setWeb3auth(web3auth);

        if (web3auth.status === "connected") {
          setProvider(web3auth.provider);
          loginSignup(web3auth, web3auth.provider);

          // getUserInfo();
          // getAccounts();
        }
        else {
          // await web3auth?.connect();
        }
      } catch (error) {
        console.log(error);
      }
    };

    init();


  }, []);


  useEffect(() => {
    try {

      if (web3auth) {
        loginSignup(web3auth, web3auth?.provider);
      }
    }
    catch (e) {
      console.log(e);
    }


  }, [web3auth?.status])


  useEffect(() => {
    if (accessToken) {
      getUser();
      getCodes();
    }
  }, [accessToken])

  useEffect(() => {
    if (refId) {
      getReferer()
    }
  }, [refId])

  const copy = (text: any) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => { setCopied(false) }, 10000)
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

  const getCodes = async () => {
    try {
      let config = {
        method: "get",
        url: API_URL + `/get/codes?token=${accessToken}`,
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json"
        }
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.status === "OK") {
            setCodes(response.data.data)
            setTotalCodes(response.data.totalCodes)

            // setReferrals(response.data.referrals)
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

    if (!accessToken) {
      return false;
    }
    try {
      let config = {
        method: "get",
        url: API_URL + `/get/me?token=${accessToken}`,
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json"
        }
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.status === "OK") {
            setProfile(response.data.profile)
            setReferrals(response.data.referrals)
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


  const isConnected = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return false;
    }
    return web3auth.status === "connected";
  };

  const login = async () => {
    const _isConnected = await isConnected();
    // alert(_isConnected)
    handleCloseInvite()
    if (_isConnected) {
      // alert("Already loggedin");
      loginSignup(web3auth, provider)
      return;
    }
    try {
      const web3authProvider = await web3auth?.connect();
      setProvider(web3authProvider);
      // loginSignup(web3auth,web3authProvider)
    }
    catch (e) {
      console.log(e)
    }


  }

  const loginSignup = async (_web3auth: Web3Auth | null, _provider: IProvider | null | undefined) => {
    const userInfo = await _web3auth?.getUserInfo();
    // const accounts = await provider?.();

    const eth_address: string = await _provider?.request({ method: "eth_accounts" }) || "";
    if (userInfo) {

      try {
        let config = {
          method: "post",
          url: API_URL + `/login`,
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            email: userInfo?.email,
            fullName: userInfo?.name,
            address: eth_address[0],
            code: otp || 0
          },
        };

        axios
          .request(config)
          .then(async (response) => {
            if (response.data.status === "OK") {
              localStorage.setItem('access_token', response.data.access_token)
              setAccessToken(response.data.access_token)
              getUser()
            }
            if (response.data.status === "NOT OK") {
              setErrorText(response.data.data)
              await web3auth?.logout();

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
  }

  const logout = async () => {
    const _isConnected = await isConnected();

    if (_isConnected) {
      await web3auth?.logout();
      setProvider(null);
      localStorage.clear()
      setProfile(false)
      return;
    }


  }

  const handleSubmit = () => {
    console.log(otp);


    if (otp == "") {
      setInviteError("Please enter valid OTP.")
      return false;
    }
    try {
      let config = {
        method: "get",
        url: API_URL + `/verify/codes?code=${otp}`,
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json"
        }
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.status === "OK") {
            login()
          }
          if (response.data.status === "NOT OK") {
            setInviteError(response.data.message)
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

  const handleClose = () => {
    setIsmodal(false)
  }


  const [openInvite, setOpenInvite] = React.useState(false);
  const handleOpenInvite = () => setOpenInvite(true);
  const handleCloseInvite = () => setOpenInvite(false);

  const WhiteArrow = styled.div`
  position:absolute;
  transform: rotate(90deg) translateY(0);
  `

  const BlackArrow = styled.div`
  position:absolute;
  transform: rotate(90deg) translateX(-50px);
  `

  const NewIconButton = styled.div`
  height:36px;
  position:relative;
  width:36px;
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;
  transition:all 1s ease-in-out;
  background-color:#0075FF;
  overflow:hidden;
  &:hover {
    background-color: white;
    ${WhiteArrow} {
      transform: rotate(90deg) translateX(50px);
      transition: all 0.6s ease-in-out;
    }
    ${BlackArrow} {
      transform: rotate(90deg) translateX(0px);
      transition: all 0.6s ease-in-out;
    }
  }
  `



  return (

    <Box border={'1px solid white'} p={'1rem'} borderRadius={'20px'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
      {(web3auth?.status === "connected" && profile) ? (
        <Flex direction={'column'} items={'center'} justify={undefined} maxWidth={undefined} m={undefined} p={undefined} bg={undefined} mt={undefined} mb={undefined} pt={undefined} pb={undefined} width={undefined} gap={undefined} height={undefined} z={undefined} left={undefined} >
          <>
            <Heading fontFamily={undefined} color={COLORS.white} size="40px" align={isMobile ? 'center' : 'center'} weight={undefined} maxWidth={undefined} m={'0px 0px 10px 0px'} lineHeight={undefined}>Whitelisted!</Heading>
            <Box maxWidth={isMobile ? '270px' : '100%'} width={'100%'}>



            </Box>
            <Flex justify={undefined} items={undefined} direction={undefined} maxWidth={undefined} m={undefined} p={undefined} bg={undefined} mt={undefined} mb={undefined} pt={undefined} pb={undefined} width={undefined} gap={undefined} height={undefined} z={undefined} left={undefined}>
              {profile && (
                <Flex justify={undefined} items={undefined} direction={undefined} maxWidth={undefined} m={undefined} p={undefined} bg={undefined} mt={undefined} mb={undefined} pt={undefined} pb={undefined} width={undefined} gap={'.5rem'} height={undefined} z={undefined} left={undefined}>
                  <RegisterButton justify={undefined} onClick={logout} bg={undefined} color={undefined} fullWidth={undefined} bordercolor={undefined} ref={undefined}>
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
                  <Button
                    bordercolor={COLORS.white}
                    bg={COLORS.transperant}
                    color={COLORS.white}
                    fullWidth={true}
                    onClick={() => setIsmodal(true)} hoverbg={undefined} hovercolor={undefined} ref={undefined}              >
                    Referrals Details
                  </Button>
                </Flex>

              )}
            </Flex>
          </>

        </Flex>
      ) : (
        <>
          <Heading fontFamily={undefined} color={COLORS.white} size="40px" align={isMobile ? 'center' : 'center'} weight={undefined} maxWidth={undefined} m={'0px 0px 10px 0px'} lineHeight={undefined}>Sign Up</Heading>
          <Box mb="1rem">
            <Text color={COLORS.light} size="15px" fontFamily="SEN Bold" align={isMobile ? 'center' : 'center'} maxWidth={isMobile ? '250px' : '300px'} weight={undefined} m={undefined}>Your Nexus experience is one click away</Text>
          </Box>
          <Box >
            {errorText && (
              <Text color={"red"} size="15px" fontFamily="SEN Bold" align={isMobile ? 'center' : 'center'} weight={undefined} maxWidth={undefined} m={undefined}>{errorText}</Text>
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
                <RegisterButton onClick={handleOpenInvite} bg={undefined} color={undefined} fullWidth={undefined} bordercolor={undefined} ref={undefined} justify={undefined}>
                  Register Now
                  {/* <IconButton
                    bg={COLORS.blue}
                    color={COLORS.white}
                    width="40px"
                    icon="20px"
                    toLeft={false} hoverbg={undefined} hovercolor={undefined} onClick={undefined}                    >
                    <FaArrowDown />
                  </IconButton> */}
                  <NewIconButton
                  >
                    <BlackArrow>
                      <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1212 8.96297C14.5117 8.57244 14.5117 7.93928 14.1212 7.54875L7.75721 1.18479C7.36668 0.794268 6.73352 0.794268 6.34299 1.18479C5.95247 1.57532 5.95247 2.20848 6.34299 2.59901L11.9998 8.25586L6.343 13.9127C5.95247 14.3032 5.95247 14.9364 6.343 15.3269C6.73352 15.7175 7.36668 15.7175 7.75721 15.3269L14.1212 8.96297ZM1.47365 7.25586C0.921364 7.25586 0.473649 7.70358 0.473649 8.25586C0.473649 8.80815 0.921364 9.25586 1.47365 9.25586L1.47365 7.25586ZM13.4141 7.25586L1.47365 7.25586L1.47365 9.25586L13.4141 9.25586L13.4141 7.25586Z" fill="black" />
                      </svg>
                    </BlackArrow>
                    <WhiteArrow>
                      <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1212 8.96297C14.5117 8.57244 14.5117 7.93928 14.1212 7.54875L7.75721 1.18479C7.36668 0.794268 6.73352 0.794268 6.34299 1.18479C5.95247 1.57532 5.95247 2.20848 6.34299 2.59901L11.9998 8.25586L6.343 13.9127C5.95247 14.3032 5.95247 14.9364 6.343 15.3269C6.73352 15.7175 7.36668 15.7175 7.75721 15.3269L14.1212 8.96297ZM1.47365 7.25586C0.921364 7.25586 0.473649 7.70358 0.473649 8.25586C0.473649 8.80815 0.921364 9.25586 1.47365 9.25586L1.47365 7.25586ZM13.4141 7.25586L1.47365 7.25586L1.47365 9.25586L13.4141 9.25586L13.4141 7.25586Z" fill="white" />
                      </svg>
                    </WhiteArrow>
                  </NewIconButton>

                </RegisterButton>
              </Flex>
            )}
          </Box>
        </>
      )}
      <Box mt="1rem">
        <Text color={COLORS.white} size="15px" align="center" weight={undefined} maxWidth={undefined} m={undefined} fontFamily={undefined} >We do not store any personal information</Text>
      </Box>
      {isModal && (
        <Modal
          open={isModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ReferralModal totalCodes={totalCodes} setTotalCodes={setTotalCodes} adminOverride={adminOverride} setCodes={setCodes} accessToken={accessToken} referrals={referrals} codes={codes} setIsmodal={setIsmodal} id={profile?._id} />
          </Box>
        </Modal>
      )}

      {
        openInvite && (
          <InviteModal inviteError={inviteError} handleSubmit={handleSubmit} setOtp={setOtp} otp={otp} open={openInvite} login={login} handleClose={handleCloseInvite} />
        )
      }
    </Box>

  );
};

export default SignIn; 
