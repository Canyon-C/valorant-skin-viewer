require("dotenv").config();
import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";

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

export class Bundle {
  name: string;
  image: string;
  base_price?: number;
  bundleItems?: Item[];

  constructor(data: ValApiBundle, featuredBundle?: SkinBundle[]) {
    this.name = data.displayName;
    this.image = data.displayIcon;
    if (featuredBundle) {
      this.base_price = featuredBundle[0].bundle_price;
      this.bundleItems = featuredBundle[0].items;
    }
  }
}

export class RenderAllBundles {
  data: Bundle[];
  bundleImages: ReactElement[] = [];
  bundleNames: string[] = [];
  featuredBundleItems: ReactElement[] = [];
  featuredBundleDisplayImage: ReactElement[] = [];
  bundleItemNames: ReactElement[] = [];
  featuredBundleDisplayName: string = "";

  constructor(bundleData: Bundle[]) {
    this.data = bundleData;
  }

  renderBundles() {
    this.data.map((bundle, index) => {
      this.bundleImages.push(
        <Image
          key={index}
          alt={bundle.name}
          src={bundle.image}
          width={500}
          height={300}
          className="h-full"
        ></Image>
      );
    });
    return this.bundleImages;
  }

  renderBundleNames() {
    this.data.map((bundle, index) => {
      this.bundleNames.push(bundle.name);
    });
    return this.bundleNames;
  }

  renderFeaturedBundleDisplayImage() {
    this.data.map((bundle, index) => {
      if (bundle.bundleItems && bundle.bundleItems[0].image !== undefined) {
        this.featuredBundleDisplayImage.push(
          <Link
            className=""
            href={`./skin?query=${bundle.name.replace("//", "")}`}
          >
            <img
              alt={bundle.name}
              src={bundle.image}
              className="object-fill"
            ></img>
          </Link>
        );
      }
    });
    return this.featuredBundleDisplayImage;
  }

  getFeaturedBundleDisplayName() {
    this.data.map((bundle, index) => {
      if (bundle.bundleItems && bundle.bundleItems[0].image !== undefined) {
        this.featuredBundleDisplayName = bundle.name;
      }
    });
    return this.featuredBundleDisplayName;
  }

  renderFeaturedBundleItems() {
    this.featuredBundleItems = [];

    this.data.forEach((bundle) => {
      if (bundle.bundleItems && bundle.bundleItems[0].image !== undefined) {
        bundle.bundleItems.forEach((bundleItem) => {
          this.featuredBundleItems.push(
            <div
              key={bundleItem.uuid}
              className="flex flex-col items-center p-4 w-5/6 md:w-1/3 lg:w-1/5"
            >
              <img
                alt={bundleItem.name}
                src={bundleItem.image}
                className="w-3/5 lg:w-full h-48 object-contain mb-2"
              />
              <p className="text-white text-center">{bundleItem.name}</p>
            </div>
          );
        });
      }
    });

    return this.featuredBundleItems;
  }
}

export class FetchData {
  renderInstance: RenderAllBundles = {} as RenderAllBundles;
  async getData() {
    const response = await fetch(
      "https://api.henrikdev.xyz/valorant/v2/store-featured",
      {
        method: "GET",
        headers: {
          Authorization: process.env.API_KEY as string,
        },
        cache: "force-cache",
      }
    );
    const rawData: ApiResponse = await response.json();
    const bundleData: SkinBundle[] = rawData.data;
    const val_api_response = await fetch(
      `https://valorant-api.com/v1/bundles`,
      {
        cache: "force-cache",
      }
    );

    const valRawData = await val_api_response.json();
    const valBundleData: ValApiBundle[] = valRawData.data;
    this.renderInstance = new RenderAllBundles(
      valBundleData.map((bundle) => {
        const isFeatured = bundle.uuid === bundleData[0].bundle_uuid;
        return new Bundle(bundle, isFeatured ? bundleData : undefined);
      })
    );
  }
}
