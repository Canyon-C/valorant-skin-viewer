"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

export const BundleImages = ({
  images,
  names,
}: {
  images: JSX.Element[];
  names: string[];
}) => {
  const hoverVariants = {
    initial: { filter: "grayscale(0%)", transition: { duration: 0.3 } },
    hoverActive: { filter: "grayscale(100%)", transition: { duration: 0.3 } },
  };
  return (
    <div className="flex flex-wrap justify-center align-center gap-3 px-5">
      {images.map((bundleImage, index) => {
        return (
          <motion.div
            whileHover="hoverActive"
            variants={hoverVariants}
            initial="initial"
            key={index}
            style={{ overflow: "hidden" }}
            className="text-white"
          >
            {names[index]}
            {bundleImage}
          </motion.div>
        );
      })}
    </div>
  );
};
