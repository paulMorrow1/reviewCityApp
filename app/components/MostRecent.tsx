"use client";
import { Prisma } from "@prisma/client";
import * as React from "react";
import MostRecentReview from "./MostRecentReview";

type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: {
    user: { select: { firstName: boolean; lastName: boolean; id: boolean } };
    // business: { select: { name: boolean; id: boolean } };
  };
}>;

const MostRecent = () => {
  const [reviews, setReviews] = React.useState<ReviewWithUser[]>([]);
  React.useEffect(() => {
    const getReviews = async () => {
      const res = await fetch("/api/review");
      const { results } = await res.json();
      setReviews(results);
    };
    getReviews();
  }, []);

  return (
    <div className="mt-12">
      <h2 className="text-center text-xl py-5">Recent Activity</h2>
      <div className="grid grid-cols-3">
        {reviews.map((review) => {
          return (
            <>
              <MostRecentReview key={review.id} businessId={review.businessId} review={review} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default MostRecent;
