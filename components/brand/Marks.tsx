import type { ReactNode } from "react";
import { markColors } from "@/lib/logo";

type MarkProps = {
  inverted?: boolean;
  size?: number;
  title?: string;
  className?: string;
  instanceId?: string;
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

/** Vision: origin + three rays + horizon arc. */
export function MarkBlickfeld({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary, gold } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <path
          d="M29.05 37.43 L63.35 24.95 M29.5 40 L66 40 M29.05 42.57 L63.35 55.05"
          stroke={primary}
          strokeWidth="4"
          strokeLinecap="butt"
        />
        <path
          d="M63.35 24.95 A44 44 0 0 1 63.35 55.05"
          stroke={primary}
          strokeWidth="4"
          strokeLinecap="butt"
        />
        <circle cx="22" cy="40" r="5.5" fill={gold} />
      </>
    ),
  });
}

/** Network: three poles, gold hub. */
export function MarkKonnex({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary, gold } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <path
          d="M40 40 L40 16 M40 40 L19.22 52 M40 40 L60.78 52"
          stroke={primary}
          strokeWidth="3.5"
          strokeLinecap="butt"
        />
        <circle cx="40" cy="16" r="5.2" fill={primary} />
        <circle cx="19.22" cy="52" r="5.2" fill={primary} />
        <circle cx="60.78" cy="52" r="5.2" fill={primary} />
        <circle cx="40" cy="40" r="6" fill={gold} />
      </>
    ),
  });
}

/** Transformation: two offset squares. */
export function MarkVersatz({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary, gold } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <rect x="14" y="14" width="36" height="36" fill={primary} />
        <rect
          x="30"
          y="30"
          width="36"
          height="36"
          fill="none"
          stroke={gold}
          strokeWidth="4"
        />
      </>
    ),
  });
}

/** Precision: registration corners + gold center. */
export function MarkRegister({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary, gold } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <path
          d="M18 30 V16 H32 M48 16 H62 V30 M18 50 V64 H32 M48 64 H62 V50"
          stroke={primary}
          strokeWidth="4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <circle cx="40" cy="40" r="5" fill={gold} />
      </>
    ),
  });
}

/** System: square ∩ circle, gold intersection. */
export function MarkSynthese({
  inverted = false,
  size = 160,
  title,
  className,
  instanceId = "synthese",
}: MarkProps) {
  const { primary, gold } = markColors(inverted);
  const clip = `${instanceId}-clip`;
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <defs>
          <clipPath id={clip}>
            <rect x="12" y="19" width="42" height="42" />
          </clipPath>
        </defs>
        <circle cx="50" cy="40" r="21" fill={gold} clipPath={`url(#${clip})`} />
        <rect
          x="12"
          y="19"
          width="42"
          height="42"
          fill="none"
          stroke={primary}
          strokeWidth="4"
        />
        <circle cx="50" cy="40" r="21" fill="none" stroke={primary} strokeWidth="4" />
      </>
    ),
  });
}

export const markComponents = {
  blickfeld: MarkBlickfeld,
  konnex: MarkKonnex,
  versatz: MarkVersatz,
  register: MarkRegister,
  synthese: MarkSynthese,
} as const;
