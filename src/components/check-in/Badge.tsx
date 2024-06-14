import { Box, Text, Card, Flex, Button } from "@radix-ui/themes";
import Image from "next/image";

type BadgeProps = {
  day: string;
  index: number;
  width: string;
  onCheckIn: () => void;
};

const Badge = ({ day, index, width, onCheckIn }: BadgeProps) => {
  return (
    <Box
    shadow="md"
    border="1px"
    className="flex items-stretch"
    p={4}
    _hover={{ shadow: "lg" }}
    width={width}
  >
    <Card  className="h-full w-full p-8" >
      <Flex gap="2" direction="column" align="center">
        <div className="w-32 h-32">
      <Image src={`/badges/${index}.png`} alt="badge" width={400} objectFit="cover" height={400} />
          </div>
      <Text align="center" my={4}>
        {day}
      </Text>
      <Text align="center" color={"gray.400"}>
        Checked
      </Text>
      <Button onClick={onCheckIn}>
      Check in
    </Button>
      </Flex>
    </Card>
  </Box>
  );
};

export default Badge;
