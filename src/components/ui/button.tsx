import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "line" | "danger";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-display font-medium tracking-wide uppercase transition-transform duration-150 ease-out",
        "disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
        size === "sm" && "h-10 px-3 text-2xs",
        size === "md" && "h-11 px-4 text-xs",
        size === "lg" && "h-12 px-6 text-sm",
        variant === "primary" && "bg-acid text-ink hover:bg-acid-dim",
        variant === "ghost" && "bg-transparent text-mute hover:text-fg hover:bg-elevated",
        variant === "line" && "border border-line bg-transparent text-acid hover:bg-acid/10",
        variant === "danger" && "bg-warn text-fg",
        className,
      )}
      {...props}
    />
  );
}
