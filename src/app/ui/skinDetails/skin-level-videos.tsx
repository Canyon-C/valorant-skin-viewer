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
    return (
        <div className="flex flex-wrap justify-center">
            {levelVideos.map((level, index) => (
                <div key={index} className="w-full md:w-1/2 lg:w-2/5 p-2">
                    {level}
                </div>
            ))}
        </div>
    );
}