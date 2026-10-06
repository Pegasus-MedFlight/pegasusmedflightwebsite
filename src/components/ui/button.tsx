import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-gold-fg hover:bg-gold-bright shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-gold)_40%,transparent)]",
  ghost:
    "bg-transparent text-fg shadow-[0_0_0_1px_var(--color-line-strong)] hover:bg-elevated",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(
    "relative z-10 inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold tracking-wide",
    "transition-[background-color,box-shadow,transform,filter] duration-150 ease-out",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
    variants[variant],
    className,
  );
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  asChild?: boolean;
};

export function Button({
  className,
  variant = "primary",
  asChild,
  type,
  ...props
}: Props) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={buttonClass(variant, className)}
      {...(asChild ? {} : { type: type ?? "button" })}
      {...props}
    />
  );
}
