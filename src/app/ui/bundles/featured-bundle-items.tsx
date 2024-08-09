"use client";
import { motion } from "framer-motion";

export const FeaturedBundleItems = ({
  featuredBundleItemImages,
}: //   featuredBundleItemNames,
{
  featuredBundleItemImages: JSX.Element[];
  //   featuredBundleItemNames: JSX.Element[];
}) => {
  return (
    <div className="flex flex-wrap justify-center items-center w-full py-5">
      {featuredBundleItemImages}
    </div>
  );
};
