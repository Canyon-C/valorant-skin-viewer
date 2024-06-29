"use client";
import Image from "next/image";
import { ApiData, RenderData, Skin } from "./api-data-class";
import { Geostar } from "next/font/google";
import { Filter } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { get } from "http";

export const LazyRender = () => {
    const [skins, setSkins] = useState<any[]>([]);
    const searchParams = useSearchParams();
    // const [renderClass, setRenderClass] = useState<RenderData>();
    const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
    let data = useRef<RenderData>();
    


    useEffect(() => {
        const getData = async () => {
            const apiData = new ApiData();
            const tempData = await apiData.getData();
            return tempData;
        }
        const getSkins = async () => {
            data.current = await getData();
            setAppliedFilters(Array.from(searchParams.values()));
        }
        getData();
        getSkins();
    }, [])


    useEffect(() => {
        const set = async () => {
            
            if (data.current)  {
                setSkins([(await data.current.renderSkins(appliedFilters))]);
            }
        }
        set();
    }, [appliedFilters])

    useEffect(() => {
        setSkins([]);
        setAppliedFilters(Array.from(searchParams.values()));
        
    }, [searchParams.size,searchParams])




    // Infinite Scroll, on hold.....
    
    // useEffect(() => {
    //     let observer: IntersectionObserver;
        


    //     const createObserver = () => {
    //         observer = new IntersectionObserver(async entries => {
    //             if (entries[0].isIntersecting) {
    //                 console.log('IntersectingGGG');
    //                 observer.disconnect();
    //                 getSkins();
    //             }
    //         });
    //     }

    //     const observeLast = () => {
    //         const element = document.querySelector(".card:last-child");
    //         if (element) observer.observe(element);
            
    //     }
 
    //     createObserver();
    //     observeLast();


        
    // }, [])
        return skins;
    
}
   
