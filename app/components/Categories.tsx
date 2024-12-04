"use client";

import { Icon } from "@mui/material";
import Link from "next/link";
import {
  businessTypeIconMap,
  createBusinessTypeLabel,
  createPrettyBusinessType,
} from "../utils/business";

const Categories = () => {
  const businessTypeWithIcon = Object.entries(businessTypeIconMap);
  return (
    <div className="mt-16">
      <h2 className="text-center text-xl">Categories</h2>
      <div className="flex flex-wrap justify-evenly mt-5">
        {businessTypeWithIcon.map(([key, iconName]) => (
          <div className="flex flex-col border-2 border-black text-black h-64 w-64 justify-center items-center mb-5 text-center">
            <Link
              href={`/${createPrettyBusinessType({ businessType: key })}`}
              className="border-2 border-black pt-1 px-2"
            >
              <Icon className="h-max w-max text-sm">{iconName}</Icon>
            </Link>
            <p className="text-sm">
              {createBusinessTypeLabel({ businessType: key })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
