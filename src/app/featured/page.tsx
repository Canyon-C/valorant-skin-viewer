import { FeaturedBundle } from "../ui/featured-bundle/featured-bundle";
import { FeaturedBundleItems } from "../ui/featured-bundle/featured-bundle-items";

export const runtime = "edge";

type Bundle = {
  uuid: string;
  name: string;
  image: string;
  base_price?: number;
  bundleItems?: BundleItem[];
};

type BundleItem = {
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

async function getFeaturedBundle(): Promise<Bundle | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/bundles`, {
      cache: 'no-store'
    });
    if (!response.ok) return null;
    
    const bundles: Bundle[] = await response.json();
    return bundles.find((bundle) => bundle.base_price !== undefined) || null;
  } catch (error) {
    console.error("Failed to fetch featured bundle:", error);
    return null;
  }
}

export default async function FeaturedPage() {
  const featuredBundle = await getFeaturedBundle();

  if (!featuredBundle) {
    return (
      <main className="m-0 p-0 bg-black h-screen flex flex-col justify-center items-center overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="text-white">
          No featured bundle available at the moment.
        </div>
      </main>
    );
  }

  const itemImages =
    featuredBundle.bundleItems?.slice().reverse().map((item) => {
      const itemImage = item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-contain mb-2"
        />
      ) : null;
      return (
        <div
          key={item.uuid}
          className="flex flex-col items-center p-4 w-2/5 md:w-1/3 lg:w-1/5"
        >
          {itemImage ? (
            itemImage
          ) : (
            <p className="text-white w-full h-48 mb-2 flex justify-center items-center">
              Image not available
            </p>
          )}
          <p className="text-white text-center">{item.name}</p>
          <p className="text-red-500 text-center">{item.base_price} VP</p>
        </div>
      );
    }) || [];

  return (
    <main className="m-0 p-0 bg-black h-screen overflow-y-auto flex flex-col items-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <FeaturedBundle
        name={featuredBundle.name}
        image={featuredBundle.image}
        price={featuredBundle.base_price}
        largeButton={true}
      />
      {featuredBundle.bundleItems && (
        <FeaturedBundleItems featuredBundleItemImages={itemImages} />
      )}
    </main>
  );
}
