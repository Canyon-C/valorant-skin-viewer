import { SkinChromas, SkinChromaVideos, SkinLevelVideos } from "@/app/ui/skinDetails/skinInfo";
import { Skin } from "@/app/utils/api-data-class";

export default function skinDetails() {
    return (
        <main className="m-0 p-0">
             <SkinChromas></SkinChromas>
             <SkinChromaVideos></SkinChromaVideos>
             <SkinLevelVideos></SkinLevelVideos>
        </main>
   
);
}