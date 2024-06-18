import { DropdownMenu } from "@radix-ui/themes";
import { Button } from "src/@/components/ui/button";
import { Copy, LogOut } from 'lucide-react';
import { useMavisIDAuth } from "src/hooks/useMavisIDAuth";
import { trimAddress } from "src/utils";

export const MavisIDMenu = () => {
  const { address, handleAuth, handleDisconnect, handleCopyAddress } = useMavisIDAuth();

  return (
    <>
      {address ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button>{trimAddress(address)}</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Item onClick={handleCopyAddress}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Address
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={handleDisconnect}>
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <Button onClick={handleAuth}>
          Connect with MavisID
        </Button>
      )}
    </>
  );
};
