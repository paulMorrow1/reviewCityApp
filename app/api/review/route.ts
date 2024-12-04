import { prisma } from "@/lib/prisma";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  const reviewsByDecendingOrder = await prisma.review.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    skip: 0,
    take: 3,
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return NextResponse.json(
    { results: reviewsByDecendingOrder },
    { status: 200 }
  );
}
