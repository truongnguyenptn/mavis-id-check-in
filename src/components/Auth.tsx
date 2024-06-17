"use client";

import { Button } from "src/@/components/ui/button";
import { useWrapToast } from "src/hooks/useWrapToast";
import { useState } from "react";
import { MavisIdManager } from "src/connectors/MavisIdManager";

export const Auth = () => {
  const { toastSuccess } = useWrapToast();
  const [address, setAddress] = useState<string | undefined>();

  const handleAuth = async () => {
    const mavisIdManager = MavisIdManager.getInstance();
    await mavisIdManager.connect();
    const address = await mavisIdManager.getAddress();

    if (address) {
      toastSuccess("Auth successfully!");
      setAddress(address);
    }
  };

  return (
    <Button onClick={handleAuth}>
      {address ? address : "Connect"}
    </Button>
  );
};
