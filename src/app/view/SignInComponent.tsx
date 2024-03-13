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

  const [load, setIsLoad] = useState(false)

  useEffect(() => {
    setIsLoad(true)

    setTimeout(() => { setIsLoad(false) }, 5000)
  }, [])

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
    getUser()
  }, [access_token])

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

  const getUser = async () => {


    try {
      let config = {
        method: "get",
        url: API_URL + `/get/me?token=${access_token}`,
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
            referredBy: refId || 0
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
              setErrorText(response.data.message)
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


  const handleClose = () => {
    setIsmodal(false)
  }



  return (
    <>
      {
        load ? (<>Load...</>) : (
          <Box flexDirection="column" justifyContent="start" alignItems="start" >
            hai
          </Box>
        )
      }

    </>



  );
};

export default SignIn;
