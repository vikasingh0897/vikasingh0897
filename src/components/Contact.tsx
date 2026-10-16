"use client";

import React, { useState } from "react";
import { personalData } from "@/data/portfolioData";
import { portfolioContent } from "@/lib/portfolioContent";
import { Check, ArrowUpRight, ArrowRight } from "lucide-react";

type PurposeOption = "Freelance" | "Job" | "Other";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    purpose: "Freelance" as PurposeOption,
    message: "",
    honeypot: "", // hidden field to catch automated bot spam
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const purposeOptions: PurposeOption[] = [
    "Freelance",
    "Job",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to dispatch message. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error. Please try again or reach out directly.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setFormData({
      fullName: "",
      email: "",
      purpose: "Freelance",
      message: "",
      honeypot: "",
    });
  };

  return (
    <section
      id="contact"
      className="w-full py-12 sm:py-16 lg:py-20 relative bg-transparent text-[#e5e7eb] font-sans scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header: Numbered Tag */}
        <div className="mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{portfolioContent.contactSectionTag || "04 // CONTACT ME"}</span>
          </div>
        </div>

        {/* 2-Column Grid: Left (Headline, Pitch, Social SVG Icons) & Right (Minimalist Form with No Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Main Headline: White like other sections */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-2">
              {portfolioContent.contactTitle || "Get In Touch"}
            </h2>

            {/* Subtitle with Gradient: Let’s make problems nervous. */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-3 leading-tight">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Let’s make problems nervous.
              </span>
            </h3>

            {/* Contact Subtitle Paragraph */}
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md mb-6 font-sans">
              {portfolioContent.contactSubtitle || "If you have a project in mind or an open role, I’d love to hear about it. Let’s connect!"}
            </p>

            {/* Social & Contact Icons: Email, LinkedIn, GitHub */}
            <div className="hidden sm:flex items-center gap-3 pt-1">
              {/* Email Icon - Gmail Red Lighting Glow (#ea4335) */}
              <a
                href={`mailto:${personalData.email || "vikasingh0897@gmail.com"}`}
                className="social-glow-gmail w-10 h-10 rounded-xl border border-white/10 bg-[#0e1217]/90 flex items-center justify-center cursor-pointer shadow-sm group"
                aria-label="Send Email"
                title={`Email: ${personalData.email || "vikasingh0897@gmail.com"}`}
              >
                <img
                  src="/icons/gmail.svg"
                  alt="Email"
                  className="w-5 h-5"
                />
              </a>

              {/* LinkedIn Icon - LinkedIn Blue Lighting Glow (#0a66c2) */}
              <a
                href={personalData.linkedin || "https://linkedin.com/in/vikasingh0897"}
                target="_blank"
                rel="noopener noreferrer"
                className="social-glow-linkedin w-10 h-10 rounded-xl border border-white/10 bg-[#0e1217]/90 flex items-center justify-center cursor-pointer shadow-sm group"
                aria-label="LinkedIn Profile"
                title="LinkedIn Profile"
              >
                <img
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  className="w-5 h-5"
                />
              </a>

              {/* GitHub Icon - Crisp White Lighting Glow (#ffffff) */}
              <a
                href={personalData.github || "https://github.com/vikasingh0897"}
                target="_blank"
                rel="noopener noreferrer"
                className="social-glow-github w-10 h-10 rounded-xl border border-white/10 bg-[#0e1217]/90 flex items-center justify-center cursor-pointer shadow-sm group"
                aria-label="GitHub Profile"
                title="GitHub Profile"
              >
                <img
                  src="/icons/github.svg"
                  alt="GitHub"
                  className="w-5 h-5"
                />
              </a>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: MINIMALIST FORM (NO BOX) ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {isSubmitted ? (
              /* Submission Success Confirmation */
              <div className="py-8 sm:py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <Check className="w-7 h-7" />
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                    TRANSMISSION RECEIVED
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
                    Thanks for connecting, {formData.fullName.split(" ")[0]}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your inquiry regarding <span className="text-emerald-300 font-semibold">{formData.purpose}</span> has been dispatched. Vikas will reply directly to <span className="text-white font-mono text-xs underline">{formData.email}</span> within 24 hours.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-xl border border-white/20 hover:border-emerald-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Send Another Message</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Active Contact Form directly over the background grid - No box! */
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Error Banner */}
                {errorMessage && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center justify-between animate-in fade-in duration-200"
                  >
                    <span>⚠ {errorMessage}</span>
                    <button
                      type="button"
                      onClick={() => setErrorMessage(null)}
                      className="text-rose-400 hover:text-white ml-2 text-sm font-bold cursor-pointer"
                      aria-label="Dismiss error"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Hidden Honeypot Field for anti-bot spam protection */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  />
                </div>

                {/* Full Name Field (Minimalist Underlined) */}
                <div>
                  <label className="block text-xs font-serif italic text-slate-400 mb-1">
                    Full name*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-sm sm:text-base text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none transition-colors font-sans"
                  />
                </div>

                {/* Email Field (Minimalist Underlined) */}
                <div>
                  <label className="block text-xs font-serif italic text-slate-400 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-sm sm:text-base text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none transition-colors font-sans"
                  />
                </div>

                {/* Purpose Field (Interactive Chips: General, Freelancing, Job Opportunity) */}
                <div>
                  <label className="block text-xs font-serif italic text-slate-400 mb-2">
                    Purpose*
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {purposeOptions.map((option) => {
                      const isSelected = formData.purpose === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData({ ...formData, purpose: option })}
                          className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-sans transition-all cursor-pointer border ${
                            isSelected
                              ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-medium shadow-sm shadow-emerald-500/10"
                              : "bg-white/3 border-white/10 text-slate-400 hover:text-white hover:border-white/25"
                          }`}
                        >
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Field (Minimalist Underlined) */}
                <div>
                  <label className="block text-xs font-serif italic text-slate-400 mb-1">
                    Message*
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, or open role..."
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-sm sm:text-base text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none transition-colors resize-none leading-relaxed font-sans"
                  />
                </div>

                {/* Submit Button (Matching Reference Image "Lets Connect ↗") */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span>{isSubmitting ? "Connecting..." : "Lets Connect"}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
