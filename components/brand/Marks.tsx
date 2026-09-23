import type { ReactNode } from "react";
import { chevronPath, markColors, openPeakPath } from "@/lib/logo";

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

/** 01 Pure refined First – the brand is the roof. */
export function MarkMassiv({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: <path fill={primary} d={chevronPath(40, 12, 70, 34, 15)} />,
  });
}

/** 02 Roof with gold apex – superior instance at the ridge. */
export function MarkSpitze({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary, gold } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <path fill={primary} d={chevronPath(40, 18, 70, 34, 15)} />
        <path fill={gold} d={openPeakPath(40, 10, 28, 10)} />
      </>
    ),
  });
}

/** 03 Roof over a unified gold field – no points, one space. */
export function MarkRaum({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary, gold } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <path fill={gold} d={openPeakPath(40, 36, 62, 18)} />
        <path fill={primary} d={chevronPath(40, 12, 58, 34, 14)} />
      </>
    ),
  });
}

/** 04 Wider spanning First – overview. */
export function MarkWeit({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: <path fill={primary} d={chevronPath(40, 20, 64, 38, 13)} />,
  });
}

/** 05 Solid First with gold inner lip – order under the roof. */
export function MarkKante({ inverted = false, size = 160, title, className }: MarkProps) {
  const { primary, gold } = markColors(inverted);
  return canvas({
    size,
    title,
    className,
    children: (
      <>
        <path fill={primary} d={chevronPath(40, 12, 70, 34, 15)} />
        <path fill={gold} d={chevronPath(40, 34, 64, 20, 6)} />
      </>
    ),
  });
}

export const markComponents = {
  massiv: MarkMassiv,
  spitze: MarkSpitze,
  raum: MarkRaum,
  weit: MarkWeit,
  kante: MarkKante,
} as const;
