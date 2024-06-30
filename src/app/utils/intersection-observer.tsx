"use client";
import { ApiData, RenderData, Skin } from "./api-data-class";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export const LazyRender = () => {
    const [skins, setSkins] = useState<any[]>([]);
    const searchParams = useSearchParams();
    // const [renderClass, setRenderClass] = useState<RenderData>();
    const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
    let data = useRef<RenderData>();
    let prevURL = '';
    const FilterEListener = searchParams.getAll("filter");
    const QueryrEListener = searchParams.getAll("query");
    


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
            if (data.current)  {
                setSkins([(await data.current.renderSkins(appliedFilters))]);
            }
        }
        set();
    }, [appliedFilters])

    useEffect(() => {
        setSkins([]);
        setAppliedFilters(Array.from(searchParams.values()));

    }, [FilterEListener.length])

    // Attemted Logic for query filter inside client component

    // useEffect(() => {
    //     skins.filter((skin) => {
    //         if (skin.props.id.includes(searchParams.get('query'))) {
    //             return skin;
    //         }
    //     });
    //     setSkins([skins]);
    // }, [QueryrEListener.length])




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
   
