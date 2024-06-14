"use client";

import { MavisIdAuth } from "@sky-mavis/mavis-id-sdk";
import { Button } from "src/@/components/ui/button";
import { useWrapToast } from "src/hooks/useWrapToast";
import { useWalletgo } from '@roninnetwork/walletgo';
import { useState } from "react";
import { JsonRpcSigner } from "@ethersproject/providers";

export const Auth = () => {
  const { toastSuccess } = useWrapToast();
  const { walletProvider } = useWalletgo(); 
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(); 

  const handleAuth = async () => {
    await MavisIdAuth.create({
      clientId: "0e188f93-b419-4b0f-8df4-0f976da91ee6",
    }).connect();

    toastSuccess("Auth successfully!");
    setSigner(walletProvider?.getSigner()); 
  };

  const connected = signer !== null;

  return (
    <Button onClick={handleAuth}>
      {connected ? "Connected" : "Connect"}
    </Button>
  );
};