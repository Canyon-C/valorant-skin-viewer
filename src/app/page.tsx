
import Image from "next/image";
import { ApiData } from "./utils/api-data-class";
import { Geostar } from "next/font/google";
import { Filters } from "./ui/filters/filters";





export default function Home () {
  const apiData: ApiData = new ApiData();
  return (
    <main className="">

        {/* <header className="text-white text-center text-3xl">Filters</header> */}
        <div className="flex flex-wrap h-fit py-5 px-5 justify-center items-center gap-2 ">
          <Filters></Filters>
        </div>
        
      
      
      <div className="flex justify-center flex-wrap align-center gap-10 py-10">
        {/* <GetData></GetData> */}
        
        {apiData.getSkins()}
     
      </div>
      <div>
      {apiData.getSkins()}
      </div>
      
      
      
    </main>
  );
}