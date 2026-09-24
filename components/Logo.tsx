import { MarkFeld } from "@/components/brand/Marks";

type LogoProps = {
  inverted?: boolean;
  className?: string;
  markSize?: number;
  withWordmark?: boolean;
};

/** Official Broker Vision mark: Variante Feld. */
export function Logo({
  inverted = false,
  className = "",
  markSize = 36,
  withWordmark = true,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <MarkFeld inverted={inverted} size={markSize} title="Broker Vision" />
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
