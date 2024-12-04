"use client";

import { useRouter } from "next/navigation";
import AsyncSelect from "react-select/async";
import Categories from "./components/Categories";
import MostRecent from "./components/MostRecent";
import { searchTypeAhead } from "./utils/business";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <RecentActivity />
      </Suspense> */}
      <AsyncSelect
        defaultOptions
        loadOptions={searchTypeAhead}
        onChange={(value) => router.push(`/${value?.value}`)}
      />
      <MostRecent />
      <Categories />
    </main>
  );
}
