import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { SkyLinqMap } from "@/components/sky-linq-map";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, seoHead } from "@/lib/seo";
import { COMPLIANCE, PROBLEMS, SITE, TRIP_STEPS } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => seoHead("home"),
});

function Home() {
  return (
    <SiteShell>
      <JsonLd data={breadcrumbJsonLd("home")} />
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:grid-cols-12 lg:pt-14">
          <div className="lg:col-span-5 xl:col-span-4">
            <p className="hero-in font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
              {SITE.heroEyebrow}
            </p>
            <h1 className="hero-in-delay mt-4 font-display text-[2.125rem] font-semibold leading-[0.95] tracking-tight text-fg sm:text-5xl xl:text-6xl">
              The problem, solved
              <span className="mt-2 block text-[1.75rem] text-gold sm:text-4xl xl:text-5xl">
                in one trip.
              </span>
            </h1>
            <p className="hero-in-late mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {SITE.heroLead}
            </p>
            <p className="hero-in-late mt-4 max-w-md text-sm leading-relaxed text-subtle">
              {SITE.heroSupport}
            </p>
            <p className="hero-in-late mt-3 max-w-md text-sm leading-relaxed text-subtle">
              Ground medical courier. Not an air ambulance.
            </p>
            <div className="hero-in-late mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild className="w-full sm:w-auto">
                <Link to="/request">Get Started</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full sm:w-auto">
                <Link to="/stack">See the stack</Link>
              </Button>
            </div>
          </div>
          <div className="hero-in-late relative lg:col-span-7 xl:col-span-8">
            <img
              src="/images/hero-pega.jpg"
              alt="PEGA1, Pegasus MedFlight launch vehicle"
              fetchPriority="high"
              decoding="async"
              className="hero-car mx-auto w-full max-w-3xl object-contain"
              width={1382}
              height={812}
            />
          </div>
        </div>
        <div className="border-y border-line bg-surface">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-x-5 gap-y-2 px-4 py-4 sm:gap-x-6 sm:px-6">
            {SITE.chips.map((chip) => (
              <p
                key={chip}
                className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted sm:tracking-kicker"
              >
                {chip}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
            The industry problem
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-fg sm:text-5xl">
            Medical courier work is fragmented, hard to track, and disconnected from intelligence.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            Service is inconsistent. Cost is unstable. Inventory never sees the
            movement data. Compliance is often added after the run.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMS.map((p) => (
              <article
                key={p.title}
                className="rounded-xl bg-elevated p-6 shadow-[0_0_0_1px_var(--color-line)]"
              >
                <h3 className="font-display text-xl text-fg">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
          The solution
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-fg sm:text-5xl">
          A medical logistics intelligence system that executes courier deliveries.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          {SITE.mission}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {SITE.positioning}
        </p>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
                How a trip works
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-fg sm:text-5xl">
                Request to insight. Simple enough to scan.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                The Demo is a Phoenix trip — request, dispatch, custody,
                delivery. San Diego is the second target market.
              </p>
              <ol className="mt-8 grid gap-3">
                {TRIP_STEPS.map((s) => (
                  <li
                    key={s.n}
                    className="rounded-xl bg-elevated p-5 shadow-[0_0_0_1px_var(--color-line)]"
                  >
                    <p className="font-mono text-[0.7rem] uppercase tracking-kicker text-gold">
                      {s.n} · {s.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <SkyLinqMap />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
            Launch-stage language
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {COMPLIANCE.map((c) => (
              <span
                key={c}
                className="rounded-md bg-elevated px-3 py-2 font-mono text-[0.65rem] uppercase tracking-kicker text-muted shadow-[0_0_0_1px_var(--color-line)]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-fg sm:text-5xl">
            Get Started
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            Medical Partners and drivers use the same page. Choose your path and
            tell us how you want to work with Pegasus.
          </p>
          <div className="mt-8">
            <Button asChild className="w-full sm:w-auto">
              <Link to="/request">
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
