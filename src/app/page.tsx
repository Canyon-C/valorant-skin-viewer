"use client";
import { LazyRender } from "./utils/intersection-observer";
import { Input } from "./ui/search/input";
import { Suspense, useState, useEffect, ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Filters } from "./ui/filters/filters";
import { OverlayProvider } from "./utils/grid";
import { SkinOverlay } from "./ui/overlay/skin-overlay";
import localFont from "next/font/local";
import { HomeButtons } from "./ui/home/home-buttons";

const valorantFont = localFont({ src: "../font/Valorant Font.ttf" });

export const runtime = "edge";

// --- Reusable UI Components ---

const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const DesktopFilters = () => (
  <div
    className="hidden lg:block fixed z-30 bg-black p-2 overflow-y-auto no-scrollbar"
    style={{
      width: "8rem",
      top: "3rem",
      height: "100vh",
      left: `calc(20vw - 8.3rem)`,
    }}
  >
    <Filters alwaysOpen={true} />
  </div>
);

const MobileMenu = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="lg:hidden fixed inset-0 z-40 bg-black/80"
      onClick={onClose}
    >
      <div
        className="fixed z-50 bg-black p-4 overflow-y-auto no-scrollbar w-64 h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const SearchBar = ({ onMenuOpen }: { onMenuOpen: () => void }) => (
  <div className="sticky top-0 z-20 bg-black py-3 shadow-md">
    <div className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto flex items-center gap-2">
      <button className="lg:hidden p-1 text-white" onClick={onMenuOpen}>
        <HamburgerIcon />
      </button>
      <div className="flex-grow">
        <Input type="search" className="bg-neutral-900 text-white" />
      </div>
    </div>
  </div>
);

const ContentGrid = () => (
  <div className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto p-4">
    <LazyRender />
  </div>
);

// --- Page Views ---

const LandingPage = () => (
  <main className="h-screen flex flex-col justify-center items-center">
    <div className="flex flex-col">
      <h1
        className={`${valorantFont.className} text-white text-6xl md:text-8xl mb-4`}
      >
        vAlskins
      </h1>
      <HomeButtons />
    </div>
  </main>
);

const AppView = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <OverlayProvider>
      <main className="h-screen flex flex-col">
        <DesktopFilters />

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <Filters alwaysOpen={true} />
        </MobileMenu>

        <div className="flex-grow overflow-y-auto no-scrollbar">
          <SearchBar onMenuOpen={() => setIsMobileMenuOpen(true)} />
          <ContentGrid />
        </div>

        <SkinOverlay />
      </main>
    </OverlayProvider>
  );
};

// --- Main Page Component ---

const PageContent = () => {
  const searchParams = useSearchParams();
  const hasView = searchParams.has("view");

  return hasView ? <AppView /> : <LandingPage />;
};

export default function Landing() {
  return (
    <Suspense
      fallback={
        <div className="text-white w-full text-center p-10">
          Loading content...
        </div>
      }
    >
      <PageContent />
    </Suspense>
  );
}