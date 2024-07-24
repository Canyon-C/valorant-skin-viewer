"use client";
import { DataProvider } from "@/app/ui/skinDetails/dataContext";
import { SkinChromas } from "@/app/ui/skinDetails/skin-chromas";
import { SkinChromaVideos } from "../skinDetails/skin-chroma-videos";
import { SkinLevelVideos } from "../skinDetails/skin-level-videos";
import { motion } from "framer-motion";
import { useState } from "react";
import { LevelHud } from "../skinDetails/level-gui";
import { BaseChroma } from "../skinDetails/base-chromas";

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
      <div className="skinInfoContainer flex flex-col gap-5 p-5 h-screen items-center">
        <div className="data-table flex justify-start w-[18rem] sm:w-[40rem] md:w-[45rem] lg:w-[60rem] xl:w-[75rem] h-fit flex-col border borderAccent rounded-3xl gap-7">
          <div className="w-full flex justify-around px-5 rounded-md">
            <h1 className="text-white text-xl py-2 ">Base Chroma</h1>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center items-center text-white h-fit">
            <BaseChroma />
          </div>
        </div>
        <div className="data-table flex justify-start w-[18rem] sm:w-[40rem] md:w-[45rem] lg:w-[60rem] xl:w-[75rem] h-fit md:h-fit flex-col border borderAccent rounded-3xl">
          <div className="w-full flex justify-around px-5 rounded-md">
            <h1 className="text-white text-xl py-2 ">Levels</h1>
          </div>
          <div className="w-full flex justify-center items-center h-full ">
            {/* <SkinChromas /> */}
            <LevelHud />
          </div>
        </div>
        <div className="data-table flex justify-start w-[18rem] sm:w-[40rem] md:w-[45rem] lg:w-[60rem] xl:w-[75rem] h-fit flex-col border borderAccent rounded-3xl gap-7">
          <div className="w-full flex justify-around px-5 rounded-md">
            <h1 className="text-white text-xl py-2">Chromas</h1>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center items-center text-white h-fit gap-10 md:gap-0 lg:gap-10">
            <SkinChromas />
          </div>
        </div>
        <div className="data-table flex justify-start w-[18rem] sm:w-[40rem] md:w-[45rem] lg:w-[60rem] xl:w-[75rem] flex-col border borderAccent rounded-3xl">
          <div className="w-full flex justify-around px-5 rounded-md">
            <h1 className="text-white text-xl py-5">View</h1>
          </div>
          <div className="w-full flex flex-col justify-around items-center text-white">
            <SkinChromaVideos />
            <SkinLevelVideos />
          </div>
        </div>
      </div>
    </DataProvider>
  );
};
