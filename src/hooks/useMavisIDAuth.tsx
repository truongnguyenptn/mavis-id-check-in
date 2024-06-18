import { useState, useEffect } from "react";
import { MavisIdManager } from "src/connectors/MavisIdManager";
import { useWrapToast } from "src/hooks/useWrapToast";

export const useMavisIDAuth = () => {
  const { toastSuccess, toastError } = useWrapToast();
  const [mavisIDManager, setMavisIDInstance] = useState<MavisIdManager | undefined >(MavisIdManager.getInstance());
  const [address, setAddress] = useState<string | undefined>();

  useEffect(() => {
    const fetchAddress = async () => {
      const addr = await mavisIDManager?.getAddress();
      setAddress(addr);
    };
    fetchAddress();
  }, [mavisIDManager]); // Only run on initial mount or when mavisIDManager changes

  const handleAuth = async () => {
    await mavisIDManager?.connect();
    const addr = await mavisIDManager?.getAddress();
    if (addr) {
      toastSuccess("Auth successfully!");
      setAddress(addr);
    }
  };

  const handleDisconnect = async () => {
    await mavisIDManager?.disconnect();
    setAddress(undefined);
    setMavisIDInstance(undefined);
    toastSuccess("Disconnected successfully!");
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toastSuccess("Address copied to clipboard!");
    } else {
      toastError("No address to copy!");
    }
  };

  return { address, handleAuth, handleDisconnect, handleCopyAddress, mavisIDManager };
};
