import AddEditReview from "./AddEditReview";

export function NoReviewsFound({ businessId }: { businessId: string }) {
  return (
    <div className="h-full ">
      <h2>No Reviews were found for this business.</h2>
      <AddEditReview businessId={businessId} />
    </div>
  );
}
