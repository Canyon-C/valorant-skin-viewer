import { LazyRender } from "./utils/intersection-observer";
import { Input } from "./ui/search/input";
import { Suspense } from "react";
import { Filters } from "./ui/filters/filters"; // Import Filters

export const runtime = "edge";

export default function Landing() {
  return (
    <main className="m-0 p-0 bg-black h-screen flex flex-col overflow-hidden"> {/* Main container uses flex-col for stacking header/content, added overflow-hidden */}
      <Suspense fallback={<div className="text-white w-full text-center p-10">Loading content...</div>}>
        {/* Filters Menu: Fixed position relative to viewport */}
        {/* Positioned to be "up against" the main 60% centered content grid */}
        <div
          className="fixed z-20 bg-black p-2 border-r border-neutral-700 overflow-y-auto no-scrollbar" // Changed p-4 to p-2
          style={{
            width: "7rem", // Changed from 16rem
            top: '4rem', // Positioned below the search bar (search bar height is approx 4rem)
            height: 'calc(100vh - 4rem)', // Fills the remaining viewport height below the search bar
            // Calculates left position: (ViewportCenter - HalfGridWidth - FilterWidth)
            // (50vw - (60vw / 2) - 7rem) = (50vw - 30vw - 7rem) = 20vw - 7rem
            // This aligns the right edge of the filter panel with the left edge of the 60% centered grid.
            left: `calc(20vw - 7rem)`, // Changed from 16rem
          }}
        >
          <Filters alwaysOpen={true} />
        </div>

        {/* Main scrollable content area (Search bar + Grid) */}
        {/* flex-grow allows this div to take up available vertical space in the flex-col main */}
        <div className="flex-grow overflow-y-auto no-scrollbar">
          {/* Search Bar: Sticky to the top of this scrollable container */}
          <div className="sticky top-0 z-10 bg-black py-3 shadow-md">
            <div className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto">
              <Input
                type="search"
                className="w-full bg-neutral-900 border-neutral-700 text-white"
              />
            </div>
          </div>

          {/* Content Grid Area: LazyRender component handles its own width (60%) and centering (mx-auto) */}
          {/* The p-4 provides padding around the grid, consistent with original layout */}
          <div className="p-4"> 
            <LazyRender />
          </div>
        </div>
      </Suspense>
    </main>
  );
}
