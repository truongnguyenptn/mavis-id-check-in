"use client";

import { useState, useEffect } from 'react';
import { Button } from "src/@/components/ui/button";
import { useWalletgoDialog } from "src/hooks/useWalletgoDialog";
import { useWalletgo } from "@roninnetwork/walletgo";

export const Auth = () => {
  const { setOpen } = useWalletgoDialog();
  const { walletProvider } = useWalletgo();
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    const fetchAddress = async () => {
      if (walletProvider) {
        try {
          const signerAddress = await walletProvider.getSigner().getAddress();
          setAddress(signerAddress);
        } catch (error) {
          console.error("Failed to get address:", error);
        }
      }
    };
    fetchAddress();
  }, [walletProvider]);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        {address ? address : "Connect your wallet"}
      </Button>
    </div>
  );
};
