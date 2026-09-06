import type { Specimen } from "@/lib/game";
import { cn } from "@/lib/utils";
import { FounderPixel, PixelCat } from "@/components/pixel-cat";

export function SpecimenArt({
  specimen,
  className,
}: {
  specimen: Specimen;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-ink", className)} style={{ imageRendering: "pixelated" }}>
      <PixelCat specimen={specimen} className="h-full w-full" />
      {specimen.chimera ? (
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-acid/80" />
      ) : null}
    </div>
  );
}

export function FounderThumb({ id, className }: { id: string; className?: string }) {
  return <FounderPixel id={id} className={cn("h-full w-full", className)} />;
}
