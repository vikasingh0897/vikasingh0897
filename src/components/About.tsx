"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileDown } from "lucide-react";
import { personalData } from "@/data/portfolioData";
import { portfolioContent, AchievementItem } from "@/lib/portfolioContent";

export default function About() {
  // Initialize with fallback/CMS badges for instant rendering without layout shift
  const [githubBadges, setGithubBadges] = useState<AchievementItem[]>(
    portfolioContent.achievements || []
  );
  const [leetcodeBadges, setLeetcodeBadges] = useState<AchievementItem[]>([]);

  // Dynamically sync latest GitHub and LeetCode achievement badges in background (ISR cached)
  useEffect(() => {
    let isMounted = true;
    fetch("/api/achievements")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data?.github && Array.isArray(data.github)) {
          setGithubBadges(data.github);
        }
        if (data?.leetcode && Array.isArray(data.leetcode)) {
          setLeetcodeBadges(data.leetcode);
        }
      })
      .catch((err) => {
        console.error("Failed to dynamically sync achievements:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="about"
      className="pt-6 sm:pt-10 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 relative overflow-hidden bg-transparent text-[#e5e7eb] font-sans scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{portfolioContent.aboutSectionTag || "01 // ABOUT ME"}</span>
        </div>

        {/* Name */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-1.5">
          Vikas Singh
        </h1>

        {/* Dynamic Role & Company: styled with dual contrasting theme gradients */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mt-1.5 sm:mt-2 mb-6 leading-[1.15]">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400">
            {portfolioContent.role || "Full Stack Developer"}
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-fuchsia-300 to-indigo-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
            {portfolioContent.company?.startsWith("@")
              ? portfolioContent.company
              : `@${portfolioContent.company || "Web3task"}`}
          </span>
        </h2>

        {/* Dynamic Professional Bio (Single Bio Paragraph via TinaCMS) */}
        <div className="space-y-5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
          <p>{portfolioContent.bioPara}</p>

          {/* Dynamic Achievements Section (h2 Achievements with conditional h3 LeetCode and h3 GitHub) */}
          {(leetcodeBadges.length > 0 || githubBadges.length > 0) && (
            <div className="pt-2 pb-2 space-y-4">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.25)] select-none">
                  Achievements ➜
                </span>
              </h2>

              {/* GitHub Section: Statically pre-rendered with zero layout shift */}
              {githubBadges.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span>GitHub</span>
                  </h3>
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    {githubBadges.map((achievement) => (
                      <a
                        key={achievement.id}
                        href={achievement.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${achievement.title} — ${achievement.description} (Click to view on GitHub)`}
                        aria-label={`GitHub Achievement: ${achievement.title}`}
                        className="group relative inline-flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
                      >
                        {/* White Radial Glow Halo on hover */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-radial from-white/40 via-white/15 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        />

                        {/* Borderless Badge Icon with White Hover Lighting Glow */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.85)]">
                          <img
                            src={achievement.badgeUrl}
                            alt={`GitHub Badge: ${achievement.title}`}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                            loading="lazy"
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* LeetCode Section: Shown if LeetCode badges exist */}
              {leetcodeBadges.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-amber-400/90 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    <span>LeetCode</span>
                  </h3>
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    {leetcodeBadges.map((achievement) => (
                      <a
                        key={achievement.id}
                        href={achievement.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${achievement.title} — ${achievement.description} (Click to view on LeetCode)`}
                        aria-label={`LeetCode Achievement: ${achievement.title}`}
                        className="group relative inline-flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
                      >
                        {/* White Radial Glow Halo on hover */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-radial from-white/40 via-white/15 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        />

                        {/* Borderless Badge Icon with White Hover Lighting Glow */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.85)]">
                          <img
                            src={achievement.badgeUrl}
                            alt={`LeetCode Badge: ${achievement.title}`}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                            loading="lazy"
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <p className="text-slate-200">
            Got a product to ship or an engineering role to fill?{" "}
            <Link
              href="#contact"
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline decoration-emerald-500/40 hover:decoration-emerald-400 transition-colors"
            >
              Let&apos;s connect
            </Link>
            .
          </p>
        </div>

        {/* Action Row: Resume Download & Connect in About Section */}
        <div className="pt-6 flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href={portfolioContent.resume || personalData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            }}
            className="px-5 py-2.5 sm:py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono text-xs sm:text-sm uppercase tracking-widest font-black flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5 cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Resume</span>
          </a>

          <Link
            href="#contact"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            }}
            className="px-5 py-2.5 sm:py-3 bg-[#0c1017] hover:bg-white/5 text-white border border-white/15 hover:border-emerald-400 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer shadow-sm"
          >
            <span>Let&apos;s Connect</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
