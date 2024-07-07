'use client';
import { useEffect, useState, createContext, useContext} from "react";
import { ApiDataInstance } from "@/app/utils/skin-api-class"
import { useSearchParams } from "next/navigation";



const DataContext = createContext<ApiDataInstance | null>(null);

export const DataProvider = ({ children } : {children: React.ReactNode}) => {
    const [dataInstance, setDataInstance] = useState<ApiDataInstance | null>(null);
    let skin_uuid = '';
    const searchParams = useSearchParams();
    const raw_skin_uuid = searchParams.get('uuid');
    if (raw_skin_uuid) {
        skin_uuid = raw_skin_uuid;
    }
    
    useEffect(() => {
        const init = async () => {
            const instance = new ApiDataInstance(skin_uuid);
            await instance.initialize();
            setDataInstance(instance);
        }
        init();
        
    }, [])
    
    return(
        <DataContext.Provider value={dataInstance}>
            {children}
        </DataContext.Provider>
    );
}

export const useDataContext = () => {
    const context = useContext(DataContext);
    return context;
}






