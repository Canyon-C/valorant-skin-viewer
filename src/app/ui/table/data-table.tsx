"use client";
import { DataProvider } from "@/app/ui/skinDetails/dataContext";
import { SkinChromas } from "@/app/ui/skinDetails/skin-chromas";
import { SkinChromaVideos } from "../skinDetails/skin-chroma-videos";
import { SkinLevelVideos } from "../skinDetails/skin-level-videos";
import { motion } from "framer-motion";
import { useState } from "react";

export const DataTable = () => {
    const [skinLevelsClicked, setSkinLevelsClicked] = useState<boolean>(false);
    const [skinChromaVideosClicked, setSkinChromaVideosClicked] = useState<boolean>(false);
    // const skinChromasClicked = false;
    const variants = {
        initial: {height: 0, overflow: "hidden"},
        active: {height: "auto", overflow: "hidden"}
    }

    return(
        <DataProvider>
            <div className="skinInfoContainer flex flex-col gap-5 p-5">
                <div className="data-table flex justify-center w-full flex-col border borderAccent rounded-3xl">
                    <div className="w-full flex justify-around px-5 rounded-md">
                        <h1 className="text-white text-xl py-2">Chromas</h1>
                        {/* <h1 className="textAccent">Video</h1> */}
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-center items-center">
                        <SkinChromas />
                        {/* <SkinChromaVideos></SkinChromaVideos> */}
                    </div>
                
                </div>
                <div className="data-table flex justify-center w-full flex-col border borderAccent rounded-3xl hover:cursor-pointer">
                    <div onClick={() => {setSkinChromaVideosClicked(prev => !prev)}} className="w-full flex justify-around rounded-md">
                        <h1 className="text-white text-xl py-2">Chroma Videos</h1>
                    </div>
                    <motion.div variants={variants} initial="initial" animate={skinChromaVideosClicked ? "active" : " "} transition={{ duration: 0.5 }} className="w-full flex flex-col md:flex-row justify-center items-center">
                        <SkinChromaVideos />
                    </motion.div>
                
                </div>
                <div className="data-table flex justify-center w-full flex-col border borderAccent rounded-3xl">
                    <div onClick={() => {setSkinLevelsClicked(prev => !prev)}} className="w-full flex justify-around rounded-md hover:cursor-pointer">
                        <h1 className="text-white text-xl py-2">Skin Levels</h1>
                    </div>
                    <motion.div variants={variants} initial="initial" animate={skinLevelsClicked ? "active" : " "} transition={{ duration: 0.5 }} className="w-full flex flex-wrap justify-center items-center gap-4"> {/* Changed align-center to items-center, Added flex-wrap and gap classes */}
                        <SkinLevelVideos />
                    </motion.div>
                
                </div>
            </div>
            
        </DataProvider>
      
    );
}