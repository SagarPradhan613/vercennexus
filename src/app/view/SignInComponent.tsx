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

  const [copied, setCopied] = useState(false)


  return (

    <Box flexDirection="column" justifyContent="start" alignItems="start" >
      haiiii
      <Box mt="1rem">
        <Text color={COLORS.darkLight} size="15px" align="start" weight={undefined} maxWidth={undefined} m={undefined} fontFamily={undefined} >We do not store any personal information</Text>
      </Box>

    </Box>
  );
};

export default SignIn;
