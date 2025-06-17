import { LazyRender } from "./utils/intersection-observer";
import { Input } from "./ui/search/input";
import { Suspense } from "react";
import { Filters } from "./ui/filters/filters";
import { OverlayProvider } from "./utils/overlay-context";
import { SkinOverlay } from "./ui/overlay/skin-overlay";
import { FeaturedBundle } from "./ui/featured-bundle/featured-bundle";

export const runtime = "edge";

type Bundle = {
  uuid: string;
  name: string;
  image: string;
  base_price?: number;
};

async function getFeaturedBundle(): Promise<Bundle | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/bundles`, {
      cache: 'no-store'
    });
    if (!response.ok) return null;
    
    const bundles: Bundle[] = await response.json();
    return bundles.find(bundle => bundle.base_price !== undefined) || null;
  } catch (error) {
    console.error('Failed to fetch featured bundle:', error);
    return null;
  }
}

export default async function Landing() {
  const featuredBundle = await getFeaturedBundle();

  return (
    <OverlayProvider>
      <main className="m-0 p-0 bg-black h-screen flex flex-col overflow-hidden">
        <Suspense fallback={<div className="text-white w-full text-center p-10">Loading content...</div>}>
          {/* Filters Menu: Fixed position relative to viewport */}
          <div
            className="fixed z-20 bg-black p-2 overflow-y-auto no-scrollbar"
            style={{
              width: "8rem",
              top: '0.5rem', // Changed from '4rem'
              height: '100vh', // Changed from 'calc(100vh - 4rem)'
              left: `calc(20vw - 8.5rem)`, // Adjusted for 1rem padding
            }}
          >
            <Filters alwaysOpen={true} />
          </div>

          {/* Featured Bundle: Fixed position on the right side */}
          {featuredBundle && (
            <div
              className="fixed z-20"
              style={{
                width: "22rem", // Changed from "12rem"
                top: '1rem',
                height: 'auto',
                right: `clamp(1rem, calc(20vw - 23rem), 100vw)`, // Adjusted positioning
              }}
            >
              <FeaturedBundle
                name={featuredBundle.name}
                image={featuredBundle.image}
                price={featuredBundle.base_price}
              />
            </div>
          )}

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
