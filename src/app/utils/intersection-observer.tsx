"use client";
import { ApiData, RenderData } from "./api-data-class";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { WeaponType } from "./api-data-class";

export const LazyRender = () => {
  const [skins, setSkins] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const [appliedFilters, setAppliedFilters] = useState<WeaponType[]>([]);
  let data = useRef<RenderData>();
  const FilterEListener = searchParams.getAll("filter");
  let query = searchParams.get("query");
  let realQuery = "";
  if (query) {
    realQuery = query;
  }

  useEffect(() => {
    const getData = async () => {
      const apiData = new ApiData();
      const tempData = await apiData.getData();
      return tempData;
    };
    const getSkins = async () => {
      data.current = await getData();
      setAppliedFilters(searchParams.getAll("filter") as WeaponType[]);
    };
    getSkins();
  }, []);

  useEffect(() => {
    const set = async () => {
      if (data.current) {
        setSkins([await data.current.renderSkins(appliedFilters, realQuery)]);
      }
    };
    set();
  }, [appliedFilters]);

  useEffect(() => {
    setSkins([]);
    setAppliedFilters(searchParams.getAll("filter") as WeaponType[]);
  }, [FilterEListener.length]);

  useEffect(() => {
    const set = async () => {
      if (data.current) {
        setSkins([]);
        setAppliedFilters(searchParams.getAll("filter") as WeaponType[]);
      }
    };
    set();
  }, [realQuery.length]);

  return (
    <div className="flex justify-center flex-wrap align-center gap-10 py-10">
      {skins}
    </div>
  );
};
