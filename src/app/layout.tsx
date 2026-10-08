import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundGrid from "@/components/BackgroundGrid";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vikasingh0897.vercel.app"),
  title: "Vikas Singh | Full-Stack Developer & Freelancer",
  description:
    "Personal portfolio of Vikas Singh - Full-Stack Developer & Freelancer specializing in Next.js, React, Node.js, and high-performance distributed web systems.",
  keywords: [
    "Vikas Singh",
    "Full Stack Developer",
    "Freelancer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Web3Task",
    "Bytecode Learners",
    "Drawly",
    "AuditAI",
    "Software Engineer",
  ],
  authors: [{ name: "Vikas Singh", url: "https://github.com/vikasingh0897" }],
  creator: "Vikas Singh",
  openGraph: {
    title: "Vikas Singh | Full-Stack Developer & Freelancer",
    description:
      "Full-Stack Developer & Freelancer specializing in Next.js, React, Node.js, and scalable web architectures.",
    url: "https://github.com/vikasingh0897",
    siteName: "Vikas Singh Portfolio",
    images: [
      {
        url: "/vikasingh0897.webp",
        width: 800,
        height: 800,
        alt: "Vikas Singh - Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikas Singh | Full-Stack Developer & Freelancer",
    description:
      "Full-Stack Developer & Freelancer specializing in Next.js, React, Node.js, and scalable web architectures.",
    images: ["/vikasingh0897.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth overflow-x-hidden`}
    >
      <body className="bg-[#07090e] text-[#e5e7eb] antialiased min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden w-full">
        <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden w-full">
          <BackgroundGrid />
          <div className="flex-1 relative z-10 w-full overflow-x-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
