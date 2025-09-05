"use client"
import React, { useState, useEffect } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { WeaponType } from "@/app/utils/api-data-class"
import { motion } from "framer-motion"

// --- Constants and Types ---

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
]

const filtersList = orderedWeaponTypes.map((weaponType) => ({
  filterName: weaponType,
}))

const itemsWithSpaceAfter: WeaponType[] = [
  WeaponType.Melee,
  WeaponType.Bulldog,
  WeaponType.Spectre,
  WeaponType.Sheriff,
  WeaponType.Operator,
  WeaponType.Odin,
]

interface FiltersProps {
  alwaysOpen?: boolean
}

interface FilterButtonProps {
  onClick: () => void
  isActive: boolean
  children: React.ReactNode
  alwaysOpen: boolean
}

// --- Reusable Filter Components ---

const FilterButton = ({
  onClick,
  isActive,
  children,
  alwaysOpen,
}: FilterButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`filter-button hover:cursor-pointer transition-all duration-200 text-white relative overflow-hidden ${
        alwaysOpen
          ? `w-full pr-3 py-1 text-left text-sm font-medium`
          : `justify-center text-sm px-2 h-10 rounded-full flex items-center`
      } ${isActive ? "filter-button-active" : ""}`}
    >
      <div className="filter-button-line"></div>
      <div className="filter-button-bg"></div>
      <p
        className={`text-left text-sm font-medium relative z-10 ${alwaysOpen ? "pl-6" : ""}`}
      >
        {children}
      </p>
    </div>
  )
}

const Divider = () => (
  <>
    <div className="h-0.5"></div>
    <div className="filter-divider"></div>
    <div className="h-0.5"></div>
  </>
)

const ViewToggleButtons = ({
  currentView,
  onToggle,
}: {
  currentView: string
  onToggle: (view: "skins" | "bundles") => void
}) => (
  <div
    className={`flex flex-col gap-1 ${currentView === "skins" ? "mb-3" : ""}`}
  >
    <FilterButton
      onClick={() => onToggle("skins")}
      isActive={currentView === "skins"}
      alwaysOpen={true}
    >
      Skins
    </FilterButton>
    <FilterButton
      onClick={() => onToggle("bundles")}
      isActive={currentView === "bundles"}
      alwaysOpen={true}
    >
      Bundles
    </FilterButton>
  </div>
)

// --- Main Filters Component ---

export const Filters = ({ alwaysOpen = false }: FiltersProps) => {
  const [filterClicked, setFilteredClicked] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFilteredClicked(false)
      }
    }

    if (filterClicked) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [filterClicked])

  const params = new URLSearchParams(searchParams)
  const currentView = params.get("view") || "skins"
  const activeFilters = params.getAll("filter")

  const clickHandle = (filter: WeaponType) => {
    const newParams = new URLSearchParams(searchParams)
    const allFilters = newParams.getAll("filter")

    if (allFilters.includes(filter)) {
      const newFilters = allFilters.filter((f) => f !== filter)
      newParams.delete("filter")
      newFilters.forEach((f) => newParams.append("filter", f))
    } else {
      newParams.append("filter", filter)
    }
    replace(`${pathname}?${newParams.toString()}`, { scroll: false })
  }

  const handleViewToggle = (view: "skins" | "bundles") => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set("view", view)
    newParams.delete("filter")
    replace(`${pathname}?${newParams.toString()}`, { scroll: false })
  }

  const dropdownVariants = {
    initial: { height: 0, overflow: "hidden" },
    active: { height: "auto", overflow: "hidden" },
  }

  return (
    <motion.div
      className={`flex flex-col ${
        alwaysOpen
          ? "w-full bg-black pt-3 pr-3 pb-3"
          : "filter-container w-fit px-3 rounded-md"
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
          <ViewToggleButtons
            currentView={currentView}
            onToggle={handleViewToggle}
          />
        )}

        <div
          className={`flex ${alwaysOpen ? "flex-col gap-1" : "flex-wrap h-fit py-5 px-5 justify-center items-center gap-2"}`}
        >
          {alwaysOpen && currentView === "skins" && (
            <>
              <div className="filter-divider"></div>
              <div className="h-0.5"></div>
            </>
          )}

          {currentView === "skins" &&
            filtersList.map((filter, index) => {
              const weaponName = filter.filterName as WeaponType
              const isLastItem = index === filtersList.length - 1
              const hasSpaceAfter = itemsWithSpaceAfter.includes(weaponName)

              return (
                <React.Fragment key={filter.filterName}>
                  <FilterButton
                    onClick={() => clickHandle(filter.filterName)}
                    isActive={activeFilters.includes(filter.filterName)}
                    alwaysOpen={alwaysOpen}
                  >
                    {filter.filterName}
                  </FilterButton>

                  {alwaysOpen && !isLastItem && hasSpaceAfter && <Divider />}
                </React.Fragment>
              )
            })}
        </div>
      </motion.div>
    </motion.div>
  )
}
