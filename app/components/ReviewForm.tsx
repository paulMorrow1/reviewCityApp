"use client";
import type { Review } from "@prisma/client";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import * as React from "react";
import { useFormState } from "react-dom";
import { onSubmit, onUpdate } from "../actions/review";

export function ReviewForm({
  businessId,
  review,
  handleClose,
}: {
  businessId: string;
  review?: Review;
  handleClose: () => void;
}) {
  const userId = "cm144e0hl00001vxpmdxbi5jf";
  const [state, formAction] = useFormState(review ? onUpdate : onSubmit, {
    message: "",
  });
  const [images, setImages] = React.useState<string[]>([]);
  const formImages = images.join(",");

  const addImage = (res: any) => {
    const imgUrl = res?.cdnUrl;
    setImages((prevImages) => [...prevImages, imgUrl]);
  };
  const removeImage = (res: any) => {
    const imgUrl = res?.cdnUrl;
    setImages((prevImages) =>
      prevImages.filter((img) => (img === imgUrl ? null : img))
    );
  };

  React.useEffect(() => {
    if (state.message === "success") {
      handleClose();
    }
  }, [state.message]);

  return (
    <div className="text-left">
      <form
        action={formAction}
        className="flex flex-col border-2 border-black p-8 bg-gray-200"
      >
        <label htmlFor="rating">Rating:</label>
        <input
          id="rating"
          name="rating"
          type="number"
          placeholder="Rating"
          className="border-2 border-black pl-2 mb-2"
          defaultValue={review?.rating}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          placeholder="Content"
          className="border-2 border-black h-40 w-80 my-4 pl-1"
          defaultValue={review?.content ?? undefined}
        ></textarea>
        {images.length ? (
          <div className="flex">
            {images.map((img) => (
              <img
                src={img}
                width="50"
                height="50"
                className="object-contain"
              />
            ))}
          </div>
        ) : null}
        <FileUploaderRegular
          sourceList="local, url"
          classNameUploader="uc-light"
          pubkey="cb386ff1f49e1d5542dc"
          imgOnly
          onFileUploadSuccess={addImage}
          onFileRemoved={removeImage}
        />
        <input
          type="hidden"
          name="images"
          id="images"
          defaultValue={formImages}
        />
        <input type="hidden" name="userId" id="userId" defaultValue={userId} />
        <input
          type="hidden"
          name="businessId"
          id="businessId"
          defaultValue={businessId}
        />
        <input
          type="hidden"
          id="reviewId"
          name="reviewId"
          defaultValue={review?.id}
        />
        <button className=" bg-white border-2 border-black p-1 rounded-md max-w-20 hover:bg-blue-500 hover:text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
