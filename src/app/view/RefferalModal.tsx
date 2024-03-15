import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import Modal from '@mui/material/Modal';
import Heading from "../components/Heading";
import Text from "../components/Text";
import { COLORS } from "../utils/colors";
import useIsMobile from "../hooks/useIsMobile";
import Button from "../components/Button";
import useIsTab from "../hooks/useIsTab";
import Flex from "../components/Flex";
import axios from "axios";
import styled from "styled-components";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  border: '2px solid white',
  borderRadius: '15px',
  p: 4,
};

const FlexWrap = styled.div`
display: flex;
justify-content: start;
align-items: center;
gap: 1rem;
flex-wrap: wrap;
`;

const CodeButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
gap: .5rem;
padding: .5rem 1rem;
width: 100%;
max-width: 100px;
border-radius: 35px;
border: none;
`

const ReferralModal = (props: { accessToken: string | null, setCodes: any, setTotalCodes: any, totalCodes: any, adminOverride: any, setIsmodal: any, referrals: any, id: string, codes: any }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const referrals = props.referrals;
  const setCodes = props.setCodes;
  const setTotalCodes = props.setTotalCodes;
  const accessToken = props.accessToken;
  const totalCodes = props.totalCodes;
  const codes = props.codes;
  const _id = props.id;
  const adminOverride = props.adminOverride;
  console.log(referrals, 'ref');

  const URL = "/?refId=" + _id
  const TitleLink = window.location.protocol + '//' + window.location.host
  const FullURL = window.location.protocol + '//' + window.location.host + "?refId=" + _id


  const isMobile = useIsMobile()
  const isTab = useIsTab()
  const [copied, setCopied] = useState(false)
  const copy = (text: any) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => { setCopied(false) }, 10000)
  }
  const shortener = (id: string) => {
    return id.slice(0, 5) + '...' + id.slice(-5);
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL


  const generateCodes = () => {
    let url = adminOverride ? `/generate/codes?adminOverride=true&token=${accessToken}` : `/generate/codes?token=${accessToken}`
    try {
      let config = {
        method: "post",
        url: API_URL + url,
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json"
        }
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.status === "OK") {
            setCodes(response.data.codes);
            setTotalCodes(response.data.totalCodes)
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

  return (
    <div>
      <Box sx={{ backgroundColor: COLORS.blue }} borderRadius={'15px'}>
        <Grid container>
          <Grid item lg={6} md={6} sm={12} xs={12} >
            <Box >
              <Flex justify={undefined} items={undefined} direction={undefined} maxWidth={undefined} m={undefined} p={undefined} bg={undefined} mt={undefined} mb={undefined} pt={undefined} pb={undefined} width={undefined} gap={undefined} height={undefined} z={undefined} left={undefined} >
                <Box width={{ xs: '150px', sm: '230px', md: '100%', lg: '100%' }}>
                  <img src="/Images/modal-main.svg" width={'100%'} />
                </Box>
                <Box display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }} mt={'1.5rem'}>
                  <Heading size={isMobile ? "40px" : "50px"} weight={undefined} maxWidth={undefined} color={undefined} align={isMobile ? 'start' : 'start'} m={undefined} lineHeight={undefined} fontFamily={undefined} >Refer More <br /> Members</Heading>
                </Box>
              </Flex>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box maxWidth={isTab ? '100%' : '370px'} mt={{ xs: '1rem', sm: '0rem', md: '2rem', lg: '2rem' }} display={'flex'} justifyContent={'center'} alignItems={{ md: 'start', sm: 'center', xs: 'center' }} gap={{ sm: '1rem', xs: '1rem' }} flexDirection={'column'} width={'100%'}>
              <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                <Heading size="60px" weight={undefined} maxWidth={undefined} color={undefined} align={undefined} m={undefined} lineHeight={undefined} fontFamily={undefined} >Refer More <br /> Members</Heading>
              </Box>
              <Box width={{ xs: '90%', sm: '85%', md: '85%', lg: '97%' }}>

                <Typography color={"white"} mb={"1rem"} fontSize={isTab ? '13px' : '20px'} >Remaining: {codes.length}/{totalCodes.length}</Typography>

                {
                  codes.length > 0 && codes.map((v: { code: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, i: React.Key | null | undefined) => {
                    return <Button key={i} bordercolor={COLORS.white}
                      bg={COLORS.transperant}
                      color={COLORS.white}

                      onClick={() => { copy(v.code); handleOpen; }} hoverbg={undefined} hovercolor={undefined} fullWidth={true} ref={undefined}>
                      <Typography fontSize={isTab ? '13px' : '20px'} >{v.code}</Typography>

                      {copied ? <FileDownloadDoneIcon /> : <CopyAllIcon />}

                    </Button>

                  })

                }

                {
                  (codes.length == 0 || adminOverride) &&
                  <Button bordercolor={COLORS.white}
                    bg={COLORS.transperant}
                    color={COLORS.white}

                    onClick={() => generateCodes()} hoverbg={undefined} hovercolor={undefined} fullWidth={true} ref={undefined}>
                    Generate Invite Codes
                  </Button>
                }

              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                border: '1px solid white',
                padding: '20px 25px',
                borderRadius: '25px',
                width: { xs: '90%', sm: '85%', md: '85%', lg: '97%' },
                marginBottom: '1rem',
                // flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' }
              }}>
                <Flex justify={undefined} items={undefined} direction={undefined} maxWidth={undefined} m={undefined} p={undefined} bg={undefined} mt={undefined} mb={undefined} pt={undefined} pb={undefined} width={undefined} gap={undefined} height={undefined} z={undefined} left={undefined}>
                  <Text size="35px" weight={undefined} maxWidth={undefined} color={undefined} align={undefined} m={undefined} fontFamily={undefined}>{referrals.length}</Text>
                  <Box mr={isTab ? '0rem' : '1rem'}>
                    <Text maxWidth={isMobile ? '100%' : '100px'} size="18px" fontFamily="SEN bold" weight={undefined} color={undefined} align={isTab ? 'center' : 'start'} m={undefined}>Total
                      Referrals </Text>
                  </Box>
                </Flex>

                <Button
                  bordercolor={COLORS.white}
                  bg={COLORS.transperant}
                  color={COLORS.white}
                  onClick={handleOpen} hoverbg={undefined} hovercolor={undefined} fullWidth={undefined} ref={undefined}                >
                  Refer More
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <TableContainer component={Paper} sx={{ maxHeight: '250px' }}>
          <Table sx={{ minWidth: isMobile ? 200 : 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right" sx={{ paddingRight: isMobile ? '5rem' : '8rem' }}>ID</TableCell>
                <TableCell align="right">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ overflowY: 'scroll' }}>
              {referrals.map((row: { _id: string; fullName: string; email: string; }) => (
                <TableRow
                  key={row._id.toString()} // Convert _id to string before passing it as the key
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Text size={isMobile ? '14px' : '20px'} color={COLORS.black} fontFamily="bold" weight={undefined} maxWidth={undefined} align={undefined} m={undefined}>{row.fullName}</Text>
                  </TableCell>
                  <TableCell align="right" >
                    <Text size={isMobile ? '14px' : '20px'} color={COLORS.black} fontFamily="bold" align={'end'} weight={undefined} maxWidth={undefined} m={undefined}>{shortener(row._id)}</Text>
                  </TableCell>
                  <TableCell align="right" >
                    <Text size={isMobile ? '14px' : '20px'} color={COLORS.black} fontFamily="bold" align={'end'} weight={undefined} maxWidth={undefined} m={undefined}>{row.email ? row.email : 'Not provided'}</Text>
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>

      </Box>
      <div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>

            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '2rem'
            }}>
              <Text color={COLORS.black} size={undefined} weight={undefined} maxWidth={undefined} align={undefined} m={undefined} fontFamily={undefined}>Share your Referral code</Text>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem'
              }}>
                <TwitterShareButton
                  url={FullURL}
                  title={'Use my referral code: '}
                  className="Demo__some-network__share-button"
                >
                  <XIcon size={42} round />
                </TwitterShareButton>
                <TelegramShareButton
                  url={TitleLink + URL}
                  title={'Use my referral code: '}
                  className="Demo__some-network__share-button"
                >
                  <TelegramIcon size={42} round />
                </TelegramShareButton>
                <WhatsappShareButton
                  url={FullURL}
                  title={''}
                  separator=""
                  className="Demo__some-network__share-button"
                >
                  <WhatsappIcon size={42} round />
                </WhatsappShareButton>
                <WeiboShareButton
                  url={URL}
                  title={TitleLink}
                  className="Demo__some-network__share-button"
                >
                  <WeiboIcon size={42} round />
                </WeiboShareButton>
              </Box>
            </Box>

          </Box>
        </Modal>
      </div>
    </div >
  )

}

export default ReferralModal;






