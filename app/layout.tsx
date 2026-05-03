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

export const metadata: Metadata = {
  title: {
    default:  'Meets Greatness — Creative Studio',
    template: '%s | Meets Greatness',
  },
  description:
    'A luxury creative studio crafting extraordinary digital experiences, brand identities, and cinematic visual narratives for visionary clients.',
  keywords: ['creative studio', 'luxury design', 'brand identity', 'digital experience'],
  openGraph: {
    type:        'website',
    locale:      'en_US',
    title:       'Meets Greatness — Creative Studio',
    description: 'Luxury creative studio for visionary brands.',
    siteName:    'Meets Greatness',
  },
}




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">
        <Navbar />
        
        <main>
          {children}
          </main>
          <Footer />
          </body>
    </html>
  );
}
