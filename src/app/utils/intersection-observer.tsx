"use client";
import { ApiData, RenderData } from "./api-data-class";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { WeaponType } from "./api-data-class";

export const LazyRender = () => {
  const searchParams = useSearchParams();
  const [appliedFilters, setAppliedFilters] = useState<WeaponType[]>([]);
  const [allSkins, setAllSkins] = useState<React.ReactNode[]>([]);
  const [displayedSkins, setDisplayedSkins] = useState<React.ReactNode[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(20);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  let query = searchParams.get("query") || "";

  // fetch data once
  useEffect(() => {
    const loadData = async () => {
      const apiData = new ApiData();
      const instance = await apiData.getData();
      const skinsFull = await instance.renderSkins(
        searchParams.getAll("filter") as WeaponType[],
        query
      );
      setAllSkins(skinsFull);
      setAppliedFilters(searchParams.getAll("filter") as WeaponType[]);
    };
    loadData();
  }, [query, searchParams]);

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
      { rootMargin: '200px' }
    );
    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [allSkins.length, visibleCount]);

  return (
    <div className="flex justify-center flex-wrap align-center gap-10 py-10">
      {displayedSkins}
      <div ref={bottomRef} />
    </div>
  );
};
