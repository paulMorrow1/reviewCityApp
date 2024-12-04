import {
  createStandardBusinessType,
  type TransformedBusinessType,
} from "@/app/utils/business";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import BusinessCard from "../components/BusinessCard";

// car-wash
// laywer
// { "business-type" : TransformedBusinessType }
type BusinessesPageType = {
  params: { "business-type": TransformedBusinessType };
};

export default async function BusinessesPage({ params }: BusinessesPageType) {
  const businesses = await prisma.business.findMany({
    where: {
      type: {
        name: {
          contains: createStandardBusinessType({
            businessType: params["business-type"],
          }),
        },
      },
    },
    include: {
      type: true,
      category: true,
      _count: {
        select: {
          review: true,
        },
      },
    },
  });
  return (
    <div>
      <p className="text-lg text-center p-3 my-8">Businesses</p>
      {/* <pre>{JSON.stringify(businesses, null, 2)}</pre> */}
      {!businesses.length ? <div>No businesses found.</div> : null}
      {businesses.map((business) => {
        return (
          <Link
            href={`/${params["business-type"]}/${business.slug}`}
            prefetch
            className="block w-max"
          >
            <BusinessCard business={business} />
          </Link>
        );
      })}
    </div>
  );
}
