"use client";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { WeaponType } from "@/app/utils/api-data-class";
import { DropDownMenuFilter } from "./filter-dropdown";

export const Filters = () => {
  const [filters, setFilters] = useState<Filter[]>([
    new Filter(WeaponType.Odin),
    new Filter(WeaponType.Vandal),
    new Filter(WeaponType.Phantom),
    new Filter(WeaponType.Bulldog),
    new Filter(WeaponType.Guardian),
    new Filter(WeaponType.Ares),
    new Filter(WeaponType.Operator),
    new Filter(WeaponType.Outlaw),
    new Filter(WeaponType.Marshal),
    new Filter(WeaponType.Judge),
    new Filter(WeaponType.Bucky),
    new Filter(WeaponType.Spectre),
    new Filter(WeaponType.Stinger),
    new Filter(WeaponType.Sheriff),
    new Filter(WeaponType.Ghost),
    new Filter(WeaponType.Frenzy),
    new Filter(WeaponType.Shorty),
    new Filter(WeaponType.Classic),
    new Filter(WeaponType.Melee),
    new Filter(WeaponType.VCT),
    new Filter(WeaponType.Champions),
  ]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const clickHandle = async (filter: WeaponType) => {
    if (params.has("filter", filter)) {
      params.delete("filter", filter);
    } else {
      params.append("filter", filter);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    // <div className="flex flex-wrap h-fit py-5 px-5 justify-center items-center gap-2 border">
    //   <DropDownMenuFilter />
    // </div>
    <div className="flex flex-wrap h-fit py-5 px-5 justify-center items-center gap-2 ">
      {filters.map((filter, index) => {
        return (
          <div
            onClick={() => clickHandle(filter.filterName)}
            key={index}
            className={`flex justify-center text-sm items-center w-20 textAccent h-2/6 rounded-full hover:cursor-pointer ${
              params.has("filter", filter.filterName)
                ? "bg-[#ff4655]"
                : "backgroundAccent"
            }`}
          >
            <p>{filter.filterName}</p>
          </div>
        );
      })}
    </div>
  );
};

class Filter {
  filterName: WeaponType;

  constructor(name: WeaponType) {
    this.filterName = name;
  }
}
