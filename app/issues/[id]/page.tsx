// import { prisma } from "@/prisma/client";
// import { Box, Flex, Grid } from "@radix-ui/themes";
// import { notFound } from "next/navigation";
// import EditIssueButton from "./EditIssueButton";
// import IssueDetails from "./IssueDetails";
// import DeleteIssueButton from "./DeleteIssueButton";
// import AssigneeSelect from "./AssigneeSelect";
// import { cache } from "react";

// interface Props {
//   params: {
//     id: string;
//   };
// }

// const fetchUser = cache((issueId: number) =>
//   prisma.issue.findUnique({ where: { id: issueId } })
// );

// const IssueDetailPage = async ({ params }: Props) => {
//   const issue = await fetchUser(parseInt(params.id));

//   if (!issue) notFound();

//   return (
//     <Grid columns={{ initial: "1", sm: "5" }} className="gap-5">
//       <Box className="md:col-span-4">
//         <IssueDetails issue={issue} />
//       </Box>
//       <Box>
//         <Flex direction="column" gap="4">
//           <AssigneeSelect issue={issue} />
//           <EditIssueButton issueId={issue.id} />
//           <DeleteIssueButton issueId={issue.id} />
//         </Flex>
//       </Box>
//     </Grid>
//   );
// };

// export async function generateMetadata({ params }: Props) {
//   const issue = await fetchUser(parseInt(params.id));

//   return {
//     title: issue?.title,
//     description: "Details of issue " + issue?.id,
//   };
// }

// export default IssueDetailPage;

import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

interface Props {
  params: {
    id: string;
  };
}

// Memoized fetch function using React cache
const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

// ✅ Async page component (required for accessing params in Next.js 15)
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} className="gap-5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

// ✅ generateMetadata now also needs to be async, and uses async `params`
export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title ?? "Issue not found",
    description: issue
      ? `Details of issue ${issue.id}`
      : "No issue data available",
  };
}

export default IssueDetailPage;
