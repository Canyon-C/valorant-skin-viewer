"use client";

export const FeaturedBundleItems = ({
  featuredBundleItemImages,
}: {
  featuredBundleItemImages: JSX.Element[];
}) => {
  return (
    <div className="flex flex-wrap justify-center items-center w-full py-5">
      {featuredBundleItemImages}
    </div>
  );
};
