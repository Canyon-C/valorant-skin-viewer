"use client";
import React, { useState, useMemo, useEffect } from "react";
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

interface FilterButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
  alwaysOpen: boolean;
}

const FilterButton = ({ onClick, isActive, children, alwaysOpen }: FilterButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const showActiveEffects = isHovered || isActive;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`filter-button hover:cursor-pointer transition-all duration-200 text-white relative overflow-hidden ${
        alwaysOpen
          ? `w-full pr-3 py-1 text-left text-sm font-medium`
          : `justify-center text-sm px-2 h-10 rounded-full flex items-center`
      } ${isActive ? 'filter-button-active' : ''} ${showActiveEffects ? 'animate-active-state' : ''}`} // Added animate-active-state
    >
      <div className={`filter-button-line ${showActiveEffects ? 'filter-button-line-active' : ''}`}></div>
      <div className={`filter-button-bg ${showActiveEffects ? 'filter-button-bg-active' : ''}`}></div>
      <p className={`text-left text-sm font-medium relative z-10 ${alwaysOpen ? 'pl-6' : ''}`}>{children}</p>
    </div>
  );
};

export const Filters = ({ alwaysOpen = false }: FiltersProps) => {
  const bundleTypeArray = Object.values(BundleType);
  const [filterClicked, setFilteredClicked] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFilteredClicked(false);
      }
    };

    if (filterClicked) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filterClicked]);

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
          ? "w-full bg-black pt-3 pr-3 pb-3" // Changed border widths border-t-2 border-r-2 border-b-2 border-l-0 border-[#ff4654]
          : "filter-container w-fit px-3 rounded-md" // Changed border widths
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
          <h1 className="text-white text-left py-2">Filters</h1>
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
            <div className={`flex flex-col gap-1 ${currentView === "skins" ? "mb-3" : ""}`}>
              <FilterButton
                onClick={() => handleViewToggle("skins")}
                isActive={currentView === "skins"}
                alwaysOpen={true}
              >
                Skins
              </FilterButton>
              <FilterButton
                onClick={() => handleViewToggle("bundles")}
                isActive={currentView === "bundles"}
                alwaysOpen={true}
              >
                Bundles
              </FilterButton>
            </div>
          </>
        )}

        <div className={`flex ${alwaysOpen ? "flex-col gap-1" : "flex-wrap h-fit py-5 px-5 justify-center items-center gap-2"}`}>
          {alwaysOpen && currentView === "skins" && (
            <>
              <div className="filter-divider"></div>
              <div className="h-0.5"></div>
            </>
          )}
          
          {currentView === "skins" && filtersList.map((filter, index) => {
            const weaponName = filter.filterName as WeaponType;
            const isLastItem = index === filtersList.length - 1;
            const hasSpaceAfter = itemsWithSpaceAfter.includes(weaponName);

            return (
              <React.Fragment key={filter.filterName}>
                <FilterButton
                  onClick={() => clickHandle(filter.filterName)}
                  isActive={params.has("filter", filter.filterName)}
                  alwaysOpen={alwaysOpen}
                >
                  {filter.filterName}
                </FilterButton>

                {alwaysOpen && !isLastItem && hasSpaceAfter && (
                  <>
                    <div className="h-0.5"></div>
                    <div className="filter-divider"></div>
                    <div className="h-0.5"></div>
                  </>
                )}
              </React.Fragment>
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
