import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ['400'] });

export const metadata: Metadata = {
  title: "Valorant Skin Viewer",
  description:
    "Explore and view detailed information about all Valorant skins.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark no-scrollbar">
      <body className={`${outfit.className} bg-black text-foreground`}>
        {children}
      </body>
    </html>
  );
}
