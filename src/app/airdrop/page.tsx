'use client'
import React, { useState, useEffect, Suspense } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { usePathname } from 'next/navigation';
import useIsMobile from "@/hooks/useIsMobile";
import useIsTab from "@/hooks/useIsTab";
import useIsBig from "@/hooks/useIsBig";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { COLORS } from '@/utils/colors';
import styled from "styled-components";
import RegisterButton from "@/components/RegisterButton";
import IconButton from "@/components/IconButton";
import { IoMdLogOut } from "react-icons/io";
import { Box, Modal, Typography } from '@mui/material';
import Text from "@/components/Text";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Person } from '@mui/icons-material';
import ReferralModal from "@/view/RefferalModal";
import Button from "@mui/material";
import Flex from "@/components/Flex";
import Heading from "@/components/Heading";
import InviteModal from '@/view/InviteModal';


const Icon = styled.a`
color: ${COLORS.white};
cursor: pointer;
transition: transform 1s ease;
&:hover {
  color: ${COLORS.blue};
}
`;
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

const Content = () => {
    const pathname = usePathname();
    const [isActive, setIsActive] = useState(false);

    const isMobile = useIsMobile();
    const isTab = useIsTab();
    const isBig = useIsBig();

    const [copied, setCopied] = useState(false)
    const [isModal, setIsmodal] = useState<boolean>(false);
    const [referrals, setReferrals] = useState<any>([]);
    const [profile, setProfile] = useState<any>(null);
    const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
    const [provider, setProvider] = useState<any>(null);
    const [errorText, setErrorText] = useState<any>(null);
    const [codes, setCodes] = useState<Array<string>>([]);
    const [totalCodes, setTotalCodes] = useState<Array<string>>([]);

    const clientId: any = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENTID
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const searchParams = useSearchParams()
    const refId = searchParams ? searchParams.get('refId') : null;
    const adminOverride = searchParams ? searchParams.get('adminOverride') : null;
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [otp, setOtp] = React.useState("");
    const [inviteError, setInviteError] = React.useState("");



    useEffect(() => {
        if (isActive) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isActive]);



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
    return (
        <>
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
            <div className="overflow-hidden sen  relative min-h-screen min-w-screen">
                {!isMobile && <div className="cursor"></div>}
                <div className="lg:block hidden absolute h-full w-full top-0 left-0">
                    <img className="opacity-70 h-full w-full" src="/Images/topmask.png"></img>
                </div>
                <div className="lg:hidden block absolute h-full w-full right-0 top-0">
                    <img className="h-full w-full" src="/Images/mobtopmask.png"></img>
                </div>
                <div className="h-full w-full p-5 ">
                    <div className="lg:bg-[#0E111480] mainpage-bg resp-pb-airdrop responsive-footer-space px-4 pb-16 mb-6 lg:pb-0 lg:mb-0 h-full w-full">

                        {/* nav */}
                        <div className="lg:block hidden">
                            <Nav />
                        </div>
                        <div className="lg:hidden block ">
                            {/* <Nav /> */}

                            <div className="flex items-start">
                                <a href="/" className="ml-[8%] relative z-50 resp-head-logo hidden lg:flex">
                                    <img src="/Images/nexus.png" className="mt-6 w-full h-full"></img>
                                </a>
                                <a href="/" className="ml-[15%] res-headlogo-ml py-3 relative z-50  max-w-[71px] flex lg:hidden">
                                    {/* <img src="/Images/mobnexus.png" className="mt-6 w-full h-full"></img> */}
                                    <svg width="72" height="10" viewBox="0 0 72 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M62.5324 8.83639C62.2732 8.83639 62.063 8.62623 62.063 8.36698V7.76069C62.063 7.50112 62.2737 7.29082 62.5332 7.29128L68.9008 7.30235C69.2496 7.30235 69.5152 7.22307 69.6975 7.06451C69.8878 6.89803 69.9829 6.63245 69.9829 6.26776C69.9829 5.90308 69.8878 5.64146 69.6975 5.48291C69.5152 5.31642 69.2496 5.23318 68.9008 5.23318H64.6435C63.7635 5.23318 63.0778 5.02309 62.5862 4.60291C62.1026 4.17481 61.8608 3.54851 61.8608 2.72401C61.8608 1.89951 62.1026 1.27718 62.5862 0.857C63.0778 0.428896 63.7635 0.214844 64.6435 0.214844H70.8573C71.1165 0.214844 71.3267 0.425007 71.3267 0.684257V1.2905C71.3267 1.55009 71.116 1.76039 70.8564 1.75991L64.8457 1.74888C64.5048 1.74888 64.2392 1.82816 64.0489 1.98672C63.8587 2.13735 63.7635 2.38311 63.7635 2.72401C63.7635 3.06491 63.8587 3.31464 64.0489 3.47319C64.2392 3.62382 64.5048 3.69914 64.8457 3.69914H69.1029C69.9829 3.69914 70.6647 3.91715 71.1483 4.35319C71.6399 4.78129 71.8856 5.41948 71.8856 6.26776C71.8856 7.10812 71.6399 7.74631 71.1483 8.18234C70.6647 8.61837 69.9829 8.83639 69.1029 8.83639H62.5324Z" fill="white" />
                                        <path d="M53.7045 8.8365C52.8404 8.8365 52.1586 8.72551 51.6592 8.50353C51.1597 8.27363 50.803 7.92876 50.5889 7.46895C50.3748 7.00913 50.2678 6.4304 50.2678 5.73275V0.743827C50.2678 0.484577 50.478 0.274414 50.7372 0.274414H51.7011C51.9603 0.274414 52.1705 0.484577 52.1705 0.743827V5.73275C52.1705 6.33526 52.3092 6.74751 52.5867 6.96949C52.8721 7.18354 53.3518 7.29057 54.0256 7.29057H56.3207C56.9946 7.29057 57.4703 7.18354 57.7478 6.96949C58.0332 6.74751 58.1759 6.33526 58.1759 5.73275V0.743827C58.1759 0.484577 58.386 0.274414 58.6453 0.274414H59.6091C59.8684 0.274414 60.0785 0.484577 60.0785 0.743827V5.73275C60.0785 6.4304 59.9715 7.00913 59.7575 7.46895C59.5434 7.92876 59.1867 8.27363 58.6872 8.50353C58.1877 8.72551 57.506 8.8365 56.6418 8.8365H53.7045Z" fill="white" />
                                        <path d="M38.8219 8.77704C38.435 8.77704 38.2142 8.33524 38.4465 8.02581L40.8583 4.8131C40.9835 4.64631 40.9837 4.41692 40.8587 4.24997L38.4446 1.02514C38.2129 0.715632 38.4337 0.274414 38.8204 0.274414H39.9637C40.1132 0.274414 40.2537 0.345606 40.3422 0.466121L42.6175 3.567C42.706 3.68752 42.8465 3.75871 42.996 3.75871H43.6145C43.764 3.75871 43.9045 3.68752 43.9929 3.567L46.2683 0.466121C46.3568 0.345606 46.4973 0.274414 46.6468 0.274414H47.7901C48.1767 0.274414 48.3976 0.715632 48.1659 1.02514L45.7518 4.24997C45.6268 4.41692 45.627 4.64631 45.7522 4.8131L48.1639 8.02581C48.3962 8.33524 48.1755 8.77704 47.7885 8.77704H46.6351C46.4855 8.77704 46.3449 8.70576 46.2564 8.58511L43.9929 5.49657C43.9045 5.37593 43.7639 5.30464 43.6143 5.30464H42.9962C42.8466 5.30464 42.706 5.37593 42.6176 5.49657L40.354 8.58511C40.2656 8.70576 40.125 8.77704 39.9754 8.77704H38.8219Z" fill="white" />
                                        <path d="M27.8442 8.77704C27.5849 8.77704 27.3748 8.56688 27.3748 8.30763V0.743827C27.3748 0.484577 27.5849 0.274414 27.8442 0.274414H36.2285C36.4878 0.274414 36.6979 0.484577 36.6979 0.743827V1.35093C36.6979 1.61018 36.4878 1.82035 36.2285 1.82035H29.7469C29.4876 1.82035 29.2774 2.03051 29.2774 2.28976V3.22984C29.2774 3.48909 29.4876 3.69925 29.7469 3.69925H35.5388C35.798 3.69925 36.0082 3.90941 36.0082 4.16866V4.77577C36.0082 5.03502 35.798 5.24518 35.5388 5.24518H29.7469C29.4876 5.24518 29.2774 5.45534 29.2774 5.71459V6.7617C29.2774 7.02095 29.4876 7.23111 29.7469 7.23111H36.2285C36.4878 7.23111 36.6979 7.44127 36.6979 7.70052V8.30763C36.6979 8.56688 36.4878 8.77704 36.2285 8.77704H27.8442Z" fill="white" />
                                        <path d="M15.7397 8.77704C15.4804 8.77704 15.2703 8.56688 15.2703 8.30763V0.743827C15.2703 0.484577 15.4804 0.274414 15.7397 0.274414H17.0001C17.1259 0.274414 17.2464 0.324886 17.3347 0.414515L22.41 5.57015C22.7047 5.86944 23.214 5.66082 23.214 5.24084V0.743827C23.214 0.484578 23.4241 0.274414 23.6834 0.274414H24.6473C24.9065 0.274414 25.1167 0.484577 25.1167 0.743827V8.30763C25.1167 8.56688 24.9065 8.77704 24.6473 8.77704H23.3871C23.2611 8.77704 23.1405 8.72644 23.0522 8.63662L17.9772 3.47133C17.6827 3.17159 17.1729 3.38011 17.1729 3.80031V8.30763C17.1729 8.56688 16.9628 8.77704 16.7035 8.77704H15.7397Z" fill="white" />
                                        <path d="M10.1528 0.719325C10.1528 0.323677 9.6934 0.105497 9.38677 0.35553L7.6697 1.75568C7.56038 1.84483 7.49694 1.97841 7.49694 2.11947V5.68018C7.49694 6.05723 7.07485 6.28041 6.76324 6.06813L4.86354 4.77397C4.55192 4.56169 4.12984 4.78487 4.12984 5.16192V6.82168C4.12984 6.96971 4.19967 7.10907 4.31825 7.19769L7.37196 9.47984C7.45309 9.54047 7.55167 9.57324 7.65296 9.57324H9.68342C9.94267 9.57324 10.1528 9.36308 10.1528 9.10383V0.719325Z" fill="white" />
                                        <path d="M0.862305 9.06876C0.862305 9.46441 1.32174 9.68259 1.62837 9.43256L3.34544 8.03241C3.45476 7.94326 3.5182 7.80967 3.5182 7.66861V4.1079C3.5182 3.73085 3.94028 3.50767 4.2519 3.71996L6.1516 5.01411C6.46321 5.22639 6.88529 5.00322 6.88529 4.62616V2.9664C6.88529 2.81837 6.81547 2.67901 6.69689 2.59039L3.64318 0.308247C3.56204 0.24761 3.46347 0.214845 3.36217 0.214845H1.33172C1.07247 0.214845 0.862305 0.425008 0.862305 0.684258V9.06876Z" fill="white" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0781 1.18173C11.3114 1.18173 11.5006 0.992583 11.5006 0.75926C11.5006 0.525937 11.3114 0.336792 11.0781 0.336792C10.8448 0.336792 10.6556 0.525937 10.6556 0.75926C10.6556 0.992583 10.8448 1.18173 11.0781 1.18173ZM11.0781 1.24411C11.3459 1.24411 11.563 1.02703 11.563 0.75926C11.563 0.491487 11.3459 0.274414 11.0781 0.274414C10.8103 0.274414 10.5933 0.491487 10.5933 0.75926C10.5933 1.02703 10.8103 1.24411 11.0781 1.24411Z" fill="white" />
                                        <path d="M11.2953 0.598633H11.36V0.910522H11.2994V0.703784L11.2062 0.854827H11.1862L11.0926 0.703784V0.910522H11.0325V0.598633H11.0966L11.196 0.759033L11.2953 0.598633Z" fill="white" />
                                        <path d="M10.9913 0.598633V0.654773H10.9165V0.910522H10.8559V0.654773H10.781V0.598633H10.9913Z" fill="white" />
                                    </svg>
                                </a>

                                <div className="lg:flex hidden h-[60px] relative z-50  bg-black justify-between text-white nav-resp-margin ml-[5vw] mt-6 rounded-[28px] ">
                                    <div className={`${pathname === '/leaderboard' ? 'px-6 transition-all duration-300 ease-in-out bg-[#0075FF] hover:bg-[#0075FF] flex justify-center items-center rounded-[36px]' : 'px-6 transition-all duration-300 ease-in-out hover:bg-[#0075FF] flex justify-center items-center rounded-[36px]'}`}>
                                        <p className="font-semibold text-base">Leaderboard</p>
                                    </div>
                                    <div className={`${pathname === '/airdrop' ? 'px-6 transition-all duration-300 ease-in-out bg-[#0075FF] hover:bg-[#0075FF] flex justify-center items-center rounded-[36px]' : 'px-6 transition-all duration-300 ease-in-out hover:bg-[#0075FF] flex justify-center items-center rounded-[36px]'}`}>
                                        <p className="font-semibold text-base">Airdrop</p>
                                    </div>
                                    <div className={`${pathname === '/about' ? 'px-6 transition-all duration-300 ease-in-out bg-[#0075FF] hover:bg-[#0075FF] flex justify-center items-center rounded-[36px]' : 'px-6 transition-all duration-300 ease-in-out hover:bg-[#0075FF] flex justify-center items-center rounded-[36px]'}`}>
                                        <p className="font-semibold text-base">About</p>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => { setIsActive(true) }} className="lg:hidden z-50 flex right-7 top-8 justify-end absolute">
                                <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.914551" y="0.243652" width="30.39" height="30.3931" rx="15.195" fill="#0075FF" />
                                    <path d="M10.8301 10.3413H21.3301" stroke="white" stroke-width="2" stroke-linecap="round" />
                                    <path d="M10.8301 14.9194H16.0801" stroke="white" stroke-width="2" stroke-linecap="round" />
                                    <path d="M10.8301 19.7046H21.3301" stroke="white" stroke-width="2" stroke-linecap="round" />
                                </svg>
                            </div>

                            {/* modal */}
                            {isActive ?
                                <>
                                    <div className="absolute justify-between flex flex-col h-screen px-8 py-6 w-screen bg-black z-[100] top-0 left-0">
                                        <div>
                                            <div className="w-full items-center flex justify-between">
                                                <div>
                                                    <svg width="72" height="10" viewBox="0 0 72 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M62.4587 8.82272C62.1994 8.82272 61.9893 8.61256 61.9893 8.35331V7.74702C61.9893 7.48745 62.1999 7.27715 62.4595 7.2776L68.827 7.28868C69.1759 7.28868 69.4415 7.2094 69.6238 7.05084C69.8141 6.88436 69.9092 6.61877 69.9092 6.25409C69.9092 5.88941 69.8141 5.62779 69.6238 5.46923C69.4415 5.30275 69.1759 5.21951 68.827 5.21951H64.5698C63.6898 5.21951 63.004 5.00942 62.5125 4.58924C62.0289 4.16114 61.7871 3.53484 61.7871 2.71034C61.7871 1.88584 62.0289 1.2635 62.5125 0.843328C63.004 0.415224 63.6898 0.201172 64.5698 0.201172H70.7836C71.0428 0.201172 71.253 0.411335 71.253 0.670585V1.27683C71.253 1.53642 71.0423 1.74672 70.7827 1.74624L64.7719 1.73521C64.431 1.73521 64.1655 1.81449 63.9752 1.97305C63.7849 2.12368 63.6898 2.36944 63.6898 2.71034C63.6898 3.05124 63.7849 3.30097 63.9752 3.45952C64.1655 3.61015 64.431 3.68547 64.7719 3.68547H69.0292C69.9092 3.68547 70.591 3.90348 71.0746 4.33951C71.5661 4.76762 71.8119 5.40581 71.8119 6.25409C71.8119 7.09445 71.5661 7.73264 71.0746 8.16867C70.591 8.6047 69.9092 8.82272 69.0292 8.82272H62.4587Z" fill="white" />
                                                        <path d="M53.6311 8.82283C52.7669 8.82283 52.0851 8.71184 51.5857 8.48986C51.0862 8.25995 50.7295 7.91509 50.5154 7.45528C50.3014 6.99546 50.1943 6.41673 50.1943 5.71907V0.730155C50.1943 0.470905 50.4045 0.260742 50.6637 0.260742H51.6276C51.8869 0.260742 52.097 0.470905 52.097 0.730155V5.71907C52.097 6.32159 52.2358 6.73384 52.5132 6.95582C52.7986 7.16987 53.2783 7.2769 53.9521 7.2769H56.2473C56.9211 7.2769 57.3968 7.16987 57.6743 6.95582C57.9597 6.73384 58.1024 6.32159 58.1024 5.71907V0.730155C58.1024 0.470905 58.3125 0.260742 58.5718 0.260742H59.5356C59.7949 0.260742 60.0051 0.470905 60.0051 0.730155V5.71907C60.0051 6.41673 59.898 6.99546 59.684 7.45528C59.4699 7.91509 59.1132 8.25995 58.6137 8.48986C58.1143 8.71184 57.4325 8.82283 56.5683 8.82283H53.6311Z" fill="white" />
                                                        <path d="M38.7482 8.76337C38.3613 8.76337 38.1405 8.32157 38.3728 8.01214L40.7846 4.79942C40.9098 4.63264 40.91 4.40325 40.785 4.2363L38.3708 1.01147C38.1392 0.70196 38.36 0.260742 38.7466 0.260742H39.89C40.0395 0.260742 40.18 0.331935 40.2684 0.452449L42.5438 3.55333C42.6322 3.67384 42.7728 3.74504 42.9223 3.74504H43.5408C43.6902 3.74504 43.8308 3.67384 43.9192 3.55333L46.1946 0.452449C46.283 0.331934 46.4236 0.260742 46.573 0.260742H47.7164C48.103 0.260742 48.3239 0.70196 48.0922 1.01147L45.6781 4.2363C45.5531 4.40325 45.5532 4.63264 45.6784 4.79942L48.0902 8.01214C48.3225 8.32157 48.1017 8.76337 47.7148 8.76337H46.5613C46.4118 8.76337 46.2711 8.69209 46.1827 8.57144L43.9192 5.4829C43.8308 5.36225 43.6902 5.29097 43.5406 5.29097H42.9224C42.7729 5.29097 42.6322 5.36225 42.5438 5.4829L40.2803 8.57144C40.1919 8.69209 40.0513 8.76337 39.9017 8.76337H38.7482Z" fill="white" />
                                                        <path d="M27.7707 8.76337C27.5114 8.76337 27.3013 8.55321 27.3013 8.29396V0.730155C27.3013 0.470906 27.5114 0.260742 27.7707 0.260742H36.155C36.4143 0.260742 36.6244 0.470905 36.6244 0.730155V1.33726C36.6244 1.59651 36.4143 1.80667 36.155 1.80667H29.6734C29.4141 1.80667 29.204 2.01684 29.204 2.27609V3.21616C29.204 3.47541 29.4141 3.68558 29.6734 3.68558H35.4653C35.7245 3.68558 35.9347 3.89574 35.9347 4.15499V4.7621C35.9347 5.02135 35.7245 5.23151 35.4653 5.23151H29.6734C29.4141 5.23151 29.204 5.44167 29.204 5.70092V6.74802C29.204 7.00727 29.4141 7.21744 29.6734 7.21744H36.155C36.4143 7.21744 36.6244 7.4276 36.6244 7.68685V8.29396C36.6244 8.55321 36.4143 8.76337 36.155 8.76337H27.7707Z" fill="white" />
                                                        <path d="M15.6662 8.76288C15.4069 8.76288 15.1968 8.55272 15.1968 8.29347V0.729667C15.1968 0.470417 15.4069 0.260254 15.6662 0.260254H16.9266C17.0524 0.260254 17.1729 0.310726 17.2612 0.400355L22.3366 5.55599C22.6312 5.85528 23.1405 5.64666 23.1405 5.22668V0.729667C23.1405 0.470418 23.3507 0.260254 23.6099 0.260254H24.5738C24.833 0.260254 25.0432 0.470417 25.0432 0.729667V8.29347C25.0432 8.55272 24.833 8.76288 24.5738 8.76288H23.3136C23.1876 8.76288 23.067 8.71228 22.9787 8.62246L17.9037 3.45717C17.6092 3.15743 17.0995 3.36595 17.0995 3.78615V8.29347C17.0995 8.55272 16.8893 8.76288 16.6301 8.76288H15.6662Z" fill="white" />
                                                        <path d="M10.0796 0.705164C10.0796 0.309517 9.62015 0.0913364 9.31353 0.341369L7.59646 1.74152C7.48713 1.83067 7.42369 1.96425 7.42369 2.10531V5.66602C7.42369 6.04307 7.00161 6.26625 6.69 6.05397L4.7903 4.75981C4.47868 4.54753 4.0566 4.77071 4.0566 5.14776V6.80752C4.0566 6.95555 4.12643 7.09491 4.24501 7.18353L7.29871 9.46568C7.37985 9.52631 7.47843 9.55908 7.57972 9.55908H9.61018C9.86943 9.55908 10.0796 9.34892 10.0796 9.08967V0.705164Z" fill="white" />
                                                        <path d="M0.789062 9.05509C0.789062 9.45074 1.2485 9.66892 1.55512 9.41888L3.27219 8.01873C3.38152 7.92959 3.44496 7.796 3.44496 7.65494V4.09423C3.44496 3.71718 3.86704 3.494 4.17865 3.70628L6.07836 5.00044C6.38997 5.21272 6.81205 4.98954 6.81205 4.61249V2.95273C6.81205 2.8047 6.74222 2.66534 6.62365 2.57672L3.56994 0.294575C3.4888 0.233938 3.39022 0.201173 3.28893 0.201173H1.25848C0.999226 0.201173 0.789062 0.411336 0.789062 0.670586V9.05509Z" fill="white" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0049 1.16806C11.2382 1.16806 11.4273 0.978911 11.4273 0.745588C11.4273 0.512265 11.2382 0.32312 11.0049 0.32312C10.7715 0.32312 10.5824 0.512265 10.5824 0.745588C10.5824 0.978911 10.7715 1.16806 11.0049 1.16806ZM11.0049 1.23043C11.2726 1.23043 11.4897 1.01336 11.4897 0.745588C11.4897 0.477815 11.2726 0.260742 11.0049 0.260742C10.7371 0.260742 10.52 0.477815 10.52 0.745588C10.52 1.01336 10.7371 1.23043 11.0049 1.23043Z" fill="white" />
                                                        <path d="M11.2219 0.585449H11.2865V0.897338H11.2259V0.6906L11.1328 0.841644H11.1127L11.0191 0.6906V0.897338H10.959V0.585449H11.0231L11.1225 0.745849L11.2219 0.585449Z" fill="white" />
                                                        <path d="M10.9178 0.585449V0.641589H10.843V0.897338H10.7824V0.641589H10.7075V0.585449H10.9178Z" fill="white" />
                                                    </svg>
                                                </div>

                                                <div onClick={() => { setIsActive(false) }} >
                                                    <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M19.7925 11.168L12.3679 18.5926" stroke="white" stroke-width="2" stroke-linecap="round" />
                                                        <path d="M12.3677 11.168L19.7923 18.5926" stroke="white" stroke-width="2" stroke-linecap="round" />
                                                    </svg>
                                                </div>
                                            </div>


                                            <div className="mt-10">
                                                <a href="/" className="flex model-nav group hover:bg-[#0075FF] transition-all duration-300 ease-in-out rounded-[36px] px-3 pl-6 py-3 w-full justify-between">
                                                    <div>
                                                        <p className="font-semibold text-xl text-white">Home</p>
                                                    </div>
                                                    <div className="rounded-[50%] group-hover:bg-[white] w-[30px] h-[30px] transition-all duration-300 ease-in-out bg-[#0075FF]  flex justify-center items-center">
                                                        <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path className="hover-white" d="M9.99566 7.02301C10.2886 6.73011 10.2886 6.25524 9.99566 5.96235L5.22269 1.18938C4.9298 0.896482 4.45492 0.896482 4.16203 1.18938C3.86914 1.48227 3.86914 1.95714 4.16203 2.25004L8.40467 6.49268L4.16203 10.7353C3.86914 11.0282 3.86914 11.5031 4.16203 11.796C4.45493 12.0889 4.9298 12.0889 5.22269 11.796L9.99566 7.02301ZM1.09984 5.74268C0.685626 5.74268 0.349839 6.07846 0.349839 6.49268C0.349839 6.90689 0.685626 7.24268 1.09984 7.24268L1.09984 5.74268ZM9.46533 5.74268L1.09984 5.74268L1.09984 7.24268L9.46533 7.24268L9.46533 5.74268Z" fill="white" />
                                                        </svg>
                                                    </div>
                                                </a>
                                                <a href="/leaderboard" className="flex model-nav group hover:bg-[#0075FF] transition-all duration-300 ease-in-out rounded-[36px] px-3 pl-6 py-3 w-full justify-between">
                                                    <div>
                                                        <p className="font-semibold text-xl text-white">Leaderboard</p>
                                                    </div>
                                                    <div className="rounded-[50%] group-hover:bg-[white] w-[30px] h-[30px] transition-all duration-300 ease-in-out bg-[#0075FF]  flex justify-center items-center">
                                                        <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path className="hover-white" d="M9.99566 7.02301C10.2886 6.73011 10.2886 6.25524 9.99566 5.96235L5.22269 1.18938C4.9298 0.896482 4.45492 0.896482 4.16203 1.18938C3.86914 1.48227 3.86914 1.95714 4.16203 2.25004L8.40467 6.49268L4.16203 10.7353C3.86914 11.0282 3.86914 11.5031 4.16203 11.796C4.45493 12.0889 4.9298 12.0889 5.22269 11.796L9.99566 7.02301ZM1.09984 5.74268C0.685626 5.74268 0.349839 6.07846 0.349839 6.49268C0.349839 6.90689 0.685626 7.24268 1.09984 7.24268L1.09984 5.74268ZM9.46533 5.74268L1.09984 5.74268L1.09984 7.24268L9.46533 7.24268L9.46533 5.74268Z" fill="white" />
                                                        </svg>
                                                    </div>
                                                </a>
                                                <a href="/airdrop" className="flex model-nav group hover:bg-[#0075FF] transition-all duration-300 ease-in-out rounded-[36px] px-3 pl-6 py-3 w-full justify-between">
                                                    <div>
                                                        <p className="font-semibold text-xl text-white">Airdrop</p>
                                                    </div>
                                                    <div className="rounded-[50%] group-hover:bg-[white] w-[30px] h-[30px] transition-all duration-300 ease-in-out bg-[#0075FF]  flex justify-center items-center">
                                                        <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path className="hover-white" d="M9.99566 7.02301C10.2886 6.73011 10.2886 6.25524 9.99566 5.96235L5.22269 1.18938C4.9298 0.896482 4.45492 0.896482 4.16203 1.18938C3.86914 1.48227 3.86914 1.95714 4.16203 2.25004L8.40467 6.49268L4.16203 10.7353C3.86914 11.0282 3.86914 11.5031 4.16203 11.796C4.45493 12.0889 4.9298 12.0889 5.22269 11.796L9.99566 7.02301ZM1.09984 5.74268C0.685626 5.74268 0.349839 6.07846 0.349839 6.49268C0.349839 6.90689 0.685626 7.24268 1.09984 7.24268L1.09984 5.74268ZM9.46533 5.74268L1.09984 5.74268L1.09984 7.24268L9.46533 7.24268L9.46533 5.74268Z" fill="white" />
                                                        </svg>
                                                    </div>
                                                </a>
                                                <a href="/about" className="flex model-nav group hover:bg-[#0075FF] transition-all duration-300 ease-in-out rounded-[36px] px-3 pl-6 py-3 w-full justify-between">
                                                    <div>
                                                        <p className="font-semibold text-xl text-white">About</p>
                                                    </div>
                                                    <div className="rounded-[50%] group-hover:bg-[white] w-[30px] h-[30px] transition-all duration-300 ease-in-out bg-[#0075FF]  flex justify-center items-center">
                                                        <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path className="hover-white" d="M9.99566 7.02301C10.2886 6.73011 10.2886 6.25524 9.99566 5.96235L5.22269 1.18938C4.9298 0.896482 4.45492 0.896482 4.16203 1.18938C3.86914 1.48227 3.86914 1.95714 4.16203 2.25004L8.40467 6.49268L4.16203 10.7353C3.86914 11.0282 3.86914 11.5031 4.16203 11.796C4.45493 12.0889 4.9298 12.0889 5.22269 11.796L9.99566 7.02301ZM1.09984 5.74268C0.685626 5.74268 0.349839 6.07846 0.349839 6.49268C0.349839 6.90689 0.685626 7.24268 1.09984 7.24268L1.09984 5.74268ZM9.46533 5.74268L1.09984 5.74268L1.09984 7.24268L9.46533 7.24268L9.46533 5.74268Z" fill="white" />
                                                        </svg>
                                                    </div>
                                                </a>
                                                {/* <div className="flex model-nav group hover:bg-[#0075FF] transition-all duration-300 ease-in-out rounded-[36px] px-3 pl-6 py-3 w-full justify-between">
                                                    <div>
                                                        <p className="font-semibold text-xl text-white">FAQ</p>
                                                    </div>
                                                    <div className="rounded-[50%] group-hover:bg-[white] w-[30px] h-[30px] transition-all duration-300 ease-in-out bg-[#0075FF]  flex justify-center items-center">
                                                        <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path className="hover-white" d="M9.99566 7.02301C10.2886 6.73011 10.2886 6.25524 9.99566 5.96235L5.22269 1.18938C4.9298 0.896482 4.45492 0.896482 4.16203 1.18938C3.86914 1.48227 3.86914 1.95714 4.16203 2.25004L8.40467 6.49268L4.16203 10.7353C3.86914 11.0282 3.86914 11.5031 4.16203 11.796C4.45493 12.0889 4.9298 12.0889 5.22269 11.796L9.99566 7.02301ZM1.09984 5.74268C0.685626 5.74268 0.349839 6.07846 0.349839 6.49268C0.349839 6.90689 0.685626 7.24268 1.09984 7.24268L1.09984 5.74268ZM9.46533 5.74268L1.09984 5.74268L1.09984 7.24268L9.46533 7.24268L9.46533 5.74268Z" fill="white" />
                                                        </svg>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>


                                        <div className="w-full items-center flex justify-between">
                                            <div>
                                                <svg width="72" height="10" viewBox="0 0 72 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M62.4587 8.82272C62.1994 8.82272 61.9893 8.61256 61.9893 8.35331V7.74702C61.9893 7.48745 62.1999 7.27715 62.4595 7.2776L68.827 7.28868C69.1759 7.28868 69.4415 7.2094 69.6238 7.05084C69.8141 6.88436 69.9092 6.61877 69.9092 6.25409C69.9092 5.88941 69.8141 5.62779 69.6238 5.46923C69.4415 5.30275 69.1759 5.21951 68.827 5.21951H64.5698C63.6898 5.21951 63.004 5.00942 62.5125 4.58924C62.0289 4.16114 61.7871 3.53484 61.7871 2.71034C61.7871 1.88584 62.0289 1.2635 62.5125 0.843328C63.004 0.415224 63.6898 0.201172 64.5698 0.201172H70.7836C71.0428 0.201172 71.253 0.411335 71.253 0.670585V1.27683C71.253 1.53642 71.0423 1.74672 70.7827 1.74624L64.7719 1.73521C64.431 1.73521 64.1655 1.81449 63.9752 1.97305C63.7849 2.12368 63.6898 2.36944 63.6898 2.71034C63.6898 3.05124 63.7849 3.30097 63.9752 3.45952C64.1655 3.61015 64.431 3.68547 64.7719 3.68547H69.0292C69.9092 3.68547 70.591 3.90348 71.0746 4.33951C71.5661 4.76762 71.8119 5.40581 71.8119 6.25409C71.8119 7.09445 71.5661 7.73264 71.0746 8.16867C70.591 8.6047 69.9092 8.82272 69.0292 8.82272H62.4587Z" fill="white" />
                                                    <path d="M53.6311 8.82283C52.7669 8.82283 52.0851 8.71184 51.5857 8.48986C51.0862 8.25995 50.7295 7.91509 50.5154 7.45528C50.3014 6.99546 50.1943 6.41673 50.1943 5.71907V0.730155C50.1943 0.470905 50.4045 0.260742 50.6637 0.260742H51.6276C51.8869 0.260742 52.097 0.470905 52.097 0.730155V5.71907C52.097 6.32159 52.2358 6.73384 52.5132 6.95582C52.7986 7.16987 53.2783 7.2769 53.9521 7.2769H56.2473C56.9211 7.2769 57.3968 7.16987 57.6743 6.95582C57.9597 6.73384 58.1024 6.32159 58.1024 5.71907V0.730155C58.1024 0.470905 58.3125 0.260742 58.5718 0.260742H59.5356C59.7949 0.260742 60.0051 0.470905 60.0051 0.730155V5.71907C60.0051 6.41673 59.898 6.99546 59.684 7.45528C59.4699 7.91509 59.1132 8.25995 58.6137 8.48986C58.1143 8.71184 57.4325 8.82283 56.5683 8.82283H53.6311Z" fill="white" />
                                                    <path d="M38.7482 8.76337C38.3613 8.76337 38.1405 8.32157 38.3728 8.01214L40.7846 4.79942C40.9098 4.63264 40.91 4.40325 40.785 4.2363L38.3708 1.01147C38.1392 0.70196 38.36 0.260742 38.7466 0.260742H39.89C40.0395 0.260742 40.18 0.331935 40.2684 0.452449L42.5438 3.55333C42.6322 3.67384 42.7728 3.74504 42.9223 3.74504H43.5408C43.6902 3.74504 43.8308 3.67384 43.9192 3.55333L46.1946 0.452449C46.283 0.331934 46.4236 0.260742 46.573 0.260742H47.7164C48.103 0.260742 48.3239 0.70196 48.0922 1.01147L45.6781 4.2363C45.5531 4.40325 45.5532 4.63264 45.6784 4.79942L48.0902 8.01214C48.3225 8.32157 48.1017 8.76337 47.7148 8.76337H46.5613C46.4118 8.76337 46.2711 8.69209 46.1827 8.57144L43.9192 5.4829C43.8308 5.36225 43.6902 5.29097 43.5406 5.29097H42.9224C42.7729 5.29097 42.6322 5.36225 42.5438 5.4829L40.2803 8.57144C40.1919 8.69209 40.0513 8.76337 39.9017 8.76337H38.7482Z" fill="white" />
                                                    <path d="M27.7707 8.76337C27.5114 8.76337 27.3013 8.55321 27.3013 8.29396V0.730155C27.3013 0.470906 27.5114 0.260742 27.7707 0.260742H36.155C36.4143 0.260742 36.6244 0.470905 36.6244 0.730155V1.33726C36.6244 1.59651 36.4143 1.80667 36.155 1.80667H29.6734C29.4141 1.80667 29.204 2.01684 29.204 2.27609V3.21616C29.204 3.47541 29.4141 3.68558 29.6734 3.68558H35.4653C35.7245 3.68558 35.9347 3.89574 35.9347 4.15499V4.7621C35.9347 5.02135 35.7245 5.23151 35.4653 5.23151H29.6734C29.4141 5.23151 29.204 5.44167 29.204 5.70092V6.74802C29.204 7.00727 29.4141 7.21744 29.6734 7.21744H36.155C36.4143 7.21744 36.6244 7.4276 36.6244 7.68685V8.29396C36.6244 8.55321 36.4143 8.76337 36.155 8.76337H27.7707Z" fill="white" />
                                                    <path d="M15.6662 8.76288C15.4069 8.76288 15.1968 8.55272 15.1968 8.29347V0.729667C15.1968 0.470417 15.4069 0.260254 15.6662 0.260254H16.9266C17.0524 0.260254 17.1729 0.310726 17.2612 0.400355L22.3366 5.55599C22.6312 5.85528 23.1405 5.64666 23.1405 5.22668V0.729667C23.1405 0.470418 23.3507 0.260254 23.6099 0.260254H24.5738C24.833 0.260254 25.0432 0.470417 25.0432 0.729667V8.29347C25.0432 8.55272 24.833 8.76288 24.5738 8.76288H23.3136C23.1876 8.76288 23.067 8.71228 22.9787 8.62246L17.9037 3.45717C17.6092 3.15743 17.0995 3.36595 17.0995 3.78615V8.29347C17.0995 8.55272 16.8893 8.76288 16.6301 8.76288H15.6662Z" fill="white" />
                                                    <path d="M10.0796 0.705164C10.0796 0.309517 9.62015 0.0913364 9.31353 0.341369L7.59646 1.74152C7.48713 1.83067 7.42369 1.96425 7.42369 2.10531V5.66602C7.42369 6.04307 7.00161 6.26625 6.69 6.05397L4.7903 4.75981C4.47868 4.54753 4.0566 4.77071 4.0566 5.14776V6.80752C4.0566 6.95555 4.12643 7.09491 4.24501 7.18353L7.29871 9.46568C7.37985 9.52631 7.47843 9.55908 7.57972 9.55908H9.61018C9.86943 9.55908 10.0796 9.34892 10.0796 9.08967V0.705164Z" fill="white" />
                                                    <path d="M0.789062 9.05509C0.789062 9.45074 1.2485 9.66892 1.55512 9.41888L3.27219 8.01873C3.38152 7.92959 3.44496 7.796 3.44496 7.65494V4.09423C3.44496 3.71718 3.86704 3.494 4.17865 3.70628L6.07836 5.00044C6.38997 5.21272 6.81205 4.98954 6.81205 4.61249V2.95273C6.81205 2.8047 6.74222 2.66534 6.62365 2.57672L3.56994 0.294575C3.4888 0.233938 3.39022 0.201173 3.28893 0.201173H1.25848C0.999226 0.201173 0.789062 0.411336 0.789062 0.670586V9.05509Z" fill="white" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0049 1.16806C11.2382 1.16806 11.4273 0.978911 11.4273 0.745588C11.4273 0.512265 11.2382 0.32312 11.0049 0.32312C10.7715 0.32312 10.5824 0.512265 10.5824 0.745588C10.5824 0.978911 10.7715 1.16806 11.0049 1.16806ZM11.0049 1.23043C11.2726 1.23043 11.4897 1.01336 11.4897 0.745588C11.4897 0.477815 11.2726 0.260742 11.0049 0.260742C10.7371 0.260742 10.52 0.477815 10.52 0.745588C10.52 1.01336 10.7371 1.23043 11.0049 1.23043Z" fill="white" />
                                                    <path d="M11.2219 0.585449H11.2865V0.897338H11.2259V0.6906L11.1328 0.841644H11.1127L11.0191 0.6906V0.897338H10.959V0.585449H11.0231L11.1225 0.745849L11.2219 0.585449Z" fill="white" />
                                                    <path d="M10.9178 0.585449V0.641589H10.843V0.897338H10.7824V0.641589H10.7075V0.585449H10.9178Z" fill="white" />
                                                </svg>
                                            </div>

                                            <div className="flex gap-4 items-center" >
                                                {/* <div className="hover:scale-125 transition-all duration-300 ease-in-out">
                                                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.5563 9.24295C10.5563 9.24295 12.3941 1.82228 12.4626 0.829505L12.4637 0.828433C12.4637 0.714912 12.4744 0.646371 12.4744 0.588539C12.4744 0.485727 12.4626 0.394695 12.4519 0.348644C12.4059 0.235123 12.3598 0.200852 12.2806 0.166581C12.1092 0.109821 11.8233 0.200852 11.8233 0.200852C11.8233 0.200852 1.69629 3.84318 1.11369 4.25443C0.988388 4.33368 0.954117 4.39151 0.931627 4.44827C0.828815 4.73315 1.13725 4.85845 1.13725 4.85845L3.75146 5.71522C3.75146 5.71522 3.85427 5.72593 3.88854 5.70451C4.48185 5.32753 9.86021 1.92509 10.1686 1.82228C10.2254 1.79979 10.2586 1.82228 10.2479 1.84477C10.1226 2.29029 5.45321 6.44561 5.45321 6.44561C5.45321 6.44561 5.42965 6.45739 5.41787 6.49166L5.40716 6.51522V6.53771L5.16727 9.15192C5.16727 9.31149 5.21332 9.61993 5.65777 9.25473C5.73016 9.19776 5.79918 9.13661 5.86446 9.0716L5.87517 9.06089C6.0053 8.93206 6.13849 8.80636 6.27464 8.68391C6.60556 8.36477 6.914 8.10131 7.11962 7.91925C7.16036 7.88791 7.19866 7.85354 7.23422 7.81644C8.13596 8.44402 9.09447 9.12943 9.5175 9.48285C9.58556 9.55214 9.66749 9.60628 9.75792 9.64171C9.84835 9.67715 9.94525 9.69308 10.0423 9.68847C10.4417 9.67776 10.5563 9.24295 10.5563 9.24295Z" fill="white" />
                                                    </svg>
                                                </div>
                                                <div className="hover:scale-125 transition-all duration-300 ease-in-out">
                                                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4.20934 9.70028C8.4589 9.70028 10.7852 6.03587 10.7852 2.86018C10.7852 2.7585 10.7852 2.65681 10.779 2.54877C11.2336 2.20738 11.6244 1.78618 11.933 1.30506C11.5181 1.49572 11.0719 1.62282 10.6018 1.68637C11.0881 1.37971 11.4501 0.906214 11.622 0.351781C11.1757 0.63141 10.6813 0.828421 10.15 0.93646C9.93866 0.694758 9.67932 0.501262 9.38902 0.368717C9.09873 0.236172 8.78408 0.167588 8.46579 0.16748C7.18842 0.16748 6.15012 1.24723 6.15012 2.57419C6.15012 2.76485 6.17453 2.9428 6.21145 3.12074C4.29383 3.02541 2.59025 2.06006 1.44869 0.605989C1.24311 0.97594 1.13571 1.39378 1.13701 1.81856C1.13701 2.65109 1.54632 3.38766 2.16341 3.81918C1.79661 3.80656 1.43825 3.70408 1.11886 3.52048V3.55226C1.11886 4.71526 1.9187 5.69269 2.96889 5.90877C2.77362 5.96597 2.5721 5.99139 2.35806 5.99139C2.21161 5.99139 2.06516 5.97868 1.92496 5.9469C2.21786 6.9059 3.07278 7.59798 4.08605 7.61705C3.27391 8.28388 2.26091 8.64733 1.21649 8.64659C1.03312 8.64659 0.84411 8.64023 0.666992 8.61481C1.71645 9.3236 2.94895 9.70127 4.20934 9.70028Z" fill="white" />
                                                    </svg>
                                                </div>
                                                <div className="hover:scale-125 transition-all duration-300 ease-in-out">
                                                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.6244 0.95855C9.85202 0.586124 9.03688 0.320447 8.19937 0.168175C8.19171 0.166632 8.18377 0.167676 8.17671 0.171158C8.16964 0.174641 8.16381 0.180382 8.16005 0.187559C8.05578 0.383277 7.93959 0.637773 7.85856 0.838493C6.9555 0.69454 6.0369 0.69454 5.13384 0.838493C5.04302 0.615974 4.94058 0.398875 4.82699 0.188184C4.82314 0.181248 4.81738 0.17569 4.81047 0.172233C4.80357 0.168776 4.79583 0.16758 4.78827 0.1688C3.95071 0.32057 3.13553 0.586048 2.36325 0.95855C2.35637 0.961351 2.35052 0.966391 2.34657 0.972932C0.801591 3.39471 0.378554 5.7577 0.586497 8.09069C0.587076 8.09642 0.588745 8.10198 0.591406 8.10703C0.594067 8.11208 0.597665 8.11651 0.601989 8.12008C1.50146 8.81946 2.50763 9.35335 3.57755 9.69895C3.58506 9.70136 3.5931 9.70126 3.60057 9.69869C3.60804 9.69612 3.61456 9.69118 3.61925 9.68457C3.84865 9.35566 4.05302 9.00925 4.22819 8.64533C4.23062 8.64033 4.232 8.63485 4.23225 8.62925C4.2325 8.62366 4.23161 8.61806 4.22963 8.61286C4.22766 8.60765 4.22465 8.60294 4.2208 8.59905C4.21696 8.59516 4.21237 8.59218 4.20733 8.5903C3.88628 8.46125 3.57547 8.30569 3.27785 8.12508C3.27244 8.12178 3.26788 8.11714 3.26459 8.11157C3.26129 8.10599 3.25935 8.09965 3.25894 8.0931C3.25852 8.08656 3.25965 8.08 3.26222 8.07402C3.26479 8.06804 3.26873 8.06281 3.27367 8.0588C3.33624 8.0094 3.3988 7.95875 3.45838 7.90685C3.46369 7.9022 3.47013 7.89921 3.47698 7.89822C3.48382 7.89722 3.4908 7.89826 3.49711 7.90122C5.44725 8.83604 7.55886 8.83604 9.48576 7.90122C9.49209 7.89805 9.49915 7.89684 9.50611 7.89772C9.51308 7.89861 9.51966 7.90156 9.52508 7.90622C9.58467 7.95812 9.64663 8.0094 9.70979 8.0588C9.7148 8.06271 9.71881 8.06786 9.72148 8.07378C9.72414 8.0797 9.72539 8.08622 9.72509 8.09277C9.7248 8.09931 9.72298 8.10568 9.71979 8.11132C9.7166 8.11695 9.71215 8.12167 9.70681 8.12508C9.40949 8.30704 9.10086 8.46086 8.77673 8.58967C8.77173 8.59169 8.76719 8.59478 8.7634 8.59876C8.75962 8.60274 8.75668 8.60751 8.75476 8.61276C8.75285 8.61801 8.75202 8.62362 8.75231 8.62923C8.7526 8.63484 8.75402 8.64033 8.75647 8.64533C8.93522 9.00925 9.13958 9.35504 9.36421 9.68332C9.36869 9.69023 9.37514 9.69547 9.38264 9.69828C9.39013 9.70109 9.39829 9.70132 9.40592 9.69895C10.4779 9.35455 11.4861 8.82059 12.3868 8.12008C12.3912 8.11672 12.3949 8.11241 12.3975 8.10745C12.4002 8.10249 12.4018 8.09699 12.4023 8.09131C12.6508 5.39378 11.9858 3.05079 10.6405 0.972932C10.6371 0.96635 10.631 0.961249 10.6244 0.95855ZM4.51955 6.67001C3.93266 6.67001 3.44885 6.10412 3.44885 5.40941C3.44885 4.71533 3.92313 4.14944 4.51955 4.14944C5.12133 4.14944 5.60038 4.71971 5.59084 5.40941C5.59084 6.10412 5.11657 6.67001 4.51955 6.67001ZM8.47941 6.67001C7.89192 6.67001 7.40871 6.10412 7.40871 5.40941C7.40871 4.71533 7.88299 4.14944 8.47941 4.14944C9.0806 4.14944 9.55964 4.71971 9.55011 5.40941C9.55011 6.10412 9.0806 6.67001 8.47941 6.67001Z" fill="white" />
                                                    </svg>
                                                </div> */}
                                                <Icon href="https://twitter.com/NexusLaunchpad" target="_blank">
                                                    <FaXTwitter />
                                                </Icon>
                                                <Icon href="https://t.me/NexusLaunchpad" target="_blank">
                                                    <FaTelegramPlane />
                                                </Icon>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                null
                            }


                        </div>


                        {/* body */}


                        <div className="w-full flex items-center justify-center mt-6 lg:mt-0 lg:px-16 lg:py-10 lg:justify-start">
                            <p className="font-bold text-white text-2xl lg:text-5xl">Airdrop</p>
                        </div>

                        <div className="w-full responsive-airdrop-padding responsive-airdrop-gap rounded-[28px] mt-4 lg:mt-0 px-4 py-6 lg:px-20 lg:py-12 relative z-50 flex lg:flex-row flex-col border-2 border-[#FFFFFF0D] bg-[#191F25]">
                            <div className="lg:w-1/2 mb-8 lg:mb-0 flex flex-col justify-between w-full">
                                <div>
                                    {/* <div className="lg:block hidden py-4 max-w-[264px]">
                                        <img src="/Images/whiteheadtexthd.png" className="h-full w-full"></img>
                                    </div> */}
                                    {/* <div className="mb-6 grad-text-gray">
                                        <p className="font-bold grad-text-gray-new text-base new-text-bg  lg:text-3xl">Your’e almost there</p>
                                    </div> */}
                                    <p className="text-white mt-10 font-bold text-base leading-5 lg:leading-9 lg:text-2xl grad-text-gray-new">Follow simple steps
                                    </p>
                                    <div className="w-full pt-4 flex justify-center items-center lg:hidden">
                                        <div className="max-w-[141px]">
                                            <img src="/Images/mobwhiteheadtext.png" className="h-full w-full"></img>
                                        </div>
                                    </div>
                                    <div className="w-full mt-4 flex justify-center items-center lg:hidden">
                                        <div className="max-w-[243px]">
                                            <img src="/Images/mobclaimtext.png" className="h-full w-full"></img>
                                        </div>
                                    </div>

                                    <div className="hidden lg:block max-w-[547px] mt-3">
                                        <img src="/Images/claimtext.png" className="h-full w-full"></img>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-center lg:justify-start mt-4 lg:mb-20 gap-2 w-full lg:gap-6">
                                        <div onClick={handleOpenInvite} className="bg-white max-w-[160px] model-nav group hover:bg-[#0075FF] transition-all duration-300 ease-in-out resp-btn-width-register items-center lg:pl-7 res-padding-btn lg:gap-6 pl-4 gap-4 flex justify-between p-2 rounded-[36px]">
                                            <p className="font-semibold group-hover:text-white transition-all duration-300 ease-in-out whitespace-nowrap text-sm poppins lg:text-base text-black">Register now</p>

                                            <div className="bg-[#0075FF] w-[34px] relative overflow-hidden group-hover:bg-[white] transition-all duration-300 ease-in-out flex justify-center items-center rounded-[50%] h-[34px] lg:h-[36px] lg:w-[36px]">
                                                <div className="-translate-x-8 absolute transition-all duration-500 ease-in-out group-hover:translate-x-0 ">
                                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="hover-white" d="M14.0291 8.48445C14.4197 8.09393 14.4197 7.46076 14.0291 7.07024L7.66517 0.706276C7.27464 0.315752 6.64148 0.315752 6.25095 0.706277C5.86043 1.0968 5.86043 1.72997 6.25095 2.12049L11.9078 7.77734L6.25095 13.4342C5.86043 13.8247 5.86043 14.4579 6.25095 14.8484C6.64148 15.2389 7.27464 15.2389 7.66517 14.8484L14.0291 8.48445ZM1.38161 6.77734C0.829323 6.77734 0.381608 7.22506 0.381608 7.77734C0.381608 8.32963 0.829323 8.77734 1.38161 8.77734L1.38161 6.77734ZM13.322 6.77734L1.38161 6.77734L1.38161 8.77734L13.322 8.77734L13.322 6.77734Z" fill="white" />
                                                    </svg>
                                                </div>
                                                <div className="translate-x-0 absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 ">
                                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="hover-white" d="M14.0291 8.48445C14.4197 8.09393 14.4197 7.46076 14.0291 7.07024L7.66517 0.706276C7.27464 0.315752 6.64148 0.315752 6.25095 0.706277C5.86043 1.0968 5.86043 1.72997 6.25095 2.12049L11.9078 7.77734L6.25095 13.4342C5.86043 13.8247 5.86043 14.4579 6.25095 14.8484C6.64148 15.2389 7.27464 15.2389 7.66517 14.8484L14.0291 8.48445ZM1.38161 6.77734C0.829323 6.77734 0.381608 7.22506 0.381608 7.77734C0.381608 8.32963 0.829323 8.77734 1.38161 8.77734L1.38161 6.77734ZM13.322 6.77734L1.38161 6.77734L1.38161 8.77734L13.322 8.77734L13.322 6.77734Z" fill="white" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border max-w-[113px] hover:bg-[#0075FF] hover:border-[#0075FF] transition-all duration-300 ease-in-out resp-btn-width-docs border-white rounded-[36px] flex justify-center items-center px-6 lg:px-10">
                                            <p className="font-semibold  text-sm lg:text-base whitespace-nowrap text-white">Open DAPP</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="lg:w-1/2 flex-col flex gap-6 w-full">
                                <div onClick={handleOpenInvite} className="relative group airdrop-steps ">
                                    <div  className="flex responsive-airdrop-steps-flex lg:py-8 lg:px-8 res-fix-airdrop-height res-air-steps py-4 px-4 w-full bg-[#30363D] lg:mt-0 border-2 rounded-[19px] border-[#FFFFFF0D] lg:flex-row flex-col">
                                        <div className="lg:w-1/2 gap-5 flex  w-full">
                                            <div className="lg:block group-hover:scale-110 transition-all duration-500 ease-in-out hidden">
                                                <svg width="61" height="61" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.608643" y="0.504883" width="50" height="50" rx="25" fill="#0075FF" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M31.2168 14.6343C33.0089 14.6343 34.4737 16.0351 34.5761 17.8015L34.5818 17.9993V22.8786L35.2479 22.5826C35.9363 22.2767 36.7312 22.7514 36.8174 23.477L36.8251 23.6076V32.5809C36.8251 33.7636 35.91 34.7324 34.7492 34.8181L34.5818 34.8242H16.6352C15.4525 34.8242 14.4836 33.9091 14.398 32.7483L14.3918 32.5809V23.6076C14.3918 22.8543 15.1486 22.3207 15.8466 22.5366L15.9691 22.5826L16.6352 22.8786V17.9993C16.6352 16.2072 18.036 14.7423 19.8024 14.64L20.0002 14.6343H31.2168ZM34.5818 25.3336L26.5196 28.9168C25.9395 29.1745 25.2775 29.1745 24.6974 28.9168L16.6352 25.3336V32.5809H34.5818V25.3336ZM31.2168 16.8776H20.0002C19.3807 16.8776 18.8785 17.3798 18.8785 17.9993V23.8757L25.6085 26.8668L32.3385 23.8757V17.9993C32.3385 17.3798 31.8363 16.8776 31.2168 16.8776ZM25.6085 20.2426C26.228 20.2426 26.7301 20.7448 26.7301 21.3643C26.7301 21.9395 26.2972 22.4136 25.7393 22.4784L25.6085 22.4859H23.3652C22.7457 22.4859 22.2435 21.9837 22.2435 21.3643C22.2435 20.789 22.6765 20.3149 23.2343 20.2501L23.3652 20.2426H25.6085Z" fill="white" />
                                                </svg>
                                            </div>
                                            <div className="lg:hidden group-hover:scale-110 transition-all duration-500 ease-in-out  block">
                                                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.823975" y="0.296387" width="34.0776" height="34.0776" rx="17.0388" fill="#0075FF" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.6851 9.92627C22.9065 9.92627 23.9049 10.881 23.9746 12.0849L23.9785 12.2197V15.5452L24.4325 15.3435C24.9017 15.135 25.4435 15.4585 25.5022 15.9531L25.5075 16.0421V22.1578C25.5075 22.9639 24.8838 23.6242 24.0926 23.6826L23.9785 23.6868H11.747C10.9409 23.6868 10.2806 23.0631 10.2222 22.2719L10.218 22.1578V16.0421C10.218 15.5286 10.7338 15.165 11.2095 15.3121L11.293 15.3435L11.747 15.5452V12.2197C11.747 10.9983 12.7017 9.99992 13.9056 9.93016L14.0404 9.92627H21.6851ZM23.9785 17.2184L18.4837 19.6605C18.0883 19.8362 17.6371 19.8362 17.2418 19.6605L11.747 17.2184V22.1578H23.9785V17.2184ZM21.6851 11.4552H14.0404C13.6182 11.4552 13.2759 11.7975 13.2759 12.2197V16.2248L17.8627 18.2634L22.4496 16.2248V12.2197C22.4496 11.7975 22.1073 11.4552 21.6851 11.4552ZM17.8627 13.7486C18.285 13.7486 18.6272 14.0909 18.6272 14.5131C18.6272 14.9052 18.3321 15.2283 17.9519 15.2724L17.8627 15.2776H16.3338C15.9116 15.2776 15.5693 14.9353 15.5693 14.5131C15.5693 14.1211 15.8644 13.7979 16.2446 13.7538L16.3338 13.7486H17.8627Z" fill="white" />
                                                </svg>

                                            </div>
                                            <div>
                                                <p className="font-normal text-xs lg:text-base text-white opacity-50">Step 1</p>
                                                <p className="responsive-steps-head font-bold text-sm lg:text-2xl text-white">Get Invite Code</p>
                                            </div>
                                        </div>

                                        <div className="lg:w-1/2 mt-4 lg:mt-0 flex justify-end w-full">
                                            <div className="flex overflow-hidden group transition-all duration-500 ease-in-out center items-center py-2 lg:py-0 lg:max-w-[250px] res-air-right-btn w-full rounded-[36px] h-full px-2 lg:px-4 lg:pl-8 pl-6 gap-4 justify-between bg-[#0075FF]">
                                                <p className=" font-semibold text-sm   lg:text-base whitespace-nowrap text-white">Enter Invite Code</p>
                                                <div className="rounded-[50%] overflow-hidden relative hide-arrow bg-white w-[36px] h-[36px] flex justify-center items-center">
                                                    <div className="-translate-x-8 absolute transition-all duration-500 ease-in-out group-hover:translate-x-0 ">
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.9924 8.21004C14.3829 7.81951 14.3829 7.18635 13.9924 6.79582L7.62842 0.431862C7.2379 0.041338 6.60473 0.0413381 6.21421 0.431862C5.82369 0.822387 5.82369 1.45555 6.21421 1.84608L11.8711 7.50293L6.21421 13.1598C5.82369 13.5503 5.82369 14.1835 6.21421 14.574C6.60474 14.9645 7.2379 14.9645 7.62842 14.574L13.9924 8.21004ZM1.34486 6.50293C0.79258 6.50293 0.344865 6.95065 0.344865 7.50293C0.344865 8.05522 0.79258 8.50293 1.34486 8.50293L1.34486 6.50293ZM13.2853 6.50293L1.34486 6.50293L1.34486 8.50293L13.2853 8.50293L13.2853 6.50293Z" fill="black" />
                                                        </svg>
                                                    </div>
                                                    <div className="translate-x-0 absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 ">
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.9924 8.21004C14.3829 7.81951 14.3829 7.18635 13.9924 6.79582L7.62842 0.431862C7.2379 0.041338 6.60473 0.0413381 6.21421 0.431862C5.82369 0.822387 5.82369 1.45555 6.21421 1.84608L11.8711 7.50293L6.21421 13.1598C5.82369 13.5503 5.82369 14.1835 6.21421 14.574C6.60474 14.9645 7.2379 14.9645 7.62842 14.574L13.9924 8.21004ZM1.34486 6.50293C0.79258 6.50293 0.344865 6.95065 0.344865 7.50293C0.344865 8.05522 0.79258 8.50293 1.34486 8.50293L1.34486 6.50293ZM13.2853 6.50293L1.34486 6.50293L1.34486 8.50293L13.2853 8.50293L13.2853 6.50293Z" fill="#0075FF" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="relative group airdrop-steps">
                                    <div className="flex  lg:py-8 lg:px-8 res-fix-airdrop-height res-air-steps py-4 px-4 w-full bg-[#30363D] lg:mt-0 border-2 rounded-[19px] border-[#FFFFFF0D] lg:flex-row flex-col">
                                        <div className="lg:w-1/2 gap-5 flex  w-full">
                                            <div className="lg:block group-hover:scale-110 transition-all duration-500 ease-in-out hidden">
                                                <svg width="60" height="60" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.823975" y="0.495117" width="34.0776" height="34.0776" rx="17.0388" fill="#0075FF" />
                                                    <path d="M14.6387 24.156C20.6754 24.156 23.98 18.9505 23.98 14.4393C23.98 14.2949 23.98 14.1505 23.9711 13.997C24.6169 13.512 25.1722 12.9137 25.6105 12.2302C25.0211 12.5011 24.3872 12.6816 23.7195 12.7719C24.4103 12.3363 24.9244 11.6637 25.1687 10.8761C24.5348 11.2733 23.8324 11.5532 23.0776 11.7066C22.7775 11.3633 22.409 11.0884 21.9967 10.9001C21.5843 10.7118 21.1373 10.6144 20.6852 10.6143C18.8706 10.6143 17.3957 12.1481 17.3957 14.0331C17.3957 14.3039 17.4304 14.5567 17.4828 14.8095C14.7588 14.6741 12.3388 13.3027 10.7171 11.2372C10.4251 11.7627 10.2725 12.3563 10.2744 12.9597C10.2744 14.1423 10.8558 15.1886 11.7324 15.8016C11.2114 15.7837 10.7023 15.6381 10.2486 15.3773V15.4225C10.2486 17.0746 11.3848 18.463 12.8766 18.77C12.5992 18.8512 12.313 18.8873 12.0089 18.8873C11.8009 18.8873 11.5928 18.8693 11.3937 18.8241C11.8098 20.1864 13.0242 21.1696 14.4636 21.1967C13.3099 22.1439 11.8709 22.6602 10.3873 22.6592C10.1268 22.6592 9.85829 22.6501 9.60669 22.614C11.0975 23.6209 12.8483 24.1574 14.6387 24.156Z" fill="white" />
                                                </svg>

                                            </div>
                                            <div className="lg:hidden block group-hover:scale-110 transition-all duration-500 ease-in-out ">
                                                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.823975" y="0.495117" width="34.0776" height="34.0776" rx="17.0388" fill="#0075FF" />
                                                    <path d="M14.6387 24.156C20.6754 24.156 23.98 18.9505 23.98 14.4393C23.98 14.2949 23.98 14.1505 23.9711 13.997C24.6169 13.512 25.1722 12.9137 25.6105 12.2302C25.0211 12.5011 24.3872 12.6816 23.7195 12.7719C24.4103 12.3363 24.9244 11.6637 25.1687 10.8761C24.5348 11.2733 23.8324 11.5532 23.0776 11.7066C22.7775 11.3633 22.409 11.0884 21.9967 10.9001C21.5843 10.7118 21.1373 10.6144 20.6852 10.6143C18.8706 10.6143 17.3957 12.1481 17.3957 14.0331C17.3957 14.3039 17.4304 14.5567 17.4828 14.8095C14.7588 14.6741 12.3388 13.3027 10.7171 11.2372C10.4251 11.7627 10.2725 12.3563 10.2744 12.9597C10.2744 14.1423 10.8558 15.1886 11.7324 15.8016C11.2114 15.7837 10.7023 15.6381 10.2486 15.3773V15.4225C10.2486 17.0746 11.3848 18.463 12.8766 18.77C12.5992 18.8512 12.313 18.8873 12.0089 18.8873C11.8009 18.8873 11.5928 18.8693 11.3937 18.8241C11.8098 20.1864 13.0242 21.1696 14.4636 21.1967C13.3099 22.1439 11.8709 22.6602 10.3873 22.6592C10.1268 22.6592 9.85829 22.6501 9.60669 22.614C11.0975 23.6209 12.8483 24.1574 14.6387 24.156Z" fill="white" />
                                                </svg>


                                            </div>
                                            <div>
                                                <p className="font-normal text-xs lg:text-base text-white opacity-50">Step 2</p>
                                                <p className="responsive-steps-head font-bold text-sm lg:text-2xl text-white">Follow on Twitter</p>
                                            </div>
                                        </div>

                                        <div className="lg:w-1/2 mt-4 lg:mt-0 flex justify-end w-full">
                                            <div className="flex overflow-hidden group transition-all duration-500 ease-in-out center items-center py-2 lg:py-0 lg:max-w-[250px] res-air-right-btn w-full rounded-[36px] h-full px-2 lg:px-4 lg:pl-8 pl-6 gap-4 justify-between bg-[#0075FF]">
                                                <p className=" font-semibold text-sm   lg:text-base whitespace-nowrap text-white">Follow on Twitter</p>
                                                <div className="rounded-[50%] overflow-hidden relative hide-arrow bg-white w-[36px] h-[36px] flex justify-center items-center">
                                                    <div className="-translate-x-8 absolute transition-all duration-500 ease-in-out group-hover:translate-x-0 ">
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.9924 8.21004C14.3829 7.81951 14.3829 7.18635 13.9924 6.79582L7.62842 0.431862C7.2379 0.041338 6.60473 0.0413381 6.21421 0.431862C5.82369 0.822387 5.82369 1.45555 6.21421 1.84608L11.8711 7.50293L6.21421 13.1598C5.82369 13.5503 5.82369 14.1835 6.21421 14.574C6.60474 14.9645 7.2379 14.9645 7.62842 14.574L13.9924 8.21004ZM1.34486 6.50293C0.79258 6.50293 0.344865 6.95065 0.344865 7.50293C0.344865 8.05522 0.79258 8.50293 1.34486 8.50293L1.34486 6.50293ZM13.2853 6.50293L1.34486 6.50293L1.34486 8.50293L13.2853 8.50293L13.2853 6.50293Z" fill="black" />
                                                        </svg>
                                                    </div>
                                                    <div className="translate-x-0 absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 ">
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.9924 8.21004C14.3829 7.81951 14.3829 7.18635 13.9924 6.79582L7.62842 0.431862C7.2379 0.041338 6.60473 0.0413381 6.21421 0.431862C5.82369 0.822387 5.82369 1.45555 6.21421 1.84608L11.8711 7.50293L6.21421 13.1598C5.82369 13.5503 5.82369 14.1835 6.21421 14.574C6.60474 14.9645 7.2379 14.9645 7.62842 14.574L13.9924 8.21004ZM1.34486 6.50293C0.79258 6.50293 0.344865 6.95065 0.344865 7.50293C0.344865 8.05522 0.79258 8.50293 1.34486 8.50293L1.34486 6.50293ZM13.2853 6.50293L1.34486 6.50293L1.34486 8.50293L13.2853 8.50293L13.2853 6.50293Z" fill="#0075FF" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="relative group airdrop-steps">
                                    <div className="flex  lg:py-8 lg:px-8 res-fix-airdrop-height res-air-steps py-4 px-4 w-full bg-[#30363D] lg:mt-0 border-2 rounded-[19px] border-[#FFFFFF0D] lg:flex-row flex-col">
                                        <div className="lg:w-1/2 gap-5 flex  w-full">
                                            <div className="lg:block group-hover:scale-110 transition-all duration-500 ease-in-out hidden">
                                                <svg width="60" height="60" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.823975" y="0.693848" width="34.0776" height="34.0776" rx="17.0388" fill="#0075FF" />
                                                    <path d="M21.9331 23.7728C21.9331 23.7728 24.5001 13.4076 24.5959 12.0209L24.5974 12.0194C24.5974 11.8608 24.6123 11.765 24.6123 11.6843C24.6123 11.5407 24.5959 11.4135 24.5809 11.3492C24.5166 11.1906 24.4523 11.1427 24.3416 11.0949C24.1022 11.0156 23.7028 11.1427 23.7028 11.1427C23.7028 11.1427 9.55736 16.2304 8.74358 16.8048C8.56855 16.9155 8.52068 16.9963 8.48927 17.0756C8.34566 17.4735 8.77649 17.6485 8.77649 17.6485L12.428 18.8452C12.428 18.8452 12.5716 18.8602 12.6195 18.8303C13.4483 18.3037 20.9608 13.5512 21.3916 13.4076C21.4709 13.3762 21.5173 13.4076 21.5023 13.439C21.3273 14.0613 14.8051 19.8655 14.8051 19.8655C14.8051 19.8655 14.7721 19.8819 14.7557 19.9298L14.7407 19.9627V19.9941L14.4056 23.6457C14.4056 23.8686 14.47 24.2994 15.0908 23.7893C15.1919 23.7097 15.2883 23.6243 15.3795 23.5335L15.3944 23.5185C15.5762 23.3386 15.7623 23.163 15.9524 22.9919C16.4147 22.5462 16.8455 22.1782 17.1327 21.9239C17.1896 21.8801 17.2431 21.8321 17.2928 21.7802C18.5523 22.6569 19.8912 23.6142 20.4821 24.1079C20.5771 24.2047 20.6916 24.2803 20.8179 24.3298C20.9442 24.3793 21.0796 24.4016 21.2151 24.3951C21.7731 24.3802 21.9331 23.7728 21.9331 23.7728Z" fill="white" />
                                                </svg>


                                            </div>
                                            <div className="lg:hidden block group-hover:scale-110 transition-all duration-500 ease-in-out ">
                                                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.823975" y="0.693848" width="34.0776" height="34.0776" rx="17.0388" fill="#0075FF" />
                                                    <path d="M21.9331 23.7728C21.9331 23.7728 24.5001 13.4076 24.5959 12.0209L24.5974 12.0194C24.5974 11.8608 24.6123 11.765 24.6123 11.6843C24.6123 11.5407 24.5959 11.4135 24.5809 11.3492C24.5166 11.1906 24.4523 11.1427 24.3416 11.0949C24.1022 11.0156 23.7028 11.1427 23.7028 11.1427C23.7028 11.1427 9.55736 16.2304 8.74358 16.8048C8.56855 16.9155 8.52068 16.9963 8.48927 17.0756C8.34566 17.4735 8.77649 17.6485 8.77649 17.6485L12.428 18.8452C12.428 18.8452 12.5716 18.8602 12.6195 18.8303C13.4483 18.3037 20.9608 13.5512 21.3916 13.4076C21.4709 13.3762 21.5173 13.4076 21.5023 13.439C21.3273 14.0613 14.8051 19.8655 14.8051 19.8655C14.8051 19.8655 14.7721 19.8819 14.7557 19.9298L14.7407 19.9627V19.9941L14.4056 23.6457C14.4056 23.8686 14.47 24.2994 15.0908 23.7893C15.1919 23.7097 15.2883 23.6243 15.3795 23.5335L15.3944 23.5185C15.5762 23.3386 15.7623 23.163 15.9524 22.9919C16.4147 22.5462 16.8455 22.1782 17.1327 21.9239C17.1896 21.8801 17.2431 21.8321 17.2928 21.7802C18.5523 22.6569 19.8912 23.6142 20.4821 24.1079C20.5771 24.2047 20.6916 24.2803 20.8179 24.3298C20.9442 24.3793 21.0796 24.4016 21.2151 24.3951C21.7731 24.3802 21.9331 23.7728 21.9331 23.7728Z" fill="white" />
                                                </svg>



                                            </div>
                                            <div>
                                                <p className="font-normal text-xs lg:text-base text-white opacity-50">Step 3</p>
                                                <p className="responsive-steps-head font-bold text-sm lg:text-2xl text-white">Join Telegram</p>
                                            </div>
                                        </div>

                                        <div className="lg:w-1/2 mt-4 lg:mt-0 flex justify-end w-full">
                                            <div className="flex overflow-hidden group transition-all duration-500 ease-in-out center items-center py-2 lg:py-0 lg:max-w-[250px] res-air-right-btn w-full rounded-[36px] h-full px-2 lg:px-4 lg:pl-8 pl-6 gap-4 justify-between bg-[#0075FF]">
                                                <p className=" font-semibold text-sm   lg:text-base whitespace-nowrap text-white">Join Telegram</p>
                                                <div className="rounded-[50%] overflow-hidden relative hide-arrow bg-white w-[36px] h-[36px] flex justify-center items-center">
                                                    <div className="-translate-x-8 absolute transition-all duration-500 ease-in-out group-hover:translate-x-0 ">
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.9924 8.21004C14.3829 7.81951 14.3829 7.18635 13.9924 6.79582L7.62842 0.431862C7.2379 0.041338 6.60473 0.0413381 6.21421 0.431862C5.82369 0.822387 5.82369 1.45555 6.21421 1.84608L11.8711 7.50293L6.21421 13.1598C5.82369 13.5503 5.82369 14.1835 6.21421 14.574C6.60474 14.9645 7.2379 14.9645 7.62842 14.574L13.9924 8.21004ZM1.34486 6.50293C0.79258 6.50293 0.344865 6.95065 0.344865 7.50293C0.344865 8.05522 0.79258 8.50293 1.34486 8.50293L1.34486 6.50293ZM13.2853 6.50293L1.34486 6.50293L1.34486 8.50293L13.2853 8.50293L13.2853 6.50293Z" fill="black" />
                                                        </svg>
                                                    </div>
                                                    <div className="translate-x-0 absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 ">
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.9924 8.21004C14.3829 7.81951 14.3829 7.18635 13.9924 6.79582L7.62842 0.431862C7.2379 0.041338 6.60473 0.0413381 6.21421 0.431862C5.82369 0.822387 5.82369 1.45555 6.21421 1.84608L11.8711 7.50293L6.21421 13.1598C5.82369 13.5503 5.82369 14.1835 6.21421 14.574C6.60474 14.9645 7.2379 14.9645 7.62842 14.574L13.9924 8.21004ZM1.34486 6.50293C0.79258 6.50293 0.344865 6.95065 0.344865 7.50293C0.344865 8.05522 0.79258 8.50293 1.34486 8.50293L1.34486 6.50293ZM13.2853 6.50293L1.34486 6.50293L1.34486 8.50293L13.2853 8.50293L13.2853 6.50293Z" fill="#0075FF" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div onClick={() => setIsmodal(true)} className="relative group airdrop-steps">
                                    <div className="flex  lg:py-8 lg:px-8 res-fix-airdrop-height res-air-steps py-4 px-4 w-full bg-[#30363D] lg:mt-0 border-2 rounded-[19px] border-[#FFFFFF0D] lg:flex-row flex-col">
                                        <div className="lg:w-1/2 gap-5 flex  w-full">
                                            <div className="lg:block group-hover:scale-110 transition-all duration-500 ease-in-out hidden">
                                                <svg width="60" height="60" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.823975" y="0.693848" width="34.0776" height="34.0776" rx="17.0388" fill="#0075FF" />
                                                    <path d="M21.9331 23.7728C21.9331 23.7728 24.5001 13.4076 24.5959 12.0209L24.5974 12.0194C24.5974 11.8608 24.6123 11.765 24.6123 11.6843C24.6123 11.5407 24.5959 11.4135 24.5809 11.3492C24.5166 11.1906 24.4523 11.1427 24.3416 11.0949C24.1022 11.0156 23.7028 11.1427 23.7028 11.1427C23.7028 11.1427 9.55736 16.2304 8.74358 16.8048C8.56855 16.9155 8.52068 16.9963 8.48927 17.0756C8.34566 17.4735 8.77649 17.6485 8.77649 17.6485L12.428 18.8452C12.428 18.8452 12.5716 18.8602 12.6195 18.8303C13.4483 18.3037 20.9608 13.5512 21.3916 13.4076C21.4709 13.3762 21.5173 13.4076 21.5023 13.439C21.3273 14.0613 14.8051 19.8655 14.8051 19.8655C14.8051 19.8655 14.7721 19.8819 14.7557 19.9298L14.7407 19.9627V19.9941L14.4056 23.6457C14.4056 23.8686 14.47 24.2994 15.0908 23.7893C15.1919 23.7097 15.2883 23.6243 15.3795 23.5335L15.3944 23.5185C15.5762 23.3386 15.7623 23.163 15.9524 22.9919C16.4147 22.5462 16.8455 22.1782 17.1327 21.9239C17.1896 21.8801 17.2431 21.8321 17.2928 21.7802C18.5523 22.6569 19.8912 23.6142 20.4821 24.1079C20.5771 24.2047 20.6916 24.2803 20.8179 24.3298C20.9442 24.3793 21.0796 24.4016 21.2151 24.3951C21.7731 24.3802 21.9331 23.7728 21.9331 23.7728Z" fill="white" />
                                                </svg>


                                            </div>
                                            <div className="lg:hidden block group-hover:scale-110 transition-all duration-500 ease-in-out ">
                                                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.823975" y="0.693848" width="34.0776" height="34.0776" rx="17.0388" fill="#0075FF" />
                                                    <path d="M21.9331 23.7728C21.9331 23.7728 24.5001 13.4076 24.5959 12.0209L24.5974 12.0194C24.5974 11.8608 24.6123 11.765 24.6123 11.6843C24.6123 11.5407 24.5959 11.4135 24.5809 11.3492C24.5166 11.1906 24.4523 11.1427 24.3416 11.0949C24.1022 11.0156 23.7028 11.1427 23.7028 11.1427C23.7028 11.1427 9.55736 16.2304 8.74358 16.8048C8.56855 16.9155 8.52068 16.9963 8.48927 17.0756C8.34566 17.4735 8.77649 17.6485 8.77649 17.6485L12.428 18.8452C12.428 18.8452 12.5716 18.8602 12.6195 18.8303C13.4483 18.3037 20.9608 13.5512 21.3916 13.4076C21.4709 13.3762 21.5173 13.4076 21.5023 13.439C21.3273 14.0613 14.8051 19.8655 14.8051 19.8655C14.8051 19.8655 14.7721 19.8819 14.7557 19.9298L14.7407 19.9627V19.9941L14.4056 23.6457C14.4056 23.8686 14.47 24.2994 15.0908 23.7893C15.1919 23.7097 15.2883 23.6243 15.3795 23.5335L15.3944 23.5185C15.5762 23.3386 15.7623 23.163 15.9524 22.9919C16.4147 22.5462 16.8455 22.1782 17.1327 21.9239C17.1896 21.8801 17.2431 21.8321 17.2928 21.7802C18.5523 22.6569 19.8912 23.6142 20.4821 24.1079C20.5771 24.2047 20.6916 24.2803 20.8179 24.3298C20.9442 24.3793 21.0796 24.4016 21.2151 24.3951C21.7731 24.3802 21.9331 23.7728 21.9331 23.7728Z" fill="white" />
                                                </svg>



                                            </div>
                                            <div>
                                                <p className="font-normal text-xs lg:text-base text-white opacity-50">Step 4</p>
                                                <p className="responsive-steps-head font-bold text-sm lg:text-2xl text-white">Invite a Friend</p>
                                            </div>
                                        </div>

                                        <div className="lg:w-1/2 mt-4 lg:mt-0 flex justify-end w-full">
                                            <div className="flex overflow-hidden group center items-center  transition-all duration-500 ease-in-out py-2 lg:py-0 lg:max-h-[61px] lg:max-w-[250px] res-air-right-btn w-full rounded-[36px] h-full px-2 lg:px-4 lg:pl-8 pl-6 gap-4 justify-between bg-[#0075FF]">
                                                <p className=" font-semibold text-sm   lg:text-base whitespace-nowrap text-white">Share invite link</p>
                                                <div className="rounded-[50%] overflow-hidden relative hide-arrow bg-white w-[36px] h-[36px] flex justify-center items-center">
                                                    <div className="-translate-x-8  absolute transition-all duration-500 ease-in-out group-hover:translate-x-0 ">
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.9924 8.21004C14.3829 7.81951 14.3829 7.18635 13.9924 6.79582L7.62842 0.431862C7.2379 0.041338 6.60473 0.0413381 6.21421 0.431862C5.82369 0.822387 5.82369 1.45555 6.21421 1.84608L11.8711 7.50293L6.21421 13.1598C5.82369 13.5503 5.82369 14.1835 6.21421 14.574C6.60474 14.9645 7.2379 14.9645 7.62842 14.574L13.9924 8.21004ZM1.34486 6.50293C0.79258 6.50293 0.344865 6.95065 0.344865 7.50293C0.344865 8.05522 0.79258 8.50293 1.34486 8.50293L1.34486 6.50293ZM13.2853 6.50293L1.34486 6.50293L1.34486 8.50293L13.2853 8.50293L13.2853 6.50293Z" fill="black" />
                                                        </svg>
                                                    </div>
                                                    <div className="translate-x-0 absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 ">
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.9924 8.21004C14.3829 7.81951 14.3829 7.18635 13.9924 6.79582L7.62842 0.431862C7.2379 0.041338 6.60473 0.0413381 6.21421 0.431862C5.82369 0.822387 5.82369 1.45555 6.21421 1.84608L11.8711 7.50293L6.21421 13.1598C5.82369 13.5503 5.82369 14.1835 6.21421 14.574C6.60474 14.9645 7.2379 14.9645 7.62842 14.574L13.9924 8.21004ZM1.34486 6.50293C0.79258 6.50293 0.344865 6.95065 0.344865 7.50293C0.344865 8.05522 0.79258 8.50293 1.34486 8.50293L1.34486 6.50293ZM13.2853 6.50293L1.34486 6.50293L1.34486 8.50293L13.2853 8.50293L13.2853 6.50293Z" fill="#0075FF" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>




                            </div>
                        </div>

                    </div>

                    {/* footer */}

                    <div className="lg:flex relative z-50  hidden footer-resp-margin -mt-16 items-center w-full justify-end gap-6">
                        <div>
                            <p className="text-white  text-xs lg:font-medium lg:text-base opacity-60">Follow on our socials</p>
                        </div>
                        <div className="flex gap-6 items-center">

                            <Icon href="https://twitter.com/NexusLaunchpad" target="_blank">
                                <FaXTwitter />
                            </Icon>
                            <Icon href="https://t.me/NexusLaunchpad" target="_blank">
                                <FaTelegramPlane />
                            </Icon>
                        </div>
                    </div>

                    <div className="flex lg:hidden  footer-resp-margin -mt-10 items-center w-full justify-end gap-6">
                        <div>
                            <p className="text-white text-xs lg:font-medium lg:text-base opacity-60">Follow on our socials</p>
                        </div>
                        <div className="flex gap-6 items-center">
                            {/* <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.07834 1.08025C0.889648 1.4514 0.889648 1.93702 0.889648 2.90825V7.07067C0.889648 8.0419 0.889648 8.52751 1.07834 8.89866C1.24477 9.22491 1.5102 9.4901 1.8366 9.65622C2.20775 9.84561 2.69336 9.84561 3.66459 9.84561H11.9894C12.9607 9.84561 13.4463 9.84561 13.8174 9.65622C14.1436 9.48998 14.4087 9.2248 14.575 8.89866C14.7644 8.52751 14.7644 8.0419 14.7644 7.07067V2.90825C14.7644 1.93702 14.7644 1.4514 14.575 1.08025C14.4089 0.753852 14.1437 0.488421 13.8174 0.321997C13.4463 0.133301 12.9607 0.133301 11.9894 0.133301H3.66459C2.69336 0.133301 2.20775 0.133301 1.8366 0.321997C1.51009 0.488303 1.24465 0.753746 1.07834 1.08025ZM2.72597 1.52077H12.9281C13.0025 1.52068 13.0751 1.54457 13.1349 1.58889C13.1948 1.63322 13.2388 1.69564 13.2604 1.76691C13.282 1.83818 13.2801 1.91452 13.255 1.98463C13.2299 2.05475 13.1829 2.11492 13.1209 2.15624L8.21273 5.439C8.09858 5.51535 7.96434 5.55611 7.82701 5.55611C7.68968 5.55611 7.55544 5.51535 7.44129 5.439L2.53311 2.15624C2.47114 2.11492 2.42412 2.05475 2.399 1.98463C2.37388 1.91452 2.37199 1.83818 2.39362 1.76691C2.41525 1.69564 2.45925 1.63322 2.5191 1.58889C2.57896 1.54457 2.65149 1.52068 2.72597 1.52077Z" fill="white" />
                            </svg>


                            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0945 10.9452C12.0945 10.9452 14.2696 2.16234 14.3507 0.987328L14.352 0.98606C14.352 0.8517 14.3647 0.770577 14.3647 0.70213C14.3647 0.580445 14.3507 0.472704 14.338 0.418199C14.2835 0.283839 14.229 0.243278 14.1352 0.202716C13.9324 0.135537 13.594 0.243278 13.594 0.243278C13.594 0.243278 1.60808 4.5542 0.918539 5.04094C0.770236 5.13474 0.729675 5.20319 0.703056 5.27037C0.581372 5.60753 0.946425 5.75584 0.946425 5.75584L4.04051 6.76987C4.04051 6.76987 4.16219 6.78255 4.20275 6.7572C4.90497 6.31102 11.2706 2.28403 11.6356 2.16234C11.7028 2.13572 11.7421 2.16234 11.7294 2.18896C11.5811 2.71626 6.05464 7.63434 6.05464 7.63434C6.05464 7.63434 6.02675 7.64828 6.01281 7.68884L6.00013 7.71673V7.74335L5.7162 10.8374C5.7162 11.0263 5.77071 11.3913 6.29674 10.9591C6.38242 10.8917 6.46411 10.8193 6.54137 10.7424L6.55405 10.7297C6.70806 10.5772 6.8657 10.4284 7.02684 10.2835C7.41852 9.90578 7.78357 9.59396 8.02694 9.37848C8.07515 9.34139 8.12048 9.30072 8.16257 9.2568C9.22984 9.99958 10.3643 10.8108 10.865 11.2291C10.9455 11.3111 11.0425 11.3752 11.1495 11.4171C11.2566 11.4591 11.3712 11.4779 11.4861 11.4725C11.9589 11.4598 12.0945 10.9452 12.0945 10.9452Z" fill="white" />
                            </svg>


                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.43233 11.4868C9.46196 11.4868 12.2153 7.14971 12.2153 3.39108C12.2153 3.27073 12.2153 3.15038 12.2079 3.02251C12.746 2.61845 13.2086 2.11993 13.5738 1.5505C13.0827 1.77615 12.5546 1.92659 11.9983 2.00181C12.5738 1.63885 13.0022 1.07844 13.2057 0.422233C12.6775 0.753191 12.0923 0.986366 11.4634 1.11424C11.2133 0.828168 10.9064 0.599153 10.5628 0.442278C10.2192 0.285403 9.84682 0.204228 9.47011 0.204102C7.95826 0.204102 6.72937 1.48205 6.72937 3.0526C6.72937 3.27825 6.75826 3.48886 6.80196 3.69947C4.53233 3.58664 2.51604 2.44409 1.16493 0.723104C0.921613 1.16096 0.794498 1.6555 0.796042 2.15826C0.796042 3.14361 1.28049 4.01539 2.01086 4.52611C1.57672 4.51117 1.15258 4.38989 0.77456 4.17259V4.2102C0.77456 5.58669 1.72123 6.74353 2.96419 6.99927C2.73308 7.06697 2.49456 7.09706 2.24123 7.09706C2.06789 7.09706 1.89456 7.08201 1.72863 7.0444C2.0753 8.17944 3.08715 8.99856 4.28641 9.02113C3.3252 9.81037 2.12625 10.2405 0.890116 10.2397C0.673079 10.2397 0.449376 10.2321 0.239746 10.202C1.48184 11.0409 2.94059 11.4879 4.43233 11.4868Z" fill="white" />
                            </svg>


                            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5141 1.14038C11.6 0.699592 10.6352 0.385147 9.64396 0.204923C9.63489 0.203097 9.6255 0.204333 9.61714 0.208455C9.60877 0.212576 9.60187 0.219372 9.59742 0.227866C9.47401 0.45951 9.33649 0.760722 9.24059 0.998287C8.17176 0.827909 7.08455 0.827909 6.01572 0.998287C5.90822 0.734922 5.78698 0.477972 5.65254 0.228606C5.64798 0.220396 5.64116 0.213818 5.63299 0.209727C5.62481 0.205635 5.61566 0.204219 5.6067 0.205663C4.61541 0.385293 3.65059 0.699502 2.73655 1.14038C2.7284 1.1437 2.72148 1.14966 2.7168 1.1574C0.888225 4.02373 0.387535 6.82048 0.633649 9.58171C0.634334 9.5885 0.63631 9.59508 0.639459 9.60105C0.642608 9.60703 0.646867 9.61228 0.651984 9.6165C1.71656 10.4443 2.90743 11.0761 4.17374 11.4852C4.18264 11.488 4.19216 11.4879 4.20099 11.4849C4.20983 11.4818 4.21755 11.476 4.22311 11.4682C4.49461 11.0789 4.73649 10.6689 4.94382 10.2382C4.94669 10.2323 4.94833 10.2258 4.94863 10.2191C4.94892 10.2125 4.94787 10.2059 4.94553 10.1997C4.94319 10.1936 4.93963 10.188 4.93508 10.1834C4.93053 10.1788 4.92509 10.1753 4.91914 10.173C4.53914 10.0203 4.17129 9.83618 3.81903 9.62242C3.81263 9.61852 3.80724 9.61303 3.80333 9.60643C3.79943 9.59983 3.79714 9.59232 3.79665 9.58457C3.79616 9.57682 3.7975 9.56906 3.80054 9.56198C3.80358 9.5549 3.80823 9.54872 3.81409 9.54397C3.88814 9.4855 3.96218 9.42556 4.0327 9.36413C4.03898 9.35863 4.04661 9.35509 4.05471 9.35391C4.06282 9.35274 4.07107 9.35397 4.07854 9.35747C6.38665 10.4639 8.88587 10.4639 11.1665 9.35747C11.174 9.35371 11.1823 9.35228 11.1906 9.35333C11.1988 9.35438 11.2066 9.35787 11.213 9.36339C11.2835 9.42482 11.3569 9.4855 11.4316 9.54397C11.4376 9.5486 11.4423 9.55469 11.4455 9.5617C11.4486 9.56871 11.4501 9.57643 11.4497 9.58418C11.4494 9.59192 11.4472 9.59946 11.4435 9.60613C11.4397 9.61279 11.4344 9.61839 11.4281 9.62242C11.0762 9.83778 10.7109 10.0198 10.3273 10.1723C10.3214 10.1747 10.316 10.1783 10.3115 10.183C10.307 10.1878 10.3036 10.1934 10.3013 10.1996C10.299 10.2058 10.2981 10.2125 10.2984 10.2191C10.2987 10.2258 10.3004 10.2322 10.3033 10.2382C10.5149 10.6689 10.7568 11.0781 11.0226 11.4667C11.0279 11.4749 11.0356 11.4811 11.0444 11.4844C11.0533 11.4877 11.063 11.488 11.072 11.4852C12.3408 11.0776 13.534 10.4456 14.6001 9.6165C14.6053 9.61252 14.6096 9.60742 14.6128 9.60155C14.6159 9.59568 14.6179 9.58917 14.6184 9.58245C14.9125 6.38975 14.1255 3.61668 12.5332 1.1574C12.5292 1.14961 12.522 1.14358 12.5141 1.14038ZM5.28866 7.90025C4.59404 7.90025 4.02142 7.23048 4.02142 6.40826C4.02142 5.58677 4.58276 4.917 5.28866 4.917C6.00091 4.917 6.56789 5.59195 6.5566 6.40826C6.5566 7.23048 5.99527 7.90025 5.28866 7.90025ZM9.9754 7.90025C9.28008 7.90025 8.70816 7.23048 8.70816 6.40826C8.70816 5.58677 9.2695 4.917 9.9754 4.917C10.6869 4.917 11.2539 5.59195 11.2426 6.40826C11.2426 7.23048 10.6869 7.90025 9.9754 7.90025Z" fill="white" />
                            </svg> */}
                            <Icon href="https://twitter.com/NexusLaunchpad" target="_blank">
                                <FaXTwitter />
                            </Icon>
                            <Icon href="https://t.me/NexusLaunchpad" target="_blank">
                                <FaTelegramPlane />
                            </Icon>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const Airdrop = () => {
    return (
        <Suspense>
            <Content />
        </Suspense>
    )
}
export default Airdrop;