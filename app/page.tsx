import AboutPreview from "@/components/sections/AboutPreview";
import ContactSection from "@/components/sections/ContactSection";
import Hero from "@/components/sections/Hero";
import ServicesPreview from "@/components/sections/ServicesPreview";
import ShowcasePreview from "@/components/sections/ShowcasePreview";

import type { Metadata } from "next";

export const metadata: Metadata = {
  // ─── Title & Description ────────────────────────────────────────────────────
  title: "Meets Greatness — Branding & Creative Studio in Nairobi",
  // Note: layout.tsx template is SKIPPED on the homepage because you set a full title here.
  // This lets you craft a perfect homepage title without "| Meets Greatness" appended.

  description:
    "Greatness Creative Agency is a Nairobi-based branding & design studio. We craft bold brand identities, websites, social media strategies, and SEO campaigns for modern businesses across Kenya and beyond.",

  keywords: [
    "branding agency Nairobi",
    "creative agency Kenya",
    "brand identity design",
    "web design Nairobi",
    "social media management Kenya",
    "SEO agency Nairobi",
    "graphic design Kenya",
    "digital marketing Nairobi",
    "Greatness Creative Agency",
    "logo design Kenya",
    "paid advertising Kenya",
    "content creation agency",
  ],

  // ─── Canonical URL ──────────────────────────────────────────────────────────
  alternates: {
    canonical: "/",
  },

  // ─── Open Graph (Facebook · LinkedIn · WhatsApp link previews) ──────────────
  openGraph: {
    type: "website",
    url: "https://greatness-website.vercel.app",
    title: "Meets Greatness — Branding & Creative Studio in Nairobi",
    description:
      "Bold brand identities, websites, social media, and SEO — built by Greatness Creative Agency in Nairobi, Kenya.",
    siteName: "Meets Greatness",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",       // 1200×630px — put this file in /public
        width: 1200,
        height: 630,
        alt: "Meets Greatness Creative Studio — Nairobi, Kenya",
        type: "image/jpeg",
      },
    ],
  },

  // ─── Twitter / X Card ───────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Meets Greatness — Branding & Creative Studio in Nairobi",
    description:
      "Bold brand identities, websites, social media & SEO — Greatness Creative Agency, Nairobi.",
    images: ["/og-image.jpg"],
    creator: "@greatnesscreative",
    site: "@greatnesscreative",
  },
};

export default function Home() {
  return (
    <>
      {/* Hero = default brand theme */}
      <Hero />

      {/* Calm intelligent */}
      <section data-theme="lifted">
        <AboutPreview />
      </section>

      {/* Warm conversion section */}
      <section data-theme="warm">
        <ServicesPreview />
      </section>

      {/* Back to cinematic black */}
      <section data-theme="luxury">
        <ShowcasePreview />

      </section>
      

      {/* Human / welcoming */}
      <section data-theme="warm">
        <ContactSection />
      </section>
    </>
  );
}