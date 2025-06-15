"use client";
import React, { useState, useMemo } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { WeaponType, BundleType } from "@/app/utils/api-data-class";
import { motion } from "framer-motion";

const orderedWeaponTypes: WeaponType[] = [
  WeaponType.Melee,
  WeaponType.Vandal,
  WeaponType.Phantom,
  WeaponType.Guardian,
  WeaponType.Bulldog,
  WeaponType.Stinger,
  WeaponType.Spectre,
  WeaponType.Classic,
  WeaponType.Shorty,
  WeaponType.Frenzy,
  WeaponType.Ghost,
  WeaponType.Sheriff,
  WeaponType.Marshal,
  WeaponType.Outlaw,
  WeaponType.Operator,
  WeaponType.Ares,
  WeaponType.Odin,
  WeaponType.Bucky,
  WeaponType.Judge,
];

interface FiltersProps {
  alwaysOpen?: boolean;
}

export const Filters = ({ alwaysOpen = false }: FiltersProps) => {
  const bundleTypeArray = Object.values(BundleType);
  const [filterClicked, setFilteredClicked] = useState<boolean>(false);

  const filtersList = useMemo(() => {
    return orderedWeaponTypes.map(
      (weaponType) => new Filter(weaponType)
    );
  }, []);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  // Get current view mode from URL params
  const currentView = params.get("view") || "skins";

  const clickHandle = async (filter: WeaponType | BundleType) => {
    if (params.has("filter", filter)) {
      params.delete("filter", filter);
    } else {
      params.append("filter", filter);
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleViewToggle = (view: "skins" | "bundles") => {
    params.set("view", view);
    // Clear existing filters when switching views
    params.delete("filter");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const dropdownVariants = {
    initial: { height: 0, overflow: "hidden" },
    active: { height: "auto", overflow: "hidden" },
  };

  const itemsWithSpaceAfter: WeaponType[] = [
    WeaponType.Melee,
    WeaponType.Bulldog,
    WeaponType.Spectre,
    WeaponType.Sheriff,
    WeaponType.Operator,
    WeaponType.Odin,
  ];

  return (
    <motion.div
      className={`flex flex-col ${
        alwaysOpen
          ? "w-full"
          : "filter-container border borderAccent w-fit px-3 rounded-md"
      }`}
    >
      {!alwaysOpen && (
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
      )}

      <motion.div
        variants={dropdownVariants}
        initial={alwaysOpen ? "active" : "initial"}
        animate={alwaysOpen ? "active" : filterClicked ? "active" : "initial"}
        className={`w-full ${alwaysOpen ? "" : "filter-dropdown"}`}
      >
        {alwaysOpen && (
          <>
            {/* View Toggle Section */}
            <div className="mb-3 pb-2 border-b border-neutral-600">
              <div className="flex rounded-md overflow-hidden bg-neutral-800">
                <button
                  onClick={() => handleViewToggle("skins")}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                    currentView === "skins"
                      ? "bg-[#ff4655] text-white"
                      : "text-neutral-300 hover:bg-neutral-700"
                  }`}
                >
                  Skins
                </button>
                <button
                  onClick={() => handleViewToggle("bundles")}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                    currentView === "bundles"
                      ? "bg-[#ff4655] text-white"
                      : "text-neutral-300 hover:bg-neutral-700"
                  }`}
                >
                  Bundles
                </button>
              </div>
            </div>
          </>
        )}

        <div
          className={`flex ${
            alwaysOpen
              ? "flex-col"
              : "flex-wrap h-fit py-5 px-5 justify-center items-center gap-2"
          }`}
        >
          {currentView === "skins" && filtersList.map((filter, index) => {
            const weaponName = filter.filterName as WeaponType;
            const isLastItem = index === filtersList.length - 1;

            return (
              <React.Fragment key={filter.filterName}>
                <div
                  onClick={() => clickHandle(filter.filterName)}
                  className={`flex items-center hover:cursor-pointer ${
                    alwaysOpen
                      ? `w-full px-3 py-1 text-left text-sm hover:bg-neutral-700/50`
                      : `justify-center text-sm px-2 h-10 rounded-full` // Kept rounded-full for non-alwaysOpen
                  } textAccent ${
                    params.has("filter", filter.filterName)
                      ? "bg-[#ff4655] text-white"
                      : "" // Removed backgroundAccent
                  }`}
                >
                  <p className={alwaysOpen ? "" : "text-center"}>{filter.filterName}</p>
                </div>

                {alwaysOpen && !isLastItem && (
                  <div
                    className={`w-full ${
                      itemsWithSpaceAfter.includes(weaponName)
                        ? "h-0.5 bg-neutral-600 my-1" // Thicker divider for categories, changed my-2 to my-1
                        : "h-px bg-neutral-700 my-1"  // Thinner divider for items, changed my-1 to my-0.5
                    }`}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
          
          {currentView === "bundles" && (
            <div className="w-full text-center text-neutral-400 text-sm py-4">
              Bundle filters coming soon...
            </div>
          )}
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
