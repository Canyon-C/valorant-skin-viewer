import { DataProvider } from "@/app/ui/skinDetails/dataContext";
import { SkinChromas } from "@/app/ui/skinDetails/skin-chromas";
import { SkinChromaVideos } from "../skinDetails/skin-chroma-videos";
import { SkinLevelVideos } from "../skinDetails/skin-level-videos";
import { LevelHud } from "../skinDetails/level-gui";
import { BaseChroma } from "../skinDetails/base-chromas";
import { ArrowBackDetails } from "./arrow-back-skindetails";

export const DataTable = () => {
  return (
    <DataProvider>
      <div className="skinInfoContainer flex flex-col lg:flex-row gap-5 pt-5 lg:pt-0 px-5 h-fit border pb-5 lg:pb-0 lg:h-screen items-center">
        <ArrowBackDetails />

        <div className="data-table flex flex-col items-center w-full lg:w-auto lg:grow h-fit lg:h-[800px] border borderAccent rounded-3xl">
          <div className="w-full flex justify-around px-5 rounded-md">
            <h1 className="text-white text-xl py-2">Levels</h1>
          </div>
          <div className="w-full flex justify-center items-center h-full">
            <LevelHud />
          </div>
        </div>

        <div className="data-table flex flex-col items-center w-full lg:w-auto lg:grow lg:h-[800px] border borderAccent rounded-3xl gap-7">
          <div className="w-full flex justify-around px-5 rounded-md">
            <h1 className="text-white text-xl py-2">Chromas</h1>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center text-white gap-10 md:gap-0 lg:gap-10">
            <SkinChromas />
          </div>
        </div>

        <div className="data-table flex flex-col items-center lg:grow h-fit lg:h-[800px] lg:w-1/2 mewhen border borderAccent rounded-3xl">
          <div className="w-full flex justify-around px-5 rounded-md">
            <h1 className="text-white text-xl py-5">View</h1>
          </div>
          <div className="w-full h-full flex flex-col justify-around items-center text-white">
            <SkinChromaVideos />
            <SkinLevelVideos />
          </div>
        </div>
      </div>
    </DataProvider>
  );
};
