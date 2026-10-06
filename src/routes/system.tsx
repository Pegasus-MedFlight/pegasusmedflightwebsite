import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import {
  EHRS,
  FHIR_BLOCKS,
  INTELLIGENCE_HIGHLIGHTS,
  INTELLIGENCE_SOURCES,
  INTELLIGENCE_STEPS,
  MODEL,
  SITE,
} from "@/lib/site";
import { breadcrumbJsonLd, seoHead } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const Route = createFileRoute("/system")({
  component: SystemPage,
  head: () => seoHead("system"),
});

function SystemPage() {
  return (
    <SiteShell>
      <JsonLd data={breadcrumbJsonLd("system")} />
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
            After the trip exists
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[0.95] tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Medical Logistics Intelligence
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Pegasus MedFlight is not only moving packages. Every trip writes
            a record. That record is how courier activity becomes operational
            intelligence — separate from simple tracking.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
          What the record can show
        </p>
        <h2 className="mt-3 font-display text-4xl text-fg">
          Tracking tells you where it is. Intelligence tells you what it means.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTELLIGENCE_HIGHLIGHTS.map((h) => (
            <article
              key={h.title}
              className="rounded-xl bg-elevated p-6 shadow-[0_0_0_1px_var(--color-line)]"
            >
              <h3 className="font-display text-xl text-fg">{h.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{h.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
            Optimization model
          </p>
          <h2 className="mt-3 font-display text-4xl text-fg">Execute. Analyze. Forecast.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {MODEL.map((s) => (
              <article
                key={s.n}
                className="rounded-xl bg-elevated p-6 shadow-[0_0_0_1px_var(--color-line)]"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-kicker text-gold">
                  {s.n} · {s.title}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{s.body}</p>
                <p className="mt-4 text-sm leading-relaxed text-fg/85">{s.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
          Six-step process
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl text-fg">
          How we turn movement into a partner-approved intervention.
        </h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTELLIGENCE_STEPS.map((step, i) => (
            <li
              key={step}
              className="rounded-xl bg-elevated p-5 shadow-[0_0_0_1px_var(--color-line)]"
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-kicker text-gold">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="font-display text-3xl text-fg sm:text-4xl">Trip history first. EHR later.</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Inventory signals from an EHR are useful after a paid corridor exists,
            and only with permission. Our own trip record is the foundation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
          Electronic Health Record
        </p>
        <h2 className="mt-3 font-display text-4xl text-fg">Priority connections over time</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {EHRS.map((e) => (
            <article
              key={e.name}
              className="rounded-xl bg-elevated p-6 shadow-[0_0_0_1px_var(--color-line)]"
            >
              <h3 className="font-display text-2xl text-fg">{e.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{e.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
            FHIR
          </p>
          <h2 className="mt-3 font-display text-3xl text-fg sm:text-4xl">Resources we use</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FHIR_BLOCKS.map((b) => (
              <article
                key={b.name}
                className="rounded-xl bg-elevated p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5"
              >
                <p className="font-mono text-sm text-gold">{b.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.meaning}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {INTELLIGENCE_SOURCES.map((s) => (
              <article
                key={s.n}
                className="rounded-xl bg-elevated p-6 shadow-[0_0_0_1px_var(--color-line)]"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-kicker text-gold">
                  {s.n}
                </p>
                <h3 className="mt-3 font-display text-xl text-fg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <h2 className="max-w-3xl font-display text-4xl text-fg">
            Execute the trip. Keep the record. Forecast the next one.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            FHIR connections come after paid corridors and partner permission.
            Our own delivery history is the foundation.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-kicker text-gold">
            {SITE.name} · {SITE.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/request">
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/partners">The Launch Program</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
