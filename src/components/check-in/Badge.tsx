import { Box, Text, Card, Flex, Button } from "@radix-ui/themes";
import Image from "next/image";
import { cn } from '../../@/lib/utils';
import ClaimedIcon from 'public/icons/check.svg'
type BadgeProps = {
  day: string;
  index: number;
  width: string;
  onCheckIn: () => void;
  makeUpPossible: boolean;
  checkedIn: boolean;
  hasCheckedToday: boolean;
};

const getDayIndex = (date: Date): number => {
  // Adjust to start from Monday (0-indexed)
  let dayIndex = (date.getDay() + 6) % 7;
  return dayIndex;
};

const Badge = ({ day, index, width, onCheckIn, checkedIn, makeUpPossible, hasCheckedToday }: BadgeProps) => {
  console.log(checkedIn);
  const checked = checkedIn;
  return (
    <Box
      className={cn("flex items-stretch min-w-0 min-h-0", checkedIn && "opacity-100 bg-slate-700 bg-opacity-50 backdrop-filter backdrop-blur-md")}
      p="4"
      width={width}
    >
      <Card className="h-full w-full p-8">
      {checked && (
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
        <Flex gap="2" direction="column" align="center" className="
          transition-all duration-200 ease-in-out
          opacity-20
        ">
          <div className="w-32 h-32">
            <Image src={`/badges/${index}.png`} alt="badge" width={400} className="object-cover" height={400} />
          </div>
          <Text align="center" my="4">
            {day}
          </Text>
          <Text align="center" color="gray">
            {!checkedIn && makeUpPossible && 'Make-up Possible' }
          </Text>
          {index === getDayIndex(new Date()) + 1 && (
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
