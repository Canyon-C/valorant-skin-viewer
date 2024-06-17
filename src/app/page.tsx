
import Image from "next/image";
import { useEffect, useState } from "react";
import { GetData } from "./utils/api-data";
import { Geostar } from "next/font/google";
import { SkinCard } from "./ui/card-outlines/skinCard";




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
      <div className="flex justify-center flex-wrap align-center gap-10 py-10 border-2">
      <GetData></GetData>
      </div>
        
      
      
    </main>
  );
}
