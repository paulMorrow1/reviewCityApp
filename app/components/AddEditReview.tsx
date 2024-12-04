"use client";

import { ReviewForm } from "@/app/components/ReviewForm";
import { Modal } from "@mui/material";
import type { Review } from "@prisma/client";
import * as React from "react";

export default function AddEditReview({
  businessId,
  review,
}: {
  businessId: string;
  review?: Review;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const btnClass = review
    ? "hover:text-orange-400"
    : "hover:bg-gray-100 border-2 border-black bg-white p-1";

  return (
    <>
      <button
        className={`mr-36 ${btnClass} text-nowrap rounded-md text-sm`}
        onClick={handleOpen}
      >
        {review ? "Edit" : "Add"} Review
      </button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        classes={{
          root: "flex justify-center items-center",
        }}
      >
        <ReviewForm
          businessId={businessId}
          review={review}
          handleClose={handleClose}
        />
      </Modal>
    </>
  );
}
