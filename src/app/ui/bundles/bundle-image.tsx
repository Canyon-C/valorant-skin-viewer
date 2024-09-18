"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const BundleImages = ({
  images,
  names,
}: {
  images: JSX.Element[];
  names: string[];
}) => {
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const hoverVariants = {
    initial: { filter: "grayscale(0%)", transition: { duration: 0.3 } },
    hoverActive: { filter: "grayscale(100%)", transition: { duration: 0.3 } },
  };

  const textVariants = {
    initial: { y: "15%" },
    hoverActive: { y: "-15%" },
  };
  return (
    <div className="flex flex-wrap justify-center align-center gap-3 px-5 w-full">
      {images.map((bundleImage, index) => {
        return (
          <Link
            key={index}
            href={`./skin?query=${names[index].replace("//", "")}`}
            className=""
          >
            <motion.div
              whileHover="hoverActive"
              variants={hoverVariants}
              initial="initial"
              className="w-fit flex justify-center h-full relative"
              onMouseEnter={() => setIsHovering(index)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div
                className={`text-2xl text-center z-10 text-white opacity:100 ${
                  isHovering === index ? "md:opacity-100" : "md:opacity-0"
                } transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
              >
                <motion.p
                  variants={textVariants}
                  initial="initial"
                  animate={isHovering === index ? "hoverActive" : "initial"}
                >
                  {names[index]}
                </motion.p>
              </div>
              {bundleImage}
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};
