import AboutPreview from "@/components/sections/AboutPreview";
import ContactSection from "@/components/sections/ContactSection";
import Hero from "@/components/sections/Hero";
import ServicesPreview from "@/components/sections/ServicesPreview";
import ShowcasePreview from "@/components/sections/ShowcasePreview";

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