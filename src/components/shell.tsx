import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { IconClose, IconGithub, IconMenu, IconX, PixelFrame, PixelLogo } from "@/components/pixel-ui";
import { LINKS } from "@/lib/game";
import { cn } from "@/lib/utils";
import { useLab } from "@/store/lab";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/lab", label: "Lab" },
  { to: "/pit", label: "Pit" },
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
      <header className="sticky top-0 z-40 border-b-2 border-line bg-bg">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3">
            <PixelLogo />
            <span className="leading-none">
              <span className="block font-mono text-[10px] text-acid">KILI</span>
              <span className="mt-1 block font-mono text-[8px] text-mute">MUTATE YOUR CATS</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "px-3 py-2 font-mono text-[8px] uppercase text-mute",
                  pathname === n.to && "bg-acid text-ink",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={LINKS.x} target="_blank" rel="noreferrer" className="hidden sm:block" aria-label="X">
              <IconX />
            </a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="hidden sm:block" aria-label="GitHub">
              <IconGithub />
            </a>
            <Button size="sm" variant={wallet ? "line" : "primary"} onClick={wallet ? disconnect : connect}>
              {wallet ? wallet.slice(0, 6) : "ENTER"}
            </Button>
            <button
              className="grid size-10 place-items-center text-fg md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t-2 border-line px-4 py-3 md:hidden">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-3 font-mono text-[10px] uppercase text-mute",
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
  return <PixelFrame className={className}>{children}</PixelFrame>;
}
