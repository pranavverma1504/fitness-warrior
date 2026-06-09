"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PageReveal from "@/components/page-reveal";
import LiquidMaskTransition from "@/components/LiquidMaskTransition";

const About = dynamic(() => import("@/components/About"), { ssr: true });
const Programs = dynamic(() => import("@/components/Programs"), { ssr: true });
const GalleryCarousel = dynamic(() => import("@/components/GalleryCarousel"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const Pricing = dynamic(() => import("@/components/Pricing"), { ssr: true });
const Locations = dynamic(() => import("@/components/Locations"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <PageReveal brandName="Fitness Warrior" onComplete={() => setIsRevealed(true)}>
      <main>
        <LiquidMaskTransition />
        <Navbar />
        <Hero isRevealed={isRevealed} />
        <About />
        <Programs />
        <GalleryCarousel />
        <Testimonials />
        <Pricing />
        <Locations />
        <Footer />
      </main>
    </PageReveal>
  );
}
