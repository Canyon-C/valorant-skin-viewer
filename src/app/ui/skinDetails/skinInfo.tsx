'use client';
import { useRef, useEffect, useState, ReactElement} from "react";
import { Render, ApiDataInstance } from "@/app/utils/skin-api-class"
import { SkinApi } from "@/app/utils/skin-api-class";
import { useSearchParams } from "next/navigation";

export const SkinChromas = () => {
    const [skinInfo, setSkinInfo] = useState<any[]>([]);
    const searchParams = useSearchParams();
    const raw_skin_uuid = searchParams.get('uuid');
    let skin_uuid = '';
    if (raw_skin_uuid) {
        skin_uuid = raw_skin_uuid;
    }
    
    let data = useRef<Render>();

    const apiData = new ApiDataInstance(skin_uuid);
    const setSkin = () => {
        setSkinInfo([(apiData.data.renderSkinChromas())]);
    }
    setSkin();
    return(skinInfo);
}