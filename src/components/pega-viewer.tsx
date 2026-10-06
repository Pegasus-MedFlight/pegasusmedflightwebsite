import { useState } from "react";
import { cn } from "@/lib/cn";
import { PEGA_VIEWS } from "@/lib/site";

export function PegaViewer() {
  const [active, setActive] = useState<(typeof PEGA_VIEWS)[number]["id"]>(
    "three-quarter",
  );

  return (
    <div className="overflow-hidden rounded-xl bg-bg shadow-[0_0_0_1px_var(--color-line)]">
      <div className="relative aspect-[16/10] bg-bg">
        {PEGA_VIEWS.map((view) => (
          <img
            key={view.id}
            src={view.src}
            alt={`PEGA1, ${view.label.toLowerCase()} view`}
            className={cn(
              "absolute inset-0 size-full object-contain p-4 transition-opacity duration-300 sm:p-6",
              view.id === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-5">
        <div className="flex flex-wrap gap-1">
          {PEGA_VIEWS.map((view) => (
            <button
              key={view.id}
              type="button"
              onClick={() => setActive(view.id)}
              className={cn(
                "min-h-11 rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-150",
                view.id === active
                  ? "bg-gold text-gold-fg"
                  : "text-muted hover:text-fg",
              )}
            >
              {view.label}
            </button>
          ))}
        </div>
        <p className="font-mono text-[0.7rem] uppercase tracking-kicker text-gold">
          In service · Phoenix · San Diego
        </p>
      </div>
    </div>
  );
}
