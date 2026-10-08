"use client";

import React from "react";

export default function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#07090e]"
    >
      {/* Primary Subtle Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-35" />

      {/* Secondary Dot Matrix Grid for High-Tech Texture */}
      <div className="absolute inset-0 bg-tech-dots opacity-20" />

      {/* Architectural 4-Column Grid Lines (Centered 7xl container with subtle borders) */}
      <div className="max-w-7xl mx-auto h-full grid grid-cols-2 md:grid-cols-4 divide-x divide-white/7 opacity-40 pointer-events-none" />

      {/* Top Ambient Glow Blob - Cyan / Blue */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-112.5 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Mid-Left Ambient Glow Blob - Indigo / Violet */}
      <div className="absolute top-[35%] -left-32 w-137.5 h-137.5 bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Mid-Right Ambient Glow Blob - Emerald */}
      <div className="absolute top-[65%] -right-32 w-125 h-125 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Vignette Gradient Overlay to smoothly fade the edges */}
      <div className="absolute inset-0 bg-linear-to-b from-[#07090e]/40 via-transparent to-[#07090e]" />
    </div>
  );
}
