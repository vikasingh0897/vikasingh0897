import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 1. Read JSON content from TinaCMS files
const aboutPath = path.join(rootDir, "content", "pages", "about.json");
const skillsPath = path.join(rootDir, "content", "pages", "skills.json");

const about = JSON.parse(fs.readFileSync(aboutPath, "utf-8"));
const skills = JSON.parse(fs.readFileSync(skillsPath, "utf-8"));

// 2. Personal configuration data
const name = "Vikas Singh";
const role = about.role || "Full-Stack Software Engineer & Freelancer";
const company = about.company
  ? about.company.startsWith("@")
    ? about.company
    : `@${about.company}`
  : "@Web3task";
const bio =
  about.bioPara ||
  "Passionate about crafting high-performance, distributed web systems, real-time applications, and seamless user experiences.";

// Base URL for raw assets on GitHub so images render on both repo and main profile overview tab
const rawBaseUrl =
  "https://raw.githubusercontent.com/vikasingh0897/vikasingh0897/main/public";

// Safe asset resolver supporting local files and external URLs
const resolveAssetUrl = (urlPath) => {
  if (!urlPath) return "";
  if (urlPath.startsWith("http://") || urlPath.startsWith("https://")) {
    return urlPath;
  }
  const cleanPath = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
  return `${rawBaseUrl}${cleanPath}`;
};

const resumeUrl = about.resume
  ? about.resume.startsWith("http")
    ? about.resume
    : `https://vikasingh0897.vercel.app${about.resume.startsWith("/") ? "" : "/"}${about.resume}`
  : "https://vikasingh0897.vercel.app/resume_vikasingh0897.pdf";

// Format Achievements HTML (Borderless)
const achievementsHtml = (about.achievements || [])
  .map(
    (a) => `    <a href="${a.githubUrl || 'https://github.com/vikasingh0897?tab=achievements'}" title="${a.title}: ${a.description || ''}">
      <img src="${resolveAssetUrl(a.badgeUrl)}" width="95" alt="${a.title} Badge" />
    </a>`
  )
  .join("\n    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n");

// Format Skills HTML for each branch (Borderless, Icon-Only)
const skillsSectionsHtml = (skills.techBranches || [])
  .map((branch) => {
    const skillsRow = (branch.skills || [])
      .map(
        (s) =>
          `<img src="${resolveAssetUrl(s.icon)}" width="42" height="42" alt="${s.name}" title="${s.name}" />`
      )
      .join(" &nbsp;&nbsp;&nbsp;&nbsp; ");

    return `### ${branch.name}\n\n<p align="center">\n  ${skillsRow}\n</p>`;
  })
  .join("\n\n");

// 3. Assemble full README.md content
const readmeContent = `<div align="center">
  <a href="https://github.com/vikasingh0897">
    <img src="https://github.com/vikasingh0897.png" width="130" height="130" alt="${name}" style="border-radius: 50%;" />
  </a>
  <h1>${name}</h1>
  <p><b>${role} ${company}</b></p>
  <p>${bio}</p>

  <br />
  <a href="https://vikasingh0897.vercel.app"><img src="https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Portfolio" /></a>
  <a href="${resumeUrl}"><img src="https://img.shields.io/badge/Resume-4F46E5?style=for-the-badge&logo=googledocs&logoColor=white" alt="Resume" /></a>
  <a href="https://github.com/vikasingh0897"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://linkedin.com/in/vikasingh0897"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="mailto:vikasingh0897@gmail.com"><img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail" /></a>

  <br /><br />

  <h2>Achievements</h2>

  <p align="center">
${achievementsHtml}
  </p>
</div>

<br />

---

## Technical Expertise →

<div align="center">

${skillsSectionsHtml}

</div>

---

<div align="center">
  <img src="https://raw.githubusercontent.com/vikasingh0897/vikasingh0897/main/profile-3d-contrib/profile-night-green.svg" alt="3D Contribution Graph" width="100%">
</div>

---
`;

// 4. Write to README.md
const readmePath = path.join(rootDir, "README.md");
fs.writeFileSync(readmePath, readmeContent, "utf-8");
console.log("✅ Successfully synced README.md with TinaCMS content using absolute raw URLs!");
