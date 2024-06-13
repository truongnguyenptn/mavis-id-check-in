import { Box, Text, Card } from "@radix-ui/themes";
import Image from "next/image";

type BadgeProps = {
  day: string;
  index: number;
  width: string;
};

const Badge = ({ day, index, width }: BadgeProps) => {
  return (
    <Box
    shadow="md"
    border="1px"
    className="flex"
    p={4}
    _hover={{ shadow: "lg" }}
    width={width}
  >
    <Card>
      <Image src={`/badges/${index}.png`} alt="badge" width={400} height={400} />
      <Text align="center" my={4}>
        {day}
      </Text>
      <Text align="center" color={"gray.400"}>
        Checked
      </Text>
    </Card>
  </Box>
  );
};

export default Badge;
