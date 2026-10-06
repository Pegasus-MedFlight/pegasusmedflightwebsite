import { useEffect, useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/cn";

export function OrbitViewer({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    lastX.current = e.clientX;
    setHint(false);
    videoRef.current?.pause();
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const v = videoRef.current;
    if (!dragging.current || !v || !v.duration) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    let next = v.currentTime - (dx / 360) * v.duration;
    const d = v.duration;
    next = ((next % d) + d) % d;
    v.currentTime = next;
  }

  function onPointerUp() {
    dragging.current = false;
  }

  return (
    <div
      className={cn(
        "relative select-none overflow-hidden rounded-xl bg-bg shadow-[0_0_0_1px_var(--color-line)]",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <video
        ref={videoRef}
        src="/images/pega-orbit.mp4"
        className="mx-auto w-full max-w-xl object-contain"
        playsInline
        loop
        muted
        autoPlay
        preload="auto"
        aria-label="PEGA1, 360-degree view"
      />
      {hint ? (
        <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center font-mono text-[0.7rem] uppercase tracking-kicker text-gold">
          Drag to rotate
        </p>
      ) : null}
    </div>
  );
}
