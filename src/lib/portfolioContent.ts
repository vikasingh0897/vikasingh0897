import aboutData from "../../content/pages/about.json";
import workData from "../../content/pages/work.json";
import skillsData from "../../content/pages/skills.json";
import contactData from "../../content/pages/contact.json";
import { personalData } from "@/data/portfolioData";

export interface SkillItem {
  name: string;
  icon?: string;
}

export interface TechBranchData {
  id: string;
  name: string;
  branchName: string;
  sha?: string;
  subtitle: string;
  skills: (string | SkillItem)[];
}

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

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  badgeUrl: string;
  githubUrl: string;
}

export interface AboutContent {
  sectionTag?: string;
  avatar: string;
  resume: string;
  role: string;
  company: string;
  bioPara: string;
  achievements?: AchievementItem[];
}

export interface WorkContent {
  sectionTag?: string;
  title: string;
  subtitle?: string;
  projects: ProjectItem[];
}

export interface SkillsContent {
  sectionTag?: string;
  title: string;
  subtitle: string;
  techBranches: TechBranchData[];
}

export interface ContactContent {
  sectionTag?: string;
  title: string;
  subtitle?: string;
}

export interface PortfolioContent {
  // About & Hero
  aboutSectionTag?: string;
  avatar: string;
  resume: string;
  role?: string;
  company?: string;
  bioPara: string;
  achievements?: AchievementItem[];

  // Skills
  skillsSectionTag?: string;
  skillsTitle?: string;
  skillsSubtitle?: string;
  techBranches: TechBranchData[];

  // Work / Projects
  workSectionTag?: string;
  workTitle?: string;
  workSubtitle?: string;
  projects: ProjectItem[];

  // Contact
  contactSectionTag?: string;
  contactTitle?: string;
  contactSubtitle?: string;
}

// Export individual modular page content
export const aboutPageContent: AboutContent = aboutData as unknown as AboutContent;
export const workPageContent: WorkContent = workData as WorkContent;
export const skillsPageContent: SkillsContent = skillsData as SkillsContent;
export const contactPageContent: ContactContent = contactData as ContactContent;

// Export unified portfolioContent aggregating all active website content
export const portfolioContent: PortfolioContent = {
  aboutSectionTag: (aboutData as Record<string, unknown>).sectionTag as string || "01 // ABOUT ME",
  avatar: aboutData.avatar || "/vikasingh0897.webp",
  resume: aboutData.resume || personalData.resumeUrl || "/resume_vikasingh0897.pdf",
  role: aboutData.role || "Full Stack Developer",
  company: aboutData.company || "@Web3task",
  bioPara:
    (aboutData as Record<string, unknown>).bioPara as string ||
    "I’m a Full-Stack Engineer passionate about building fast, reliable, and user-friendly web applications. I work on both frontend and backend development, build APIs, manage databases, and write clean, efficient code. I enjoy learning new technologies and turning ideas into practical solutions.",
  achievements: ((aboutData as Record<string, unknown>).achievements || [
    {
      id: "pull-shark",
      title: "Pull Shark",
      description: "Merged pull requests into active repositories",
      badgeUrl: "/badges/pull-shark.png",
      githubUrl: "https://github.com/vikasingh0897?achievement=pull-shark&tab=achievements",
    },
    {
      id: "quickdraw",
      title: "Quickdraw",
      description: "Closed an issue or pull request within 5 minutes of opening",
      badgeUrl: "/badges/quickdraw.png",
      githubUrl: "https://github.com/vikasingh0897?achievement=quickdraw&tab=achievements",
    },
  ]) as AchievementItem[],

  // Skills
  skillsSectionTag: (skillsData as Record<string, unknown>).sectionTag as string || "02 // TECH STACK",
  skillsTitle: skillsData.title || "Technical Stack",
  skillsSubtitle: skillsData.subtitle || "The technologies and tools I work with.",
  techBranches: (skillsData.techBranches || []) as TechBranchData[],

  // Work / Projects
  workSectionTag: (workData as Record<string, unknown>).sectionTag as string || "03 // MY WORK",
  workTitle: workData.title || "Featured Projects",
  workSubtitle: (workData as Record<string, unknown>).subtitle as string || "Turning complex ideas into live products.",
  projects: (workData.projects || []) as ProjectItem[],

  // Contact
  contactSectionTag: (contactData as Record<string, unknown>).sectionTag as string || "04 // LET’S TALK",
  contactTitle: contactData.title || "Get In Touch",
  contactSubtitle: (contactData as Record<string, unknown>).subtitle as string || "If you have a project in mind or an open role, I’d love to hear about it. Let’s connect!",
};
