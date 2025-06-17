"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FeaturedBundleProps = {
  name: string;
  image: string;
  price?: number;
};

export const FeaturedBundle = ({ name, image, price }: FeaturedBundleProps) => {
  const [isContentHovering, setIsContentHovering] = useState<boolean>(false);
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
    <div className="w-full bg-black border-t-2 border-r-0 border-b-2 border-l-2 border-[#ff4654] pt-3 pl-3 pb-3">
      {/* Header Button */}
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsButtonHovering(true)}
        onMouseLeave={() => setIsButtonHovering(false)}
        className={`filter-button hover:cursor-pointer transition-all duration-200 text-white relative overflow-hidden w-full pr-3 py-1 text-left text-sm font-medium mb-3 ${isButtonHovering ? 'animate-active-state' : ''}`}
      >
        <div className={`filter-button-line ${isButtonHovering ? 'filter-button-line-active' : ''}`}></div>
        <div className={`filter-button-bg ${isButtonHovering ? 'filter-button-bg-active' : ''}`}></div>
        <p className="text-left text-sm font-medium relative z-10 pl-6">Featured Bundle</p>
      </div>

      {/* Bundle Content */}
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsContentHovering(true)}
        onMouseLeave={() => setIsContentHovering(false)}
        className="cursor-pointer"
      >
        {/* Bundle Image */}
        <div className="mb-3">
          <img 
            src={image} 
            alt={name}
            className="w-full rounded" // Changed h-24 to h-48
          />
        </div>

        {/* Bundle Name */}
        <p className="text-white text-sm font-medium mb-2 text-left">{name}</p>

        {/* Bundle Price */}
        {price && (
          <p className="text-[#ff4654] text-sm font-semibold text-left">
            {price.toLocaleString()} VP
          </p>
        )}
      </div>
    </div>
  );
};
