"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { projects as fallbackProjects } from "@/data/portfolioData";
import { portfolioContent, ProjectItem } from "@/lib/portfolioContent";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface CardThemeColor {
  hex: string;
  borderHover: string;
  shadowHover: string;
  versionBadge: string;
  titleHover: string;
  iconHover: string;
  btnBorder: string;
  btnBg: string;
  btnText: string;
  btnHoverBorder: string;
  btnHoverShadow: string;
  btnHoverBg: string;
  dotColor: string;
}

// 6 distinct theme-blended colors for unique project card glows
const THEME_COLORS: CardThemeColor[] = [
  // 1. Emerald / Neon Green (e.g. Bytecode Learners)
  {
    hex: "#10b981",
    borderHover: "hover:border-emerald-500/70",
    shadowHover: "hover:shadow-[0_16px_40px_rgba(16,185,129,0.22)]",
    versionBadge: "bg-emerald-500/10 border-emerald-500/35 text-emerald-400",
    titleHover: "group-hover:text-emerald-300",
    iconHover: "text-emerald-400 group-hover:text-emerald-300",
    btnBorder: "border-emerald-500/40",
    btnBg: "bg-emerald-950/20",
    btnText: "text-emerald-400",
    btnHoverBorder: "hover:border-emerald-400",
    btnHoverShadow: "hover:shadow-[0_0_24px_rgba(16,185,129,0.35)]",
    btnHoverBg: "hover:bg-emerald-500/15",
    dotColor: "bg-emerald-400 shadow-emerald-500/50",
  },
  // 2. Cyan / Electric Teal (e.g. Drawly)
  {
    hex: "#06b6d4",
    borderHover: "hover:border-cyan-500/70",
    shadowHover: "hover:shadow-[0_16px_40px_rgba(6,182,212,0.22)]",
    versionBadge: "bg-cyan-500/10 border-cyan-500/35 text-cyan-400",
    titleHover: "group-hover:text-cyan-300",
    iconHover: "text-cyan-400 group-hover:text-cyan-300",
    btnBorder: "border-cyan-500/40",
    btnBg: "bg-cyan-950/20",
    btnText: "text-cyan-400",
    btnHoverBorder: "hover:border-cyan-400",
    btnHoverShadow: "hover:shadow-[0_0_24px_rgba(6,182,212,0.35)]",
    btnHoverBg: "hover:bg-cyan-500/15",
    dotColor: "bg-cyan-400 shadow-cyan-500/50",
  },
  // 3. Purple / Neon Violet (e.g. Audit AI)
  {
    hex: "#a855f7",
    borderHover: "hover:border-purple-500/70",
    shadowHover: "hover:shadow-[0_16px_40px_rgba(168,85,247,0.22)]",
    versionBadge: "bg-purple-500/10 border-purple-500/35 text-purple-400",
    titleHover: "group-hover:text-purple-300",
    iconHover: "text-purple-400 group-hover:text-purple-300",
    btnBorder: "border-purple-500/40",
    btnBg: "bg-purple-950/20",
    btnText: "text-purple-400",
    btnHoverBorder: "hover:border-purple-400",
    btnHoverShadow: "hover:shadow-[0_0_24px_rgba(168,85,247,0.35)]",
    btnHoverBg: "hover:bg-purple-500/15",
    dotColor: "bg-purple-400 shadow-purple-500/50",
  },
  // 4. Amber / Electric Gold
  {
    hex: "#f59e0b",
    borderHover: "hover:border-amber-500/70",
    shadowHover: "hover:shadow-[0_16px_40px_rgba(245,158,11,0.22)]",
    versionBadge: "bg-amber-500/10 border-amber-500/35 text-amber-400",
    titleHover: "group-hover:text-amber-300",
    iconHover: "text-amber-400 group-hover:text-amber-300",
    btnBorder: "border-amber-500/40",
    btnBg: "bg-amber-950/20",
    btnText: "text-amber-400",
    btnHoverBorder: "hover:border-amber-400",
    btnHoverShadow: "hover:shadow-[0_0_24px_rgba(245,158,11,0.35)]",
    btnHoverBg: "hover:bg-amber-500/15",
    dotColor: "bg-amber-400 shadow-amber-500/50",
  },
  // 5. Rose / Electric Pink
  {
    hex: "#f43f5e",
    borderHover: "hover:border-rose-500/70",
    shadowHover: "hover:shadow-[0_16px_40px_rgba(244,63,94,0.22)]",
    versionBadge: "bg-rose-500/10 border-rose-500/35 text-rose-400",
    titleHover: "group-hover:text-rose-300",
    iconHover: "text-rose-400 group-hover:text-rose-300",
    btnBorder: "border-rose-500/40",
    btnBg: "bg-rose-950/20",
    btnText: "text-rose-400",
    btnHoverBorder: "hover:border-rose-400",
    btnHoverShadow: "hover:shadow-[0_0_24px_rgba(244,63,94,0.35)]",
    btnHoverBg: "hover:bg-rose-500/15",
    dotColor: "bg-rose-400 shadow-rose-500/50",
  },
  // 6. Indigo / Electric Blue
  {
    hex: "#6366f1",
    borderHover: "hover:border-indigo-500/70",
    shadowHover: "hover:shadow-[0_16px_40px_rgba(99,102,241,0.22)]",
    versionBadge: "bg-indigo-500/10 border-indigo-500/35 text-indigo-400",
    titleHover: "group-hover:text-indigo-300",
    iconHover: "text-indigo-400 group-hover:text-indigo-300",
    btnBorder: "border-indigo-500/40",
    btnBg: "bg-indigo-950/20",
    btnText: "text-indigo-400",
    btnHoverBorder: "hover:border-indigo-400",
    btnHoverShadow: "hover:shadow-[0_0_24px_rgba(99,102,241,0.35)]",
    btnHoverBg: "hover:bg-indigo-500/15",
    dotColor: "bg-indigo-400 shadow-indigo-500/50",
  },
];

