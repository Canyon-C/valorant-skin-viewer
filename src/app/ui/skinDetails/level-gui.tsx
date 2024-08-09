"use client";
import { useDataContext } from "./dataContext";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const LevelHud = () => {
  const dataInstance = useDataContext();
  const [UI, setUI] = useState<JSX.Element[]>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);

  useEffect(() => {
    if (dataInstance && dataInstance.data) {
      setUI(dataInstance.data.levelLength());
    }
    const levelParam = searchParams.get("level");
    if (levelParam) {
      setCurrentLevel(parseInt(levelParam, 10));
    }
  }, [dataInstance]);

  const handleClick = (level: number) => {
    params.set("level", level.toString());
    replace(`${pathname}?${params.toString()}`);
    setCurrentLevel(level);
  };

  const variants = {
    default: { backgroundColor: "transparent" },
    hover: { backgroundColor: "#ffffff28" },
    tap: { backgroundColor: "#000000", scale: 0.98 },
    active: { backgroundColor: "#ff4655" },
  };

  return (
    <ul className="text-white flex md:flex-col items-center justify-around w-full h-full gap-3 py-5 px-5">
      {UI?.map((level, index) => (
        <motion.div
          variants={variants}
          initial="default"
          animate={currentLevel === index ? "active" : "default"}
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.2 }}
          className={`border w-1/2 rounded-full flex justify-center borderAccent hover:cursor-pointer `}
          key={index}
          onClick={() => {
            handleClick(index);
          }}
        >
          {level}
        </motion.div>
      ))}
    </ul>
  );
};
