'use client'
import { Button } from "src/@/components/ui/button"
import { useWrapToast } from "src/hooks/useWrapToast";
import { checkin } from "../user-action/DailyCheckin";
type CheckInButtonProps = {
  onCheckIn: () => void;
};

export const CheckInButton = ({ onCheckIn }: CheckInButtonProps) => {
  // const {toastSuccess} = useWrapToast();

  return (
    <Button onClick={onCheckIn}>
      Check in
    </Button>
  );
};

