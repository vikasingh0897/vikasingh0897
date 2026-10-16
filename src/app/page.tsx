import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent text-[#e5e7eb] flex flex-col font-sans overflow-x-hidden w-full">
      {/* Sticky/Fixed Minimalist Header */}
      <Header />

      <main className="relative z-10 w-full flex flex-col pb-8 sm:pb-12 overflow-x-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Content Sections directly on Home */}
        <div className="relative z-10 w-full overflow-x-hidden">
          <About />
          <Skills />
          <Work />
          <Contact />
        </div>
      </main>

      {/* Footer with all social links, icons, hover lighting effects & back to top */}
      <Footer />
    </div>
  );
}

