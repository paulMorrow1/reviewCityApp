import { Prisma } from "@prisma/client";
import { onSubmit, onUpdate } from "../actions/business";

type BusinessWithType = Prisma.BusinessGetPayload<{
  include: { type: boolean };
}>;

export const BusinessForm = ({ business }: { business?: BusinessWithType }) => {
  return (
    <div className="text-left w-80">
      <form
        className="flex flex-col border-2 border-black p-8 bg-slate-50"
        action={business ? onUpdate : onSubmit}
      >
        <label htmlFor="name">Business Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={business?.name}
          className="border-2 border-black pl-2 mb-2"
        />
        <label htmlFor="type">Business Type:</label>
        <input
          type="text"
          id="type"
          defaultValue={business?.type?.name}
          className="border-2 border-black pl-2 mb-2"
        />
        <input
          type="hidden"
          name="businessTypeId"
          defaultValue={business?.businessTypeId}
        />
        <label htmlFor="phone-number">Phone Number:</label>
        <input
          type="text"
          id="phone-number"
          name="phone-number"
          defaultValue={business?.phoneNumber}
          className="border-2 border-black pl-2 mb-2"
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          defaultValue={business?.address}
          className="border-2 border-black pl-2 mb-2"
        />
        <input type="hidden" name="id" defaultValue={business?.id} />
        <button
          type="submit"
          name="intent"
          value={business ? "update" : "create"}
          className=" bg-white border-2 border-black p-1 rounded-md max-w-20 hover:bg-blue-500 hover:text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
