"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { personalData } from "@/data/portfolioData";
import { portfolioContent } from "@/lib/portfolioContent";
import {
  ArrowRight,
  FolderGit2,
  Rocket,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  GmailIcon,
} from "@/components/SocialIcons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full flex flex-col justify-start lg:justify-center pt-24 sm:pt-28 md:pt-32 lg:pt-0 pb-8 sm:pb-10 md:pb-14 lg:pb-4 min-h-0 h-auto lg:h-screen lg:max-h-[820px] bg-transparent text-[#e5e7eb] font-sans"
    >
      {/* Subtle Mobile/Tablet Ambient Glow (hidden on wide tabs 920px+ and desktop where avatar glow shines) */}
      <div
        aria-hidden="true"
        className="min-[920px]:hidden absolute top-16 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col lg:justify-center">
        <div className="flex flex-col min-[920px]:flex-row items-center min-[920px]:items-center justify-between gap-8 min-[920px]:gap-8 lg:gap-12 w-full">
          {/* Left Text Column */}
          <div className="flex-1 flex flex-col items-start text-left w-full max-w-xl md:max-w-2xl min-[920px]:max-w-xl">
            {/* Status Badge with Developer Terminal Prompt */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0c1017] border border-emerald-500/30 text-emerald-400 font-mono mb-3 sm:mb-4 backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="uppercase tracking-widest font-semibold text-[10px]">
                SYSTEM: ONLINE // AVAILABLE FOR WORK
              </span>
            </div>

            {/* H1: Name - Balanced typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-white leading-[1.08]">
              Hi, I&apos;m Vikas Singh.
            </h1>

            {/* H2: Full Stack Developer & Freelancer - Proportional scale */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 mt-1.5 sm:mt-2 leading-[1.12]">
              Full Stack Developer &amp; Freelancer.
            </h2>

            {/* Motto Badge directly under Full Stack Developer & Freelancer */}
            <div className="mt-2.5 sm:mt-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono font-semibold">
                <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                <span>Learn. Code. Build. Repeat.</span>
              </div>
            </div>

            {/* H3: Optimized Professional Narrative */}
            <h3 className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-400 max-w-lg font-normal leading-relaxed">
              Building reliable, accessible, and high-performance web applications. Specialized in modern reactive interfaces, robust backend APIs, and clean, scalable architecture.
            </h3>

            {/* Chamfered Tech Action Buttons (Resume removed as requested) */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="#contact"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
                className="px-5 py-2.5 sm:py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono text-xs sm:text-sm uppercase tracking-widest font-black flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#work"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
                className="px-5 py-2.5 sm:py-3 bg-[#0c1017] hover:bg-white/5 text-white border border-white/15 hover:border-emerald-400 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer shadow-sm"
              >
                <FolderGit2 className="w-4 h-4 text-emerald-400" />
                <span>View Work</span>
              </Link>
            </div>

            {/* Social Links Row: GitHub, LinkedIn, Email */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-mono text-slate-400 pt-3 sm:pt-4 border-t border-white/8 w-full">
              {/* GitHub - Base Brand: Pure White / Silver Glow */}
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="social-glow-github relative group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-[#0d1117]/80 cursor-pointer select-none"
              >
                <GithubIcon className="social-icon w-4 h-4 text-slate-400 relative z-10 transition-all duration-300" />
                <span className="text-slate-300 transition-colors duration-300 relative z-10">
                  GitHub
                </span>
              </a>

              {/* LinkedIn - Base Brand: Official Blue #0a66c2 Glow */}
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="social-glow-linkedin relative group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-[#0d1117]/80 cursor-pointer select-none"
              >
                <LinkedinIcon className="social-icon w-4 h-4 text-slate-400 relative z-10 transition-all duration-300" />
                <span className="text-slate-300 transition-colors duration-300 relative z-10">
                  LinkedIn
                </span>
              </a>

              {/* Email - Base Brand: Official Gmail Red #ea4335 Glow */}
              <a
                href={`mailto:${personalData.email}`}
                aria-label="Send Email"
                className="social-glow-email relative group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-[#0d1117]/80 cursor-pointer select-none"
              >
                <GmailIcon className="social-icon w-4 h-4 relative z-10 transition-all duration-300" />
                <span className="text-slate-300 transition-colors duration-300 relative z-10">
                  Email
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Vikas Singh Photo Showcase - Circular with Float & All-Around Purple Hover Shadow, Transparent Border, Clicking Image/Text opens GitHub (Visible on tabs 920px+ and desktop) */}
          <div className="hidden min-[920px]:flex shrink-0 items-center justify-center relative select-none">
            {/* Clickable Floating Avatar & Badge linking to GitHub */}
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vikas Singh GitHub Profile (vikasingh0897)"
              title="Open GitHub @vikasingh0897"
              className="avatar-link group relative animate-float-avatar block cursor-pointer"
            >
              {/* All-Around Purple Ambient Glow on Hover (rendered from each side) */}
              <div className="avatar-ambient-glow absolute -inset-6 rounded-full bg-linear-to-tr from-purple-600/35 via-fuchsia-500/25 to-indigo-500/30 blur-2xl pointer-events-none" />

              {/* Circular Container with Transparent Border & All-Around Purple Glow on Hover */}
              <div className="avatar-purple-glow relative w-56 h-56 min-[920px]:w-64 min-[920px]:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full border border-transparent bg-linear-to-b from-[#131926] via-[#0c1017] to-[#07090e] overflow-hidden">
                {/* Inner Masked Image Frame */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-linear-to-b from-purple-950/20 via-[#0b0e15] to-[#07090e]">
                  <Image
                    src={portfolioContent.avatar || "/vikasingh0897.webp"}
                    alt="Vikas Singh - Full Stack Developer"
                    fill
                    sizes="(max-width: 919px) 0px, (max-width: 1024px) 256px, 320px"
                    priority
                    className="object-cover object-[center_12%] filter contrast-[1.04] transition-all duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Smooth Bottom Vignette inside Circle */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#07090e]/90 via-[#07090e]/40 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Monospace Tech Badge Pill with GitHub Brand Accent */}
              <div className="avatar-badge absolute bottom-2 right-3 md:right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c1017]/95 border border-white/10 shadow-lg backdrop-blur-md transition-all duration-300">
                <GithubIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-300 transition-colors" />
                <span className="font-mono text-[11px] text-slate-300 group-hover:text-purple-200 font-semibold tracking-wider transition-colors duration-300">
                  vikasingh0897
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
