"use client";
import { ApiData } from "./api-data-class";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { WeaponType } from "./api-data-class";
import Link from "next/link";
import { useOverlay } from "./overlay-context";

export const LazyRender = () => {
  const searchParams = useSearchParams();
  const [appliedFilters, setAppliedFilters] = useState<WeaponType[]>([]);
  const [allSkins, setAllSkins] = useState<React.ReactNode[]>([]);
  const [displayedSkins, setDisplayedSkins] = useState<React.ReactNode[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(20);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { openOverlay } = useOverlay();
  let query = searchParams.get("query") || "";
  const [numCols, setNumCols] = useState(1); // Default to 1, updated client-side

  // Get current view mode from URL params
  const currentView = searchParams.get("view") || "skins";

  // Effect to determine number of columns based on screen size
  useEffect(() => {
    const getCols = () => {
      // Tailwind breakpoints: sm: 640px, md: 768px, lg: 1024px
      // Grid classes: grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      if (window.innerWidth >= 1024) return 4; // lg
      if (window.innerWidth >= 768) return 3;  // md
      if (window.innerWidth >= 640) return 2;   // sm
      return 1; // default
    };

    const updateCols = () => {
      setNumCols(getCols());
    };

    updateCols(); // Initial set
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols); // Cleanup
  }, []);

  // fetch data once
  useEffect(() => {
    const loadData = async () => {
      if (currentView === "skins") {
        const apiData = new ApiData();
        const instance = await apiData.getData();
        const skinsFull = await instance.renderSkins(
          searchParams.getAll("filter") as WeaponType[],
          query,
          openOverlay // Pass the click handler directly
        );
        setAllSkins(skinsFull);
        setAppliedFilters(searchParams.getAll("filter") as WeaponType[]);
      } else if (currentView === "bundles") {
        try {
          const response = await fetch('/api/bundles');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const bundleData = await response.json();
          
          // Filter bundles based on search query
          let filteredBundles = bundleData.filter((bundle: any) => bundle.image);
          
          if (query && query.trim() !== "") {
            const searchTerm = query.toLowerCase().trim();
            filteredBundles = filteredBundles.filter((bundle: any) => 
              bundle.name.toLowerCase().includes(searchTerm)
            );
          }
          
          const bundlesToRender = filteredBundles
            .map((bundle: any) => (
              <Link
                key={bundle.uuid}
                className="relative overflow-hidden bg-black cursor-pointer transition-all duration-200 hover:animate-red-outline-hover"
                href={`/?view=skins&query=${encodeURIComponent(bundle.name.replace("//", ""))}`}
              >
                <div className="relative z-10 flex flex-col items-center h-full p-4">
                  <img
                    alt={bundle.name}
                    src={bundle.image}
                    className="object-contain w-full h-32"
                  />
                  <p className="text-white text-center mt-3 text-sm font-medium truncate w-full" title={bundle.name}>{bundle.name}</p>
                </div>
              </Link>
            ));
          
          setAllSkins(bundlesToRender);
          setAppliedFilters([]);
        } catch (error) {
          console.error('Failed to fetch bundles:', error);
          setAllSkins([]);
          setAppliedFilters([]);
        }
      }
    };
    loadData();
  }, [query, searchParams, currentView, openOverlay]);

  // update displayed skins when allSkins or visibleCount changes
  useEffect(() => {
    setDisplayedSkins(allSkins.slice(0, visibleCount));
  }, [allSkins, visibleCount]);

  // intersection observer to load more when reaching bottom
  useEffect(() => {
    if (!bottomRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < allSkins.length) {
          setVisibleCount((prev) => Math.min(prev + 20, allSkins.length));
        }
      },
      { rootMargin: "200px" } // Increased rootMargin to load images sooner
    );
    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [allSkins.length, visibleCount]);

  const renderPlaceholders = () => {
    // Render placeholders only if all skins are loaded and displayed, and there are skins
    if (allSkins.length === 0 || displayedSkins.length < allSkins.length) {
      return null;
    }

    const numberOfTotalSkins = allSkins.length;
    const numPlaceholdersToRender = (numCols - (numberOfTotalSkins % numCols)) % numCols;

    if (numPlaceholdersToRender === 0) {
      return null;
    }

    return Array.from({ length: numPlaceholdersToRender }).map((_, index) => (
      <div key={`placeholder-${index}`} className="bg-black h-full">
        {/* This div fills a grid cell. The parent's gap-0.5 bg-gridDivider provides grid lines. */}
      </div>
    ));
  };

  return (
    <div className="w-[60%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5 bg-gridDivider">
      {displayedSkins}
      {renderPlaceholders()}
      <div ref={bottomRef} />
    </div>
  );
};

