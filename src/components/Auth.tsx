"use client";

import { Button } from "src/@/components/ui/button";
import { useWrapToast } from "src/hooks/useWrapToast";
import { useState, useEffect } from "react";
import { MavisIdManager } from "src/connectors/MavisIdManager";

export const Auth = () => {
  const { toastSuccess } = useWrapToast();
  const mavisIdManager = MavisIdManager.getInstance();
  const [address, setAddress] = useState<string | undefined>();

  useEffect(() => {
    const fetchAddress = async () => {
      const addr = await mavisIdManager.getAddress();
      setAddress(addr);
    };
    fetchAddress();
  }, [mavisIdManager]);

  const handleAuth = async () => {
    await mavisIdManager.connect();
    const addr = await mavisIdManager.getAddress();

    if (addr) {
      toastSuccess("Auth successfully!");
      setAddress(addr);
    }
  };

  return (
    <Button onClick={handleAuth}>
      {address ? address : "Connect"}
    </Button>
  );
};
