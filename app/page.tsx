import AboutPreview from "@/components/sections/AboutPreview";
import ContactSection from "@/components/sections/ContactSection";
import Hero from "@/components/sections/Hero";
import ServicesPreview from "@/components/sections/ServicesPreview";
import ShowcasePreview from "@/components/sections/ShowcasePreview";

export default function Home() {
  return (
<>
<Hero />
<AboutPreview />
<ServicesPreview />
<ShowcasePreview />
<ContactSection />
</>
  );
}
