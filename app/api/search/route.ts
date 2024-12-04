import {
  createBusinessTypeLabel,
  createPrettyBusinessType,
} from "@/app/utils/business";
import { prisma } from "@/lib/prisma";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

type ResponseData = {
  results: { label: string; value: string }[];
};

export async function GET(req: NextApiRequest) {
  const { searchParams } = new URL(req.url || "");
  const inputValue = searchParams.get("inputValue");
  const where = {
    where: {
      name: {
        contains: typeof inputValue === "string" ? inputValue : "",
      },
    },
  };
  const businessTypes = prisma.businessType.findMany(where);
  const businessCategories = prisma.businessCategory.findMany(where);
  const [type, category] = await Promise.all([
    businessTypes,
    businessCategories,
  ]);

  const t = [...type, ...category].map(({ name }) => ({
    label: createBusinessTypeLabel({ businessType: name }),
    value: createPrettyBusinessType({ businessType: name }),
  }));
  return NextResponse.json({ results: t }, { status: 200 });
}

export const dynamic = "auto";
export const fetchCache = "auto";
