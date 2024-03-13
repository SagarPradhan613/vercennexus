"use client";

import Main from "./pages";
import { useEffect, useState } from "react";
// import { Web3AuthNoModal } from "@web3auth/no-modal";
import { Web3Auth } from "@web3auth/modal";

import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";

export default function Home() {
  // const [web3auth,setWeb3auth] = useState()
  const [web3auth, setWeb3auth] = (useState < Web3Auth) | (null > null); 
  // const web3authProvider
  const clientId =
    "BHx-dozO_3pffUEjnEcD_5f3nQRYzD3EiBftD1hbWQn8GphnFo6HYUFObwb4Xm7jXhW9zWfTJnthECMWwiz7yss";
  useEffect(() => {
    // setWeb3auth(1)
    // console.log(web3auth);

    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc-mumbai.maticvigil.com",
          },
        });
        // console.log(web3auth);

        await web3auth.initModal();
        setWeb3auth(web3auth);

        // let connectedStatus = await isConnected();
        // if (connectedStatus) {
        // setProvider(web3auth.provider);
        // getUserInfo();
        // getAccounts();
        // }
        // else{
        // }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const isConnected = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return false;
    }
    return web3auth.status === "connected";
  };

  const login = async () => {
    const _isConnected = await isConnected();
    if (_isConnected) {
      alert("Already loggedin");
      return;
    }
    const web3authProvider = await web3auth?.connect();
    console.log(web3authProvider);
  };

  return <Main />;
}
