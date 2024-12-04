import { onDelete } from "@/app/actions/review";
import AddEditReview from "@/app/components/AddEditReview";
import { Modal } from "@mui/material";
import { Prisma } from "@prisma/client";
import * as React from "react";

type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: {
    user: { select: { firstName: boolean; lastName: boolean; id: boolean } };
    // business: { select: { name: boolean; id: boolean } };
  };
}>;

const MostRecentReview = ({
  review,
  businessId,
}: {
  review: ReviewWithUser;
  businessId: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  // const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const [imageForModal, setImageForModal] = React.useState("");

  const imageArray = review.images;
  const handleShowPreviousImage = () => {
    const imageIndex = imageArray.indexOf(imageForModal);
    setImageForModal(imageArray[imageIndex - 1]);
  };
  const handleShowNextImage = () => {
    const imageIndex = imageArray.indexOf(imageForModal);
    setImageForModal(imageArray[imageIndex + 1]);
  };

  const userId = "cm144e0hl00001vxpmdxbi5jf";
  const reviewUserId = review.user.id;
  //   console.log(review.business.name);
  return (
    <div className="border-2 border-black mx-2 p-2 items-center bg-white rounded-sm hover:shadow-[rgba(0,0,15,0.15)_0px_0px_10px_3px] transition-shadow ease-in-out">
      <p className="font-bold text-lg cursor-default">
        {review.user.firstName} {review.user.lastName}
      </p>
      <p className="text-xs cursor-default">{review.createdAt.toString()}</p>
      <p>{review.businessId}</p>
      <p className="mt-1 cursor-default">{review.rating}</p>
      <p className="mt-2 text-sm mb-6 cursor-default">{review.content}</p>
      {review?.images?.length ? (
        <div className="flex flex-wrap mb-2">
          {review?.images?.map((img) => (
            <img
              src={img}
              width="56px"
              className="object-contain h-14 cursor-pointer border-2 border-black mx-0.5 my-0.5"
              onClick={() => {
                setImageForModal(img);
                setIsOpen(true);
              }}
            />
          ))}
        </div>
      ) : null}
      <Modal open={isOpen}>
        <div className="flex justify-center h-full w-full bg-black/10">
          <button
            disabled={imageArray.indexOf(imageForModal) === 0}
            onClick={handleShowPreviousImage}
            className="bg-white h-6 w-6 my-auto ml-10"
          >
            {"<"}
          </button>
          <div className="flex h-full w-1/2 bg-black mx-auto">
            <img
              src={imageForModal}
              height="250px"
              width="100%"
              className="object-contain"
            />
          </div>
          <button
            onClick={handleClose}
            className="bg-white h-7 w-7 text-sm my-3 rounded-full"
          >
            X
          </button>
          <button
            disabled={
              imageArray.indexOf(imageForModal) === imageArray.length - 1
            }
            onClick={handleShowNextImage}
            className="bg-white h-6 w-6 my-auto mr-10"
          >
            {">"}
          </button>
        </div>
      </Modal>
      {userId === reviewUserId ? (
        <>
          <AddEditReview businessId={review.businessId} review={review} />
          <form action={onDelete}>
            <button
              type="submit"
              name="reviewId"
              value={review.id}
              className=" hover:text-red-600 mt-1 rounded-md text-sm"
            >
              Delete Review
            </button>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default MostRecentReview;
