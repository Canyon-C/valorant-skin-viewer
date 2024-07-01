"use client";
import { ApiData, RenderData, Skin } from "./api-data-class";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export const LazyRender = () => {
    const [skins, setSkins] = useState<any[]>([]);
    const searchParams = useSearchParams();
    const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
    let data = useRef<RenderData>();
    const FilterEListener = searchParams.getAll("filter");
    let query = searchParams.get('query');
    let realQuery= '';
    if (query) {
        realQuery = query;
    }


    useEffect(() => {
        const getData = async () => {
            const apiData = new ApiData();
            const tempData = await apiData.getData();
            return tempData;
        }
        const getSkins = async () => {
            data.current = await getData();
            setAppliedFilters(Array.from(searchParams.values()));
            setSkins([(await data.current.renderSkins(appliedFilters))]);
        }
        getData();
        getSkins();
    }, [])

    useEffect(() => {
        const set = async () => {
            const query = searchParams.get("query");
            if (data.current)  {
                setSkins([(await data.current.renderSkins(appliedFilters, query))]);
            }
        }
        set();
    }, [appliedFilters])

    useEffect(() => {
        setSkins([]);
        setAppliedFilters(Array.from(searchParams.values()));
        
    }, [FilterEListener.length])

    useEffect(() => {
        console.log(realQuery.length);
        const set = async () => {
            if (data.current)  {
                setSkins([]);
                setAppliedFilters(Array.from(searchParams.values()));
                
            }
        }
        set();
    }, [realQuery.length])





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

    



        return (
            <div className="flex justify-center flex-wrap align-center gap-10 py-10">  
                {skins}
            </div>
        ); 
    
}
   
