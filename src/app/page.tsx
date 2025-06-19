"use client";
import { LazyRender } from "./utils/intersection-observer";
import { Input } from "./ui/search/input";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Filters } from "./ui/filters/filters";
import { OverlayProvider } from "./utils/overlay-context";
import { SkinOverlay } from "./ui/overlay/skin-overlay";
import localFont from "next/font/local";
import { HomeButtons } from "./ui/home/home-buttons";

const valorantFont = localFont({ src: "./font/Valorant Font.ttf" });

export const runtime = "edge";

export default function Landing() {
  const searchParams = useSearchParams();
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

  // This part for the initial landing page is unchanged.
  if (!searchParams.has("view")) {
    return (
      <main className="m-0 p-0 bg-black h-screen flex flex-col justify-center items-center overflow-hidden">
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
  }

  return (
    <OverlayProvider>
      <main className="m-0 p-0 bg-black h-screen flex flex-col overflow-hidden">
        <Suspense
          fallback={
            <div className="text-white w-full text-center p-10">
              Loading content...
            </div>
          }
        >
          {/* 
            Desktop Filters Menu: Fixed position relative to viewport
            CHANGED: Now appears at the 'lg' (1024px) breakpoint.
          */}
          <div
            className="hidden lg:block fixed z-30 bg-black p-2 overflow-y-auto no-scrollbar" // <-- CHANGED from md:block
            style={{
              width: "8rem",
              top: "3rem",
              height: "100vh",
              left: `calc(20vw - 8.3rem)`,
            }}
          >
            <Filters alwaysOpen={true} />
          </div>

          {/* 
            Mobile Filters Menu
            CHANGED: Now only appears on screens smaller than 'lg' (1024px).
          */}
          {isMobileMenuOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/80" // <-- CHANGED from md:hidden
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div
                className="fixed z-50 bg-black p-4 overflow-y-auto no-scrollbar w-64 h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Filters alwaysOpen={true} />
              </div>
            </div>
          )}

          {/* Main scrollable content area (Search bar + Grid) */}
          <div className="flex-grow overflow-y-auto no-scrollbar">
            {/* Search Bar: Sticky to the top */}
            <div className="sticky top-0 z-20 bg-black py-3 shadow-md">
              <div className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto flex items-center gap-2">
                {/* 
                  Hamburger Button
                  CHANGED: Now hides at the 'lg' (1024px) breakpoint.
                */}
                <button
                  className="lg:hidden p-1 text-white" // <-- CHANGED from md:hidden
                  onClick={() => setIsMobileMenuOpen(true)}
                >
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
                </button>
                <div className="flex-grow">
                  <Input
                    type="search"
                    className="bg-neutral-900 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Content Grid Area */}
            <div className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto p-4">
              <LazyRender />
            </div>
          </div>
        </Suspense>
        <SkinOverlay />
      </main>
    </OverlayProvider>
  );
}