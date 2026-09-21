type LogoProps = {
  inverted?: boolean;
  className?: string;
};

export function Logo({ inverted = false, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          width="36"
          height="36"
          rx="8"
          className={inverted ? "fill-white/10" : "fill-navy-900"}
        />
        <path
          d="M8 23.5C12.2 17.8 16.5 14.5 18 14.5C19.5 14.5 23.8 17.8 28 23.5"
          className="stroke-gold-400"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M11 20.2C13.8 16.6 16.4 14.8 18 14.8C19.6 14.8 22.2 16.6 25 20.2"
          className={inverted ? "stroke-white/70" : "stroke-white/70"}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="18" cy="14.2" r="2.1" className="fill-gold-400" />
      </svg>
      <span
        className={`text-[1.05rem] font-semibold tracking-tight ${inverted ? "text-white" : "text-navy-900"}`}
      >
        Broker <span className="text-gold-400">Vision</span>
      </span>
    </span>
  );
}
