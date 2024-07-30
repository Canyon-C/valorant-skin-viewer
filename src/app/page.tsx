import { ValorantSVG } from "@/app/ui/landing/valorant-svg";
import { Suspense } from "react";
export default function Landing() {
  return (
    <main className="m-0 p-0">
      <Suspense>
        <ValorantSVG />
      </Suspense>
    </main>
  );
}
