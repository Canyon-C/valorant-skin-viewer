import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import os from "node:os";
import GitHubBadge from "./ui/github-badge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Valorant Skin Viewer",
  description:
    "Explore and view detailed information about all Valorant skins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        {children}
        <GitHubBadge />
      </body>
    </html>
  );
}
