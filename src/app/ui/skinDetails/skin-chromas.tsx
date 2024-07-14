'use client';
import { useEffect, useState } from "react";
import { useDataContext } from "./dataContext";

export const SkinChromas = () => {
    const dataInstance = useDataContext();
    const [chromas, setChromas] = useState<JSX.Element[] | null>(null);

    useEffect(() => {
        if (dataInstance && dataInstance.data) setChromas((dataInstance.data.renderSkinChromas()));
    }, [dataInstance])

    if (!chromas) return null;

    return(
        chromas.map((chroma, index) => {
            return(
                <div key={index} className="chromaContainer flex flex-col">
                {chroma}
                </div>
            );

        })

        
    );
}