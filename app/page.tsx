import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { CapabilitySection } from "@/components/CapabilitySection";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { Process } from "@/components/Process";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Testimonials } from "@/components/Testimonials";
import { AboutMe } from "@/components/AboutMe";
import { Contact } from "@/components/Contact";
import { getImageAvailability } from "@/lib/projectImages";

export default function HomePage() {
  const imageAvailability = getImageAvailability();

  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <CapabilitySection />
      <ArchitectureSection />
      <Process />
      <ProjectShowcase imageAvailability={imageAvailability} />
      <Testimonials />
      <AboutMe />
      <Contact />
    </>
  );
}
