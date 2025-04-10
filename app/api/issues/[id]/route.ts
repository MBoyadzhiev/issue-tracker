// import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
// import { prisma } from "@/prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// // PATCH route
// export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
//     const body = await request.json();
//     const validation = patchIssueSchema.safeParse(body);
//     if (!validation.success)
//         return NextResponse.json(validation.error.format(), { status: 400 });

//     const { assignedToUserId, title, description } = body;

//     if (assignedToUserId) {
//         const user = await prisma.user.findUnique({
//             where: { id: assignedToUserId }
//         });

//         if (!user) 
//             return NextResponse.json({ error: "Invalid User" }, { status: 400 });
//     }

//     const issue = await prisma.issue.findUnique({
//         where: { id: parseInt(params.id) }
//     });
//     if (!issue)
//         return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

//     const updatedIssue = await prisma.issue.update({
//         where: { id: issue.id },
//         data: {
//             title,
//             description,
//             assignedToUserId,
//         }
//     });

//     return NextResponse.json(updatedIssue);
// }

// // DELETE route
// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//     const issue = await prisma.issue.findUnique({
//         where: { id: parseInt(params.id) }
//     });

//     if (!issue) return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

//     await prisma.issue.delete({
//         where: { id: issue.id }
//     });

//     return NextResponse.json({ message: "Issue deleted successfully" });
// }

import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// PATCH route
export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const { assignedToUserId, title, description } = body;

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedToUserId }
        });

        if (!user) 
            return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(context.params.id) }
    });
    if (!issue)
        return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            description,
            assignedToUserId,
        }
    });

    return NextResponse.json(updatedIssue);
}

// DELETE route
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(context.params.id) }
    });

    if (!issue) return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

    await prisma.issue.delete({
        where: { id: issue.id }
    });

    return NextResponse.json({ message: "Issue deleted successfully" });
}
