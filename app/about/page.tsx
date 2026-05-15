import AboutPreview from "@/components/sections/AboutPreview";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "About",               // Renders as: "About | Meets Greatness"
  description: "Learn who we are — a bold creative agency from Nairobi building brands that last.",
  alternates: { canonical: "/about" },
};
export default function About() {
    return  (
        <AboutPreview />
    )
}