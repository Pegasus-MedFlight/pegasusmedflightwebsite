import { createFileRoute } from "@tanstack/react-router";
import { RequestForm } from "@/components/request-form";
import { SiteShell } from "@/components/site-shell";
import { SITE } from "@/lib/site";
import { breadcrumbJsonLd, seoHead } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

type Search = { for?: "partner" | "driver" };

export const Route = createFileRoute("/request")({
  validateSearch: (search: Record<string, unknown>): Search => {
    if (search.for === "driver") return { for: "driver" };
    if (search.for === "partner") return { for: "partner" };
    return {};
  },
  component: RequestPage,
  head: () => seoHead("request"),
});

function RequestPage() {
  const { for: path } = Route.useSearch();

  return (
    <SiteShell>
      <JsonLd data={breadcrumbJsonLd("request")} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-12 sm:px-6 sm:py-14 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-5">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-kicker text-gold">
            Get Started
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[0.95] text-fg sm:text-5xl lg:text-6xl">
            Get Started
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            One page for both paths. Medical Partners: cargo, frequency,
            quantity, hours, and contact. Drivers: experience, certifications,
            coverage, and when to call. We review Phoenix or San Diego fit
            before any paid trip.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-muted">
            <li>Medical Partner application</li>
            <li>Driver application</li>
            <li>HIPAA-aware · BBP-aware ops</li>
            <li>Phoenix · San Diego · PEGA1</li>
            <li>
              <a href={`mailto:${SITE.email}`} className="break-all text-gold hover:text-gold-bright">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <RequestForm key={path} initialPath={path ?? "partner"} />
        </div>
      </section>
    </SiteShell>
  );
}