export default function Work() {
  const allProjects: ProjectItem[] =
    portfolioContent.projects && portfolioContent.projects.length > 0
      ? portfolioContent.projects
      : fallbackProjects;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse drag tracking
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  // 7-fold buffer ensuring true infinite scroll left and right on any screen width
  const loopMultiplier = 7;
  const loopedProjects = Array(loopMultiplier).fill(allProjects).flat();

  // Helper to measure single set width
  const getSingleSetWidth = useCallback(() => {
    const container = scrollRef.current;
    if (!container || allProjects.length === 0) return 0;
    const card = container.querySelector<HTMLElement>("[data-project-card]");
    const gap = 24; // gap-6
    const cardWidth = card ? card.offsetWidth + gap : 374;
    return cardWidth * allProjects.length;
  }, [allProjects.length]);

  // Center scroll position in the middle buffer on mount
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || allProjects.length === 0) return;

    const timer = setTimeout(() => {
      const singleSet = getSingleSetWidth();
      if (singleSet > 0) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = singleSet * 3;
      }
    }, 60);

    return () => clearTimeout(timer);
  }, [allProjects.length, getSingleSetWidth]);

  // Handle continuous circular scroll wrapping (infinite left & infinite right)
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container || allProjects.length === 0) return;

    const singleSet = getSingleSetWidth();
    if (singleSet <= 0) return;

    // If scrolled past set 4.5, silently wrap backward by 1 set without visual jump
    if (container.scrollLeft >= singleSet * 4.5) {
      container.style.scrollBehavior = "auto";
      container.scrollLeft -= singleSet;
    }
    // If scrolled before set 1.5, silently wrap forward by 1 set without visual jump
    else if (container.scrollLeft <= singleSet * 1.5) {
      container.style.scrollBehavior = "auto";
      container.scrollLeft += singleSet;
    }

    // Calculate active project index modulo allProjects.length
    const card = container.querySelector<HTMLElement>("[data-project-card]");
    const cardWidth = card ? card.offsetWidth + 24 : 374;
    const normalized = container.scrollLeft % singleSet;
    const currentIdx = Math.round(normalized / cardWidth) % allProjects.length;
    setActiveIndex(currentIdx);
  }, [allProjects.length, getSingleSetWidth]);

  // Mouse wheel horizontal scroll listener
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.style.scrollBehavior = "auto";
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  // Programmatic scroll step (Left or Right)
  const scrollByStep = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("[data-project-card]");
    const step = card ? card.offsetWidth + 24 : 374;

    container.style.scrollBehavior = "smooth";
    container.scrollBy({
      left: direction === "right" ? step : -step,
      behavior: "smooth",
    });
  };

  // Scroll to a specific project dot
  const scrollToIndex = (targetIndex: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("[data-project-card]");
    const step = card ? card.offsetWidth + 24 : 374;
    const singleSet = step * allProjects.length;

    container.style.scrollBehavior = "smooth";
    container.scrollTo({
      left: singleSet * 3 + targetIndex * step,
      behavior: "smooth",
    });
  };

  // Drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX;
    startScrollLeftRef.current = container.scrollLeft;
  };

  const rafIdRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const container = scrollRef.current;
    if (!container) return;

    const deltaX = e.pageX - startXRef.current;
    if (Math.abs(deltaX) > 6) {
      hasMovedRef.current = true;
    }

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.style.scrollBehavior = "auto";
        scrollRef.current.scrollLeft = startScrollLeftRef.current - deltaX;
      }
    });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };

  return (
    <section
      id="work"
      className="w-full py-12 sm:py-16 lg:py-20 relative bg-transparent text-[#e5e7eb] font-sans scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Row: Section Tag, Title, Gradient Subtitle & Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 sm:mb-6">
          <div>
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{portfolioContent.workSectionTag || "03 // MY WORK"}</span>
            </div>

            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-1.5 sm:mb-2">
              {portfolioContent.workTitle || "Featured Projects"}
            </h2>

            {/* Dynamic Subtitle with Gradient */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400">
                {portfolioContent.workSubtitle || "Turning complex ideas into live products."}
              </span>
            </h3>
          </div>

          {/* Left/Right Navigation Arrow Buttons - Hidden on phones, visible on sm+ screens */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0 self-start md:self-end">
            <button
              type="button"
              onClick={() => scrollByStep("left")}
              aria-label="Scroll projects left"
              className="w-10 h-10 rounded-xl border border-white/10 bg-[#0e1217]/90 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollByStep("right")}
              aria-label="Scroll projects right"
              className="w-10 h-10 rounded-xl border border-white/10 bg-[#0e1217]/90 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 
        Parent Div of Scrollcards: 
        100% Transparent, no borders, no clipping boxes on sides or on hover
      */}
      {/* 
        Parent Div of Scrollcards: 
        Aligned with the text and page (inside max-w-6xl).
        Shows 3 cards looking good, with soft blur outside the 3 cards.
      */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className="relative -mx-3 sm:-mx-5 lg:-mx-8 overflow-hidden"
          onMouseLeave={handleMouseUp}
        >
          {/* Left Blurish Soft Edge (strictly outside the 3 cards, over the padding margin) */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-5 sm:w-7 lg:w-8 z-20 backdrop-blur-xs [mask-image:linear-gradient(to_right,black_20%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,black_20%,transparent_100%)]"
            aria-hidden="true"
          />

          {/* Right Blurish Soft Edge (strictly outside the 3 cards, over the padding margin) */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-5 sm:w-7 lg:w-8 z-20 backdrop-blur-xs [mask-image:linear-gradient(to_left,black_20%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,black_20%,transparent_100%)]"
            aria-hidden="true"
          />

          {/* Scrollable Container with 3 Cards Looking Good and Aligned with Text and Page */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 28px, black calc(100% - 28px), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 28px, black calc(100% - 28px), transparent 100%)",
            }}
            className="flex items-stretch gap-6 overflow-x-auto py-6 sm:py-8 px-3 sm:px-5 lg:px-8 select-none cursor-grab active:cursor-grabbing bg-transparent border-0 outline-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {loopedProjects.map((project, idx) => {
              // Map to original project index so each unique project has its distinct theme color
              const originalIndex = idx % allProjects.length;
              const theme = THEME_COLORS[originalIndex % THEME_COLORS.length];

              return (
                <div
                  key={`${project.id || project.title}-${idx}`}
                  data-project-card="true"
                  role="link"
                  tabIndex={0}
                  aria-label={`Open ${project.title} live project`}
                  onClick={() => {
                    if (hasMovedRef.current) return;
                    if (project.liveUrl) {
                      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (project.liveUrl) {
                        window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                      }
                    }
                  }}
                  style={{
                    width: "calc((100% - 48px) / 3)",
                    minWidth: "295px",
                    maxWidth: "348px",
                  }}
                  className={`group relative shrink-0 rounded-2xl overflow-hidden border border-[#262c36] bg-[#0c1015]/95 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 cursor-pointer select-none ${theme.borderHover} ${theme.shadowHover}`}
                >
                  {/* Internal Ambient Glow tuned to this project's unique color, strictly contained by overflow-hidden */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-24 -right-24 w-52 h-52 rounded-full blur-3xl pointer-events-none transition-all duration-500 opacity-20 group-hover:opacity-75"
                    style={{ backgroundColor: theme.hex }}
                  />

                  <div className="relative z-10">
                    {/* Top Row: Version Badge, Status Badge & External Link Icon */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-2">
                        {/* Version Badge with Unique Color Tint */}
                        <span
                          className={`px-2.5 py-1 rounded-md border font-mono text-xs font-semibold tracking-wider uppercase transition-colors ${theme.versionBadge}`}
                        >
                          {project.version || "V1.0.0"}
                        </span>

                        {/* Status Badge */}
                        {project.status && (
                          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/20 text-zinc-300 font-mono text-xs font-semibold tracking-wider uppercase">
                            {project.status}
                          </span>
                        )}
                      </div>

                      {/* External Link Icon with Unique Hover Glow */}
                      <div
                        className={`w-7 h-7 flex items-center justify-end transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${theme.iconHover}`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Project Title with Unique Hover Color */}
                    <h4
                      className={`text-lg sm:text-xl font-black text-white font-mono tracking-wide uppercase transition-colors mb-3 ${theme.titleHover}`}
                    >
                      {project.title}
                    </h4>

                    {/* 2-3 Line Description */}
                    <p className="text-zinc-400 text-xs sm:text-[13.5px] leading-relaxed italic mb-5 font-sans line-clamp-3">
                      &ldquo;{project.description}&rdquo;
                    </p>

                    {/* Technology Stack Chips */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-5">
                        {project.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md border border-[#30363d] bg-[#161b22]/70 text-zinc-300 font-mono text-[11px] uppercase tracking-wider font-semibold shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* View Source Code Button matching the Card's Unique Color */}
                  <div className="relative z-10 pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.githubUrl) {
                          window.open(project.githubUrl, "_blank", "noopener,noreferrer");
                        }
                      }}
                      className={`w-full py-2.5 px-4 rounded-xl border ${theme.btnBorder} ${theme.btnBg} ${theme.btnHoverBg} ${theme.btnHoverBorder} ${theme.btnText} font-mono text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${theme.btnHoverShadow} cursor-pointer`}
                    >
                      <span className="font-mono">&lt;&gt;</span>
                      <span>VIEW_SOURCE_CODE</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Circular Loop Indicator Dots */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 mt-4">
          {allProjects.map((p, idx) => {
            const theme = THEME_COLORS[idx % THEME_COLORS.length];
            const isActive = activeIndex === idx;

            return (
              <button
                key={p.id || idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Scroll to ${p.title}`}
                className={`transition-all duration-300 cursor-pointer rounded-full ${
                  isActive
                    ? `w-8 h-2 ${theme.dotColor}`
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
