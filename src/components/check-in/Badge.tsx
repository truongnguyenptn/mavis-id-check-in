import { Box, Text, Card, Flex, Button } from "@radix-ui/themes";
import Image from "next/image";
import { cn } from '../../@/lib/utils';
import ClaimedIcon from 'public/icons/check.svg'

type BadgeProps = {
  day: string;
  index: number;
  onCheckIn: () => void;
  makeUpPossible: boolean;
  claimed: boolean;
  hasCheckedToday: boolean;
  currentDayIndex: number;
};



const Badge = ({ day, index, onCheckIn, claimed, makeUpPossible, hasCheckedToday, currentDayIndex }: BadgeProps) => {
  return (
    <Box
      className={cn("flex items-stretch min-w-0 min-h-0", claimed && "opacity-100 bg-slate-700 bg-opacity-50 backdrop-filter backdrop-blur-md")}
      p="4"
    >
      <Card className="h-full w-full p-8">
      {claimed && (
        <div  className="absolute inset-0 flex flex-col items-center justify-center">
          <Text className="text-white text-lg font-bold">
            Claimed
          </Text>
            <ClaimedIcon
            color="green"
            width={32} 
            height={32} 
            />
          </div>
        )}
        <Flex gap="2" direction="column" align="center" 
        className={cn("text-center",claimed && "transition-all duration-200 ease-in-out opacity-20")}
        >
          <div className="w-32 h-32">
            <Image src={`/badges/${index}.png`} alt="badge" width={400} className="object-cover" height={400} />
          </div>
          <Text my="4" >
            {day}
          </Text>
          <Text color="gray">
            {!claimed && makeUpPossible && index < currentDayIndex && 'Make-up Possible' }
          </Text>
          {!hasCheckedToday && index === currentDayIndex && (
            <Button onClick={onCheckIn}>
              Check in
            </Button>
          )}
        </Flex>
      </Card>
    </Box>
  );
};

export default Badge;
