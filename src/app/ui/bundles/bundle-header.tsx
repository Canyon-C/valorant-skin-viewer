"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const BundleHeader = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const router = useRouter();

  const arrowVariants = {
    initial: { stroke: "#ffffff" },
    animate: {
      x: "-20%",
      stroke: "#ff4655",
      transition: { duration: 0.15 },
    },
  };

  return (
    <header className="text-xl md:text-3xl text-white text-center flex justify-center items-center max-h-fit">
      <p>Featured Bundle</p>
      <button
        onClick={() => router.back()}
        className="absolute left-5 md:left-20"
      >
        <motion.svg
          variants={arrowVariants}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          whileHover={{ scale: 1.1 }}
          animate={`${isHovering ? "animate" : ""}`}
          fill="none"
          width="37"
          height="40"
          viewBox="0 0 5 8"
          xmlns="http://www.w3.org/2000/svg"
          className=" w-4 md:w-10"
        >
          <motion.path
            variants={arrowVariants}
            initial="initial"
            animate={`${isHovering ? "animate" : ""}`}
            d="M4.5 1L1.5 4L4.5 7"
          />
        </motion.svg>
      </button>
    </header>
  );
};
