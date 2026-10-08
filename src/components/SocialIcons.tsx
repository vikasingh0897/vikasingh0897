import React from "react";

interface SocialIconProps {
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}

/**
 * GitHub SVG Icon from /public/icons/github.svg
 */
export function GithubIcon({
  className = "w-4 h-4",
  style,
  alt = "GitHub",
}: SocialIconProps) {
  return (
    <img
      src="/icons/github.svg"
      alt={alt}
      width={16}
      height={16}
      style={style}
      className={`inline-block object-contain ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * LinkedIn SVG Icon from /public/icons/linkedin.svg
 */
export function LinkedinIcon({
  className = "w-4 h-4",
  style,
  alt = "LinkedIn",
}: SocialIconProps) {
  return (
    <img
      src="/icons/linkedin.svg"
      alt={alt}
      width={16}
      height={16}
      style={style}
      className={`inline-block object-contain ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Official Gmail SVG Icon from /public/icons/gmail.svg
 */
export function GmailIcon({
  className = "w-4 h-4",
  style,
  alt = "Gmail",
}: SocialIconProps) {
  return (
    <img
      src="/icons/gmail.svg"
      alt={alt}
      width={16}
      height={16}
      style={style}
      className={`inline-block object-contain ${className}`}
      aria-hidden="true"
    />
  );
}

// Convenient alias for Email
export const EmailIcon = GmailIcon;

/**
 * Official LeetCode SVG Icon from /public/icons/leetcode.svg
 */
export function LeetcodeIcon({
  className = "w-4 h-4",
  style,
  alt = "LeetCode",
}: SocialIconProps) {
  return (
    <img
      src="/icons/leetcode.svg"
      alt={alt}
      width={16}
      height={16}
      style={style}
      className={`inline-block object-contain ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Official Buy Me a Coffee SVG Icon from /public/icons/buy-me-a-coffee.svg
 */
export function BuyMeACoffeeIcon({
  className = "w-4 h-4",
  style,
  alt = "Buy Me a Coffee",
}: SocialIconProps & { color?: string }) {
  return (
    <img
      src="/icons/buy-me-a-coffee.svg"
      alt={alt}
      width={16}
      height={16}
      style={style}
      className={`inline-block object-contain ${className}`}
      aria-hidden="true"
    />
  );
}
