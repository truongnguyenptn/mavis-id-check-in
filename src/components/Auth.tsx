"use client";

import { MavisIdAuth } from "@sky-mavis/mavis-id-sdk";
import { Button } from "src/@/components/ui/button";
import { useWrapToast } from "src/hooks/useWrapToast";
import { useWalletgo } from '@roninnetwork/walletgo';
import { useState } from "react";

export const Auth = () => {
  const { toastSuccess } = useWrapToast();
  const { walletProvider } = useWalletgo(); 
  const [signer, setSigner] = useState(); 

  const handleAuth = async () => {
    const auth = await MavisIdAuth.create({
      clientId: "0e188f93-b419-4b0f-8df4-0f976da91ee6",
    }).connect();

    toastSuccess("Auth successfully!");
    setSigner(walletProvider?.getSigner()); 
  };

  // Check if signer is available to determine if connected
  const connected = signer !== null;

  return (
    <Button onClick={handleAuth}>
      {connected ? "Connected" : "Connect"}
    </Button>
  );
};