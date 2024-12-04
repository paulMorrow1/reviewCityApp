"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import invariant from "tiny-invariant";

function getReviewFormData(formData: FormData) {
  const rating = Number(formData.get("rating"));
  const content = formData.get("content");
  const businessId = formData.get("businessId");
  const userId = formData.get("userId");
  const reviewId = formData.get("reviewId") as string;
  const images = formData.get("images");

  invariant(businessId, "Business Id is a required field");
  invariant(typeof businessId === "string", "Business Id must be a string");
  invariant(userId, "User Id is a required field");
  invariant(typeof userId === "string", "User Id must be a string");
  invariant(rating, "Rating is a required field");
  invariant(typeof rating === "number", "Rating should be a number");
  invariant(content, "Content is a required field");
  invariant(typeof content === "string", "Content should be a string");
  invariant(images, "Images is a required field");
  invariant(typeof images === "string", "Images should be a string");
  const formattedImages = images?.split(",");

  return {
    userId,
    businessId,
    rating,
    content,
    reviewId,
    images: formattedImages,
  };
}

export async function onSubmit(prevState: any, formData: FormData) {
  const { rating, content, userId, businessId, images } =
    getReviewFormData(formData);
  await prisma.review.create({
    data: {
      content,
      rating,
      businessId,
      userId,
      images,
    },
  });
  revalidatePath("/[businesses]/[business]", "page");
  return { message: "success" };
}

export async function onUpdate(prevState: any, formData: FormData) {
  const { rating, content, reviewId, images } = getReviewFormData(formData);
  await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      content,
      rating,
      images,
    },
  });
  revalidatePath("/[businesses]/[business]", "page");
  return { message: "success" };
}

export async function onDelete(formData: FormData) {
  const reviewId = formData.get("reviewId") as string;
  console.log({ reviewId });
  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });
  revalidatePath("/[businesses]/[business]", "page");
}
