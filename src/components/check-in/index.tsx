
'use client'
import Badge from "./Badge";
import {  Flex, Grid, Heading } from "@radix-ui/themes";
import { useWalletgo } from '@roninnetwork/walletgo'
import { Checkin__factory } from 'src/contracts'
import { useWrapToast } from "src/hooks/useWrapToast";
import { addressConfig } from "src/config/address";

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
  // const [collectedData, setCollectedData] = useState<Data>();
  // const [update, setUpdate] = useState(0);

  const days = ["m", "t", "w", "th", "f", "s", "su"];
  const dayNames = ["Mon", "Tues", "Wenes", "Thurs", "Fri", "Satur", "Sun"];


  const { walletProvider, account } = useWalletgo();

  const handleCheckIn = async () => {
    try {
      const signer = walletProvider?.getSigner();

      if (!signer) {
        throw new Error("No signer available");
      }
  
      if (!signer) throw new Error("No signer available");

      const contract = Checkin__factory.connect(addressConfig.checkin, signer);
      const userAddress = await signer.getAddress();

      const transaction = await contract.activateStreak(userAddress);
      await transaction.wait();

      toastSuccess("You have successfully checked in!");
    } catch (error) {
      if (error.code === "CALL_EXCEPTION") {
        console.error("Transaction failed with CALL_EXCEPTION:", error);
    } else {
        console.error("Transaction failed with unknown error:", error);
    }
      toastError("Check-in failed. Please try again.");
    }
  };

  const displayStreakData = async () => {
    try {
        const signer = walletProvider?.getSigner();
        if (!signer) {
            throw new Error("No signer available");
        }

        const contract = Checkin__factory.connect(addressConfig.checkin, signer);
        const userAddress = await signer.getAddress();
        
        // Fetch the streak data
        const streakData = await contract.getStreak(userAddress);
        console.log("Streak Data:", streakData);

        // Fetch the activation status
        const activationStatus = await contract.getActivationStatus(userAddress);
        console.log("Activation Status:", activationStatus);


        // Render streak data and make-up status in your UI
        // renderStreakUI(streakData, makeUpStatus);
    } catch (error) {
        console.error("Failed to fetch streak data:", error);
        // Handle error
    }
};

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

// Function to render streak data and make-up status in UI
const renderStreakUI = (streakData, makeUpStatus) => {
  console.log(streakData,makeUpStatus, "data") 
    // Render streak data and make-up status in your UI
};
displayStreakData();

  return (
    <div className="flex flex-col">
      <Grid gap="9" mb="4">
        <Heading size="8">Daily Check-in</Heading>
        <Heading color="gray">
          Earn Rewards: Check-in Daily for Exclusive Bonuses!
        </Heading>
      </Grid>

      <Flex direction="row" gridColumn="7" gap="2" className="border border-gray-300 border-radius rounded-l" justify="between">
        {days.map((day, i) => (
          <Badge
            key={i}
            day={dayNames[i] + "day"}
            index={i}
            width="full"
            onCheckIn={handleCheckIn}
          />
        ))}
      </Flex>

      </div>
  );
};

