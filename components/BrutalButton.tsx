import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "outline";

const base =
  "btn-sheen inline-flex items-center justify-center gap-2 border-2 border-ink font-sans font-semibold tracking-wide " +
  "px-6 py-3 text-[0.95rem] leading-none shadow-brutal transition-transform duration-100 " +
  "hover:-translate-y-0.5 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  solid: "bg-moss text-card",
  outline: "bg-paper text-ink",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

export function BrutalButton({
  variant = "solid",
  className = "",
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function BrutalLink({
  variant = "solid",
  className = "",
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
