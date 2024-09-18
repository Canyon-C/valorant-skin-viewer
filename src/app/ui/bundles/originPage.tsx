import {
  FetchData,
  RenderAllBundles,
  Bundle,
} from "@/app/utils/bundle-api-class";
import { BundleImages } from "./bundle-image";
import { ReactElement } from "react";
import { FeaturedBundleItems } from "./featured-bundle-items";
import { FeaturedBundleDisplay } from "./featured-bundle-display";
import { BundleHeader } from "./bundle-header";

export const OriginPage = async () => {
  let classInstance: RenderAllBundles = {} as RenderAllBundles;
  let images: ReactElement[] = [];
  let allBundlenames: string[] = [];
  let featuredBundleDisplayImage: JSX.Element[] = [];
  let featuredBundleItemImages: JSX.Element[] = [];
  let featuredBundleDisplayImageName: string;
  const initialize = async () => {
    const instance = new FetchData();
    await instance.getData();
    classInstance = instance.renderInstance;
  };

  await initialize();
  images = classInstance.renderBundles();
  allBundlenames = classInstance.renderBundleNames();
  featuredBundleItemImages = classInstance.renderFeaturedBundleItems();
  featuredBundleDisplayImageName = classInstance.getFeaturedBundleDisplayName();
  featuredBundleDisplayImage = classInstance.renderFeaturedBundleDisplayImage();
  return (
    <>
      <p className="absolute textAccent text-sm md:text-base px-1">Beta v1.1 | Safari bug fixes in progress.</p>
      <div className="py-10 ">
        <BundleHeader />
        <FeaturedBundleDisplay
          featuredBundleDisplayImage={featuredBundleDisplayImage}
          featuredBundleDisplayImageName={featuredBundleDisplayImageName}
        />

        <FeaturedBundleItems
          featuredBundleItemImages={featuredBundleItemImages}
        />
      </div>

      <BundleImages images={images} names={allBundlenames} />
    </>
  );
};
