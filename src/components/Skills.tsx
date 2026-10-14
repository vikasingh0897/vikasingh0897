"use client";

import React, { useState } from "react";
import {
  GitBranch,
  GitCommit,
  GitMerge,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

import { portfolioContent, SkillItem } from "@/lib/portfolioContent";

interface SkillBrandInfo {
  color: string;
  rgb: string;
  icon: string;
}

const SKILL_BRAND_MAP: Record<string, SkillBrandInfo> = {
  // Languages
  "c++": { color: "#00599c", rgb: "0, 89, 156", icon: "/icons/c-plusplus.svg" },
  python: { color: "#3776ab", rgb: "55, 118, 171", icon: "/icons/python.svg" },
  javascript: { color: "#f7df1e", rgb: "247, 223, 30", icon: "/icons/javascript.svg" },
  typescript: { color: "#3178c6", rgb: "49, 120, 198", icon: "/icons/typescript.svg" },

  // Frontend
  html: { color: "#e34f26", rgb: "227, 79, 38", icon: "/icons/html5.svg" },
  css: { color: "#1572b6", rgb: "21, 114, 182", icon: "/icons/css3.svg" },
  tailwindcss: { color: "#06b6d4", rgb: "6, 182, 212", icon: "/icons/tailwind-css.svg" },
  react: { color: "#61dafb", rgb: "97, 218, 251", icon: "/icons/react.svg" },
  redux: { color: "#764abc", rgb: "118, 74, 188", icon: "/icons/redux.svg" },
  nextjs: { color: "#ffffff", rgb: "255, 255, 255", icon: "/icons/nextdotjs.svg" },

  // Backend
  nodejs: { color: "#5fa04e", rgb: "95, 160, 78", icon: "/icons/nodejs.svg" },
  express: { color: "#ffffff", rgb: "255, 255, 255", icon: "/icons/expressdotjs.svg" },
  "rest apis": { color: "#10b981", rgb: "16, 185, 129", icon: "/icons/rest-api.svg" },

  // Database
  mongodb: { color: "#47a248", rgb: "71, 162, 72", icon: "/icons/mongodb.svg" },
  postgresql: { color: "#4169e1", rgb: "65, 105, 225", icon: "/icons/postgresql.svg" },
  redis: { color: "#dc382d", rgb: "220, 56, 45", icon: "/icons/redis.svg" },

  // DevOps & Tools
  git: { color: "#f05032", rgb: "240, 80, 50", icon: "/icons/git.svg" },
  "github actions": { color: "#2088ff", rgb: "32, 136, 255", icon: "/icons/github-actions.svg" },
  github: { color: "#ffffff", rgb: "255, 255, 255", icon: "/icons/github.svg" },
};

function getSkillBrand(name: string): SkillBrandInfo {
  const key = name.trim().toLowerCase();
  if (SKILL_BRAND_MAP[key]) {
    return SKILL_BRAND_MAP[key];
  }
  // Try normalized key: remove spaces, dots, and hyphens (e.g. "tailwind css" -> "tailwindcss", "next.js" -> "nextjs")
  const normalized = key.replace(/[\s.\-_]/g, "");
  if (SKILL_BRAND_MAP[normalized]) {
    return SKILL_BRAND_MAP[normalized];
  }
  // Try stripping trailing version numbers (e.g. "html5" -> "html", "css3" -> "css")
  const strippedVersion = normalized.replace(/\d+$/, "");
  if (SKILL_BRAND_MAP[strippedVersion]) {
    return SKILL_BRAND_MAP[strippedVersion];
  }
  return {
    color: "#10b981",
    rgb: "16, 185, 129",
    icon: "",
  };
}

function SkillBadge({ skill }: { skill: string | SkillItem }) {
  const name = typeof skill === "string" ? skill : skill.name;
  const brand = getSkillBrand(name);
  const iconSrc = typeof skill === "object" && skill.icon ? skill.icon : brand.icon;

  return (
    <div
      tabIndex={0}
      className="skill-badge-chip group/tech relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs uppercase tracking-wider font-semibold select-none cursor-pointer"
      style={
        {
          "--skill-color": brand.color,
          "--skill-rgb": brand.rgb,
        } as React.CSSProperties
      }
      title={`${name}`}
    >
      {/* SVG Icon with brand lighting drop shadow on hover */}
      {iconSrc && (
        <img
          src={iconSrc}
          alt={name}
          width={16}
          height={16}
          loading="lazy"
          className="w-4 h-4 shrink-0 object-contain pointer-events-none"
        />
      )}
      <span>{name}</span>
    </div>
  );
}

interface TechBranch {
  id: string;
  name: string;
  branchName: string;
  sha: string;
  hexColor: string;
  bgBadge: string;
  borderBadge: string;
  textBadge: string;
  hoverBorder: string;
  hoverShadow: string;
  subtitle: string;
  skills: (string | SkillItem)[];
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [copiedBranch, setCopiedBranch] = useState<string | null>(null);

  // 6 distinct theme colors looped across skills branches
  const SKILL_THEME_COLORS = [
    // 1. Cyan
    {
      hex: "#06b6d4",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      text: "text-cyan-400",
      hoverBorder: "hover:border-cyan-500/50",
      hoverShadow: "hover:shadow-cyan-500/10",
    },
    // 2. Indigo
    {
      hex: "#6366f1",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/30",
      text: "text-indigo-400",
      hoverBorder: "hover:border-indigo-500/50",
      hoverShadow: "hover:shadow-indigo-500/10",
    },
    // 3. Emerald
    {
      hex: "#10b981",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      hoverBorder: "hover:border-emerald-500/50",
      hoverShadow: "hover:shadow-emerald-500/10",
    },
    // 4. Amber
    {
      hex: "#f59e0b",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
      hoverBorder: "hover:border-amber-500/50",
      hoverShadow: "hover:shadow-amber-500/10",
    },
    // 5. Purple
    {
      hex: "#a855f7",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      text: "text-purple-400",
      hoverBorder: "hover:border-purple-500/50",
      hoverShadow: "hover:shadow-purple-500/10",
    },
    // 6. Rose
    {
      hex: "#f43f5e",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
      text: "text-rose-400",
      hoverBorder: "hover:border-rose-500/50",
      hoverShadow: "hover:shadow-rose-500/10",
    },
  ];

  const branches: TechBranch[] = (portfolioContent.techBranches || []).map((item, idx) => {
    const theme = SKILL_THEME_COLORS[idx % SKILL_THEME_COLORS.length];

    return {
      id: item.id || `branch-${idx}`,
      name: item.name,
      branchName: item.branchName || `feat/${item.name.toLowerCase().replace(/\s+/g, "-")}`,
      sha: item.sha || `${(idx + 10).toString(16)}a${idx}f`,
      hexColor: theme.hex,
      bgBadge: theme.bg,
      borderBadge: theme.border,
      textBadge: theme.text,
      hoverBorder: theme.hoverBorder,
      hoverShadow: theme.hoverShadow,
      subtitle: item.subtitle || `${item.name} tools and technologies`,
      skills: item.skills || [],
    };
  });

  const handleCopyCommand = (branchName: string) => {
    navigator.clipboard.writeText(`git checkout ${branchName}`);
    setCopiedBranch(branchName);
    setTimeout(() => setCopiedBranch(null), 2000);
  };

  // When a category is clicked, others disappear completely; clicking active filter resets to all
  const handleToggleFilter = (branchId: string) => {
    setActiveFilter((prev) => (prev === branchId ? "all" : branchId));
  };

  const displayedBranches =
    activeFilter === "all"
      ? branches
      : branches.filter((b) => b.id === activeFilter);

  return (
    <section
      id="skills"
      className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-transparent text-[#e5e7eb] font-sans scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{portfolioContent.skillsSectionTag || "02 // TECH STACK"}</span>
        </div>

        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-2">
          {portfolioContent.skillsTitle || "Technical Stack"}
        </h2>

        {/* Dynamic Subtitle with Gradient */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-8 sm:mb-10 leading-tight">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400">
            {portfolioContent.skillsSubtitle || "The technologies and tools I work with."}
          </span>
        </h3>

        {/* =========================================================================
            CLEAN & MINIMAL FILTER BAR
            ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#0e1217]/80 border border-white/8 backdrop-blur-md mb-8 shadow-sm">
          {/* Repo Tag & Main Indicator */}
          <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <GitBranch className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-xs font-mono font-medium text-slate-300">
                vikasingh0897/stack
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-semibold">
                main
              </span>
            </div>
          </div>

          {/* Clean Minimalist Category Tabs */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
            {branches.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => handleToggleFilter(b.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeFilter === b.id
                    ? `${b.bgBadge} ${b.textBadge} border ${b.borderBadge} font-semibold shadow-sm`
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/4 border border-transparent"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: b.hexColor }}
                />
                <span>{b.name}</span>
              </button>
            ))}

            {activeFilter !== "all" && (
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className="px-2 py-1 rounded-lg text-[11px] font-mono text-slate-400 hover:text-white bg-white/4 hover:bg-white/8 border border-white/10 transition-all cursor-pointer flex items-center gap-1"
                title="Reset filter"
              >
                <span>✕</span>
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>        {/* =========================================================================
            GIT BRANCH STACK: MAIN TRUNK IN CENTER, SKILLS LEFT & RIGHT
            - Central straight line running down the middle (desktop: left-1/2, mobile: left-6)
            - Line terminates cleanly at the merge circle center, never going out past the bottom
            - Commit nodes in center with horizontal connector arms to left & right cards
            - Technology chips rendered as clean text badges without images/logos (matching Image 2)
            ========================================================================= */}
        <div className="relative pt-2 pb-2">
          {/* WRAPPER CONTAINING THE TRUNK LINE, ROOT NODE, BRANCHES, AND TERMINAL MERGE CIRCLE */}
          <div className="relative">
            {/* DESKTOP CENTER MAIN TRUNK LINE:
                Starts cleanly at root badge, terminates at terminal merge circle */}
            <div
              className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-19.5 w-0.5 bg-linear-to-b from-emerald-400/40 via-cyan-400/30 to-emerald-400/40 pointer-events-none z-0"
              aria-hidden="true"
            />

            {/* DESKTOP BEAM TRAVEL ANIMATION */}
            <div
              className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-19.5 w-0.5 overflow-hidden pointer-events-none z-0"
              aria-hidden="true"
            >
              <div className="w-full h-36 bg-linear-to-b from-transparent via-emerald-400 to-transparent animate-beam-travel" />
            </div>

            {/* MOBILE MAIN LINE:
                Starts at mobile root node center, terminates cleanly at mobile merge circle center */}
            <div
              className="md:hidden absolute left-6 -translate-x-1/2 top-4.5 bottom-4.5 w-0.5 bg-linear-to-b from-emerald-400/40 via-cyan-400/30 to-emerald-400/40 pointer-events-none z-0"
              aria-hidden="true"
            />

            {/* 1. ROOT COMMIT NODE (origin/main: Technical Stack) */}
            {/* MOBILE LAYOUT: Circle on left trunk line, connector arm, and badge */}
            <div className="md:hidden relative flex items-center pl-12 mb-8 z-20 group/root">
              {/* Root Commit Circle on the mobile trunk line (left-6) */}
              <div className="absolute left-6 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                <div className="w-6 h-6 rounded-full bg-[#07090e] border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover/root:scale-110 transition-transform">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Mobile Connector Arm from node to badge */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-emerald-400/50 pointer-events-none z-10" />

              {/* Root Commit Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border border-emerald-500/30 bg-[#0e1217]/95 backdrop-blur-md shadow-md text-xs font-mono group-hover/root:border-emerald-500/60 transition-colors">
                <GitCommit className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold">origin/main: Technical Stack</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 text-[11px]">HEAD commit #001</span>
              </div>
            </div>

            {/* DESKTOP LAYOUT: Centered root commit badge at the top of the central main branch (zero overlap) */}
            <div className="hidden md:flex justify-center mb-8 sm:mb-10 relative z-20 group/root">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border border-emerald-500/30 bg-[#0e1217]/95 backdrop-blur-md shadow-md text-xs font-mono group-hover/root:border-emerald-500/60 transition-colors">
                <GitCommit className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold">origin/main: Technical Stack</span>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="text-slate-400 text-[11px] hidden sm:inline">
                  HEAD commit #001
                </span>
              </div>
            </div>

            {/* 2. THE FEATURE BRANCH ROWS */}
            <div className="space-y-6 sm:space-y-8">
              {displayedBranches.map((branch, index) => {
                // Alternating: branch position based on original list index for consistency
                const originalIndex = branches.findIndex((b) => b.id === branch.id);
                const isLeft = (activeFilter === "all" ? index : originalIndex) % 2 === 0;

                return (
                  <div
                    key={branch.id}
                    className="min-h-42.5 sm:min-h-46.25 flex items-center relative group/branch transition-all duration-300"
                  >
                    {/* COMMIT APEX STATION ON THE CENTRAL MAIN BRANCH (left-1/2 on desktop, left-6 on mobile) */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                      <div
                        className="w-6 h-6 rounded-full bg-[#07090e] border-2 flex items-center justify-center shadow-lg relative z-20 transition-all duration-300 group-hover/branch:scale-125 cursor-pointer"
                        style={{
                          borderColor: branch.hexColor,
                          boxShadow: `0 0 16px ${branch.hexColor}60`,
                        }}
                      >
                        <span
                          className="absolute -inset-1.5 rounded-full animate-radar-ripple pointer-events-none opacity-40"
                          style={{ backgroundColor: branch.hexColor }}
                        />
                        <div
                          className="w-2.5 h-2.5 rounded-full transition-transform duration-200 group-hover/branch:scale-125 relative z-10"
                          style={{ backgroundColor: branch.hexColor }}
                        />
                      </div>
                    </div>

                    {/* DESKTOP HORIZONTAL CONNECTOR ARMS (from center left-1/2 to left/right card) */}
                    {isLeft ? (
                      // Arm from center trunk (50%) to Left Card (right edge at 46%)
                      <div className="hidden md:block absolute left-[46%] top-1/2 -translate-y-1/2 w-[4%] h-4 pointer-events-none z-10">
                        <svg
                          className="w-full h-full overflow-visible"
                          viewBox="0 0 100 16"
                          preserveAspectRatio="none"
                          fill="none"
                        >
                          <line
                            x1="100"
                            y1="8"
                            x2="0"
                            y2="8"
                            stroke={branch.hexColor}
                            strokeWidth="2.5"
                            strokeOpacity="0.25"
                          />
                          <line
                            x1="100"
                            y1="8"
                            x2="0"
                            y2="8"
                            stroke={branch.hexColor}
                            strokeWidth="2"
                            strokeDasharray="4 3"
                            className="opacity-90 animate-dash-left"
                          />
                        </svg>
                      </div>
                    ) : (
                      // Arm from center trunk (50%) to Right Card (left edge at 54%)
                      <div className="hidden md:block absolute left-[50%] top-1/2 -translate-y-1/2 w-[4%] h-4 pointer-events-none z-10">
                        <svg
                          className="w-full h-full overflow-visible"
                          viewBox="0 0 100 16"
                          preserveAspectRatio="none"
                          fill="none"
                        >
                          <line
                            x1="0"
                            y1="8"
                            x2="100"
                            y2="8"
                            stroke={branch.hexColor}
                            strokeWidth="2.5"
                            strokeOpacity="0.25"
                          />
                          <line
                            x1="0"
                            y1="8"
                            x2="100"
                            y2="8"
                            stroke={branch.hexColor}
                            strokeWidth="2"
                            strokeDasharray="4 3"
                            className="opacity-90 animate-dash-right"
                          />
                        </svg>
                      </div>
                    )}

                    {/* MOBILE CONNECTOR ARM (from left-6 to left-12) */}
                    <div className="md:hidden absolute left-6 top-1/2 -translate-y-1/2 w-6 h-4 pointer-events-none z-10">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 24 16" fill="none">
                        <line
                          x1="0"
                          y1="8"
                          x2="24"
                          y2="8"
                          stroke={branch.hexColor}
                          strokeWidth="2"
                          strokeDasharray="3 3"
                          className="opacity-80 animate-dash-right"
                        />
                      </svg>
                    </div>

                    {/* FEATURE BRANCH CARD CONTAINER:
                        - Alternates: Left (md:w-[46%] md:mr-auto) and Right (md:w-[46%] md:ml-auto)
                        - On mobile: Full width with pl-12
                    */}
                    <div className="w-full flex items-center">
                      <div
                        className={`w-full ${
                          isLeft
                            ? "md:w-[46%] md:mr-auto md:ml-0"
                            : "md:w-[46%] md:ml-auto md:mr-0"
                        } pl-12 md:pl-0`}
                      >
                        {/* Branch Card */}
                        <div
                          className={`rounded-2xl border border-white/10 bg-[#0e1217]/90 backdrop-blur-md p-4 sm:p-5 ${
                            branch.hoverBorder
                          } transition-all duration-300 shadow-md flex flex-col gap-3 group-hover/branch:-translate-y-1.5 group-hover/branch:shadow-xl relative overflow-hidden ${
                            activeFilter !== "all"
                              ? "ring-2 ring-emerald-400/50"
                              : ""
                          }`}
                        >
                          {/* Shimmer sweep reflection on hover */}
                          <div className="absolute inset-0 opacity-0 group-hover/branch:opacity-100 pointer-events-none overflow-hidden transition-opacity duration-500 rounded-2xl">
                            <div className="w-1/2 h-full bg-linear-to-r from-transparent via-white/4 to-transparent -skew-x-12 animate-shimmer-sweep" />
                          </div>

                          {/* Branch Header */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/8 relative z-10">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleCopyCommand(branch.branchName)}
                                title={`Click to copy: git checkout ${branch.branchName}`}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border ${branch.bgBadge} ${branch.borderBadge} ${branch.textBadge} hover:brightness-125 transition-all cursor-pointer`}
                              >
                                <GitBranch className="w-3.5 h-3.5" />
                                <span>{branch.branchName}</span>
                                {copiedBranch === branch.branchName ? (
                                  <Check className="w-3 h-3 text-emerald-400 ml-1" />
                                ) : (
                                  <Copy className="w-3 h-3 opacity-60 ml-0.5 hover:opacity-100" />
                                )}
                              </button>

                              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                                #{branch.sha}
                              </span>
                            </div>

                            <span className="text-[10px] font-mono text-slate-400 bg-white/4 px-2 py-0.5 rounded border border-white/8">
                              {branch.skills.length} techs
                            </span>
                          </div>

                          {/* Subtitle */}
                          <p className="text-[11px] text-slate-400 font-mono -mt-1 relative z-10">
                            {branch.subtitle}
                          </p>

                          {/* Technology Chips: Display SVG icons with individual brand hover lighting effects */}
                          <div className="flex flex-wrap items-center gap-2 relative z-10">
                            {branch.skills.map((skillItem, sIdx) => {
                              const sName = typeof skillItem === "string" ? skillItem : skillItem.name;
                              return (
                                <SkillBadge
                                  key={`${branch.id}-${sName}-${sIdx}`}
                                  skill={skillItem}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3. TERMINAL MERGE COMMIT NODE & UNIFIED BADGE (AT THE END OF TRUNK) */}
            {/* MOBILE LAYOUT: Left-anchored circle at left-6, connector arm, badge at pl-12 */}
            <div className="md:hidden relative flex items-center pl-12 mt-10 z-20 group/merge">
              {/* Merge Commit Circle Node (At left-6 on mobile) */}
              <div className="absolute left-6 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                <div className="w-7 h-7 rounded-full bg-[#07090e] border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/30 relative z-20 group-hover/merge:scale-110 transition-transform">
                  <span className="absolute -inset-1 rounded-full bg-emerald-400/25 animate-radar-ripple pointer-events-none" />
                  <GitMerge className="w-3.5 h-3.5 text-emerald-400 relative z-10" />
                </div>
              </div>

              {/* Mobile Connector Arm from circle to badge */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-emerald-400/50 pointer-events-none z-10" />

              {/* Merge Summary Badge */}
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-2 rounded-xl border border-emerald-500/30 bg-[#0e1217]/95 backdrop-blur-md shadow-md text-xs font-mono group-hover/merge:border-emerald-500/60 transition-colors">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 animate-pulse" />
                  git merge --all into main
                </span>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="text-slate-300 hidden sm:inline">
                  Production-Ready Stack
                </span>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="text-[10px] text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                  All {branches.reduce((sum, b) => sum + b.skills.length, 0)} Technologies Deployed
                </span>
              </div>
            </div>

            {/* DESKTOP LAYOUT: Centered terminal merge circle at end of trunk, connector stem, and summary badge */}
            <div className="hidden md:flex flex-col items-center mt-5 sm:mt-6 z-20 group/merge">
              {/* Terminal Merge Commit Circle Node */}
              <div className="w-8 h-8 rounded-full bg-[#07090e] border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/30 relative z-20 group-hover/merge:scale-110 transition-transform">
                <span className="absolute -inset-1 rounded-full bg-emerald-400/25 animate-radar-ripple pointer-events-none" />
                <GitMerge className="w-4 h-4 text-emerald-400 relative z-10" />
              </div>

              {/* Vertical connector stem from merge circle to summary badge */}
              <div className="w-0.5 h-4 bg-emerald-400/50" />

              {/* Merge Summary Badge */}
              <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-[#0e1217]/95 backdrop-blur-md shadow-md text-xs font-mono group-hover/merge:border-emerald-500/60 transition-colors">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 animate-pulse" />
                  git merge --all into main
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">
                  Production-Ready Stack
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-[10px] text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                  All {branches.reduce((sum, b) => sum + b.skills.length, 0)} Technologies Deployed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
