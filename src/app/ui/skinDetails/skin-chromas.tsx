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
        <div className="chromaContainer flex max-w-full">
            {chromas}
        </div>
        
    );
}