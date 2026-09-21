import type { ReactNode } from "react";
import { chevronPath, markColors } from "@/lib/logo";

type MarkProps = {
  inverted?: boolean;
  size?: number;
  title?: string;
  className?: string;
};

function canvas({
  size,
  title,
  className,
  children,
}: {
  size: number;
  title?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** 01 Steep solid roof peak. */
export function MarkFirst({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: <path fill={primary} d={chevronPath(40, 14, 68, 32, 14)} />,
  });
}

/** 02 Open gable with gold ridge. */
export function MarkGiebel({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary, gold } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <path
          d="M14 66 L40 18 M66 66 L40 18"
          stroke={primary}
          strokeWidth="8"
          strokeLinecap="butt"
        />
        <circle cx="40" cy="18" r="6" fill={gold} />
      </>
    ),
  });
}

/** 03 Canopy over three orchestrated poles. */
export function MarkKanzel({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary, gold } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <path fill={primary} d={chevronPath(40, 14, 36, 38, 9)} />
        <circle cx="22" cy="62" r="5" fill={primary} />
        <circle cx="40" cy="62" r="5" fill={gold} />
        <circle cx="58" cy="62" r="5" fill={primary} />
      </>
    ),
  });
}

/** 04 Nested double roof. */
export function MarkSchicht({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary, gold } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <path fill={primary} d={chevronPath(40, 12, 68, 34, 11)} />
        <path fill={gold} d={chevronPath(40, 36, 64, 18, 6)} />
      </>
    ),
  });
}

/** 05 Wide shallow boomerang / canopy. */
export function MarkBumerang({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary, gold } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <path fill={primary} d={chevronPath(40, 24, 58, 36, 13)} />
        <path fill={gold} d={chevronPath(40, 32, 58, 28, 8)} />
      </>
    ),
  });
}

export const markComponents = {
  first: MarkFirst,
  giebel: MarkGiebel,
  kanzel: MarkKanzel,
  schicht: MarkSchicht,
  bumerang: MarkBumerang,
} as const;
