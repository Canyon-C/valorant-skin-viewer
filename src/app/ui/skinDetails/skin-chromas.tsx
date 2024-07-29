"use client";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useDataContext } from "./dataContext";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const SkinChromas = () => {
  const dataInstance = useDataContext();
  const [chromas, setChromas] = useState<JSX.Element[] | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [levelLength, setLevelLength] = useState<number>(0);

  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    if (dataInstance && dataInstance.data) {
      setChromas(dataInstance.data.renderSkinChromas());
      setLevelLength(dataInstance.data.levelLength().length);
    }
  }, [dataInstance]);

  useEffect(() => {
    const level = params.get("level");
    if (level !== null) {
      setCurrentLevel(parseInt(level));
    } else {
      setCurrentLevel(null);
    }
  }, [params.getAll("level").values()]);

  // useEffect(() => {
  //   window.history.scrollRestoration = "auto";
  //   const handleScroll = () => {
  //     setScrollPosition(window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // useLayoutEffect(() => {
  //   console.log(scrollPosition);
  //   if (scrollPosition > 0) {
  //     window.scrollTo(0, scrollPosition);
  //   }
  // }, [pathname, searchParams]);

  // useEffect(() => {
  //   const scroll = async () => {
  //     console.log(scrollPosition);
  //     await new Promise((resolve) => setTimeout(resolve, 200));
  //     window.scrollTo(0, scrollPosition);
  //   };
  //   scroll();
  // }, [pathname, searchParams]);

  const handleClick = (chromaIndex: number) => {
    if (params.has("chroma")) {
      params.delete("chroma");
      params.append("chroma", chromaIndex.toString());
    } else {
      params.append("chroma", chromaIndex.toString());
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (!chromas) return null;

  if (currentLevel === levelLength - 1) {
    return chromas.map((chroma, index) => {
      return (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          key={index}
          className="chromaContainer flex flex-col hover:cursor-pointer"
          onClick={() => handleClick(index)}
        >
          {chroma}
        </motion.div>
      );
    });
  } else {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
        className="chromaContainer flex flex-col hover:cursor-pointer"
        onClick={() => handleClick(0)}
      >
        {chromas[0]}
      </motion.div>
    );
  }
};
