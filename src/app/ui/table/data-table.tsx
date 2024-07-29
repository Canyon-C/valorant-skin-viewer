import { DataProvider } from "@/app/ui/skinDetails/dataContext";
import { SkinChromas } from "@/app/ui/skinDetails/skin-chromas";
import { SkinChromaVideos } from "../skinDetails/skin-chroma-videos";
import { SkinLevelVideos } from "../skinDetails/skin-level-videos";
import { LevelHud } from "../skinDetails/level-gui";
import { BaseChroma } from "../skinDetails/base-chromas";

export const DataTable = () => {
  return (
    <DataProvider>
      <div className="skinInfoContainer flex flex-col lg:flex-row gap-5 p-5 h-screen items-center">
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
    // <DataProvider>
    //   <div className="skinInfoContainer flex flex-col gap-5 p-5 max-h-screen items-center">
    //     <div className="data-table flex justify-start w-[18rem] sm:w-[40rem] md:w-[45rem] lg:w-[60rem] xl:w-[75rem] grow flex-col border borderAccent rounded-3xl">
    //       <div className="w-full flex justify-around px-5 rounded-md">
    //         <h1 className="text-white text-xl py-2 ">Levels</h1>
    //       </div>
    //       <div className="w-full flex justify-center items-center h-full ">
    //         <LevelHud />
    //       </div>
    //     </div>
    //     <div className="data-table flex justify-start w-[18rem] sm:w-[40rem] md:w-[45rem] lg:w-[60rem] xl:w-[75rem] grow flex-col border borderAccent rounded-3xl gap-7">
    //       <div className="w-full flex justify-around px-5 rounded-md">
    //         <h1 className="text-white text-xl py-2">Chromas</h1>
    //       </div>
    //       <div className="w-full flex flex-col md:flex-row justify-center items-center text-white grow gap-10 md:gap-0 lg:gap-10">
    //         <SkinChromas />
    //       </div>
    //     </div>
    //     <div className="data-table flex justify-start w-[18rem] sm:w-[40rem] md:w-[45rem] lg:w-[60rem] xl:w-[75rem] flex-col border borderAccent rounded-3xl ">
    //       <div className="w-full flex justify-around px-5 rounded-md">
    //         <h1 className="text-white text-xl py-5">View</h1>
    //       </div>
    //       <div className="w-full flex flex-col justify-around items-center text-white">
    //         <SkinChromaVideos />
    //         <SkinLevelVideos />
    //       </div>
    //     </div>
    //   </div>
    // </DataProvider>
  );
};
