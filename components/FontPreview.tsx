import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

type FontPreviewProps = {
  name: string;
  summary: string;
  className: string;
  id: string;
};

export function FontPreview({ name, summary, className, id }: FontPreviewProps) {
  return (
    <article id={id} className={`scroll-mt-28 overflow-hidden border border-navy-900/10 ${className}`}>
      <div className="flex flex-col gap-2 border-b border-navy-900/10 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-500">
            Variante
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-navy-900">{name}</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-navy-800/70">{summary}</p>
      </div>

      <div className="bg-navy-950 text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <Logo inverted markSize={32} />
          <div className="hidden items-center gap-6 text-sm text-white/75 sm:flex">
            <span>Startseite</span>
            <span className="text-gold-400">Plattform</span>
            <span>Über uns</span>
            <span>Kontakt</span>
          </div>
        </div>

        <div className="px-5 py-10 sm:px-8 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
            Broker Vision · Digitaler Arbeitsplatz
          </p>
          <h3 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
            {site.headline}
          </h3>
          <p className="mt-4 text-lg font-medium text-gold-300 sm:text-xl">{site.subheadline}</p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            Broker Vision entwickelt digitale Lösungen für Versicherungsbroker,
            Finanzberater und Beratungsunternehmen in der Schweiz. Entstanden aus über
            20 Jahren Erfahrung in der Versicherungsbranche.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="inline-flex rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950">
              Plattform entdecken
            </span>
            <span className="inline-flex rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium">
              Gespräch vereinbaren
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-navy-900/10 sm:grid-cols-3">
        {[
          { label: "Fokus", value: "Versicherungsbroker" },
          { label: "Erfahrung", value: "Über 20 Jahre Branche" },
          { label: "Ansatz", value: "Plattform statt Insellösung" },
        ].map((item) => (
          <div key={item.label} className="bg-white px-5 py-6 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-500">
              {item.label}
            </p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-navy-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-navy-50 px-5 py-8 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-500">
          Plattform
        </p>
        <h4 className="mt-2 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
          Eine Plattform. Module, die zusammenarbeiten.
        </h4>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {["Broker Vision Offerten", "Broker Vision CRM", "Workflow-Automatisierung"].map(
            (title) => (
              <div key={title} className="border border-navy-900/10 bg-white p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-800/40">
                  Modul
                </p>
                <p className="mt-2 font-semibold tracking-tight text-navy-900">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-navy-800/70">
                  Arbeit automatisieren statt nur Daten verwalten.
                </p>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-navy-950 px-5 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <h4 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Passt Broker Vision zu Ihrem Unternehmen?
          </h4>
          <p className="mt-2 max-w-xl text-sm text-white/70">
            «{site.tagline}»
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950">
          Gespräch vereinbaren
        </span>
      </div>
    </article>
  );
}
