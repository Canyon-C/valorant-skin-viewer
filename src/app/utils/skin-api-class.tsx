import { RawSkinData, Skin } from "./api-data-class";
import { ReactElement } from "react";
import Image from 'next/image';

export class Render {
    data: Skin;
    skinChromas: ReactElement[] = [];
    skinChromaVideos: ReactElement[] = [];
    skinLevelVideos: ReactElement[] = [];
    constructor(data: Skin) {
        this.data = data;
    }

    renderSkinChromas() {
        this.data.chromaRenders.map((render, index) => {
            
            {this.skinChromas.push(
            <Image key={index} className="object-contain w-full" src={render} width={512} height={128} loading="lazy" alt={''}></Image>
            )}
            
            
        
        
    });
        return this.skinChromas;
    }

    renderChromaVideos() {
        this.data.chromaVideos.map((video, index) => {
            if (video !== null) {
                this.skinChromaVideos.push(
                    <video key={index} controls>
                        <source src={`${video}`} type="video/mp4" ></source>
                    </video>
                );
            }
            
        })
        return(this.skinChromaVideos);
    }

    renderLevelVideos() {
        this.data.levelVideos.map((levelVideo, index) => {
            if (levelVideo !== null) {
                this.skinLevelVideos.push(
                    <video key={index} width="" controls>
                        <source src={`${levelVideo}`} type="video/mp4" ></source>
                    </video>
                );
            }
            
        })
        return(this.skinLevelVideos);
    }
            

        
       

        
}

export class SkinApi {
    skin_uuid: string
    
    constructor(skin_uuid: string) {
        this.skin_uuid = skin_uuid;
    }

    async getData () {
        const response = await fetch(`https://valorant-api.com/v1/weapons/skins/${this.skin_uuid}`, {cache: 'force-cache'});
        const rawData = await response.json();
        const skinsData: RawSkinData = rawData.data;

        return new Render(new Skin(skinsData));
        
        

    }
}

export class ApiDataInstance {
    data: Render = {} as Render;
    apiData: SkinApi;

    constructor(uuid: string) {
        this.apiData = new SkinApi(uuid);

    }

   async initialize() {
        this.data = await this.apiData.getData();
    }
 

}