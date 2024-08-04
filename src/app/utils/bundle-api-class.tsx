require("dotenv").config();
import { ReactElement } from "react";

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
  data: Bundle[];
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

type FinalizedFeaturedBundle = {
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

class Bundle {
  name: string;
  image: string;
  // base_price: number;
  // bundleItems: Item[];

  constructor(data: ValApiBundle) {
    this.name = data.displayName;
    this.image = data.displayIcon;
    // this.base_price = data[0].bundle_price;
    // this.bundleItems = data[0].items;
  }
}

// class AllBundles {
//   allBundles: ValApiResponse;

//   constructor(bundles: ValApiResponse) {
//     this.allBundles = bundles;
//   }
// }

export class RenderAllBundles {
  data: Bundle[];
  bundleImages: ReactElement[] = [];

  constructor(bundleData: Bundle[]) {
    this.data = bundleData;
  }

  renderBundles() {
    this.data.map((bundle, index) => {
      this.bundleImages.push(
        <img key={index} alt={bundle.name} src={bundle.image}></img>
      );
    });
    // console.log(this.bundleImages);
    return this.bundleImages;
  }
}

// class RenderFeaturedBundle {
//   data: FeaturedBundle;

//   constructor(data: FeaturedBundle) {
//     this.data = data;
//   }

//   renderFeaturedBundle() {
//     return <div>{}</div>;
//   }
// }

export class FetchData {
  async getData() {
    // console.log("rendering Bundles");
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
    const bundleData: Bundle[] = rawData.data;
    console.log("Fetching Data");
    const val_api_response = await fetch(
      `https://valorant-api.com/v1/bundles`,
      {
        cache: "force-cache",
      }
    );

    const valRawData = await val_api_response.json();
    const valBundleData: ValApiBundle[] = valRawData.data;
    return new RenderAllBundles(
      valBundleData.map((bundle) => new Bundle(bundle))
    );
  }
}
