'use client'
import { useEffect, useState } from "react";
import { Button, Flex, Grid, Heading } from "@radix-ui/themes";
import { Checkin__factory } from 'src/contracts';
import { useWrapToast } from "src/hooks/useWrapToast";
import { addressConfig } from "src/config/address";
import { calculateClaimedDays, getDayIndex } from "src/utils";
import { parseEther } from "ethers/lib/utils";
import Badge from "./Badge";
import { useWalletgo } from "@roninnetwork/walletgo";

export type StreakData = {
  currentStreakCount: string;
  lastActivated: string;
  longestStreakCount: string;
  lostStreakCount: string;
};

export type ActivationStatus = {
  hasCheckedToday: boolean;
  isLostStreak: boolean;
};

export const Checkin = () => {
  const { toastSuccess, toastError } = useWrapToast();
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [activationStatus, setActivationStatus] = useState<ActivationStatus | null>(null);
  const { walletProvider } = useWalletgo();
  const [address, setAddress] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);

  const days = ["Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "Sun"];
  const currentDayIndex = getDayIndex(new Date());

  useEffect(() => {
    const fetchAddressAndContract = async () => {
      if (walletProvider) {
        try {
          const signer = walletProvider.getSigner();
          const signerAddress = await signer.getAddress();
          setAddress(signerAddress);
          const contractInstance = Checkin__factory.connect(addressConfig.checkin, signer);
          setContract(contractInstance);
        } catch (error) {
          console.error("Failed to get address or contract:", error);
        }
      }
    };
    fetchAddressAndContract();
  }, [walletProvider]);

  const handleCheckIn = async () => {
    try {
      if (address && contract) {
        const transaction = await contract.activateStreak(address);
        await transaction.wait();
        toastSuccess('You have successfully checked in!');
        fetchStreakData(); // Refresh streak data after successful check-in
      }
    } catch (error: any) {
      console.error('Transaction failed:', error);
      toastError('Check-in failed. Please try again.');
    }
  };

  const fetchStreakData = async () => {
    try {
      if (address && contract) {
        const [currentStreakCount, lastActivated, longestStreakCount, lostStreakCount] = await contract.getStreak(address);
        const [isLostStreak, hasCheckedToday] = await contract.getActivationStatus(address);

        setStreakData({
          currentStreakCount: currentStreakCount.toString(),
          lastActivated: new Date(lastActivated.toNumber() * 1000).toLocaleString(),
          longestStreakCount: longestStreakCount.toString(),
          lostStreakCount: lostStreakCount.toString(),
        });
        setActivationStatus({
          hasCheckedToday,
          isLostStreak,
        });
      }
    } catch (error) {
      console.error('Failed to fetch streak data:', error);
      toastError('Failed to fetch streak data. Please try again.');
    }
  };

  const restoreStreak = async () => {
    try {
      if (address && contract) {
        const transaction = await contract.restoreStreak(address, parseEther("2"), { gasLimit: 50000 });
        await transaction.wait();
        toastSuccess('You have successfully restored your streak!');
        fetchStreakData(); // Refresh streak data after successful restore
      }
    } catch (error: any) {
      console.error('Transaction failed:', error);
      toastError('Restore streak failed. Please try again.');
    }
  };

  useEffect(() => {
    if (address && contract) {
      fetchStreakData();
    } else {
      setStreakData(null);
      setActivationStatus(null);
    }
  }, [address, contract]);

  const claimedDays = streakData
    ? calculateClaimedDays(currentDayIndex, parseInt(streakData.currentStreakCount), activationStatus)
    : [];

  return (
    <div className="flex flex-col">
      <Grid gap="9" mb="4">
        <Heading size="8">Daily Check-in</Heading>
        <Heading size="6" color="gray">
          Earn Rewards: Check-in Daily for Exclusive Bonuses!
        </Heading>
        {address && streakData && (
          <div className="flex justify-between">
            <Heading size="5">Checked-in Days This Week: {streakData.currentStreakCount ?? 0}</Heading>
            <Button size="1" className="p-5" onClick={restoreStreak}>Restore check-in streak</Button>
          </div>
        )}
      </Grid>

      <Flex direction="row" gridColumn="7" gap="2" className="border border-gray-300 border-radius rounded-l py-8 px-4" justify="between">
        {days.map((day, i) => (
          <Badge
            key={`${days[i]}-day`}
            day={`${days[i]}day`}
            index={i}
            claimed={claimedDays[i]}
            makeUpPossible={true}
            hasCheckedToday={activationStatus?.hasCheckedToday}
            onCheckIn={handleCheckIn}
            currentDayIndex={currentDayIndex}
          />
        ))}
      </Flex>
    </div>
  );
};
