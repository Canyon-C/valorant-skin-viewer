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

  useEffect(() => {
    if (dataInstance && dataInstance.data) {
      setUI(dataInstance.data.levelLength());
    }
  }, [dataInstance]);

  const handleClick = (level: number) => {
    if (params.has("level")) {
      params.delete("level");
      params.append("level", level.toString());
    } else {
      params.append("level", level.toString());
    }

    replace(`${pathname}?${params.toString()}`);
  };

  // const levelVariants = {
  //   initial: { backgroundColor: "#000000" },
  //   hover: { backgroundColor: "#ffffff28" },
  // };

  return (
    <ul className="text-white flex md:flex-col items-center justify-around w-full h-full gap-3 py-5 px-5">
      {UI?.map((level, index) => (
        <motion.div
          // variants={levelVariants}
          // initial="initial"
          whileHover={{
            backgroundColor: "#ffffff28",
            transition: { duration: 0.2 },
          }}
          whileTap={{
            backgroundColor: "#000000",
            transition: { duration: 0.2 },
          }}
          className="border w-1/2 rounded-full flex justify-center borderAccent hover:cursor-pointer"
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
