"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export const FeaturedBundleDisplay = ({
  featuredBundleDisplayImage,
  featuredBundleDisplayImageName,
}: {
  featuredBundleDisplayImage: JSX.Element[];
  featuredBundleDisplayImageName: string;
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const hoverVariants = {
    initial: { filter: "grayscale(0%)", transition: { duration: 0.3 } },
    hoverActive: { filter: "grayscale(100%)", transition: { duration: 0.3 } },
  };

  const textVariants = {
    initial: { y: "15%" },
    hoverActive: { y: "-15%" },
  };
  return (
    <div className="featured-Bundle-Display-Image-container pt-5 w-full flex justify-center items-center">
      <motion.div
        whileHover="hoverActive"
        variants={hoverVariants}
        initial="initial"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="featured-bundle-display-image-container relative w-full md:w-4/5 lg:w-1/2"
      >
        {featuredBundleDisplayImage}
        <div
          className={`text-2xl text-center z-10 text-white opacity:100 ${
            isHovering === true ? "md:opactiy:100" : "md:opacity-0"
          } transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        >
          <motion.p
            variants={textVariants}
            initial="initial"
            animate={isHovering === true ? "hoverActive" : "initial"}
          >
            {featuredBundleDisplayImageName}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
