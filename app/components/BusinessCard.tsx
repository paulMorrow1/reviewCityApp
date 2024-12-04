import { Prisma } from "@prisma/client";

type BusinessWithReviewCount = Prisma.BusinessGetPayload<{
  include: {
    _count: {
      select: {
        review: true;
      };
    };
  };
}>;

export default function BusinessCard({
  business,
}: {
  business: BusinessWithReviewCount;
}) {
  const reviewCount = business._count.review;
  return (
    <div className="border-2 border-black w-96 h-max p-4 m-4 hover:shadow-[rgba(0,0,15,0.15)_0px_0px_10px_3px] transition-shadow ease-in-out">
      <h2 className="font-bold">{business.name}</h2>
      {/* <p>{business.type}</p> */}
      <p className="text-sm">{business.address}</p>
      <p className="text-sm">{business.phoneNumber}</p>
      <p className="text-sm">
        {/* {`${reviewCount} Review${reviewCount === 0 || reviewCount > 1 ? 's' : ''}`} */}
        {business._count.review}{" "}
        {business._count.review === 1 ? "Review" : "Reviews"}
      </p>
    </div>
  );
}
