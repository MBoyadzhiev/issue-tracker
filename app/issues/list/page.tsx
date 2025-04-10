import Pagination from "@/app/components/Pagination";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
  page: string;
}

const IssuesPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const rawStatus = searchParams.status as Status | undefined;
  const rawOrderBy = searchParams.orderBy as keyof Issue | undefined;

  // Validate status filter
  const statuses = Object.values(Status);
  const isValidStatus = statuses.includes(rawStatus as Status);
  const statusFilter = isValidStatus ? { status: rawStatus } : {};

  // Validate orderBy filter
  const validOrderByKeys = columnNames;
  const isValidOrderBy = validOrderByKeys.includes(rawOrderBy as keyof Issue);
  const orderBy = isValidOrderBy
    ? { [rawOrderBy as keyof Issue]: "asc" }
    : undefined;

  const rawPage = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const page = Math.max(parseInt(rawPage || "1"), 1);
  const pageSize = 10;

  // Fetch issues from the database
  const issues = await prisma.issue.findMany({
    where: statusFilter,
    ...(orderBy && { orderBy }),
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: statusFilter });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} page={page.toString()} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

// Force dynamic rendering for the page
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
