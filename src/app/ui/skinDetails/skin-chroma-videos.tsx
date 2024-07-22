"use client";
import { useEffect, useState } from "react";
import { useDataContext } from "./dataContext";
import { AnimatePresence, motion } from "framer-motion";
import { Fullscreen } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const SkinChromaVideos = () => {
  const dataInstance = useDataContext();
  const pathname = usePathname();
  // const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [videos, setVideos] = useState<JSX.Element[] | null>();
  // const [displayToggle, setDisplayToggle] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<number | null>(0);
  const [currentChroma, setCurrentChroma] = useState<number>(0);
  const [levelLength, setLevelLength] = useState<number>(0);
  const [chromaLength, setChromaLength] = useState<number>(0);
  const mewhen = "null";

  //   const videoVariants = {
  //     hidden: { height: 0, overflow: "hidden" },
  //     visable: { height: "auto", overflow: "hidden" },
  //   };

  //   const arrowVariants = {
  //     initial: { rotate: 0 },
  //     active: { rotate: 180 },
  //   };

  //   const handleClick = () => {
  //     setDisplayToggle((prev) => !prev);
  //   };

  useEffect(() => {
    if (dataInstance && dataInstance.data) {
      setVideos(dataInstance.data.renderChromaVideos());
      setLevelLength(dataInstance.data.levelLength().length);
      setChromaLength(dataInstance.data.chromaLength());
    }
  }, [dataInstance]);

  useEffect(() => {
    const level = params.get("level");
    const chroma = params.get("chroma");
    if (level !== null) {
      setCurrentLevel(parseInt(level));
    } else {
      setCurrentLevel(null);
    }
    if (chroma !== null) {
      setCurrentChroma(parseInt(chroma));
    }
  }, [params.getAll("level").values()]);
  if (!videos) return null;

  // return(
  //         <motion.div onClick={handleClick} className="chromaVideoContainer border rounded-xl w-3/4 my-10 text-white hover:cursor-pointer flex flex-col justify-start">
  //             <section className="flex justify-between px-5 items-center">
  //             <header className="">Chroma Videos</header>
  //             <motion.svg width="20" height="20" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg"
  //             initial="initial"
  //             variants={arrowVariants}
  //             animate={displayToggle ? "active" : "initial"}
  //             >
  //                 <path d="M1 0.5L4 3.5L7 0.5" stroke="white"/>
  //             </motion.svg>
  //             </section>

  //             <motion.div
  //                 initial={"hidden"}
  //                 variants={videoVariants}
  //                 animate={displayToggle ? "visable" : "hidden"}
  //             >

  //                 {videos}
  //             </motion.div>
  //         </motion.div>

  // );
  if (
    videos[currentChroma - 1] === undefined ||
    videos[currentChroma - 1] === null
  ) {
    if (currentChroma !== 0) {
      return <p>No Chroma</p>;
    }
  } else {
    if (currentLevel === levelLength - 1) {
      return (
        <div className="flex flex-wrap justify-center">
          <div className="w-full p-2 text-white">
            {videos[currentChroma - 1]}
          </div>
        </div>
      );
    }
  }
};
