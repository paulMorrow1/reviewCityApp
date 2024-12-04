import AddEditReview from "@/app/components/AddEditReview";
import { NoReviewsFound } from "@/app/components/NoReviewsFound";
import { auth } from "@/auth/auth";
import { prisma } from "@/lib/prisma";
import Review from "./Review";

export const Reviews = async ({ businessId }: { businessId: string }) => {
  const [reviews, session] = await Promise.all([
    prisma.review.findMany({
      where: {
        businessId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    auth(),
  ]);

  if (!reviews.length) {
    return <NoReviewsFound businessId={businessId} />;
  }

  return (
    <div className="pt-8">
      <h2 className="text-2xl text-center py-8 underline">Reviews</h2>
      {session ? (
        <div className="text-right">
          <AddEditReview businessId={businessId} />
        </div>
      ) : null}
      <div className="min-h-screen">
        {reviews.map((review) => (
          <Review key={review.id} review={review} businessId={businessId} />
        ))}
      </div>
    </div>
  );
};
