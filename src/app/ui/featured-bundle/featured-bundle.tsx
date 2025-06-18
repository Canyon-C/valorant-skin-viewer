"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FeaturedBundleProps = {
  name: string;
  image: string;
  price?: number;
  largeButton?: boolean;
};

export const FeaturedBundle = ({ name, image, price, largeButton }: FeaturedBundleProps) => {
  const [isButtonHovering, setIsButtonHovering] = useState<boolean>(false);
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
      {/* Left side: Info */}
      <div className="flex flex-col items-center md:items-start gap-2 text-white order-2 md:order-2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
        {price && (
          <p className="text-lg md:text-xl text-[#ff4654]">
            {price.toLocaleString()} VP
          </p>
        )}
        <div
          onClick={handleClick}
          onMouseEnter={() => setIsButtonHovering(true)}
          onMouseLeave={() => setIsButtonHovering(false)}
          className={`filter-button hover:cursor-pointer transition-all duration-200 text-white relative overflow-hidden w-fit text-left font-medium mt-2 ${isButtonHovering ? 'animate-active-state' : ''} ${largeButton ? 'py-2 pr-4 text-base' : 'py-1 pr-3 text-sm'}`}
        >
          <div className={`filter-button-line ${isButtonHovering ? 'filter-button-line-active' : ''} ${largeButton ? 'filter-button-line-large' : ''}`}></div>
          <div className={`filter-button-bg ${isButtonHovering ? 'filter-button-bg-active' : ''}`}></div>
          <p className={`text-left font-medium relative z-10 ${largeButton ? 'text-lg md:text-xl px-7' : 'text-base px-5'}`}>View in Skin Viewer</p>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="w-full md:w-1/4 order-1 md:order-1">
        <img 
          src={image} 
          alt={name}
          className="w-full rounded"
        />
      </div>
    </div>
  );
};
