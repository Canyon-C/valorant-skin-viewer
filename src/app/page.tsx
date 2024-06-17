
import Image from "next/image";
import { useEffect, useState } from "react";
import { GetData } from "./utils/api-data";
import { Geostar } from "next/font/google";
import { SkinCard } from "./ui/card-outlines/skinCard";
import { Filters } from "./ui/filters/filters";




export default function Home () {
  
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   getData();
  // }, [])

  // const getData = async () => {
  //   const axios = require('axios');

  //   const response = await axios.get('https://some-random-api.com/animal/cat');
  //   setData(response.data.fact);
  // }
 
  return (
    <main className="">

        <header className="text-white text-center text-3xl">Filters</header>
        <div className="flex flex-wrap h-fit py-5 px-5 justify-center items-center gap-2 ">
          <Filters></Filters>
        </div>
        
      
      
      <div className="flex justify-center flex-wrap align-center gap-10 py-10">
      <GetData></GetData>
      </div>
        
      
      
    </main>
  );
}
