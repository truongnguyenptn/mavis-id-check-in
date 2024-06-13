
'use client'
import Badge from "./Badge";
import {CheckInButton} from "./CheckInButton";
import { Container, Flex, Grid, Heading } from "@radix-ui/themes";
import { checkin } from "../user-action/DailyCheckin";
import { useWalletgo } from '@roninnetwork/walletgo'
import { Contract, providers } from 'ethers'
import { CheckinContractConfig } from 'src/contracts'

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
  // const [collectedData, setCollectedData] = useState<Data>();
  // const [update, setUpdate] = useState(0);

  const days = ["m", "t", "w", "th", "f", "s", "su"];
  const dayNames = ["Mon", "Tues", "Wenes", "Thurs", "Fri", "Satur", "Sun"];

  // useEffect(() => {
  //   fetch("/api/getCollectedBadges")
  //     .then((r) => r.json())
  //     .then((res) => {
  //       setCollectedData(res as Data);
  //       console.log(res);
  //     })
  //     .catch(() => {
  //       console.error("There was an error getting the badges");
  //     });
  // }, [update]);

  const { walletProvider, account } = useWalletgo();

  const handleCheckIn = async () => {

   const signer = walletProvider?.getSigner()
    
   const { abi, address } = CheckinContractConfig 
   const contract = new Contract(address, abi, signer) 
   const hash = await contract.activateStreak(account)
   console.log(hash)
  };

  return (
    <Container  p={4}>
      <Grid gap={4} mb={4}>
        <Heading>Welcome user!</Heading>
        <Flex>
          {/* <ColormodeToggle /> */}
        </Flex>
      </Grid>

      <Heading my={8} size="md">
        Check in to get rewards
      </Heading>

      <Grid columns="7" gap={4}  >
      {days.map((day, i) => (
    <Badge
      key={i}
      day={dayNames[i] + "day"}
      index={i}
      width="full"
    />
  ))}
      </Grid>

      <CheckInButton onCheckIn={handleCheckIn} />
    </Container>
  );
};

