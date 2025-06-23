import { FeaturedBundle } from "../ui/featured-bundle/featured-bundle"
import { FeaturedBundleItems } from "../ui/featured-bundle/featured-bundle-items"
import { getFeaturedBundle } from "../utils/bundle-api-class"

export const runtime = "edge"

// --- Reusable UI Components ---

const NoBundleAvailable = () => (
  <main className="m-0 p-0 bg-black h-screen flex flex-col justify-center items-center overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <div className="text-white">
      No featured bundle available at the moment.
    </div>
  </main>
)

const BundleItem = ({ item }: { item: any }) => (
  <div className="flex flex-col items-center p-4 w-2/5 md:w-1/3 lg:w-1/5">
    {item.image ? (
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-contain mb-2"
      />
    ) : (
      <p className="text-white w-full h-48 mb-2 flex justify-center items-center">
        Image not available
      </p>
    )}
    <p className="text-white text-center">{item.name}</p>
    <p className="text-red-500 text-center">{item.base_price} VP</p>
  </div>
)

// --- Main Page Component ---

export default async function FeaturedPage() {
  const apiKey = process.env.API_KEY

  if (!apiKey) {
    // This log is critical. It will appear in your Cloudflare deployment logs.
    console.error(
      "CRITICAL: API_KEY environment variable is NOT available in the Edge runtime.",
    )
    return null
  } else {
    // This log helps confirm the key IS present but might be wrong.
    // We only log the first few chars for security.
    console.log(`API_KEY is present. Starts with: ${apiKey.substring(0, 4)}...`)
  }
  const featuredBundle = await getFeaturedBundle()

  if (!featuredBundle) {
    return <NoBundleAvailable />
  }

  const bundleItems =
    featuredBundle.bundleItems
      ?.slice()
      .reverse()
      .map((item) => <BundleItem key={item.uuid} item={item} />) || []

  return (
    <main className="m-0 p-0 bg-black h-screen overflow-y-auto flex flex-col items-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <FeaturedBundle
        name={featuredBundle.name}
        image={featuredBundle.image}
        price={featuredBundle.base_price}
        largeButton={true}
      />
      {bundleItems.length > 0 && (
        <FeaturedBundleItems>{bundleItems}</FeaturedBundleItems>
      )}
    </main>
  )
}
