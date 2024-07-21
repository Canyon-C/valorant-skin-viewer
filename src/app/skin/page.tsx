import Image from "next/image";
import { ApiData } from "../utils/api-data-class";
import { Geostar } from "next/font/google";
import { Filters } from "../ui/filters/filters";
import { LazyRender } from "../utils/intersection-observer";
import { Search } from "lucide-react";
import { Input } from "../ui/search/input";
import { ValorantSVG } from "../ui/landing/valorant-svg";

export default async function Home() {
  return (
    <main className="">
      <Filters></Filters>
      <Input placeholder="Search" type="search"></Input>
      <LazyRender></LazyRender>
    </main>
  );
}
