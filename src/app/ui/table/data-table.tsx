"use client";
import { DataProvider } from "@/app/ui/skinDetails/dataContext";
import { SkinChromas } from "@/app/ui/skinDetails/skin-chromas";
import { SkinChromaVideos } from "../skinDetails/skin-chroma-videos";
import { SkinLevelVideos } from "../skinDetails/skin-level-videos";
import { motion } from "framer-motion";
import { useState } from "react";
import { LevelHud } from "../skinDetails/level-gui";

export const DataTable = () => {
  const [skinLevelsClicked, setSkinLevelsClicked] = useState<boolean>(false);
  const [skinChromaVideosClicked, setSkinChromaVideosClicked] =
    useState<boolean>(false);
  // const skinChromasClicked = false;
  const variants = {
    initial: { height: "auto", overflow: "hidden" },
    active: { height: 0, overflow: "hidden" },
  };

  // return (
  //   <DataProvider>
  //     <div className="skinInfoContainer flex flex-col gap-5 p-5">
  //       <div className="data-table flex justify-center w-full flex-col border borderAccent rounded-3xl">
  //         <div className="w-full flex justify-around px-5 rounded-md">
  //           <h1 className="text-white text-xl py-2">Chromas</h1>
  //         </div>
  //         <div className="w-full flex flex-col md:flex-row justify-center items-center">
  //           <SkinChromas />
  //         </div>
  //       </div>
  //       <div className="data-table flex justify-center w-full flex-col border borderAccent rounded-3xl hover:cursor-pointer">
  //         <div
  //           onClick={() => {
  //             setSkinChromaVideosClicked((prev) => !prev);
  //           }}
  //           className="w-full flex justify-around rounded-md"
  //         >
  //           <h1 className="text-white text-xl py-2">Chroma Videos</h1>
  //         </div>
  //         <motion.div
  //           variants={variants}
  //           initial="initial"
  //           animate={skinChromaVideosClicked ? "active" : " "}
  //           transition={{ duration: 0.5 }}
  //           className="w-full flex flex-col md:flex-row justify-center items-center"
  //         >
  //           <SkinChromaVideos />
  //         </motion.div>
  //       </div>
  //       <div className="data-table flex justify-center w-full flex-col border borderAccent rounded-3xl">
  //         <div
  //           onClick={() => {
  //             setSkinLevelsClicked((prev) => !prev);
  //           }}
  //           className="w-full flex justify-around rounded-md hover:cursor-pointer"
  //         >
  //           <h1 className="text-white text-xl py-2">Skin Levels</h1>
  //         </div>
  //         <motion.div
  //           variants={variants}
  //           initial="initial"
  //           animate={skinLevelsClicked ? "active" : " "}
  //           transition={{ duration: 0.5 }}
  //           className="w-full flex flex-wrap justify-center items-center gap-4"
  //         >
  //           {" "}
  //           <SkinLevelVideos />
  //         </motion.div>
  //       </div>
  //     </div>
  //   </DataProvider>
  // );
  return (
    <DataProvider>
      <div className="skinInfoContainer flex flex-col md:flex-row gap-5 p-5 h-screen items-center">
        <div className="data-table flex justify-start w-3/4 md:w-2/4 h-1/4 md:h-3/4 min-h-[202px] md:min-h-[505px] flex-col border borderAccent rounded-3xl">
          <div className="w-full flex justify-around px-5 rounded-md">
            <h1 className="text-white text-xl py-2 ">Levels</h1>
          </div>
          <div className="w-full flex justify-center items-center h-full ">
            {/* <SkinChromas /> */}
            <LevelHud />
          </div>
        </div>
        <div className="data-table flex justify-start w-3/4 md:w-2/4 h-3/4 min-h-[505px] flex-col border borderAccent rounded-3xl">
          <div className="w-full flex justify-around px-5 rounded-md">
            <h1 className="text-white text-xl py-5">Chromas</h1>
          </div>
          <div className="w-full flex flex-col justify-around items-center text-white h-full">
            <SkinChromas />
          </div>
        </div>
        <div className="data-table flex justify-start w-full h-3/4 md:min-h-[505px] flex-col border borderAccent rounded-3xl">
          <div className="w-full flex justify-around px-5 rounded-md">
            <h1 className="text-white text-xl py-5">View</h1>
          </div>
          <div className="w-full flex flex-col justify-around items-center text-white h-full object-contain">
            <SkinChromaVideos />
            <SkinLevelVideos />
          </div>
        </div>
      </div>
    </DataProvider>
  );
};
