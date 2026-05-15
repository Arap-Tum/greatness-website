import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://greatness-website.vercel.app";

export const metadata: Metadata = {
  // ─── Core ───────────────────────────────────────────────
  metadataBase: new URL(BASE_URL),          // Resolves all relative URLs below
  title: {
    default: "Meets Greatness — Creative Studio",
    template: "%s | Meets Greatness",
  },
  description:
    "A luxury creative studio crafting extraordinary digital experiences, brand identities, and cinematic visual narratives for visionary clients.",
  keywords: [
    "creative studio",
    "luxury design",
    "brand identity",
    "digital experience",
    "branding agency Nairobi",
    "web design Kenya",
    "social media management",
    "SEO agency Kenya",
    "graphic design",
    "Greatness Creative Agency",
  ],
  authors: [{ name: "Greatness Creative Agency", url: BASE_URL }],
  creator: "Greatness Creative Agency",
  publisher: "Greatness Creative Agency",

  // ─── Canonical & Robots ─────────────────────────────────
  alternates: {
    canonical: "/",                          // metadataBase resolves this to full URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ─── Icons (belt-and-suspenders alongside /app/favicon.ico) ──
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  // ─── Open Graph (Facebook, LinkedIn, WhatsApp previews) ──
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Meets Greatness",
    title: "Meets Greatness — Creative Studio",
    description:
      "A luxury creative studio crafting extraordinary digital experiences, brand identities, and cinematic visual narratives for visionary clients.",
    images: [
      {
        url: "/og-image.jpg",               // Create a 1200×630px image and put in /public
        width: 1200,
        height: 630,
        alt: "Meets Greatness — Creative Studio",
        type: "image/jpeg",
      },
    ],
  },

  // ─── Twitter / X Card ───────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Meets Greatness — Creative Studio",
    description:
      "A luxury creative studio crafting extraordinary digital experiences and brand identities.",
    images: ["/og-image.jpg"],
    creator: "@greatnesscreative",
    site: "@greatnesscreative",
  },

  // ─── Verification (add when you set up Search Console) ──
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },
};

// ─── Structured Data (JSON-LD) — helps Google understand your business ───────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Greatness Creative Agency",
  url: BASE_URL,
  logo: `${BASE_URL}/icon.png`,
  description:
    "A luxury creative studio crafting extraordinary digital experiences, brand identities, and cinematic visual narratives for visionary clients.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+254717005220",
    contactType: "customer service",
    email: "hello@greatnesscreative.co.ke",
  },
  sameAs: [
    "https://instagram.com/greatnesscreative",
    "https://twitter.com/greatnesscreative",
    "https://linkedin.com/company/greatnesscreative",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}