"use client";

import { ReactNode } from "react";

export const FeaturedBundleItems = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-wrap justify-center items-center w-full py-5">
      {children}
    </div>
  );
};
