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
        "inline-flex items-center justify-center gap-2 font-mono uppercase leading-none",
        "disabled:pointer-events-none disabled:opacity-40",
        size === "sm" && "h-9 px-3 text-[8px]",
        size === "md" && "h-10 px-4 text-[9px]",
        size === "lg" && "h-12 px-5 text-[10px]",
        variant === "primary" &&
          "bg-acid text-ink shadow-[inset_-2px_-2px_0_#5a8a00,inset_2px_2px_0_#d4ff66] active:shadow-[inset_2px_2px_0_#5a8a00,inset_-2px_-2px_0_#d4ff66] active:translate-y-px",
        variant === "ghost" && "bg-transparent text-mute hover:text-fg",
        variant === "line" &&
          "border-2 border-acid bg-transparent text-acid shadow-[inset_-2px_-2px_0_#3a4a10,inset_2px_2px_0_#c8ff66] active:translate-y-px",
        variant === "danger" && "bg-warn text-fg",
        className,
      )}
      {...props}
    />
  );
}
