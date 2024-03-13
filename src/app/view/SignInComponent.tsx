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
  const searchParams = useSearchParams();
  const [isModal, setIsModal] = useState<any>(false);
  const refId = searchParams.get('refId');

  const [referrals, setReferrals] = useState<any>([]);
  const [profile, setProfile] = useState<any>(null);
  const [web3auth, setWeb3auth] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [errorText, setErrorText] = useState<any>(null);
  const clientId: any = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENTID;
  const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
  const [accessToken, setAccessToken] = useState<any>(localStorage.getItem('access_token'));
  const [copied, setCopied] = useState<any>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth",
          },
        });

        await web3authInstance.initModal();
        setWeb3auth(web3authInstance);

        if (web3authInstance.status === "connected") {
          setProvider(web3authInstance.provider);
          loginSignup(web3authInstance, web3authInstance.provider);
        }
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (web3auth) {
      loginSignup(web3auth, web3auth.provider);
    }
  }, [web3auth?.status]);

  useEffect(() => {
    getUser();
  }, [accessToken]);

  useEffect(() => {
    if (refId) {
      getReferer();
    }
  }, [refId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 10000);
  };

  const getReferer = async () => {
    try {
      const config = {
        method: "get",
        url: `${API_URL}/get/referer?id=${refId}`,
        maxBodyLength: Infinity,
        headers: { "Content-Type": "application/json" }
      };

      const response = await axios.request(config);
      if (response.data.status === "OK") {
        // setProfile(response.data.profile);
      } else if (response.data.status === "NOT OK") {
        setErrorText(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const config = {
        method: "get",
        url: `${API_URL}/get/me?token=${accessToken}`,
        maxBodyLength: Infinity,
        headers: { "Content-Type": "application/json" }
      };

      const response = await axios.request(config);
      if (response.data.status === "OK") {
        setProfile(response.data.profile);
        setReferrals(response.data.referrals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isConnected = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return false;
    }
    return web3auth.status === "connected";
  };

  const login = async () => {
    const isConnectedStatus = await isConnected();
    if (isConnectedStatus) {
      loginSignup(web3auth, provider);
      return;
    }
    try {
      const web3authProvider = await web3auth?.connect();
      setProvider(web3authProvider);
    } catch (error) {
      console.log(error);
    }
  };

  const loginSignup = async (web3authInstance: Web3Auth, providerInstance: IProvider | null) => {
    const userInfo = await web3authInstance?.getUserInfo();
    const ethAddress:any = (await providerInstance?.request({ method: "eth_accounts" })) || "";
    if (userInfo) {
      try {
        const config = {
          method: "post",
          url: `${API_URL}/login`,
          maxBodyLength: Infinity,
          headers: { "Content-Type": "application/json" },
          data: {
            email: userInfo?.email,
            fullName: userInfo?.name,
            address: ethAddress[0],
            referredBy: refId || 0
          }
        };

        const response = await axios.request(config);
        if (response.data.status === "OK") {
          localStorage.setItem('access_token', response.data.access_token);
          setAccessToken(response.data.access_token);
          getUser();
        } else if (response.data.status === "NOT OK") {
          setErrorText(response.data.message);
          await web3authInstance?.logout();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logout = async () => {
    const isConnectedStatus = await isConnected();
    if (isConnectedStatus) {
      await web3auth?.logout();
      setProvider(null);
      localStorage.clear();
      setProfile(false);
    }
  };

  const handleClose = () => {
    setIsModal(false);
  };

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
              onClick={() => setIsModal(true)} hoverbg={undefined} hovercolor={undefined} ref={undefined}              >
              Referal Details
            </Button>
          </Box>
          <Flex justify={undefined} items={undefined} direction={undefined} maxWidth={undefined} m={undefined} p={undefined} bg={undefined} mt={undefined} mb={undefined} pt={undefined} pb={undefined} width={undefined} gap={undefined} height={undefined} z={undefined} left={undefined}>
            {profile && (
              <>
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
              </>
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
            <ReferralModal referrals={referrals} setIsmodal={setIsModal} id={profile?._id} />
          </Box>
        </Modal>
      )}
    </Box>

  );
};

export default SignIn;
