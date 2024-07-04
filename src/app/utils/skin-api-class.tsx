import { RawSkinData, Skin } from "./api-data-class";
import { ReactElement } from "react";
import Image from 'next/image';

export class Render {
    data: Skin;
    elements: ReactElement[] = [];
    constructor(data: Skin) {
        this.data = data;
    }

    renderSkinChromas() {
        this.data.chromaRenders.map((render, index) => {
            this.elements.push(
                <div key={index}>
]                   <Image src={render} width={512} height={128} loading="lazy" alt={''}></Image>
                </div>
            );
        })

        return this.elements;
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
    uuid: string;

    constructor(uuid: string) {
        this.uuid = uuid; 
    }
    
    async storeData() {
        const apiData = new SkinApi(this.uuid);
        this.data = await apiData.getData();
    }

}