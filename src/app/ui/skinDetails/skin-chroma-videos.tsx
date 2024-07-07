'use client';
import { useEffect, useState } from "react";
import { useDataContext } from "./dataContext";

export const SkinChromaVideos = () => {
    const dataInstance = useDataContext();
    const [videos, setVideos] = useState<JSX.Element[] | null>();


    useEffect(() => {
        


        if (dataInstance && dataInstance.data) setVideos((dataInstance.data.renderChromaVideos()));
            


        
    }, [dataInstance])
    if (!videos) return null;
    return(videos);
}