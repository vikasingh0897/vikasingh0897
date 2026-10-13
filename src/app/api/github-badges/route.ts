import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";
import { portfolioContent, AchievementItem } from "@/lib/portfolioContent";

export const revalidate = 43200; // Cache for 12 hours (ISR)

const GITHUB_DESCRIPTIONS: Record<string, string> = {
  "pull-shark": "Merged pull requests into active repositories",
  "quickdraw": "Closed an issue or pull request within 5 minutes of opening",
  "pair-extraordinaire": "Co-authored commits in merged pull requests",
  "yolo": "Merged a pull request without code review",
  "galaxy-brain": "Accepted answers in discussions",
  "starstruck": "Created a repository with lots of stars",
  "arctic-code-vault-contributor": "Contributed code to 2020 GitHub Archive Program",
  "public-sponsor": "Sponsored open source creators on GitHub",
};

function sanitizeText(str: string): string {
  if (!str) return "";
  return DOMPurify.sanitize(str, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }).trim();
}

function isSafeUrl(url: string): boolean {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  return (
    (trimmed.startsWith("https://") ||
      trimmed.startsWith("http://") ||
      trimmed.startsWith("/")) &&
    !trimmed.startsWith("javascript:") &&
    !trimmed.startsWith("data:")
  );
}

async function fetchGitHubBadges(username: string): Promise<AchievementItem[]> {
  const fallbackBadges: AchievementItem[] = portfolioContent.achievements || [];

  try {
    const res = await fetch(`https://github.com/${username}?tab=achievements`, {
      next: { revalidate: 43200 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!res.ok) {
      return fallbackBadges;
    }

    const html = await res.text();
    const badges: AchievementItem[] = [];
    const seen = new Set<string>();

    // 1. Extract from achievements tab details cards safely by block chunks
    const detailsBlocks = html.split("<details").slice(1);
    for (const block of detailsBlocks) {
      const slugMatch = block.match(/data-achievement-slug="([^"]+)"/i);
      const imgMatch = block.match(/<img[^>]+src="([^"]+)"[^>]+alt="Achievement:\s*([^"]+)"/i);
      if (slugMatch && imgMatch) {
        const slug = sanitizeText(slugMatch[1]);
        const badgeImgUrl = imgMatch[1].trim();
        const rawTitle = sanitizeText(imgMatch[2]);

        if (!seen.has(slug) && isSafeUrl(badgeImgUrl)) {
          seen.add(slug);
          badges.push({
            id: slug,
            title: rawTitle,
            description:
              GITHUB_DESCRIPTIONS[slug] || `GitHub Achievement: ${rawTitle}`,
            badgeUrl: badgeImgUrl,
            githubUrl: `https://github.com/${username}?achievement=${slug}&tab=achievements`,
          });
        }
      }
    }

    // 2. Extract from profile sidebar as backup if tab details were empty
    if (badges.length === 0) {
      const sidebarLinks = html.split('href="/').slice(1);
      for (const chunk of sidebarLinks) {
        const slugMatch = chunk.match(/achievement=([^&"]+)/i);
        const imgMatch = chunk.match(/<img[^>]+src="([^"]+)"[^>]+alt="Achievement:\s*([^"]+)"/i);
        if (slugMatch && imgMatch) {
          const slug = sanitizeText(slugMatch[1]);
          const badgeImgUrl = imgMatch[1].trim();
          const rawTitle = sanitizeText(imgMatch[2]);

          if (!seen.has(slug) && isSafeUrl(badgeImgUrl)) {
            seen.add(slug);
            badges.push({
              id: slug,
              title: rawTitle,
              description:
                GITHUB_DESCRIPTIONS[slug] || `GitHub Achievement: ${rawTitle}`,
              badgeUrl: badgeImgUrl,
              githubUrl: `https://github.com/${username}?achievement=${slug}&tab=achievements`,
            });
          }
        }
      }
    }

    return badges.length > 0 ? badges : fallbackBadges;
  } catch (error) {
    console.error("Failed to fetch live GitHub badges:", error);
    return fallbackBadges;
  }
}

async function fetchLeetCodeBadges(username: string): Promise<AchievementItem[]> {
  try {
    const query = `
      query userBadges($username: String!) {
        matchedUser(username: $username) {
          badges {
            id
            name
            displayName
            icon
            hoverText
            category
          }
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 43200 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const rawBadges = data?.data?.matchedUser?.badges || [];

    return rawBadges
      .map(
        (b: {
          id: string;
          name?: string;
          displayName?: string;
          icon?: string;
          hoverText?: string;
        }) => {
          let iconUrl = (b.icon || "").trim();
          if (iconUrl.startsWith("/")) {
            iconUrl = `https://leetcode.com${iconUrl}`;
          }
          if (!isSafeUrl(iconUrl)) return null;

          const title = sanitizeText(b.displayName || b.name || "LeetCode Badge");
          const description = sanitizeText(b.hoverText || b.name || "LeetCode Achievement");
          const badgeId = sanitizeText(b.id || b.name || "badge");

          return {
            id: `leetcode-${badgeId}`,
            title,
            description,
            badgeUrl: iconUrl,
            githubUrl: `https://leetcode.com/u/${username}/`,
          };
        }
      )
      .filter((item: AchievementItem | null): item is AchievementItem => item !== null);
  } catch (err) {
    console.error("Failed to fetch live LeetCode badges:", err);
    return [];
  }
}

export async function GET() {
  const username = "vikasingh0897";

  const [githubBadges, leetcodeBadges] = await Promise.all([
    fetchGitHubBadges(username),
    fetchLeetCodeBadges(username),
  ]);

  return NextResponse.json({
    github: githubBadges,
    leetcode: leetcodeBadges,
    badges: [...githubBadges, ...leetcodeBadges],
    source: "live",
  });
}
