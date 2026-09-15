import type { FC } from "react";

export type BrandVariant = "lineage" | "monogram" | "compass" | "classic";

interface BrandLogoProps {
  variant?: BrandVariant;
  className?: string;
  size?: number;
}

export const BrandMark: FC<BrandLogoProps> = ({
  variant = "lineage",
  className = "",
  size = 22,
}) => {
  if (variant === "monogram") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`brand-mark-svg brand-mark-monogram ${className}`}
        aria-hidden="true"
      >
        {/* Architectural precision frame */}
        <rect
          x="1.5"
          y="1.5"
          width="19"
          height="19"
          rx="4.5"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        {/* Geometric Capital D */}
        <path
          d="M5.5 5.5h2.8a3.5 3.5 0 0 1 0 7h-2.8V5.5z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        {/* Architectural Capital L */}
        <path
          d="M13.2 7v7h3.8"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "compass") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`brand-mark-svg brand-mark-compass ${className}`}
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.45" />
        <circle cx="16" cy="16" r="2.6" fill="currentColor" />
        <path
          d="M6 8.6v3.8a3.6 3.6 0 0 0 3.6 3.6H13.4"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M12.2 14.4l2 1.6-2 1.6"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "classic") {
    return (
      <span className={`final-brand-mark-classic ${className}`} aria-hidden="true">
        <i />
      </span>
    );
  }

  // Default: Lineage Folio (Superceded Ledger) - Clean parallel ledger rules, no face effect
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`brand-mark-svg brand-mark-lineage ${className}`}
      aria-hidden="true"
    >
      {/* Predecessor archival sheet (superseded / history) */}
      <rect
        x="2.5"
        y="2.5"
        width="11"
        height="12.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="2.5 1.5"
        opacity="0.4"
      />
      {/* Active decision record sheet (foreground) */}
      <rect
        x="8.5"
        y="7"
        width="11"
        height="12.5"
        rx="2"
        fill="var(--final-paper, #FBFBFA)"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {/* Clean ledger document rules */}
      <line
        x1="11"
        y1="10.5"
        x2="17"
        y2="10.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="13.2"
        x2="17"
        y2="13.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="15.9"
        x2="15"
        y2="15.9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export interface BrandWordmarkProps {
  variant?: BrandVariant;
  style?: "sans" | "editorial";
  showTag?: boolean;
}

export const BrandWordmark: FC<BrandWordmarkProps> = ({
  variant = "lineage",
  style = "sans",
  showTag = false,
}) => {
  return (
    <span className="brand-identity-wrap">
      <BrandMark variant={variant} />
      <span className={`brand-identity-text ${style === "editorial" ? "editorial" : "sans"}`}>
        <span className="brand-name-primary">Decision</span>
        <span className="brand-name-secondary">Log</span>
      </span>
      {showTag && <span className="brand-identity-badge">v1.0</span>}
    </span>
  );
};
