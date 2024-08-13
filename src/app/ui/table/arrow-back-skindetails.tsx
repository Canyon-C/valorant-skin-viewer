"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const ArrowBackDetails = () => {
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
    <nav className="flex justify-center items-center max-h-fit">
      <button onClick={() => router.back()} className="left-0">
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
          className="w-10"
        >
          <motion.path
            variants={arrowVariants}
            initial="initial"
            animate={`${isHovering ? "animate" : ""}`}
            d="M4.5 1L1.5 4L4.5 7"
          />
        </motion.svg>
      </button>
    </nav>
  );
};
