import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

function Sprite({
  rows,
  pal,
  size = 16,
  className,
  title,
}: {
  rows: string[];
  pal: Record<string, string>;
  size?: number;
  className?: string;
  title?: string;
}) {
  const h = rows.length;
  const w = rows[0]?.length ?? size;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("block", className)}
      shapeRendering="crispEdges"
      aria-label={title}
    >
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          pal[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={pal[ch]} /> : null,
        ),
      )}
    </svg>
  );
}

const INK = { ".": "", x: "#a5fa00", k: "#070807", w: "#e8ede3", d: "#3dffc8", r: "#ff5a4a", g: "#e2c044" };

export function PixelLogo({ className }: { className?: string }) {
  return (
    <Sprite
      className={cn("size-8", className)}
      title="KILI"
      pal={INK}
      rows={[
        "..x....x........",
        ".xxx..xxx.......",
        "xkkx..xkkx......",
        "xkkkkkkkkx......",
        "xkkxkkxkkx......",
        "xkkkkkkkkx......",
        "xkkx..xkkx......",
        "xkkx..xkkx......",
        "xkkx..xkkx......",
        ".xxxxxxxxxx.....",
        ".xkkkkkkkkx.....",
        ".xkkx..xkkx.....",
        ".xkkx..xkkx.....",
        ".xkkx..xkkx.....",
        ".xkkx..xkkx.....",
        "..xx....xx......",
      ]}
    />
  );
}

export function PixelVat({ className }: { className?: string }) {
  return (
    <Sprite
      className={cn("size-24", className)}
      title="The Vat"
      pal={{ ...INK, a: "#149a40", b: "#8ad600", d: "#3dffc8", k: "#141814" }}
      rows={[
        "................",
        ".....x....x.....",
        "....xxbbbbxx....",
        "....xbbbbbbx....",
        "...xxxxxxxxxx...",
        "..xxddddddddxx..",
        "..xddddxdddddx..",
        "..xddddddddddx..",
        "..xxddddddddxx..",
        "...xxxxxxxxxx...",
        "...xkkkkkkkkx...",
        "...xkkkkkkkkx...",
        "....xkkkkkkx....",
        "....xxxxxxxx....",
        "...xx......xx...",
        "..xxxx....xxxx..",
      ]}
    />
  );
}

export function PixelEmpty({ className }: { className?: string }) {
  return (
    <Sprite
      className={cn("size-full opacity-50", className)}
      title="empty"
      pal={{ x: "#22261f" }}
      rows={[
        "........................",
        "......xx....xx..........",
        ".....x..x..x..x.........",
        "....x..........x........",
        "...x............x.......",
        "...x............x.......",
        "...x..xx....xx..x.......",
        "...x............x.......",
        "...x............x.......",
        "...x.....xx.....x.......",
        "...x............x.......",
        "....x..........x........",
        "...x............x.......",
        "..x..............x......",
        "..x..............x.xx...",
        "..x..............x...x..",
        "..x..............x...x..",
        "..x..............x..x...",
        "..x..............xx.....",
        "...x....x..x....x.......",
        "...xx..xx..xx..xx.......",
        "...x....x..x....x.......",
        "...xx..xx..xx..xx.......",
        "....xxxx....xxxx........",
      ]}
    />
  );
}

export function IconX({ className }: { className?: string }) {
  return (
    <Sprite
      className={cn("size-4", className)}
      pal={{ x: "#7d8476" }}
      rows={[
        "x......x",
        ".x....x.",
        "..x..x..",
        "...xx...",
        "...xx...",
        "..x..x..",
        ".x....x.",
        "x......x",
      ]}
    />
  );
}

export function IconGithub({ className }: { className?: string }) {
  return (
    <Sprite
      className={cn("size-4", className)}
      pal={{ x: "#7d8476" }}
      rows={[
        "..xxxx..",
        ".xxxxxx.",
        "xx.xx.xx",
        "xxxxxxxx",
        "xxxxxxxx",
        "..xxxx..",
        ".xx..xx.",
        ".x....x.",
      ]}
    />
  );
}

export function IconMenu({ className }: { className?: string }) {
  return (
    <Sprite
      className={cn("size-4", className)}
      pal={{ x: "#e8ede3" }}
      rows={[
        "xxxxxxxx",
        "xxxxxxxx",
        "........",
        "xxxxxxxx",
        "xxxxxxxx",
        "........",
        "xxxxxxxx",
        "xxxxxxxx",
      ]}
    />
  );
}

export function IconClose({ className }: { className?: string }) {
  return (
    <Sprite
      className={cn("size-4", className)}
      pal={{ x: "#e8ede3" }}
      rows={[
        "xx....xx",
        "xxx..xxx",
        ".xxxxxx.",
        "..xxxx..",
        "..xxxx..",
        ".xxxxxx.",
        "xxx..xxx",
        "xx....xx",
      ]}
    />
  );
}

export function PixelFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <span className="pointer-events-none absolute left-0 top-0 z-10 h-1 w-3 bg-acid" />
      <span className="pointer-events-none absolute left-0 top-0 z-10 h-3 w-1 bg-acid" />
      <span className="pointer-events-none absolute right-0 top-0 z-10 h-1 w-3 bg-acid" />
      <span className="pointer-events-none absolute right-0 top-0 z-10 h-3 w-1 bg-acid" />
      <span className="pointer-events-none absolute bottom-0 left-0 z-10 h-1 w-3 bg-acid" />
      <span className="pointer-events-none absolute bottom-0 left-0 z-10 h-3 w-1 bg-acid" />
      <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-1 w-3 bg-acid" />
      <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-3 w-1 bg-acid" />
      {children}
    </div>
  );
}
