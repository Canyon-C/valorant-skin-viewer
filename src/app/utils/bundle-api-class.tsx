require("dotenv").config();
import { ReactElement } from "react";
import Image from "next/image";

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
          width={510}
          height={510}
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
          <img
            className="border"
            alt={bundle.name}
            key={index}
            src={bundle.image}
          ></img>
        );
      }
    });
    return this.featuredBundleDisplayImage;
  }

  renderFeaturedBundleItems() {
    this.data.map((bundle, index) => {
      if (bundle.bundleItems && bundle.bundleItems[0].image !== undefined) {
        bundle.bundleItems.map((bundleItem) => {
          this.featuredBundleItems.push(
            <img
              className="object-contain"
              alt={bundleItem.name}
              key={index}
              src={bundleItem.image}
            ></img>
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
    // console.log("Raw Data", rawData.data);
    // console.log("Bundle Data:", bundleData);
    // console.log("Featured Bundle UUID", bundleData[0].bundle_uuid);
    // console.log(
    //   "Images",
    //   bundleData[0].items.map((item) => item.image)
    // );
    this.renderInstance = new RenderAllBundles(
      valBundleData.map((bundle) => {
        const isFeatured = bundle.uuid === bundleData[0].bundle_uuid;
        return new Bundle(bundle, isFeatured ? bundleData : undefined);
      })
    );
  }
}
