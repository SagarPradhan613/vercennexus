import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  OKShareCount,
  PinterestIcon,
  PinterestShareButton,
  PinterestShareCount,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TumblrShareCount,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  VKShareCount,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
  XIcon,
} from "react-share";


import Modal from '@mui/material/Modal';
import Heading from "../components/Heading";
import Text from "../components/Text";
import IconButton from "../components/IconButton";
import { COLORS } from "../utils/colors";
import useIsMobile from "../hooks/useIsMobile";
import Button from "../components/Button";

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



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#0081ff',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    size: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ReferralModal = (props: { setIsmodal: any, referrals: any, id: string }) => { 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const referrals = props.referrals;
  const _id = props.id
  console.log(referrals, 'ref');

  const URL = "/?refId=" + _id
  const TitleLink = window.location.protocol + '//' + window.location.host
  const FullURL = window.location.protocol + '//' + window.location.host + "?refId=" + _id


  const isMobile = useIsMobile()
  const [copied, setCopied] = useState(false)
  const copy = (text: any) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => { setCopied(false) }, 10000)
  }
  const shortener = (id: string) => {
    return id.slice(0, 5) + '...' + id.slice(-5);
  }

  return (
    <div>
      <Box sx={{ backgroundColor: COLORS.blue }} borderRadius={'15px'}>
        <Grid container>
          <Grid item lg={6} sm={6} xs={12}>
            <Box display={'flex'}>
              <img src="/Images/modal-main.svg" width={isMobile ? '150px' : '90%'} />
              <Box display={{ sm: 'none', xs: 'block' }} mt={'1.5rem'}>
                <Heading size="60px" >Refer More <br /> Members</Heading> 
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <Box maxWidth={'370px'} mt={isMobile ? '1rem' : '4rem'} display={'flex'} justifyContent={'center'} alignItems={{ sm: 'start', xs: 'center' }} gap={{ sm: '1rem', xs: '1rem' }} flexDirection={'column'} width={'100%'}>
              <Box display={{ sm: 'block', xs: 'none' }}>
                <Heading size="60px" >Refer More <br /> Members</Heading>
              </Box>
              <Button bordercolor={COLORS.white}
                bg={COLORS.transperant}
                color={COLORS.white}
                 onClick={() => {copy(window.location.protocol + '//' + window.location.host + "?refId=" + _id);handleOpen}}>
                {_id}

                {copied ? <FileDownloadDoneIcon sx={{ color: COLORS.White }} /> : <CopyAllIcon sx={{ color: COLORS.White }} />}

              </Button>
              <Box sx={{
                display: 'flex',
                justifyContent: { sm: 'start', xs: 'center' },
                alignItems: 'center',

                gap: '1rem',
                border: '1px solid white',
                padding: '20px 25px',
                borderRadius: '25px',
                width: { sm: '100%', xs: '80%' },
                marginBottom: '1rem'
              }}>
                <Text size="35px">{referrals.length}</Text>
                <Box mr={isMobile ? '0rem' : '3rem'}>
                  <Text maxWidth={isMobile ? '100%' : '100px'} size="18px" fontFamily="SEN bold">Total
                    Referrals </Text>
                </Box>

                <Button
                  bordercolor={COLORS.white}
                  bg={COLORS.transperant}
                  color={COLORS.white}
                  onClick={handleOpen}
                >
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
                    <Text size={isMobile ? '14px' : '20px'} color={COLORS.black} fontFamily="bold">{row.fullName}</Text>
                  </TableCell>
                  <TableCell align="right" >
                    <Text size={isMobile ? '14px' : '20px'} color={COLORS.black} fontFamily="bold" align={'end'}>{shortener(row._id)}</Text>
                  </TableCell>
                  <TableCell align="right" >
                    <Text size={isMobile ? '14px' : '20px'} color={COLORS.black} fontFamily="bold" align={'end'}>{row.email ? row.email : 'Not provided'}</Text>
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
              <Text color={COLORS.black}>Share your Refferal code</Text>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem'
              }}>
                <TwitterShareButton
                  url={FullURL}
                  title={'Use my refferal code: '}
                  className="Demo__some-network__share-button"
                >
                  <XIcon size={42} round />
                </TwitterShareButton>
                <TelegramShareButton
                  url={TitleLink + URL}
                  title={'Use my refferal code: '}
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






