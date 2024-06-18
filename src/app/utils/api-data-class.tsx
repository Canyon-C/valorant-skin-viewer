
// import React from 'react';
import { SkinCard } from '../ui/card-outlines/skinCard';

type Skins = {
    uuid: string;
    displayName: string;
    themeUuid: string;
    contentTierUuid: string;
    displayIcon: string;
    wallpaper: string | null;
    assetPath: string;
    chromas: Array<{
    uuid: string;
    displayName: string;
    displayIcon: string | null;
    fullRender: string;
    swatch: string | null;
    streamedVideo: string | null;
    assetPath: string;
    }>;
    levels: Array<{
    uuid: string;
    displayName: string;
    levelItem: string | null;
    displayIcon: string;
    streamedVideo: string | null;
    assetPath: string;
    }>;
}

enum weapons {
    Odin,
    Vandal,


}


export class ApiData {

   data: Skins[] = [];

   constructor() {}   

    getData = async () => {
        const axios = require('axios');
        const response = await axios.get('https://valorant-api.com/v1/weapons/skins');
        const skinsData: Skins[] = response.data.data;
        this.data = skinsData;
    }
        
     

    async getSkins() {
        if (this.data.length === 0) {
            await this.getData();
        }
        if (this.data.length > 0) {
            return(
                // className="w-full h-auto max-w-full"
                this.data.map((skin, index) => {
                    if (skin.displayIcon === null && skin.chromas.some((chroma) => chroma.fullRender != null) ) {
    
                        skin.chromas.map((chroma, index) => {
                            return(
                                <div key={skin.uuid} className="w-86 h-full flex justify-center items-center ">
                                     <SkinCard>
                                        <div className="flex flex-col justify-center items-center gap-16 ">
                                            <header className="text-white text-center w-fit text-xl">{skin.displayName}</header>
                                            <img className="object-contain w-full h-3/5" src={`${chroma.fullRender}`} alt={`${skin.displayName}`}/>
                                    
                                        </div>
                                    </SkinCard>
                                </div>
                               
                            
                            );
                        })
                        
                    } else {
                        if (skin.displayName.includes("Standard") || skin.displayName === "Random Favorite Skin") {
                            return;
                        }
                        return(
                            <div key={index} className="w-fit h-full flex justify-center items-center">
                                <SkinCard>
                                    <div className="flex flex-col w-full h-full justify-center items-center gap-10 flex-wrap ">
                                        <header className="text-white text-center w-fit text-xl">{skin.displayName}</header>
                                        <img className="object-contain w-4/5 h-3/5" src={`${skin.displayIcon}`} alt={`${skin.displayName}`}/>
                                
                                    </div>
                                </SkinCard>
                            </div>
                            
                        
                        );
                    }
                    
                })
    
    
                       
               
    
                    
                
            
            
            
            );
    
        }
    }
}

