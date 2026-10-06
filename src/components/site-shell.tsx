import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { organizationJsonLd } from "@/lib/seo";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden bg-bg text-fg">
      <JsonLd data={organizationJsonLd()} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-3 focus:py-2 focus:text-gold-fg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <div
        ref={scrollerRef}
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
      >
        <main id="main">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
