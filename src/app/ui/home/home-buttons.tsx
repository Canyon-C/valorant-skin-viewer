"use client";
import Link from "next/link";

// --- Button Component ---

const StyledButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="filter-button hover:cursor-pointer transition-all duration-200 text-white relative overflow-hidden w-fit text-left font-medium py-2 pr-4 text-base"
    >
      <div className="filter-button-line filter-button-line-large"></div>
      <div className="filter-button-bg"></div>
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
