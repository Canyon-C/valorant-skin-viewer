import { Filters } from "../ui/filters/filters";
import { LazyRender } from "../utils/intersection-observer";
import { Input } from "../ui/search/input";
import { Suspense } from "react";

export const runtime = "edge";

export default async function Home() {
  return (
    <main className="2xl:grid 2xl:grid-cols-[280px_1fr] 2xl:gap-x-8">
      <Suspense>
        <aside className="p-4 2xl:p-0 2xl:py-5">
          <div>
            <Input placeholder="Search" type="search"></Input>
          </div>

          {/* Hamburger filters for small screens */}
          <div className="py-5 w-full flex justify-center items-center 2xl:hidden">
            <Filters />
          </div>

          {/* Sidebar filters for large screens */}
          <div className="hidden 2xl:block mt-5">
            <Filters alwaysOpen={true} />
          </div>
        </aside>

        <div className="2xl:py-5">
          <LazyRender></LazyRender>
        </div>
      </Suspense>
    </main>
  );
}
