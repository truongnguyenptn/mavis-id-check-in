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
  const [signer, setSigner] = useState<string | undefined>(); 

  const handleAuth = async () => {
    await MavisIdAuth.create({
      clientId: "c9848a4d-8a6e-4e2e-908e-8876ba543dd8",
    }).connect();

    toastSuccess("Auth successfully!");

    if (walletProvider) {
      const address = await walletProvider.getSigner().getAddress();
      console.log("🚀 | Address:", address);
      setSigner(address);
    }
  };



  return (
    <Button onClick={handleAuth}>
      {signer ? "Connected" : "Connect"}
    </Button>
  );
};