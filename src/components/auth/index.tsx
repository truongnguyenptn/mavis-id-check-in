"use client";

import { Button } from "src/@/components/ui/button";
import { useWalletgoDialog } from "src/hooks/useWalletgoDialog";
import { MavisIDMenu } from "./MavisIDMenu";

export const Auth = () => {
  const { setOpen } = useWalletgoDialog();

  return (
    <>
      <MavisIDMenu/>
      <Button className="" onClick={() => setOpen(true)}>
        Connect your wallet
      </Button>
    </>
  );
};
