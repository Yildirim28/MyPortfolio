import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { InteractionLayer } from "@/components/layout/InteractionLayer";
import { siteConfig } from "@/data/site";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap"
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-plex",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.primaryUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.shortName}`
  },
  description: siteConfig.description,
  keywords: [
    "software engineer",
    "SQA engineer",
    "quality assurance",
    "Playwright automation",
    "web developer",
    "Bangladesh"
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.primaryUrl }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "/",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    siteName: `${siteConfig.shortName} Portfolio`,
    images: [{ url: "/Akash.jpg", width: 1200, height: 1200, alt: siteConfig.name }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    images: ["/Akash.jpg"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080e16",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetBrainsMono.variable} ${ibmPlexSans.variable}`}>
      <body>
        <AmbientBackground />
        <InteractionLayer />
        {children}
      </body>
    </html>
  );
}
