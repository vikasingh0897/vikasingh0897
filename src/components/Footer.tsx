"use client";

import React from "react";
import { personalData } from "@/data/portfolioData";
import {
  GithubIcon,
  LinkedinIcon,
  GmailIcon,
  BuyMeACoffeeIcon,
} from "@/components/SocialIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const connectLinks = [
    {
      name: "Email",
      url: `mailto:${personalData.email || "vikasingh0897@gmail.com"}`,
      icon: GmailIcon,
      glowClass: "social-glow-email",
      ariaLabel: "Send email to Vikas Singh",
      colorLabel: "hover:text-[#ff6b6b]",
    },
    {
      name: "LinkedIn",
      url: personalData.linkedin || "https://linkedin.com/in/vikasingh0897",
      icon: LinkedinIcon,
      glowClass: "social-glow-linkedin",
      ariaLabel: "Vikas Singh on LinkedIn",
      colorLabel: "hover:text-[#4da3ff]",
    },
  ];

  const otherLinks = [
    {
      name: "GitHub",
      url: personalData.github || "https://github.com/vikasingh0897",
      icon: GithubIcon,
      glowClass: "social-glow-github",
      ariaLabel: "Vikas Singh on GitHub",
      colorLabel: "hover:text-white",
    },
    {
      name: "Buy Me a Coffee",
      url: personalData.buyMeACoffee || "https://buymeacoffee.com/vikasingh0897",
      icon: BuyMeACoffeeIcon,
      glowClass: "social-glow-coffee",
      ariaLabel: "Support Vikas on Buy Me a Coffee",
      colorLabel: "hover:text-[#ffdd00]",
    },
  ];

  return (
    <footer className="w-full relative z-20 border-t border-white/10 bg-[#05070b]/90 backdrop-blur-md text-[#e5e7eb] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-4 sm:pb-5">
        {/* Main Footer Grid: Brand (6 cols), Connect With Me (3 cols), Profiles & Support (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-8 sm:pb-9 border-b border-white/8 items-start">
          
          {/* Column 1: Brand & Status */}
          <div className="md:col-span-6 lg:col-span-6 space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                Open for opportunities
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              <span>Vikas Singh</span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 ml-2 text-base sm:text-lg font-mono font-medium">
                {"// Full-Stack Engineer"}
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Building scalable, high-performance web systems and dynamic digital experiences with clean architecture and precision engineering.
            </p>
          </div>

          {/* Column 2: Category 1 - Profiles & Support (LeetCode, Buy Me a Coffee) */}
          <div className="md:col-span-3 lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Profiles &amp; Support
            </div>
            <div className="flex flex-wrap md:flex-col items-start gap-2 sm:gap-2.5 pt-1">
              {otherLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    title={`${social.name} (Click to open)`}
                    className={`${social.glowClass} relative group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-[#0d1117]/90 cursor-pointer select-none text-xs font-mono text-slate-300 transition-all hover:-translate-y-0.5`}
                  >
                    <IconComponent className="social-icon w-4 h-4 text-slate-400 relative z-10 transition-all duration-300" />
                    <span className={`relative z-10 transition-colors duration-300 ${social.colorLabel}`}>
                      {social.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 3: Category 2 - Connect With Me (Email, GitHub, LinkedIn) */}
          <div className="md:col-span-3 lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Connect With Me
            </div>
            <div className="flex flex-wrap md:flex-col items-start gap-2 sm:gap-2.5 pt-1">
              {connectLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.url.startsWith("mailto") ? undefined : "_blank"}
                    rel={social.url.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    aria-label={social.ariaLabel}
                    title={`${social.name} (Click to open)`}
                    className={`${social.glowClass} relative group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-[#0d1117]/90 cursor-pointer select-none text-xs font-mono text-slate-300 transition-all hover:-translate-y-0.5`}
                  >
                    <IconComponent className="social-icon w-4 h-4 text-slate-400 relative z-10 transition-all duration-300" />
                    <span className={`relative z-10 transition-colors duration-300 ${social.colorLabel}`}>
                      {social.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          
        </div>

        {/* Bottom Bar: Centered Copyright with clickable vikasingh0897 redirecting to GitHub */}
        <div className="pt-4 sm:pt-5 flex items-center justify-center text-center text-xs font-mono text-slate-400">
          <span>
            © {currentYear}{" "}
            <a
              href={personalData.github || "https://github.com/vikasingh0897"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-emerald-400 underline decoration-slate-600 hover:decoration-emerald-400 transition-colors"
            >
              vikasingh0897
            </a>
            . All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
