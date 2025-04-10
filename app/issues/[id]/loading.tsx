import { Skeleton } from "@/app/components";
import { Box, Card, Flex } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  return (
    <Box>
      <Skeleton className="max-w-xl" />
      <Flex className="gap-5" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="5rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
