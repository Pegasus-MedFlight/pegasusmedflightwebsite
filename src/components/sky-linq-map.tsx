import { useEffect, useMemo, useState } from "react";

const NODES = [
  { id: "phx", label: "Phoenix", x: 38, y: 42 },
  { id: "scottsdale", label: "Scottsdale", x: 52, y: 28 },
  { id: "tempe", label: "Tempe", x: 48, y: 52 },
  { id: "mesa", label: "Mesa", x: 64, y: 54 },
  { id: "gilbert", label: "Gilbert", x: 68, y: 66 },
  { id: "chandler", label: "Chandler", x: 58, y: 72 },
  { id: "glendale", label: "Glendale", x: 26, y: 38 },
] as const;

const PATH = [
  [58, 72],
  [64, 66],
  [64, 54],
  [48, 52],
  [38, 42],
  [52, 28],
];

function pointOnPath(t: number): { x: number; y: number } {
  const segs = PATH.length - 1;
  const scaled = t * segs;
  const i = Math.min(Math.floor(scaled), segs - 1);
  const f = scaled - i;
  const a = PATH[i];
  const b = PATH[i + 1];
  return { x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f };
}

function mstClock(d: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Phoenix",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return `${get("hour")}:${get("minute")}:${get("second")} MST`;
}

function phaseFor(t: number) {
  if (t < 0.08) return "Request";
  if (t < 0.16) return "Validation";
  if (t < 0.28) return "Pickup";
  if (t < 0.82) return "In transit";
  if (t < 0.92) return "Delivery";
  return "Closeout";
}

export function SkyLinqMap() {
  const [t, setT] = useState(0);
  const [clock, setClock] = useState("08:00:00 MST");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setClock(mstClock(new Date()));
    if (reduce) {
      setT(0.35);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 18000;
      setT(((elapsed % 1) + 1) % 1);
      setClock(mstClock(new Date()));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pega = pointOnPath(t);
  const d = PATH.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt[0]} ${pt[1]}`).join(" ");
  const phase = phaseFor(t);
  const etaMin = Math.max(0, Math.round((1 - t) * 38));
  const temp = (4.1 + Math.sin(t * Math.PI * 2) * 0.3).toFixed(1);
  const batt = Math.round(78 - t * 6);

  const rows = useMemo(
    () => [
      ["Trip ID", "TRP-EV-0142"],
      ["PEGA1", "PEGA1 · Phoenix"],
      ["Driver", "On overwatch"],
      ["Partner", "Phoenix Lab"],
      ["Class", "STAT · cool chain"],
      ["Origin", "Chandler · Lab receiving"],
      ["Destination", "Scottsdale · Pathology"],
      ["Cargo", "Laboratory specimens · qty 4"],
      ["Reason", "Procedure support"],
      ["Custody", phase],
      ["Temp", `${temp} °C · band held`],
      ["SLA / ETA", `${String(etaMin).padStart(2, "0")} min`],
      ["Battery", `${batt}%`],
      ["Exceptions", "None"],
    ],
    [batt, etaMin, phase, temp],
  );

  return (
    <div className="overflow-hidden rounded-xl bg-elevated shadow-[0_0_0_1px_var(--color-line)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <p className="font-mono text-[0.7rem] uppercase tracking-kicker text-gold">
          SKY Linq · Trip Demo
        </p>
        <p className="font-mono text-[0.7rem] text-muted">{clock}</p>
      </div>
      <div className="relative aspect-[16/10] bg-bg">
        <svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
          <defs>
            <radialGradient id="valley" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="var(--color-panel)" />
              <stop offset="100%" stopColor="var(--color-bg)" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#valley)" />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <line
                x1="0"
                y1={12 + i * 9}
                x2="100"
                y2={12 + i * 9}
                stroke="currentColor"
                className="text-line"
                strokeWidth="0.15"
              />
              <line
                x1={10 + i * 10}
                y1="0"
                x2={10 + i * 10}
                y2="100"
                stroke="currentColor"
                className="text-line"
                strokeWidth="0.15"
              />
            </g>
          ))}
          <path
            d={d}
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="0.55"
            strokeDasharray="1.4 1.1"
            opacity="0.85"
          />
          {NODES.map((n) => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r="1.15" fill="var(--color-fg)" opacity="0.85" />
              <text
                x={n.x + 2.2}
                y={n.y + 0.8}
                fill="var(--color-muted)"
                fontSize="3.2"
                fontFamily="IBM Plex Mono, ui-monospace, monospace"
              >
                {n.label}
              </text>
            </g>
          ))}
          <g transform={`translate(${pega.x} ${pega.y})`}>
            <circle r="4.2" fill="var(--color-gold)" opacity="0.18" className="map-pulse" />
            <circle r="1.7" fill="var(--color-gold)" />
            <rect x="-7.2" y="-8.4" width="14.4" height="4.6" rx="0.6" fill="var(--color-bg)" opacity="0.88" />
            <text
              x="0"
              y="-5.1"
              textAnchor="middle"
              fill="var(--color-gold)"
              fontSize="3.2"
              fontFamily="Rajdhani, ui-sans-serif, sans-serif"
              fontWeight="700"
            >
              PEGA1
            </text>
          </g>
        </svg>
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 sm:left-4 sm:right-4">
          <p className="hidden font-mono text-[0.7rem] uppercase tracking-kicker text-muted sm:block">
            Phoenix mesh — PEGA1 · driver on overwatch
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-kicker text-muted sm:hidden">
            PEGA1
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-kicker text-ok sm:text-[0.7rem]">
            {phase}
          </p>
        </div>
      </div>
      <dl className="grid gap-px bg-line sm:grid-cols-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-3 bg-elevated px-4 py-2.5">
            <dt className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-subtle sm:tracking-kicker">
              {k}
            </dt>
            <dd className="min-w-0 text-right text-xs text-fg">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
