import type { ReactNode } from "react";
import { chevronPath, markColors, openPeakPath } from "@/lib/logo";

export type MarkProps = {
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

/** 01 Balanced Weit – baseline. */
export function MarkHorizont({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: <path fill={primary} d={chevronPath(40, 22, 62, 36, 12)} />,
  });
}

/** 02 Slightly steeper Weit. */
export function MarkNeigung({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: <path fill={primary} d={chevronPath(40, 16, 64, 34, 12)} />,
  });
}

/** 03 Wider, flatter Weit. */
export function MarkSpannweite({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: <path fill={primary} d={chevronPath(40, 26, 60, 40, 11)} />,
  });
}

/** 04 Weit + gold inner edge. */
export function MarkLinie({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary, gold } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <path fill={primary} d={chevronPath(40, 22, 62, 36, 12)} />
        <path fill={gold} d={chevronPath(40, 38, 58, 22, 5)} />
      </>
    ),
  });
}

/** 05 Weit + gold field under the roof. */
export function MarkFeld({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary, gold } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <path fill={gold} d={openPeakPath(40, 40, 56, 16)} />
        <path fill={primary} d={chevronPath(40, 22, 56, 36, 12)} />
      </>
    ),
  });
}

export const markComponents = {
  horizont: MarkHorizont,
  neigung: MarkNeigung,
  spannweite: MarkSpannweite,
  linie: MarkLinie,
  feld: MarkFeld,
} as const;

type LockupProps = MarkProps & {
  mark: keyof typeof markComponents;
};

/** Mark + wordmark for final selection. */
export function LogoLockup({
  mark,
  inverted = false,
  size = 40,
  className = "",
}: LockupProps) {
  const Mark = markComponents[mark];
  return (
    <span
      className={`inline-flex items-center gap-3 ${
        inverted ? "text-white" : "text-navy-900"
      } ${className}`}
    >
      <Mark inverted={inverted} size={size} />
      <span className="text-[1.15rem] font-semibold tracking-tight">
        Broker <span className="text-gold-400">Vision</span>
      </span>
    </span>
  );
}
