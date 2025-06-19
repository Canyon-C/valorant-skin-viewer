"use client";
import { useState } from "react";
import Link from "next/link";

// --- Button Component ---

const StyledButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`filter-button hover:cursor-pointer transition-all duration-200 text-white relative overflow-hidden w-fit text-left font-medium py-2 pr-4 text-base ${isHovering ? 'animate-active-state' : ''}`}
    >
      <div className={`filter-button-line filter-button-line-large ${isHovering ? 'filter-button-line-active' : ''}`}></div>
      <div className={`filter-button-bg ${isHovering ? 'filter-button-bg-active' : ''}`}></div>
      <p className="text-left font-medium relative z-10 text-lg md:text-xl px-7">{children}</p>
    </Link>
  );
};

// --- Main Component ---

export const HomeButtons = () => (
  <div className="flex flex-col space-y-4 items-start">
    <StyledButton href="/?view=skins">
      Skin Viewer
    </StyledButton>
    <StyledButton href="/featured">
      Featured Bundle
    </StyledButton>
  </div>
);
