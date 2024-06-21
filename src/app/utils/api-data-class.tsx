
import { Dispatch, SetStateAction } from 'react';
import { SkinCard } from '../ui/card-outlines/skinCard';
// import { Filters } from '../ui/filters/filters';
import Image from 'next/image';
import { inherits } from 'util';
import { PopcornIcon } from 'lucide-react';

type RawSkinData = {
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

type skinFilters = {
    Odin: string,
    Vandal: string,
    Bulldog: string,
    Guardian: string,
    Ares: string,
    Operator: string,
    Outlaw: string,
    Marshal: string,
    Judge: string,
    Bucky: string,
    Spectre: string,
    Stinger: string,
    Sheriff: string,
    Ghost: string,
    Frenzy: string,
    Shorty: string,
    Classic: string,
    Melee: string,
}

export enum WeaponType {
    Odin = "Odin",
    Vandal = "Vandal",
    Bulldog = "Bulldog",
    Guardian = "Guardian",
    Ares = "Ares",
    Operator = "Operator",
    Outlaw = "Outlaw",
    Marshal = "Marshal",
    Judge = "Judge",
    Bucky = "Bucky",
    Spectre = "Spectre",
    Stinger = "Stinger",
    Sheriff = "Sheriff",
    Ghost = "Ghost",
    Frenzy = "Frenzy",
    Shorty = "Shorty",
    Classic = "Classic",
    Melee = "Melee",
}


enum BundleType {
    Aemondir = "Aemondir",
    Holomoku = "Holomoku",
    Mystbloom_Bundle = "Mystbloom Bundle",
    Switchback = "Switchback",
    Sovereign_EP_8 = "Sovereign EP 8",
    Fortunes_Hand = "Fortune's Hand",
    Primordium = "Primordium",
    Xerofang = "Xerofang",
    Emberclad = "Emberclad",
    Kuronami = "Kuronami",
    Overdrive = "Overdrive",
    Chromedek = "Chromedek",
    Sentinels_of_Light_EP_7 = "Sentinels of Light EP 7",
    Valiant_Hero = "Valiant Hero",
    Orion = "Orion",
    Gaias_Vengeance_EP_7 = "Gaia's Vengeance EP 7",
    Intergrade = "Intergrade",
    Imperium = "Imperium",
    Daydreams = "Daydreams",
    Champions_2023 = "Champions 2023",
    Ignite = "Ignite",
    Neo_Frontier = "Neo Frontier",
    NO_LIMITS = "NO LIMITS",
    Magepunk_EP_6 = "Magepunk EP 6",
    Radiant_Entertainment_System = "Radiant Entertainment System",
    Black_Market = "Black Market",
    Altitude = "Altitude",
    Oni_EP_6 = "Oni EP 6",
    Reverie = "Reverie",
    VCT_LOCK_IN = "VCT LOCK//IN",
    Luna = "Luna",
    Araxys = "Araxys",
    Cryostasis = "Cryostasis",
    Abyssal = "Abyssal",
    Soulstrife = "Soulstrife",
    Ion_EP_5 = "Ion EP 5",
    Crimsonbeast = "Crimsonbeast",
    ChronoVoid = "ChronoVoid",
    Kohaku__Matsuba = "Kohaku & Matsuba",
    Champions_2022 = "Champions 2022",
    Reaver_EP_5 = "Reaver EP 5",
    Sarmad = "Sarmad",
    Prelude_to_Chaos = "Prelude to Chaos",
    Xenohunter = "Xenohunter",
    Neptune = "Neptune",
    Titanmail = "Titanmail",
    RGX_11z_Pro_EP_4 = "RGX 11z Pro EP 4",
    Doodle_Buds = "Doodle Buds",
    Endeavour = "Endeavour",
    Team_Ace = "Team Ace",
    Gaias_Vengeance = "Gaia's Vengeance",
    Undercity = "Undercity",
    Tigris = "Tigris",
    Protocol_781_A = "Protocol 781-A",
    Snowfall = "Snowfall",
    Champions_2021 = "Champions 2021",
    Magepunk_EP_3 = "Magepunk EP 3",
    Arcane = "Arcane",
    Radiant_Crisis_001 = "Radiant Crisis 001",
    Nunca_Olvidados = "Nunca Olvidados",
    RGX_11z_Pro = "RGX 11z Pro",
    VALORANT_GO_Vol_2 = "VALORANT GO! Vol. 2",
    Spectrum = "Spectrum",
    Recon = "Recon",
    Sakura = "Sakura",
    Sentinels_of_Light = "Sentinels of Light",
    Ruination = "Ruination",
    Origin = "Origin",
    Tethered_Realms = "Tethered Realms",
    Minima = "Minima",
    Forsaken = "Forsaken",
    Silvanus = "Silvanus",
    Magepunk = "Magepunk",
    Infantry = "Infantry",
    Prime_20 = "Prime 2.0",
    VALORANT_GO_Vol_1 = "VALORANT GO! Vol. 1",
    Celestial = "Celestial",
    Glitchpop_EP_2 = "Glitchpop EP 2",
    Horizon = "Horizon",
    Prism_II = "Prism II",
    BlastX = "BlastX",
    Winterwunderland = "Winterwunderland",
    Sensation = "Sensation",
    Wasteland = "Wasteland",
    Ion = "Ion",
    Reaver = "Reaver",
    Singularity = "Singularity",
    Gravitational_Uranium_Neuroblaster = "Gravitational Uranium Neuroblaster",
    Smite = "Smite",
    Ego = "Ego",
    Spline = "Spline",
    Nebula = "Nebula",
    Glitchpop = "Glitchpop",
    Oni = "Oni",
    Elderflame = "Elderflame",
    Prism = "Prism",
    Sovereign = "Sovereign",
    Prime = "Prime",
    Standard = "Standard",
}

class Skin {
    displayName: string;
    fullRender: string;
    uuid: string;
    bundle: BundleType;
    weapon: WeaponType;
    

    constructor(data: RawSkinData) {
        this.fullRender = data.displayIcon === null ? data.chromas[0].fullRender : data.displayIcon;
        this.displayName = data.displayName;
        this.uuid = data.uuid;

        const names = this.displayName.split(/(?=[^ ]*$)/);
        this.bundle = names[0] as BundleType;
        this.weapon = names[1] as WeaponType;
    }


}



enum FilterName {
    Odin = "Odin",
    Vandal = "Vandal",
    Bulldog = "Bulldog",
    Guardian = "Guardian",
    Ares = "Ares",
    Operator = "Operator",
    Outlaw = "Outlaw",
    Marshal = "Marshal",
    Judge = "Judge",
    Bucky = "Bucky",
    Spectre = "Spectre",
    Stinger = "Stinger",
    Sheriff = "Sheriff",
    Ghost = "Ghost",
    Frenzy = "Frenzy",
    Shorty = "Shorty",
    Classic = "Classic",
    Melee = "Melee",
}



export class ApiData {

   data: Skin[] = [];
   appliedFilters: FilterName[] = [];
   rawData: Skin[] = [];

   constructor() {
    
   }   

    async getData () {
        const axios = require('axios');
        const response = await axios.get('https://valorant-api.com/v1/weapons/skins');
        const skinsData: RawSkinData[] = response.data.data;
        this.rawData = skinsData.map((skin, _) => (new Skin(skin)));
    }

    async populateData() {
        if (this.data.length !== 0) {
            for (var i = 0; i < 12; i++) {
                this.data.shift()
                console.log(this.data.length);
            }
           
        }
        for (var i = 0; i < 12; i++) {
            this.data.push(this.rawData[i])
            this.rawData.shift();
        }

        
        // console.log(this.data);
        // console.log(this.data.slice(0, 13));
    }
        
     

    async getSkins() {
        if (this.data.length === 0) {
            await this.getData();
            
            
        }
        this.populateData();
        return(
            // className="w-full h-auto max-w-full"
            this.data.map((skin, index) => {
                if (skin.displayName.includes("Standard") || skin.displayName === "Random Favorite Skin") {
                    return;
                }
                return(
                    <div key={index} className="w-fit h-full flex justify-center items-center">
                        <SkinCard>
                            <div className="flex flex-col w-full h-full justify-center items-center gap-10 flex-wrap ">
                                <header className="text-white text-center w-fit text-xl">{skin.displayName}</header>
                                <Image className="object-contain w-4/5 h-3/5" src={`${skin.fullRender}`} alt={`${skin.displayName}`} width={512} height={128} loading="lazy"/>
                            
                            </div>
                        </SkinCard>
                    </div>
                );
            })
        );
    }
}
