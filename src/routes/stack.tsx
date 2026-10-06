import { createFileRoute, Link } from "@tanstack/react-router";
import { Cpu, Radio, ShieldCheck } from "lucide-react";
import { OrbitViewer } from "@/components/orbit-viewer";
import { PegaViewer } from "@/components/pega-viewer";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { PEGA_FEATURES, STACK } from "@/lib/site";
import { breadcrumbJsonLd, seoHead } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const Route = createFileRoute("/stack")({
  component: StackPage,
  head: () => seoHead("stack"),
});

function StackPage() {
  return (
    <SiteShell>
      <JsonLd data={breadcrumbJsonLd("stack")} />
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
            Vertically integrated
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[0.95] tracking-tight text-fg sm:text-5xl lg:text-6xl">
            The Pegasus Technology Stack
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Software command. Mobile execution. AI intelligence. Real-world
            courier delivery. One system — not five vendors.
          </p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STACK.map((s) => (
              <article
                key={s.name}
                className="rounded-xl bg-elevated p-6 shadow-[0_0_0_1px_var(--color-line)]"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-kicker text-gold">
                  {s.layer} · {s.role}
                </p>
                <h2 className="mt-3 font-display text-2xl text-fg">{s.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
          PEGA1 · Real-world delivery
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-fg sm:text-5xl">
          Telemetry and CAPTAIN on every PEGA1.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          Each vehicle streams location, status, and temperature into THE SKY.
          CAPTAIN watches routing, SLA, and exceptions on that trip — so a miss
          is flagged before it lands. FSD from day one. Sentry on watch. A
          trained driver still owns pickup, custody, and delivery.
        </p>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          <PegaViewer />
          <div>
            <p className="font-display text-2xl text-fg">PEGA1 · Phoenix and San Diego</p>
            <div className="mt-6">
              <OrbitViewer />
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {PEGA_FEATURES.map((f) => (
            <article
              key={f.n}
              className="rounded-xl bg-elevated p-6 shadow-[0_0_0_1px_var(--color-line)]"
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-kicker text-gold">
                {f.n}
              </p>
              <h3 className="mt-3 font-display text-xl text-fg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              <p className="mt-4 text-sm leading-relaxed text-fg/80">{f.partner}</p>
            </article>
          ))}
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li className="flex gap-3">
            <Radio className="mt-0.5 size-4 shrink-0 text-gold" />
            <span className="text-sm text-muted">Live telemetry into THE SKY</span>
          </li>
          <li className="flex gap-3">
            <Cpu className="mt-0.5 size-4 shrink-0 text-gold" />
            <span className="text-sm text-muted">CAPTAIN on every PEGA1</span>
          </li>
          <li className="flex gap-3">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" />
            <span className="text-sm text-muted">FSD · Sentry · temperature-aware</span>
          </li>
        </ul>
        <div className="mt-12">
          <Button asChild>
            <Link to="/system">Medical logistics intelligence</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
