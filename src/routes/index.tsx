import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/layout/Loader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Experience } from "@/components/sections/Experience";
import { TechStack } from "@/components/sections/TechStack";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { WaveDivider } from "@/components/waveform/WaveDivider";

const TITLE = "Kalana Dilshan — Associate Software Engineer";
const DESCRIPTION =
  "Kalana Dilshan (KD) — Associate Software Engineer specializing in Java, Spring Boot, React, cloud deployments, and modern software architecture.";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kalana Dilshan",
  alternateName: "KD",
  jobTitle: "Associate Software Engineer",
  description: DESCRIPTION,
  url: "/",
  knowsAbout: [
    "Software Engineering",
    "Full Stack Development",
    "Backend Engineering",
    "Cloud Deployment",
    "Software Architecture",
    "Artificial Intelligence",
    "Explainable AI",
  ],
  sameAs: ["https://github.com/", "https://linkedin.com/", "https://medium.com/"],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personJsonLd),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <CustomCursor />
      <CommandPalette />
      <Navbar />
      <main className="relative">
        <Hero />
        <WaveDivider className="my-2" />
        <About />
        <WaveDivider className="my-2" />
        <Services />
        <WaveDivider className="my-2" />
        <Projects />
        <WaveDivider className="my-2" />
        <Research />
        <WaveDivider className="my-2" />
        <Experience />
        <WaveDivider className="my-2" />
        <TechStack />
        <WaveDivider className="my-2" />
        <Blog />
        <WaveDivider className="my-2" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
