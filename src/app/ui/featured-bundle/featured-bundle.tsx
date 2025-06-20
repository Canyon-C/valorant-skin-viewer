"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// --- Component Props ---
type FeaturedBundleProps = {
  name: string;
  image: string;
  price?: number;
  largeButton?: boolean;
};

// --- Reusable UI Components ---
const ViewButton = ({ onClick, largeButton }: { onClick: () => void; largeButton?: boolean }) => {
  const buttonSizeClasses = largeButton ? 'py-2 pr-4 text-base' : 'py-1 pr-3 text-sm';
  const textContainerSizeClasses = largeButton ? 'text-lg md:text-xl px-7' : 'text-base px-5';
  const lineSizeClasses = largeButton ? 'filter-button-line-large' : '';

  return (
    <div
      onClick={onClick}
      className={`filter-button hover:cursor-pointer transition-all duration-200 text-white relative overflow-hidden w-fit text-left font-medium mt-2 ${buttonSizeClasses}`}
    >
      <div className={`filter-button-line ${lineSizeClasses}`}></div>
      <div className="filter-button-bg"></div>
      <p className={`text-left font-medium relative z-10 ${textContainerSizeClasses}`}>View in Skin Viewer</p>
    </div>
  );
};

// --- Main Component ---
export const FeaturedBundle = ({ name, image, price, largeButton }: FeaturedBundleProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const cleanBundleName = name.replace("//", "");
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('query', cleanBundleName);
    currentParams.set('view', 'skins');
    router.push(`/?${currentParams.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full px-5 md:px-10 py-10">
      {/* Left side: Image */}
      <div className="w-full md:w-1/4 order-1">
        <img 
          src={image} 
          alt={name}
          className="w-full rounded"
        />
      </div>

      {/* Right side: Info */}
      <div className="flex flex-col items-center md:items-start gap-2 text-white order-2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
        {price && (
          <p className="text-lg md:text-xl text-[#ff4654]">
            {price.toLocaleString()} VP
          </p>
        )}
        <ViewButton onClick={handleClick} largeButton={largeButton} />
      </div>
    </div>
  );
};
