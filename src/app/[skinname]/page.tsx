import { DataProvider } from "@/app/ui/skinDetails/dataContext";
import { Skin } from "@/app/utils/api-data-class";
import { SkinChromas } from "@/app/ui/skinDetails/skin-chromas";
import { SkinChromaVideos } from "@/app/ui/skinDetails/skin-chroma-videos";
import { SkinLevelVideos } from "@/app/ui/skinDetails/skin-level-videos";
import { DataTable } from "@/app/ui/table/data-table";

export default function skinDetails() {
    
    return (
        <main className="m-0 p-0">
            <DataTable></DataTable>
        </main>
   
);
}