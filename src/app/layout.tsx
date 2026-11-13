import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "https://getomnieye.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "OmniEye — See Analyze Show | Intent-Aware AI Desktop Overlay",
  description:
    "OmniEye is an intent-aware AI desktop overlay. Lasso any screen region and get instant AI answers in under 300ms—without leaving your workflow. Join the beta.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "OmniEye — See Analyze Show | Intent-Aware AI Desktop Overlay",
    description:
      "OmniEye is an intent-aware AI desktop overlay. Lasso any screen region and get instant AI answers in under 300ms—without leaving your workflow. Join the beta.",
    url: "/",
    siteName: "OmniEye",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "OmniEye — Your AI Sees What You See. Intent-aware AI desktop overlay.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniEye — See Analyze Show",
    description:
      "Lasso any screen region and get instant AI answers in under 300ms—without leaving your workflow. Join the beta.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0D0C12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OmniEye",
  alternateName: "OmniEye — See Analyze Show",
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "AI Desktop Overlay",
  operatingSystem: "Windows, macOS",
  url: SITE_URL,
  description:
    "OmniEye is an intent-aware AI desktop overlay. Capture any screen region with sub-300ms lasso computer vision and get instant AI answers without leaving your workflow.",
  featureList: [
    "Global-hotkey translucent overlay",
    "Sub-300ms lasso screen capture",
    "OCR and visual context stitching",
    "Privacy-first app whitelisting",
  ],
  softwareVersion: "Private Beta",
  author: { "@type": "Organization", name: "OmniEye", address: "Dubai, UAE" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased bg-ink text-bone`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-aureate focus:text-ink focus:px-4 focus:py-2 mono-label"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
