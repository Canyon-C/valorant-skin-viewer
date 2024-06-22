
import Image from "next/image";
import { ApiData, RenderData } from "./utils/api-data-class";
import { Geostar } from "next/font/google";
import { Filters } from "./ui/filters/filters";





export default async function Home () {
  const apiData = new ApiData();
  const render = await apiData.getData();
  // const intersectionObserver = new IntersectionObserver(entries => {
  //   if (entries[0].intersectionRatio <= 0) return;

   
  // });
  
  return (
    <main className="">

        {/* <header className="text-white text-center text-3xl">Filters</header> */}
        <div className="flex flex-wrap h-fit py-5 px-5 justify-center items-center gap-2 ">
          <Filters></Filters>
        </div>
        
      
      
      <div className="flex justify-center flex-wrap align-center gap-10 py-10">
        {/* <GetData></GetData> */}
        
        {render.getSkins()}
     
      </div>

    </main>
  );
}