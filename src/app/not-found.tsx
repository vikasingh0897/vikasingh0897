import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Vikas Singh",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 bg-[#07090e] text-[#e5e7eb] font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
        {/* Monogram Brand Icon */}
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 font-mono text-xs font-black shadow-sm mb-6">
          VS
        </div>

        {/* 404 Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c1017] border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>404 ERROR</span>
        </div>

        {/* Clean Professional Heading */}
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Page not found
        </h1>

        {/* Clear Description */}
        <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
          Sorry, the page you are looking for doesn&apos;t exist, has been removed, or the link is broken.
        </p>

        {/* Clean Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-emerald-500/20 hover:-translate-y-0.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
