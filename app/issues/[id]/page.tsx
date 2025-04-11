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

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = params; // params is already resolved, no need to wrap it in a promise
  const issue = await fetchUser(parseInt(id)); // Use the id directly here

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

export async function generateMetadata({ params }: Props) {
  const { id } = params; // Extract id from params (params is not a promise here)
  const issue = await fetchUser(parseInt(id)); // Use the id to fetch the issue

  return {
    title: issue?.title ?? "Issue not found", // Handle case when issue is not found
    description: `Details of issue ${issue?.id}`,
  };
}

export default IssueDetailPage;
