import { FOUNDER_MAP, ORGANS, srcOf, type Specimen } from "@/lib/game";
import { cn } from "@/lib/utils";
import { MutantCatSVG } from "@/components/mutant-svg";

const CLIP: Record<string, string> = {
  head: "inset(0% 0% 56% 0%)",
  body: "inset(40% 6% 22% 6%)",
  legs: "inset(74% 4% 0% 4%)",
  tail: "inset(58% 0% 10% 52%)",
};

export function SpecimenArt({
  specimen,
  className,
}: {
  specimen: Specimen;
  className?: string;
}) {
  if (specimen.kind === "lab" && specimen.labTraits) {
    return (
      <div className={cn("relative flex h-full w-full items-center justify-center bg-ink", className)}>
        <MutantCatSVG traits={specimen.labTraits} />
      </div>
    );
  }

  const coatSrc = srcOf(specimen.coat);
  const headSrc = srcOf(specimen.organs.head);

  return (
    <div className={cn("relative overflow-hidden bg-elevated", className)}>
      {specimen.chimera ? (
        <>
          <img
            src={headSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
          <img
            src={coatSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: "inset(0 0 0 50%)" }}
          />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-acid/80" />
        </>
      ) : (
        <>
          <img src={coatSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
          {ORGANS.map((o) =>
            specimen.organs[o] === specimen.coat ? null : (
              <img
                key={o}
                src={srcOf(specimen.organs[o])}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{ clipPath: CLIP[o] }}
              />
            ),
          )}
        </>
      )}
    </div>
  );
}

export function FounderThumb({ id, className }: { id: string; className?: string }) {
  const f = FOUNDER_MAP[id];
  return (
    <img
      src={f?.src ?? "/cats/grid.png"}
      alt={f?.name ?? "cat"}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
