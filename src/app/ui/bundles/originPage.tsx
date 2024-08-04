"use client";
import { ApiData } from "@/app/utils/api-data-class";
import { GetCurrentBundle } from "./current-bundle";
import { ApiDataProvider } from "./apiContext";

export const OriginPage = () => {
  return (
    <ApiDataProvider>
      <GetCurrentBundle />
    </ApiDataProvider>
  );
};
