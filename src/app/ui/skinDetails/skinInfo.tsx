'use client';
import { useRef, useEffect, useState, ReactElement} from "react";
import { Render, ApiDataInstance } from "@/app/utils/skin-api-class"
import { SkinApi } from "@/app/utils/skin-api-class";
import { useSearchParams } from "next/navigation";



let skin_uuid = '';
let dataInstance: ApiDataInstance;

const Init = () => {
    const searchParams = useSearchParams();
    const raw_skin_uuid = searchParams.get('uuid');

    if (raw_skin_uuid) {
    skin_uuid = raw_skin_uuid;
    }
    dataInstance = new ApiDataInstance(skin_uuid);
}


export const SkinChromas = () => {
    const [chromas, setChromas] = useState<any[]>();
    Init();

    
    useEffect(() => {
        
        const chromas = async () => {
            // dataInstance = new ApiDataInstance(skin_uuid)
            await dataInstance.initialize()
            if (dataInstance.data.renderSkinChromas) setChromas([(dataInstance.data.renderSkinChromas())]);
            
        }
        chromas();
    }, [])
    return(
        <div className="chromaContainer flex">
            {chromas}
        </div>
        
    );
}

export const SkinChromaVideos = () => {
    const [videos, setVideos] = useState<any[]>();
    if (skin_uuid === '') {
        Init();
    }

    useEffect(() => {
        
        const setChromaVideos = async () => {
            // dataInstance = new ApiDataInstance(skin_uuid)
            await dataInstance.initialize()
            if (dataInstance.data.renderChromaVideos) setVideos([(dataInstance.data.renderChromaVideos())]);
            
        }
        setChromaVideos();
        
    }, [])
    
    return(videos);
}

export const SkinLevelVideos = () => {
    const [levelVideos, setLevelVideos] = useState<any[]>();
    if (skin_uuid === '') {
        Init();
    }

    useEffect(() => {
        
        const SLevelVideos = async () => {
            // dataInstance = new ApiDataInstance(skin_uuid)
            await dataInstance.initialize()
            if (dataInstance.data.renderLevelVideos) setLevelVideos([(dataInstance.data.renderLevelVideos())]);
            
        }
        SLevelVideos();
        
    }, [])
    
    return(levelVideos);
}