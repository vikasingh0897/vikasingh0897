// Type-safe TinaCMS configuration helper that operates cleanly without native C++ better-sqlite3 build dependencies
type TinaConfig = Record<string, unknown>;
export const defineConfig = <T extends TinaConfig>(config: T): T => config;

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // =========================================================================
      // 1. ABOUT & HERO PAGE CONTENT
      // =========================================================================
      {
        name: "about",
        label: "About & Hero Page",
        path: "content/pages",
        format: "json",
        match: {
          include: "about",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "sectionTag",
            label: "Section Tag (e.g. 01 // ABOUT ME)",
          },
          {
            type: "image",
            name: "avatar",
            label: "Profile Photo (Hero Section)",
          },
          {
            type: "image",
            name: "resume",
            label: "Resume (PDF or File URL)",
          },
          {
            type: "string",
            name: "role",
            label: "Current Role (e.g. Full Stack Developer)",
          },
          {
            type: "string",
            name: "company",
            label: "Company / Organization (e.g. @Web3task)",
          },
          {
            type: "string",
            name: "bioPara",
            label: "About Me - Bio Paragraph",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            list: true,
            name: "achievements",
            label: "GitHub Badges & Achievements",
            ui: {
              itemProps: (item?: { title?: string }) => ({
                label: item?.title || "New Achievement",
              }),
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "Achievement ID (e.g. pull-shark)",
              },
              {
                type: "string",
                name: "title",
                label: "Achievement Title (e.g. Pull Shark)",
              },
              {
                type: "string",
                name: "description",
                label: "Description (e.g. Merged pull requests)",
              },
              {
                type: "image",
                name: "badgeUrl",
                label: "Badge Image URL",
              },
              {
                type: "string",
                name: "githubUrl",
                label: "GitHub Link",
              },
            ],
          },
        ],
      },

      // =========================================================================
      // 2. TECH STACK (SKILLS)
      // =========================================================================
      {
        name: "skills",
        label: "Tech Stack & Skills",
        path: "content/pages",
        format: "json",
        match: {
          include: "skills",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "sectionTag",
            label: "Section Tag (e.g. 02 // TECH STACK)",
          },
          {
            type: "string",
            name: "title",
            label: "Skills Section Title",
          },
          {
            type: "string",
            name: "subtitle",
            label: "Skills Section Subtitle",
          },
          {
            type: "object",
            list: true,
            name: "techBranches",
            label: "Tech Stacks & Categories",
            ui: {
              itemProps: (item?: { name?: string }) => ({
                label: item?.name || "New Stack Category",
              }),
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "Unique ID (lowercase, e.g. frontend)",
              },
              {
                type: "string",
                name: "name",
                label: "Category Name (e.g. Frontend, Backend)",
              },
              {
                type: "string",
                name: "branchName",
                label: "Git Branch Tag (e.g. feat/frontend)",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle / Description",
              },
              {
                type: "object",
                list: true,
                name: "skills",
                label: "Technologies & Skills List",
                ui: {
                  itemProps: (item?: { name?: string }) => ({
                    label: item?.name || "Skill Item",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Skill Name (e.g. React, TypeScript)",
                  },
                  {
                    type: "image",
                    name: "icon",
                    label: "Upload SVG Icon / Logo (or select from /icons/)",
                  },
                ],
              },
            ],
          },
        ],
      },

      // =========================================================================
      // 3. WORK & PROJECTS
      // =========================================================================
      {
        name: "work",
        label: "Work & Projects",
        path: "content/pages",
        format: "json",
        match: {
          include: "work",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "sectionTag",
            label: "Section Tag (e.g. 03 // MY WORK)",
          },
          {
            type: "string",
            name: "title",
            label: "Work Section Title",
          },
          {
            type: "string",
            name: "subtitle",
            label: "Work Section Subtitle",
          },
          {
            type: "object",
            list: true,
            name: "projects",
            label: "Projects & Deployments",
            ui: {
              itemProps: (item?: { title?: string; status?: string }) => ({
                label: item?.title ? `${item.title} [${item.status || "ACTIVE"}]` : "New Project",
              }),
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "Project ID (lowercase slug)",
              },
              {
                type: "string",
                name: "title",
                label: "Project Title",
              },
              {
                type: "string",
                name: "description",
                label: "Project Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "version",
                label: "Version (e.g. V1.0.0)",
              },
              {
                type: "string",
                name: "status",
                label: "Deployment Status (ACTIVE, BETA, PRODUCTION)",
              },
              {
                type: "string",
                list: true,
                name: "tags",
                label: "Tech Tags (React, Node, etc.)",
              },
              {
                type: "string",
                name: "githubUrl",
                label: "GitHub Source Repository URL",
              },
              {
                type: "string",
                name: "liveUrl",
                label: "Live Deployment URL",
              },
            ],
          },
        ],
      },

      // =========================================================================
      // 4. CONTACT
      // =========================================================================
      {
        name: "contact",
        label: "Contact",
        path: "content/pages",
        format: "json",
        match: {
          include: "contact",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "sectionTag",
            label: "Section Tag (e.g. 04 // LET’S TALK)",
          },
          {
            type: "string",
            name: "title",
            label: "Contact Headline",
          },
          {
            type: "string",
            name: "subtitle",
            label: "Contact Subtitle Paragraph",
          },
        ],
      },
    ],
  },
});
