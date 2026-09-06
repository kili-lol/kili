import { PIXEL_SIZE, composeSpecimen, founderCells } from "@/lib/pixel-cats";
import type { Specimen } from "@/lib/game";
import { cn } from "@/lib/utils";

function SvgPixels({
  cells,
  bg,
  className,
  title,
}: {
  cells: { x: number; y: number; fill: string }[];
  bg: string;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${PIXEL_SIZE} ${PIXEL_SIZE}`}
      className={cn("block h-full w-full", className)}
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={title}
    >
      <rect width={PIXEL_SIZE} height={PIXEL_SIZE} fill={bg} />
      {cells.map((c) =>
        c.fill === bg ? null : <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={1} height={1} fill={c.fill} />,
      )}
    </svg>
  );
}

export function PixelCat({ specimen, className }: { specimen: Specimen; className?: string }) {
  const { cells, bg } = composeSpecimen(specimen);
  return <SvgPixels cells={cells} bg={bg} className={className} title={specimen.name} />;
}

export function FounderPixel({ id, className }: { id: string; className?: string }) {
  const { cells, bg } = founderCells(id);
  return <SvgPixels cells={cells} bg={bg} className={className} title={id} />;
}
