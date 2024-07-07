'use client';
import { useEffect, useState } from "react";
import { useDataContext } from "./dataContext";

export const SkinLevelVideos = () => {
    const dataInstance = useDataContext();
    const [levelVideos, setLevelVideos] = useState<JSX.Element[] | null[]>();


    useEffect(() => {
        


            
        if (dataInstance && dataInstance.data) setLevelVideos((dataInstance.data.renderLevelVideos()));
            


        
    }, [dataInstance])
    if (!levelVideos) return null;
    return(levelVideos);
}