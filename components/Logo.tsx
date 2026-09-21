type LogoProps = {
  inverted?: boolean;
  className?: string;
};

export function Logo({ inverted = false, className = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center text-[1.05rem] font-semibold tracking-tight ${
        inverted ? "text-white" : "text-navy-900"
      } ${className}`}
    >
      Broker <span className="ml-1 text-gold-400">Vision</span>
    </span>
  );
}
