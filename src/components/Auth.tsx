"use client";

import { MavisIdAuth } from "@sky-mavis/mavis-id-sdk";
import { Button } from "src/@/components/ui/button";
import { useWrapToast } from "src/hooks/useWrapToast";

export const Auth = () => {
  const { toastSuccess } = useWrapToast();

  const handleAuth = async () => {
    const auth = await MavisIdAuth.create({
      clientId: "0e188f93-b419-4b0f-8df4-0f976da91ee6",
    }).connect();

    toastSuccess("Auth successfully!");
  };

  return (
      <Button onClick={handleAuth}>
        Connect
      </Button>
  );
};
