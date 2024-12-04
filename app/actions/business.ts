"use server";
import { prisma } from "@/lib/prisma";
import { type Business } from "@prisma/client";
import { revalidatePath } from "next/cache";
import invariant from "tiny-invariant";

function businessNameSlug(name: string) {
  name = name.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  name = name.toLowerCase(); // convert string to lowercase
  name = name
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return name;
}

function getBusinessFormData(formData: FormData) {
  let id = "";
  const name = formData.get("name");
  const businessTypeId = formData.get(
    "businessTypeId"
  ) as Business["businessTypeId"];
  const phone = formData.get("phone-number");
  const address = formData.get("address");
  const intent = formData.get("intent");
  invariant(intent, "Intent is a required field");
  invariant(typeof intent === "string", "Intent should be a string");
  const idCheck = formData.get("id");
  if (idCheck) {
    invariant(idCheck, "ID is a required field");
    invariant(typeof idCheck === "string", "ID should be a string");
    id = idCheck;
  }
  invariant(name, "Name is a required field");
  invariant(typeof name === "string", "Name should be a string");
  invariant(businessTypeId, "Type is a required field");
  invariant(typeof businessTypeId === "string", "Type should be a string");
  invariant(phone, "Phone is a required field");
  invariant(typeof phone === "string", "Phone number should be a string");
  invariant(address, "Address is a required field");
  invariant(typeof address === "string", "Address should be a string");
  const slug = businessNameSlug(name);
  return {
    id,
    name,
    businessTypeId,
    phone,
    address,
    slug,
  };
}

export async function onSubmit(formData: FormData) {
  const { name, businessTypeId, phone, address, slug } =
    getBusinessFormData(formData);
  await prisma.business.create({
    data: {
      name,
      businessTypeId,
      phoneNumber: phone,
      address,
      slug,
    },
  });
  revalidatePath("/[businesses]/[business]", "page");
}

export async function onUpdate(formData: FormData) {
  const { id, name, businessTypeId, phone, address, slug } =
    getBusinessFormData(formData);
  await prisma.business.update({
    where: {
      id,
    },
    data: {
      name,
      businessTypeId,
      phoneNumber: phone,
      address,
      slug,
    },
  });
  revalidatePath("/[businesses]/[business]", "page");
}
