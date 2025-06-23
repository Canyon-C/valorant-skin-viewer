
// --- Type Definitions ---

export type BundleItem = {
  uuid: string
  name: string
  image: string
  type: string
  amount: number
  discount_percent: number
  base_price: number
  discounted_price: number
  promo_item: boolean
}

type SkinBundle = {
  bundle_uuid: string
  bundle_price: number
  whole_sale_only: boolean
  items: BundleItem[]
  seconds_remaining: number
  expires_at: string
}

type ApiResponse = {
  status: number
  data: SkinBundle[]
}

type ValApiBundle = {
  uuid: string
  displayName: string
  displayNameSubText: string | null
  description: string
  extraDescription: string
  promoDescription: string
  useAdditionalContext: boolean
  displayIcon: string
  displayIcon2: string
  logoIcon: string | null
  verticalPromoImage: string
  assetPath: string
}

export type Bundle = {
  uuid: string
  name: string
  image: string
  base_price?: number
  bundleItems?: BundleItem[]
}

// --- API Fetching Function ---
const call = async (): Promise<ApiResponse | null> => {
  try {
    const response = await fetch(
      "https://api.henrikdev.xyz/valorant/v2/store-featured",
      {
        method: "GET",
        headers: {
          Authorization: process.env.API_KEY as string,
        },
        cache: "no-store",
      }
    )

    if (!response.ok) {
      console.error(`henrikdev API error! status: ${response.status}`)
      return null
    }

    const rawData: ApiResponse = await response.json()
    return rawData
  } catch (error) {
    console.error("Failed to call henrikdev API:", error)
    return null
  }
}

export async function getFeaturedBundle(): Promise<Bundle | null> {
  // 1) Get HenrikDev featured-store data
  const rawData = await call()
  if (!rawData || rawData.status !== 200 || rawData.data.length === 0) {
    console.error("No featured bundle data from henrikdev API")
    return null
  }
  const featuredStoreData = rawData.data[0]

  // 2) Fetch full bundle details from valorant-api.com
  const valApiRes = await fetch(
    `https://valorant-api.com/v1/bundles/${featuredStoreData.bundle_uuid}`
  )
  if (!valApiRes.ok) {
    console.error(`valorant-api error! status: ${valApiRes.status}`)
    return null
  }
  const valRaw = await valApiRes.json()
  const valBundleData: ValApiBundle = valRaw.data

  // 3) Merge and return
  return {
    uuid: valBundleData.uuid,
    name: valBundleData.displayName,
    image: valBundleData.displayIcon,
    base_price: featuredStoreData.bundle_price,
    bundleItems: featuredStoreData.items,
  }
}
