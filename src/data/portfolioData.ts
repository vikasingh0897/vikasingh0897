export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  version?: string;
  status?: string;
}

export const personalData = {
  name: "Vikas Singh",
  title: "Full Stack Developer & Freelancer",
  email: "vikasingh0897@gmail.com",
  github: "https://github.com/vikasingh0897",
  linkedin: "https://linkedin.com/in/vikasingh0897",
  leetcode: "https://leetcode.com/u/vikasingh0897/",
  buyMeACoffee: "https://buymeacoffee.com/vikasingh0897",
  resumeUrl: "/resume_vikasingh0897.pdf",
};

export const projects: ProjectItem[] = [
  {
    id: "bytecode-platform",
    title: "BYTECODE LEARNERS",
    description:
      "The official digital hub for the Bytecode Learners coding club. This Git-backed CMS platform serves as a central registry for events, member contributions, and technical resources, fostering a collaborative ecosystem for students.",
    tags: ["REACT", "VITE", "TAILWIND CSS", "TINACMS"],
    version: "V1.0.0",
    status: "ACTIVE",
    githubUrl: "https://github.com/vikasingh0897",
    liveUrl: "https://www.bytecodelearner.tech",
  },
  {
    id: "drawly",
    title: "DRAWLY",
    description:
      "A low-latency collaborative multiplayer whiteboard and infinite canvas system. Built for seamless architectural diagrams, real-time multiplayer sketching, and rapid team brainstorming.",
    tags: ["NEXT.JS", "REACT", "WEBSOCKETS", "CANVAS API", "TAILWIND CSS"],
    version: "V1.2.0",
    status: "ACTIVE",
    githubUrl: "https://github.com/vikasingh0897/drawly",
    liveUrl: "https://drawly.vercel.app",
  },
  {
    id: "audit-ai",
    title: "AUDIT AI",
    description:
      "An intelligent automated auditing system analyzing web applications for security vulnerabilities, performance bottlenecks, and SEO issues with LLM-powered recommendations.",
    tags: ["NEXT.JS", "TYPESCRIPT", "AI / LLM", "NODE.JS", "TAILWIND CSS"],
    version: "V1.0.4",
    status: "ACTIVE",
    githubUrl: "https://github.com/vikasingh0897/audit-ai",
    liveUrl: "https://audit-ai.vercel.app",
  },
];
