import { brandColors, markViewBox, pathB, pathV } from "@/lib/logo";

type LogoMarkProps = {
  inverted?: boolean;
  size?: number;
  className?: string;
  title?: string;
};

export function LogoMark({
  inverted = false,
  size = 36,
  className = "",
  title,
}: LogoMarkProps) {
  const b = inverted ? brandColors.white : brandColors.navy;
  const v = brandColors.gold;

  return (
    <svg
      width={size}
      height={size}
      viewBox={markViewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path fill={b} fillRule="evenodd" d={pathB} />
      <path fill={v} d={pathV} />
    </svg>
  );
}

type LogoProps = {
  inverted?: boolean;
  className?: string;
  markSize?: number;
  withWordmark?: boolean;
};

export function Logo({
  inverted = false,
  className = "",
  markSize = 38,
  withWordmark = true,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark inverted={inverted} size={markSize} />
      {withWordmark ? (
        <span
          className={`text-[1.05rem] font-semibold tracking-tight ${
            inverted ? "text-white" : "text-navy-900"
          }`}
        >
          Broker <span className="text-gold-400">Vision</span>
        </span>
      ) : null}
    </span>
  );
}
