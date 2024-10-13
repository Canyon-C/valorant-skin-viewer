import { Filters } from "../ui/filters/filters";
import { LazyRender } from "../utils/intersection-observer";
import { Input } from "../ui/search/input";
import { Suspense } from "react";

export const runtime = "edge";

export default async function Home() {
  return (
    <main className="">
      <Suspense>
        <div className="py-5">
          <Input placeholder="Search" type="search"></Input>
        </div>

        <div className="py-5 w-full flex justify-center items-center">
          {" "}
          <Filters></Filters>
        </div>

        <LazyRender></LazyRender>
      </Suspense>
    </main>
  );
}
