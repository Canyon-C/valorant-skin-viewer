import {
  FetchData,
  RenderAllBundles,
  Bundle,
} from "@/app/utils/bundle-api-class";
import Image from "next/image";
import { BundleImages } from "./bundle-image";
import { ReactElement } from "react";
import { FeaturedBundleItems } from "./featured-bundle-items";
import { FeaturedBundleDisplay } from "./featured-bundle-display";

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
      <div className="py-10">
        <header className="text-3xl text-white text-center pb-5">
          Featured Bundle
        </header>

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
