import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "blue" | "red" | "yellow" }
> = {
  OPEN: { label: "Open", color: "blue" },
  CLOSED: { label: "Closed", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "yellow" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
