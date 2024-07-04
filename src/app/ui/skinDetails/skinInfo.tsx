'use client';
import { useRef, useEffect, useState, ReactElement} from "react";
import { Render } from "@/app/utils/skin-api-class"
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

    useEffect(() => {
        const getData = async () => {
            const apiData = new SkinApi(skin_uuid);
            const tempData = await apiData.getData();
            return tempData;
        }

        const getSkinInfo = async () => {
            data.current = await getData();
            setSkinInfo([(data.current.renderSkinChromas())]);
        }
        getSkinInfo();
    
    }, [])
    return(skinInfo);
}