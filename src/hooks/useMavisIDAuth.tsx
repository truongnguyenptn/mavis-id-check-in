import { useState, useEffect } from "react";
import { MavisIdManager } from "src/connectors/MavisIdManager";
import { useWrapToast } from "src/hooks/useWrapToast";

export const useMavisIDAuth = () => {
  const { toastSuccess, toastError } = useWrapToast();
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

  const handleDisconnect = async () => {
    await mavisIdManager.disconnect();
    setAddress(undefined);
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

  return { address, handleAuth, handleDisconnect, handleCopyAddress };
};
