import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { NAV } from "@/lib/site";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || toggleRef.current?.contains(t)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="relative z-50 shrink-0 border-b border-line bg-bg pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:h-[4.5rem] sm:gap-3 sm:px-6 lg:h-20">
        <Link
          to="/"
          aria-label="Pegasus MedFlight home"
          className="relative z-10 flex min-w-0 shrink items-center"
        >
          <img
            src="/images/logo-wordmark-light.png"
            alt="Pegasus MedFlight — Reliable. Traceable. Compliant."
            width={1400}
            height={429}
            className="h-8 w-auto max-w-[46vw] object-contain object-left sm:h-10 sm:max-w-[280px] lg:h-12 lg:max-w-none dark:hidden"
          />
          <img
            src="/images/logo-wordmark.png"
            alt="Pegasus MedFlight — Reliable. Traceable. Compliant."
            width={1400}
            height={429}
            className="hidden h-8 w-auto max-w-[46vw] object-contain object-left sm:h-10 sm:max-w-[280px] lg:h-12 lg:max-w-none dark:block"
          />
        </Link>

        <nav className="hidden min-w-0 items-center lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center px-2 text-[0.8125rem] tracking-wide text-muted transition-colors duration-150 hover:text-fg xl:px-3 xl:text-sm",
                pathname === item.to && "text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <Button asChild className="hidden h-11 px-4 text-sm lg:inline-flex">
            <Link to="/request">Get Started</Link>
          </Button>
          <Button asChild className="h-11 px-3 text-sm lg:hidden">
            <Link to="/request">Join</Link>
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-fg hover:bg-elevated lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          ref={menuRef}
          id="site-menu"
          className="absolute right-3 top-[calc(env(safe-area-inset-top)+4.25rem)] z-[60] w-[min(18rem,calc(100vw-1.5rem))] rounded-xl bg-bg p-2 shadow-[0_0_0_1px_var(--color-line),0_24px_60px_-16px_color-mix(in_oklab,var(--color-fg)_40%,transparent)] sm:right-6 sm:top-[calc(env(safe-area-inset-top)+4.75rem)]"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-12 items-center rounded-md px-3 font-display text-xl text-fg hover:bg-surface",
                pathname === item.to && "text-gold",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
