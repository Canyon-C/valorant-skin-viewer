import { LazyRender } from "./utils/intersection-observer";
import { Input } from "./ui/search/input";
import { Suspense } from "react";
import { Filters } from "./ui/filters/filters";
import { OverlayProvider } from "./utils/overlay-context";
import { SkinOverlay } from "./ui/overlay/skin-overlay";
import localFont from "next/font/local";
import { HomeButtons } from "./ui/home/home-buttons";

const valorantFont = localFont({ src: "./font/Valorant Font.ttf" });

export const runtime = "edge";

export default async function Landing({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams?.view) {
    return (
      <main className="m-0 p-0 bg-black h-screen flex flex-col justify-center items-center overflow-hidden">
        <div>
          <h1
            className={`${valorantFont.className} text-white text-8xl mb-4`}
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
        <Suspense fallback={<div className="text-white w-full text-center p-10">Loading content...</div>}>
          {/* Filters Menu: Fixed position relative to viewport */}
          <div
            className="fixed z-20 bg-black p-2 overflow-y-auto no-scrollbar"
            style={{
              width: "8rem",
              top: '-0.4rem', // Changed from '4rem'
              height: '100vh', // Changed from 'calc(100vh - 4rem)'
              left: `calc(20vw - 8.3rem)`, // Adjusted for 1rem padding
            }}
          >
            <Filters alwaysOpen={true} />
          </div>

          {/* Main scrollable content area (Search bar + Grid) */}
          <div className="flex-grow overflow-y-auto no-scrollbar">
            {/* Search Bar: Sticky to the top of this scrollable container */}
            <div className="sticky top-0 z-10 bg-black py-3 shadow-md">
              <div className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto">
                <Input
                  type="search"
                  className="w-full bg-neutral-900 text-white"
                />
              </div>
            </div>

            {/* Content Grid Area: LazyRender component handles its own width (60%) and centering (mx-auto) */}
            <div className="p-4"> 
              <LazyRender />
            </div>
          </div>
        </Suspense>
        <SkinOverlay />
      </main>
    </OverlayProvider>
  );
}