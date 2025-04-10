import { IssueStatusBadge } from "@/app/components";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import NextLink from "next/link";
import React from "react";

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
  page: string;
}

const IssueTable = async (props: Props) => {
  const searchParams = await props.searchParams;
  const rawStatus = searchParams.status as Status | undefined;
  const rawOrderBy = searchParams.orderBy as keyof Issue | undefined;

  const statuses = Object.values(Status);
  const isValidStatus = statuses.includes(rawStatus as Status);
  const statusFilter = isValidStatus ? { status: rawStatus } : {};

  const validOrderByKeys = columns.map((column) => column.value);
  const isValidOrderBy = validOrderByKeys.includes(rawOrderBy as keyof Issue);
  const orderBy = isValidOrderBy
    ? { [rawOrderBy as keyof Issue]: "asc" }
    : undefined;

  const rawPage = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const page = Math.max(parseInt(rawPage || "1"), 1);
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: statusFilter,
    ...(orderBy && { orderBy }),
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  pathname: "/issues/list",
                  query: {
                    status: rawStatus, // Pass the raw status for the query
                    orderBy: column.value, // Pass the column value for ordering
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === rawOrderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
