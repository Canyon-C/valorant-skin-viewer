"use client";

import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { Permanent_Marker } from "next/font/google";

const doodle = Permanent_Marker({ weight: ["400"], subsets: ["latin"] });

export default function GitHubBadge() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center space-x-2">
      {isLanding && (
        <span className={`${doodle.className} text-white text-sm`}>
          Contributions Welcome!
        </span>
      )}
      <a
        href="https://github.com/Canyon-C/valorant-skin-viewer"
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-70 hover:opacity-100"
      >
        <Github size={40} className="text-white" />
      </a>
    </div>
  );
}