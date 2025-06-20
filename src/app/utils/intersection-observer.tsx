"use client";
import { ApiData } from "./api-data-class";
import { useEffect, useState, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { WeaponType } from "./api-data-class";
import Link from "next/link";
import { useOverlay } from "./grid";

// --- Type Definition for API Response ---

interface ValorantBundle {
  uuid: string;
  displayName: string;
  displayIcon: string;
}

// --- Constants ---

const ITEMS_PER_PAGE = 20;

// --- Main Component ---

export const LazyRender = () => {
  // --- Hooks ---
  const searchParams = useSearchParams();
  const { openOverlay } = useOverlay();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // --- State ---
  const [allSkins, setAllSkins] = useState<React.ReactNode[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [numCols, setNumCols] = useState(1); // Default to 1, updated client-side

  // --- Derived State and Variables ---
  const query = searchParams.get("query") || "";
  const currentView = searchParams.get("view") || "skins";
  const displayedSkins = useMemo(
    () => allSkins.slice(0, visibleCount),
    [allSkins, visibleCount]
  );

  // --- Effects ---

  // Effect to determine number of columns for grid layout based on screen size
  useEffect(() => {
    const getCols = () => {
      // Tailwind breakpoints: sm: 640px, md: 768px, xl: 1280px
      // Corresponds to grid classes in the JSX: sm:grid-cols-2, md:grid-cols-3, xl:grid-cols-4
      if (window.innerWidth >= 1280) return 4; // xl
      if (window.innerWidth >= 768) return 3; // md
      if (window.innerWidth >= 640) return 2; // sm
      return 1; // default
    };

    const updateCols = () => setNumCols(getCols());

    updateCols(); // Initial set
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols); // Cleanup
  }, []);

  // Effect to fetch and render data (skins or bundles) when view or search params change
  useEffect(() => {
    const loadData = async () => {
      // Reset visible count on new data load
      setVisibleCount(ITEMS_PER_PAGE);

      if (currentView === "skins") {
        const apiData = new ApiData();
        const instance = await apiData.getData();
        const skinsFull = await instance.renderSkins(
          searchParams.getAll("filter") as WeaponType[],
          query,
          openOverlay // Pass the click handler directly
        );
        setAllSkins(skinsFull);
      } else if (currentView === "bundles") {
        try {
          const response = await fetch("https://valorant-api.com/v1/bundles");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const bundleApiResponse = await response.json();

          // Filter bundles that have an icon and match the search query
          const searchTerm = query.toLowerCase().trim();
          const filteredBundles = bundleApiResponse.data
            .filter((bundle: ValorantBundle) => bundle.displayIcon)
            .filter(
              (bundle: ValorantBundle) =>
                !searchTerm ||
                bundle.displayName.toLowerCase().includes(searchTerm)
            );

          const bundlesToRender = filteredBundles.map(
            (bundle: ValorantBundle) => (
              <Link
                key={bundle.uuid}
                className="relative overflow-hidden bg-black cursor-pointer transition-all duration-200 hover:shadow-[0_0_0_2px_theme(colors.valRed)]"
                href={`/?view=skins&query=${encodeURIComponent(
                  bundle.displayName.replace("//", "")
                )}`}
              >
                <div className="relative z-10 flex flex-col items-center h-full px-1 pt-0 pb-4">
                  <img
                    alt={bundle.displayName}
                    src={bundle.displayIcon}
                    className="object-contain w-full h-36"
                  />
                  <p
                    className="text-white text-center mt-3 text-sm font-medium truncate w-full px-4"
                    title={bundle.displayName}
                  >
                    {bundle.displayName}
                  </p>
                </div>
              </Link>
            )
          );

          setAllSkins(bundlesToRender);
        } catch (error) {
          console.error("Failed to fetch bundles:", error);
          setAllSkins([]);
        }
      }
    };
    loadData();
  }, [query, searchParams, currentView, openOverlay]);

  // Effect for intersection observer to load more items on scroll
  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < allSkins.length) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_PAGE, allSkins.length)
          );
        }
      },
      { rootMargin: "200px" } // Load images 200px before they enter the viewport
    );

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [allSkins.length, visibleCount]);

  // --- Helper Functions ---

  // Renders placeholder items to fill the last row of the grid, ensuring a clean look
  const renderPlaceholders = () => {
    // Don't render placeholders if there are more items to load or no items
    if (allSkins.length === 0 || displayedSkins.length < allSkins.length) {
      return null;
    }

    const numPlaceholders = (numCols - (allSkins.length % numCols)) % numCols;
    if (numPlaceholders === 0) {
      return null;
    }

    return Array.from({ length: numPlaceholders }).map((_, index) => (
      <div key={`placeholder-${index}`} className="bg-black h-full" />
    ));
  };

  // --- Render ---

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-0.5 bg-[#000000]">
      {displayedSkins}
      {renderPlaceholders()}
      <div ref={bottomRef} />
    </div>
  );
};

