import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import {
  LAUNCH_CASES,
  LAUNCH_EARLY,
  LAUNCH_INCLUDES,
  LAUNCH_STEPS,
  SERVE,
  SITE,
} from "@/lib/site";
import { breadcrumbJsonLd, seoHead } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const Route = createFileRoute("/partners")({
  component: PartnersPage,
  head: () => seoHead("partners"),
});

function PartnersPage() {
  return (
    <SiteShell>
      <JsonLd data={breadcrumbJsonLd("partners")} />
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
            The Launch Program
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[0.95] tracking-tight text-fg sm:text-5xl lg:text-6xl">
            A defined, paid medical logistics Launch. Not a demo.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            For clinics, labs, pharmacies, healthcare offices, and medical
            organizations that need reliable courier support — one route, one
            corridor, one overflow problem, or one service class at a time in
            Phoenix or San Diego.
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link to="/request">
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
          Why join early
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl text-fg">
          Priority onboarding. A real feedback loop. Intelligence from your own trips.
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LAUNCH_EARLY.map((item) => (
            <article
              key={item.title}
              className="rounded-xl bg-elevated p-6 shadow-[0_0_0_1px_var(--color-line)]"
            >
              <h3 className="font-display text-xl text-fg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
            How a Launch Program runs
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl text-fg">
            Discovery. Scope. Paid trips. Report. Then a decision.
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5">
            {LAUNCH_STEPS.map((s) => (
              <li
                key={s.n}
                className="rounded-xl bg-elevated p-5 shadow-[0_0_0_1px_var(--color-line)]"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-kicker text-gold">
                  {s.n}
                </p>
                <h3 className="mt-3 font-display text-xl text-fg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
          Use cases
        </p>
        <h2 className="mt-3 font-display text-4xl text-fg">
          One problem. One geography. Paid work.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LAUNCH_CASES.map((c) => (
            <article
              key={c}
              className="rounded-xl bg-elevated px-5 py-4 text-sm text-fg shadow-[0_0_0_1px_var(--color-line)]"
            >
              {c}
            </article>
          ))}
        </div>
        <ul className="mt-10 grid gap-2 sm:grid-cols-2">
          {LAUNCH_INCLUDES.map((item) => (
            <li key={item} className="text-sm text-muted">
              <span className="mr-2 text-gold">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
            Who should apply
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl text-fg">
            Clinics, labs, pharmacies, and healthcare offices with a defined logistics problem in Phoenix or San Diego.
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVE.map((s) => (
              <article
                key={s.title}
                className="rounded-xl bg-elevated p-6 shadow-[0_0_0_1px_var(--color-line)]"
              >
                <h3 className="font-display text-xl text-fg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <img
                src="/images/pegasus.png"
                alt="Pegasus MedFlight"
                width={1110}
                height={1210}
                className="mb-6 h-20 w-auto object-contain sm:h-24"
              />
              <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
                Accountability
              </p>
              <h2 className="mt-3 font-display text-4xl text-fg">
                Founder oversight on every trip.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">Pegasus MedFlight</p>
            </div>
            <div>
              <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
                Geography
              </p>
              <h2 className="mt-3 font-display text-4xl text-fg">
                Phoenix and San Diego. Not nationwide.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                {SITE.ops.note}
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/request">
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
