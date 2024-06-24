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
    const [renderClass, setRenderClass] = useState<RenderData>();
    const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
    


    useEffect(() => {
        const getData = async () => {
            const apiData = new ApiData();
            const tempData = await apiData.getData();
            return tempData;
        }
        const getSkins = async () => {
            setRenderClass(await getData());
            
    
        }
        getData();
        getSkins();
    }, [])


    useEffect(() => {
        const set = async () => {
            if (renderClass) {
                setSkins([...(await renderClass.renderSkins(appliedFilters))]);
            }
            
        }
        set();
    }, [renderClass, appliedFilters])



    

    // const data = async () => {
    //     skinData = await getData()
    //     return skinData;
    // };

    useEffect(() => {
        setAppliedFilters(...([Array.from(searchParams.values())]));
        
        
    }, [searchParams, searchParams.size])

    
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


    
    
    
        // useEffect(() => {
        //     console.log("Filtering");
        //     const filtered = (element: Skin, index: number, arr: any) => {
        //         if (Array.from(searchParams.values()).includes(element.weapon)) {
        //             return element;
        //         }
                 
        //     }
        // skins.filter(filtered);
            
        // }, [appliedFilters, skins, searchParams])
        return skins;
    
}
   
