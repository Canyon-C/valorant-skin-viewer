// --- Type Definitions ---

export type BundleItem = {
  uuid: string;
  name: string;
  image: string;
  type: string;
  amount: number;
  discount_percent: number;
  base_price: number;
  discounted_price: number;
  promo_item: boolean;
};

type SkinBundle = {
  bundle_uuid: string;
  bundle_price: number;
  whole_sale_only: boolean;
  items: BundleItem[];
  seconds_remaining: number;
  expires_at: string;
};

type ApiResponse = {
  status: number;
  data: SkinBundle[];
};

type ValApiBundle = {
  uuid: string;
  displayName: string;
  displayNameSubText: string | null;
  description: string;
  extraDescription: string;
  promoDescription: string;
  useAdditionalContext: boolean;
  displayIcon: string;
  displayIcon2: string;
  logoIcon: string | null;
  verticalPromoImage: string;
  assetPath: string;
};

export type Bundle = {
  uuid: string;
  name: string;
  image: string;
  base_price?: number;
  bundleItems?: BundleItem[];
};

// --- API Fetching Function ---

export async function getFeaturedBundle(): Promise<Bundle | null> {
  try {
    // Fetch featured store data from HenrikDev API
    const response = await fetch(
      "https://api.henrikdev.xyz/valorant/v2/store-featured",
      {
        method: "GET",
        headers: {
          Authorization: process.env.API_KEY as string,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(`henrikdev API error! status: ${response.status}`);
      return null;
    }

    const rawData: ApiResponse = await response.json();
    if (rawData.status !== 200 || !rawData.data || rawData.data.length === 0) {
      console.error("No featured bundle data from henrikdev API");
      return null;
    }
    const featuredStoreData: SkinBundle = rawData.data[0];

    // Fetch bundle details from Valorant-API using the bundle UUID
    const val_api_response = await fetch(
      `https://valorant-api.com/v1/bundles/${featuredStoreData.bundle_uuid}`
    );

    if (!val_api_response.ok) {
      console.error(
        `valorant-api error! status: ${val_api_response.status}`
      );
      return null;
    }

    const valRawData = await val_api_response.json();
    const valBundleData: ValApiBundle = valRawData.data;

    // Combine data from both APIs and return
    return {
      uuid: valBundleData.uuid,
      name: valBundleData.displayName,
      image: valBundleData.displayIcon,
      base_price: featuredStoreData.bundle_price,
      bundleItems: featuredStoreData.items,
    };
  } catch (error) {
    console.error("Failed to fetch featured bundle:", error);
    return null;
  }
}