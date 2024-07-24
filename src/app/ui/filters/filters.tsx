"use client";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { WeaponType, BundleType } from "@/app/utils/api-data-class";
import { DropDownMenuFilter } from "./filter-dropdown";
import { motion } from "framer-motion";

export const Filters = () => {
  const weaponTypeArray = Object.values(WeaponType);

  const bundleTypeArray = Object.values(BundleType);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [filterClicked, setFilteredClicked] = useState<boolean>(false);

  useEffect(() => {
    setFilters(weaponTypeArray.map((weaponType) => new Filter(weaponType)));
    // bundleTypeArray.map((bundleType) => filters.push(new Filter(bundleType)));
  }, []);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const clickHandle = async (filter: WeaponType | BundleType) => {
    if (params.has("filter", filter)) {
      params.delete("filter", filter);
    } else {
      params.append("filter", filter);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const dropdownVariants = {
    initial: { height: 0, overflow: "hidden" },
    active: { height: "auto", overflow: "hidden" },
  };

  return (
    <motion.div className="filter-container flex flex-col justify-center items-center border borderAccent w-4/6 rounded-md">
      <motion.div
        onClick={() => setFilteredClicked((prev) => !prev)}
        className="w-full h-full hover:cursor-pointer"
        whileHover={{
          backgroundColor: "#ffffff28",
          transition: { duration: 0.2 },
        }}
        whileTap={{
          backgroundColor: "#000000",
          transition: { duration: 0.2 },
        }}
      >
        <h1 className="text-white text-center py-2">Filters</h1>
      </motion.div>

      <motion.div
        variants={dropdownVariants}
        initial="initial"
        animate={filterClicked ? "active" : ""}
        className="filter-dropdown w-full"
      >
        <div className="flex flex-wrap h-fit py-5 px-5 justify-center items-center gap-2">
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
      </motion.div>
    </motion.div>
  );
};

class Filter {
  filterName: WeaponType | BundleType;

  constructor(name: WeaponType | BundleType) {
    this.filterName = name;
  }
}
