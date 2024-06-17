
'use client'
import Badge from "./Badge";
import {  Button, Flex, Grid, Heading } from "@radix-ui/themes";
import { useWalletgo } from '@roninnetwork/walletgo'
import { Checkin__factory } from 'src/contracts'
import { useWrapToast } from "src/hooks/useWrapToast";
import { addressConfig } from "src/config/address";
import { useEffect, useState } from "react";
import { calculateClaimedDays, getDayIndex } from "src/utils";
import { parseEther } from "ethers/lib/utils";


export const Checkin =  () => {
  const { toastSuccess, toastError } = useWrapToast(); 
  const [streakData, setStreakData] = useState<any>(null);
  const [activationStatus, setActivationStatus] = useState<any>(null);
  const { walletProvider, account } = useWalletgo();

  const days = ["Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "Sun"];
  const currentDayIndex =  getDayIndex(new Date());


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
      
      const [currentStreakCount, lastActivated, longestStreakCount, lostStreakCount] = await contract.getStreak(userAddress);
      
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

  const restoreStreak = async () => {
    try {
      const signer = walletProvider?.getSigner();
      if (!signer) throw new Error('No signer available');
      
      const contract = Checkin__factory.connect(addressConfig.checkin, signer);
      const userAddress = await signer.getAddress();
      
      const transaction = await contract.restoreStreak(userAddress, parseEther("2"), { gasLimit: 50000 });
      await transaction.wait();
      
      toastSuccess('You have successfully restore your streak!');
      fetchStreakData(); // Refresh streak data after successful restore
    } catch (error) {
      if (error.code === 'CALL_EXCEPTION') {
        console.error('Transaction failed with CALL_EXCEPTION:', error);
      } else {
        console.error('Transaction failed with unknown error:', error);
      }
      toastError('Restore streak failed. Please try again.');
    }
  }

  useEffect(() => {
    fetchStreakData();
  }, [walletProvider, account]);

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
          <div className="flex justify-between">
        <Heading size="5" className="">Checked-in Days This Week: {streakData?.currentStreakCount  || 0}</Heading>
        <Button size="1" className="p-5" onClick={restoreStreak}>Restore check-in streak</Button>  
        </div>
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

      {/* {streakData && activationStatus && (
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
      )} */}

      </div>
  );
};

