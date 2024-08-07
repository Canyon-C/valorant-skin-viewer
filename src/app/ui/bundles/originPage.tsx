import {
  FetchData,
  RenderAllBundles,
  Bundle,
} from "@/app/utils/bundle-api-class";
import Image from "next/image";
import { BundleImages } from "./bundle-image";
import { ReactElement } from "react";

export const OriginPage = async () => {
  let classInstance: RenderAllBundles = {} as RenderAllBundles;
  let images: ReactElement[] = [];
  let names: string[] = [];
  let featuredBundleDisplayImage: JSX.Element[] = [];
  let featuredBundleItemImages: JSX.Element[] = [];
  const initialize = async () => {
    const instance = new FetchData();
    await instance.getData();
    classInstance = instance.renderInstance;
  };

  await initialize();
  images = classInstance.renderBundles();
  names = classInstance.renderBundleNames();
  featuredBundleItemImages = classInstance.renderFeaturedBundleItems();
  featuredBundleDisplayImage = classInstance.renderFeaturedBundleDisplayImage();
  return (
    <>
      <header className="text-3xl text-white text-center">
        Featured Bundle
      </header>
      <div className="flex justify-center align-center py-5">
        <div className="w-4/6">{featuredBundleDisplayImage}</div>
      </div>

      {/* <div className="flex w-60 border">{featuredBundleItemImages}</div> */}
      <BundleImages images={images} names={names} />
    </>
  );
};
