"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  num: string;
}

const navItems: NavItem[] = [
  { name: "About", href: "#about", num: "01" },
  { name: "Tech Stack", href: "#skills", num: "02" },
  { name: "Projects", href: "#work", num: "03" },
  { name: "Contact", href: "#contact", num: "04" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for glassmorphism header depth
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section Observer to highlight active link
  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "work", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        isScrolled
          ? "bg-[#07090e]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30 py-3"
          : "bg-[#07090e]/50 backdrop-blur-sm border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group flex items-center gap-2.5 cursor-pointer select-none"
          aria-label="Vikas Singh - Home"
        >
          {/* Monogram Badge */}
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 group-hover:border-emerald-400 flex items-center justify-center text-emerald-400 font-mono text-xs font-black transition-all shadow-sm group-hover:shadow-[0_0_12px_rgba(52,211,153,0.3)]">
            VS
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
              <span>vikasingh0897</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            </span>
            <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase hidden sm:block">
              Full-Stack Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-1.5"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive =
              activeSection === item.href.replace("#", "") ||
              (item.href === "#work" && activeSection === "work");

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "text-emerald-400 bg-emerald-500/10 font-bold border border-emerald-500/20 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <span className="text-slate-600 text-[10px] font-normal font-mono">
                  {item.num}.
                </span>
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Get In Touch Button (Desktop & Tablet) */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-sm hover:shadow-emerald-500/20 cursor-pointer hover:-translate-y-0.5"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-[#0c1017]/90 text-slate-300 hover:text-white hover:border-emerald-400/50 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-emerald-400" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-[#0c1017]/95 backdrop-blur-xl p-4 shadow-2xl shadow-black/50 space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-3 py-1">
              Menu Navigation
            </div>

            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      isActive
                        ? "text-emerald-400 bg-emerald-500/10 font-bold border border-emerald-500/25"
                        : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400/60 text-[10px]">
                        {item.num}.
                      </span>
                      <span>{item.name}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                );
              })}
            </div>

            {/* Mobile Drawer CTA */}
            <div className="pt-2 border-t border-white/10">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-sm cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
