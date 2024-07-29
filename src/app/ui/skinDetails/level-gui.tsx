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

  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    if (dataInstance && dataInstance.data) {
      setUI(dataInstance.data.levelLength());
    }
  }, [dataInstance]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollPosition(window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // useEffect(() => {
  //   const scroll = () => {
  //     console.log(scrollPosition);

  //   };
  //   scroll();
  // }, [searchParams.size]);

  const handleClick = (level: number) => {
    if (params.has("level")) {
      params.delete("level");
      params.append("level", level.toString());
    } else {
      params.append("level", level.toString());
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className="text-white flex md:flex-col items-center justify-around w-full h-full gap-3 py-5 px-5">
      {UI?.map((level, index) => (
        <motion.div
          whileHover={{
            backgroundColor: "#ffffff28",
            transition: { duration: 0.2 },
          }}
          whileTap={{
            backgroundColor: "#000000",
            transition: { duration: 0.2 },
            scale: 0.98,
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
