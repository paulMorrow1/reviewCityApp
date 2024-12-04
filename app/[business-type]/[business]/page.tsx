// import { BusinessForm } from "@/app/components/BusinessForm";
import NoBusinessFound from "@/app/components/NoBusinessFound";
import { auth } from "@/auth/auth";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { Reviews } from "./Reviews";

// Landing page for selected business
// Displays core information about the business
// Displays reviews related to business

export default async function BusinessPage({
  params,
}: {
  params: { business: string };
}) {
  const session = await auth();
  console.log("session: ", session);
  const business = await prisma.business.findUnique({
    where: {
      slug: params.business,
    },
    include: {
      type: true,
    },
  });

  if (!business) {
    return <NoBusinessFound />;
  }

  return (
    <div className="w-full h-full py-10 border-2 border-black">
      {/* <BusinessForm business={business} /> */}
      <h2 className="text-2xl font-bold font-mono mb-6">{business.name}</h2>
      {/* <hr /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Reviews businessId={business.id} />
      </Suspense>
    </div>
  );
}
