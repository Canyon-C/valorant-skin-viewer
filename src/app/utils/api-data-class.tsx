import Image from "next/image";
import { ReactElement } from "react";

// --- Type Definitions ---

export type RawSkinData = {
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
};

// --- Enums ---

export enum WeaponType {
  Odin = "Odin",
  Vandal = "Vandal",
  Phantom = "Phantom",
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

export enum BundleType {
  Aemondir = "Aemondir",
  Holomoku = "Holomoku",
  Mystbloom = "Mystbloom",
  Switchback = "Switchback",
  Fortunes_Hand = "Fortune's Hand",
  Primordium = "Primordium",
  XERØFANG = "XERØFANG",
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

// --- Data Processing Classes ---

/**
 * Processes raw skin data from the Valorant API into a more usable format.
 * Extracts details like renders, videos, and attempts to parse bundle/weapon names.
 */
export class Skin {
  displayName: string;
  fullRender: string;
  uuid: string;
  chromaRenders: string[];
  chromaVideos: (string | null)[];
  levelVideos: (string | null)[];
  chromaSwatches: (string | null)[];
  bundle: BundleType;
  weapon: WeaponType;

  constructor(data: RawSkinData) {
    this.fullRender =
      data.displayIcon === null ? data.chromas[0].fullRender : data.displayIcon;
    this.displayName = data.displayName.trim();
    this.uuid = data.uuid;
    this.chromaRenders = data.chromas.map((chroma) => {
      return chroma.fullRender;
    });
    this.chromaVideos = data.chromas.map((chroma) => {
      return chroma.streamedVideo;
    });
    this.levelVideos = data.levels.map((levels) => {
      return levels.streamedVideo;
    });
    this.chromaSwatches = data.chromas.map((chroma) => {
      return chroma.swatch;
    });

    const names = this.displayName.split(/ (?!.* )/);
    this.bundle = BundleType[names[0] as keyof typeof BundleType];

    this.weapon = WeaponType[names[1] as WeaponType];
    if (this.weapon === undefined) {
      this.weapon = WeaponType.Melee;
    }
  }
}

/**
 * Manages a collection of skins, providing methods to filter and render them as React elements.
 */
export class RenderData {
  data: Skin[];
  elements: ReactElement[] = [];
  filteredData: Skin[] = [];
  constructor(data: Skin[]) {
    this.data = data;
  }

  /**
   * Filters skins based on weapon type and search query, then maps them to React elements for display.
   * @param filterProp - Array of weapon types to filter by.
   * @param searchQuery - String to search for in skin display names and bundle names.
   * @param onSkinClick - Callback function to execute when a skin is clicked.
   * @returns An array of React elements representing the filtered skins.
   */
  async renderSkins(
    filterProp: WeaponType[],
    searchQuery?: string | null,
    onSkinClick?: (uuid: string) => void
  ) {
    this.elements = [];
    let skinsToRender = this.data;

    // 1. Filter by search query if provided
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase().replace(/\+/g, " ");
      skinsToRender = skinsToRender.filter((skin) => {
        const lowerCaseDisplayName = skin.displayName.toLowerCase();
        const lowerCaseBundle = skin.bundle?.toLowerCase();

        return (
          lowerCaseDisplayName.includes(lowerCaseQuery) ||
          (lowerCaseBundle && lowerCaseBundle.includes(lowerCaseQuery))
        );
      });
    }

    // 2. Filter by weapon type if any are selected
    if (filterProp.length > 0) {
      skinsToRender = skinsToRender.filter((skin) =>
        filterProp.includes(skin.weapon)
      );
    }

    this.filteredData = skinsToRender;

    // 3. Filter out standard/random skins and map to React elements
    this.elements = this.filteredData
      .filter(
        (skin) =>
          !skin.displayName.includes("Standard") &&
          skin.displayName !== "Random Favorite Skin"
      )
      .map((skin) => (
        <div
          key={skin.uuid}
          className="relative overflow-hidden bg-black cursor-pointer transition-all duration-200 hover:shadow-[0_0_0_2px_theme(colors.floodRed)]"
          onClick={() => onSkinClick?.(skin.uuid)}
        >
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center h-full p-2">
            <Image
              className="object-contain w-full h-32"
              src={skin.fullRender}
              alt={skin.displayName}
              width={300}
              height={100}
              loading="lazy"
            />
            <p className="text-white text-center mt-1 text-sm font-medium truncate w-full">
              {skin.displayName}
            </p>
          </div>
        </div>
      ));

    return this.elements;
  }
}

/**
 * Fetches all weapon skins from the Valorant API.
 */
export class ApiData {
  async getData() {
    const response = await fetch("https://valorant-api.com/v1/weapons/skins", {
      cache: "force-cache",
    });
    const rawData = await response.json();
    const skinsData: RawSkinData[] = rawData.data;

    return new RenderData(skinsData.map((skin, index) => new Skin(skin)));
  }
}