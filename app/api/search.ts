import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  results: { label: string; value: string }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log("search handler");
  console.log({ req });
  if (req.method === "GET") {
    const where = {
      where: {
        name: {
          contains:
            typeof req.query.inputValue === "string"
              ? req.query.inputValue
              : "",
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
      label: name,
      value: name,
    }));
    console.log({ t });
    return res.status(200).json({ results: t });
  }
}
