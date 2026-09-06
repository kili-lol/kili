import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LINKS } from "@/lib/game";
import { cn } from "@/lib/utils";
import { useLab } from "@/store/lab";
import { Github, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/lab", label: "Lab" },
  { to: "/pit", label: "The Pit" },
  { to: "/token", label: "$KILI" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const wallet = useLab((s) => s.wallet);
  const connect = useLab((s) => s.connect);
  const disconnect = useLab((s) => s.disconnect);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    void useLab.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-8 place-items-center bg-acid font-display text-sm font-semibold text-ink">
              K
            </span>
            <span className="leading-none">
              <span className="block font-display text-sm font-semibold tracking-[0.22em]">KILI</span>
              <span className="mt-0.5 block font-mono text-3xs uppercase tracking-[0.18em] text-mute">
                Mutate Your Cats
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "px-3 py-2 font-mono text-2xs uppercase tracking-[0.16em] text-mute transition-colors duration-150",
                  pathname === n.to && "text-acid",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={LINKS.x}
              target="_blank"
              rel="noreferrer"
              className="hidden px-2 font-mono text-2xs uppercase tracking-widest text-mute hover:text-fg sm:block"
            >
              X
            </a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="hidden text-mute hover:text-fg sm:block">
              <Github className="size-4" />
            </a>
            <Button size="sm" variant={wallet ? "line" : "primary"} onClick={wallet ? disconnect : connect}>
              {wallet ? wallet.slice(0, 8) : "Enter lab"}
            </Button>
            <button
              className="grid size-10 place-items-center text-fg md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t border-line px-4 py-3 md:hidden">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-3 font-mono text-xs uppercase tracking-[0.16em] text-mute",
                  pathname === n.to && "text-acid",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8">{children}</div>
    </div>
  );
}

export function CornerFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <span className="pointer-events-none absolute -left-px -top-px size-3 border-l border-t border-acid" />
      <span className="pointer-events-none absolute -right-px -top-px size-3 border-r border-t border-acid" />
      <span className="pointer-events-none absolute -bottom-px -left-px size-3 border-b border-l border-acid" />
      <span className="pointer-events-none absolute -bottom-px -right-px size-3 border-b border-r border-acid" />
      {children}
    </div>
  );
}
