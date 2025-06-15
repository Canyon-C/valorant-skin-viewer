export const runtime = "edge";

type Item = {
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
  items: Item[];
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

export async function GET() {
  try {
    const response = await fetch(
      "https://api.henrikdev.xyz/valorant/v2/store-featured",
      {
        method: "GET",
        headers: {
          Authorization: process.env.API_KEY as string,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const rawData: ApiResponse = await response.json();
    const bundleData: SkinBundle[] = rawData.data;
    
    const val_api_response = await fetch(`https://valorant-api.com/v1/bundles`);
    
    if (!val_api_response.ok) {
      throw new Error(`HTTP error! status: ${val_api_response.status}`);
    }
    
    const valRawData = await val_api_response.json();
    const valBundleData: ValApiBundle[] = valRawData.data;
    
    const processedBundles = valBundleData.map((bundle) => {
      const isFeatured = bundle.uuid === bundleData[0].bundle_uuid;
      return {
        uuid: bundle.uuid, // Added UUID
        name: bundle.displayName,
        image: bundle.displayIcon,
        base_price: isFeatured ? bundleData[0].bundle_price : undefined,
        bundleItems: isFeatured ? bundleData[0].items : undefined,
      };
    });
    
    return Response.json(processedBundles);
  } catch (error) {
    console.error('Bundle API error:', error);
    return Response.json({ error: 'Failed to fetch bundle data' }, { status: 500 });
  }
}
