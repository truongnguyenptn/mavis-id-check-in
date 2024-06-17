
'use client'
import Badge from "./Badge";
import {  Flex, Grid, Heading } from "@radix-ui/themes";
import { useWalletgo } from '@roninnetwork/walletgo'
import { Checkin__factory } from 'src/contracts'
import { useWrapToast } from "src/hooks/useWrapToast";
import { addressConfig } from "src/config/address";
import { useEffect, useState } from "react";

type Data = {
  collected: {
    m: number;
    t: number;
    w: number;
    th: number;
    f: number;
    s: number;
    su: number;
  };
};

export const Checkin =  () => {
  const { toastSuccess, toastError } = useWrapToast(); // Added toastError for error handling
  const [streakData, setStreakData] = useState<any>(null);
  const [activationStatus, setActivationStatus] = useState<any>(null);

  const days = ["1", "2", "3", "4", "5", "6", "7"];
  const dayNames = ["Mon", "Tues", "Wenes", "Thurs", "Fri", "Satur", "Sun"];
  const currentDayIndex = new Date().getDay() - 1; 

  const { walletProvider, account } = useWalletgo();

  const handleCheckIn = async () => {
    try {
      const signer = walletProvider?.getSigner();
      if (!signer) throw new Error('No signer available');
      
      const contract = Checkin__factory.connect(addressConfig.checkin, signer);
      const userAddress = await signer.getAddress();
      
      const transaction = await contract.activateStreak(userAddress);
      await transaction.wait();
      
      toastSuccess('You have successfully checked in!');
      fetchStreakData(); // Refresh streak data after successful check-in
    } catch (error) {
      if (error.code === 'CALL_EXCEPTION') {
        console.error('Transaction failed with CALL_EXCEPTION:', error);
      } else {
        console.error('Transaction failed with unknown error:', error);
      }
      toastError('Check-in failed. Please try again.');
    }
  };

  const fetchStreakData = async () => {
    try {
      const signer = walletProvider?.getSigner();
      if (!signer) throw new Error('No signer available');
      
      const contract = Checkin__factory.connect(addressConfig.checkin, signer);
      const userAddress = await signer.getAddress();
      
      // Fetch the streak data
      const [currentStreakCount, lastActivated, longestStreakCount, lostStreakCount] = await contract.getStreak(userAddress);
      
      // Fetch the activation status
      const [isLostStreak, hasCheckedToday] = await contract.getActivationStatus(userAddress);
      
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
      
    } catch (error) {
      console.error('Failed to fetch streak data:', error);
      toastError('Failed to fetch streak data. Please try again.');
    }
  };

  useEffect(() => {
    fetchStreakData();
  }, [walletProvider, account]);


// Function to calculate missed days
const calculateMissedDays = (lastActivatedTimestamp) => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const streakLifeTime = 200;
    const missedDays = Math.floor((currentTime - lastActivatedTimestamp) / streakLifeTime) - 1;
    return Math.max(missedDays, 0); // Ensure non-negative value
};

// Function to calculate make-up status
const calculateMakeUpStatus = (streakData, missedDays) => {
    const canMakeUp =  1;
    const makeUpStatus: string[] = [];
    for (let i = 0; i < missedDays; i++) {
        makeUpStatus.push(canMakeUp ? "Make-up possible" : "Missed");
    }
    return makeUpStatus;
};

  return (
    <div className="flex flex-col">
      <Grid gap="9" mb="4">
        <Heading size="8">Daily Check-in</Heading>
        <Heading color="gray">
          Earn Rewards: Check-in Daily for Exclusive Bonuses!
        </Heading>
      </Grid>

      <Flex direction="row" gridColumn="7" gap="2" className="border border-gray-300 border-radius rounded-l py-8 px-4" justify="between">
        {days.map((day, i) => (
          <Badge
            key={i}
            day={dayNames[i] + "day"}
            index={i}
            width="full"
            checkedIn={true}
            makeUpPossible={true}
            hasCheckedToday={activationStatus?.hasCheckedToday}
            onCheckIn={handleCheckIn}
          />
        ))}
      </Flex>

      {streakData && activationStatus && (
        <div>
          <h2>Streak Data</h2>
          <p>Current Streak Count: {streakData.currentStreakCount}</p>
          <p>Last Activated: {streakData.lastActivated}</p>
          <p>Longest Streak Count: {streakData.longestStreakCount}</p>
          <p>Lost Streak Count: {streakData.lostStreakCount}</p>
          <h2>Activation Status</h2>
          <p>Has Checked Today: {activationStatus.hasCheckedToday.toString()}</p>
          <p>Is Lost Streak: {activationStatus.isLostStreak.toString()}</p>
        </div>
      )}

      </div>
  );
};

