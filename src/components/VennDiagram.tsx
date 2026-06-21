import { useId } from "react";
import { motion } from "framer-motion";
import type { VennPreset } from "../types";

interface RegionFlags {
  aOnly?: boolean;
  bOnly?: boolean;
  inter?: boolean;
  cOnly?: boolean;
  abOnly?: boolean;
  acOnly?: boolean;
  bcOnly?: boolean;
  abc?: boolean;
  outside?: boolean;
}

interface VennDiagramProps {
  preset: VennPreset;
  labelA?: string;
  labelB?: string;
  labelC?: string;
  className?: string;
  /** highlight color */
  fill?: string;
  animate?: boolean;
}

const HL = "#8b5cf6";

const TWO_SET_REGIONS: Record<string, RegionFlags> = {
  union: { aOnly: true, bOnly: true, inter: true },
  intersection: { inter: true },
  difference: { aOnly: true },
  complement: { bOnly: true, outside: true },
  symmetric: { aOnly: true, bOnly: true },
  subset: { aOnly: true, inter: true },
  disjoint: { aOnly: true, bOnly: true },
};

export default function VennDiagram({
  preset,
  labelA = "A",
  labelB = "B",
  labelC = "C",
  className = "",
  fill = HL,
  animate = true,
}: VennDiagramProps) {
  // Unique id prefix so multiple diagrams on one page never collide (SVG defs are global).
  const uid = useId().replace(/:/g, "");
  const isThree = preset.startsWith("three");

  if (isThree) {
    return (
      <ThreeSetVenn
        preset={preset}
        labelA={labelA}
        labelB={labelB}
        labelC={labelC}
        fill={fill}
        className={className}
        animate={animate}
      />
    );
  }

  const r = preset === "subset" ? { a: 38, b: 78 } : { a: 70, b: 70 };
  const isSubset = preset === "subset";
  const isDisjoint = preset === "disjoint";

  // Circle centers
  const cAx = isDisjoint ? 70 : isSubset ? 130 : 95;
  const cBx = isDisjoint ? 200 : isSubset ? 150 : 165;
  const cy = 90;

  const flags = TWO_SET_REGIONS[preset] ?? {};

  return (
    <svg
      viewBox="0 0 260 180"
      className={`w-full max-w-md ${className}`}
      role="img"
      aria-label={`${preset} Venn diagrammasi`}
    >
      <defs>
        {/* intersection clip */}
        <clipPath id={`clipB-${uid}`}>
          <circle cx={cBx} cy={cy} r={r.b} />
        </clipPath>
        <clipPath id={`clipA-${uid}`}>
          <circle cx={cAx} cy={cy} r={r.a} />
        </clipPath>
        <mask id={`notB-${uid}`}>
          <rect x="0" y="0" width="260" height="180" fill="white" />
          <circle cx={cBx} cy={cy} r={r.b} fill="black" />
        </mask>
        <mask id={`notA-${uid}`}>
          <rect x="0" y="0" width="260" height="180" fill="white" />
          <circle cx={cAx} cy={cy} r={r.a} fill="black" />
        </mask>
        <mask id={`outside-${uid}`}>
          <rect x="0" y="0" width="260" height="180" fill="white" />
          <circle cx={cAx} cy={cy} r={r.a} fill="black" />
          <circle cx={cBx} cy={cy} r={r.b} fill="black" />
        </mask>
      </defs>

      {/* Universe box for complement */}
      <rect
        x="6"
        y="6"
        width="248"
        height="168"
        rx="10"
        className="fill-ink-100 dark:fill-ink-800/50"
      />
      {flags.outside && (
        <Region animate={animate}>
          <rect
            x="6"
            y="6"
            width="248"
            height="168"
            rx="10"
            fill={fill}
            opacity={0.28}
            mask={`url(#outside-${uid})`}
          />
        </Region>
      )}
      <text
        x="244"
        y="22"
        textAnchor="end"
        className="fill-ink-400 font-math"
        fontSize="12"
      >
        U
      </text>

      {/* Region fills */}
      {flags.aOnly && (
        <Region animate={animate}>
          <circle
            cx={cAx}
            cy={cy}
            r={r.a}
            fill={fill}
            opacity={0.55}
            mask={`url(#notB-${uid})`}
          />
        </Region>
      )}
      {flags.bOnly && (
        <Region animate={animate} delay={0.1}>
          <circle
            cx={cBx}
            cy={cy}
            r={r.b}
            fill={fill}
            opacity={0.55}
            mask={`url(#notA-${uid})`}
          />
        </Region>
      )}
      {flags.inter && (
        <Region animate={animate} delay={0.2}>
          <g clipPath={`url(#clipA-${uid})`}>
            <circle cx={cBx} cy={cy} r={r.b} fill={fill} opacity={0.8} />
          </g>
        </Region>
      )}

      {/* Outlines */}
      <circle
        cx={cAx}
        cy={cy}
        r={r.a}
        className="fill-none stroke-brand-500"
        strokeWidth="2.5"
      />
      <circle
        cx={cBx}
        cy={cy}
        r={r.b}
        className="fill-none stroke-accent-500"
        strokeWidth="2.5"
      />

      {/* Labels */}
      <text
        x={isSubset ? cAx : cAx - 30}
        y={isSubset ? cy - 18 : cy - 45}
        className="fill-brand-700 font-math font-bold dark:fill-brand-300"
        fontSize="18"
        textAnchor="middle"
      >
        {labelA}
      </text>
      <text
        x={isSubset ? cBx + 35 : cBx + 30}
        y={cy - 45}
        className="fill-accent-700 font-math font-bold dark:fill-accent-300"
        fontSize="18"
        textAnchor="middle"
      >
        {labelB}
      </text>
    </svg>
  );
}

function Region({
  children,
  animate,
  delay = 0,
}: {
  children: React.ReactNode;
  animate: boolean;
  delay?: number;
}) {
  if (!animate) return <>{children}</>;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{ transformOrigin: "center", transformBox: "fill-box" }}
    >
      {children}
    </motion.g>
  );
}

const THREE_REGIONS: Record<string, RegionFlags> = {
  "three-union": {
    aOnly: true,
    bOnly: true,
    cOnly: true,
    abOnly: true,
    acOnly: true,
    bcOnly: true,
    abc: true,
  },
  "three-intersection": { abc: true },
};

function ThreeSetVenn({
  preset,
  labelA,
  labelB,
  labelC,
  fill,
  className,
  animate,
}: Required<Omit<VennDiagramProps, "className">> & { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const flags = THREE_REGIONS[preset] ?? {};
  const r = 58;
  const A = { x: 100, y: 80 };
  const B = { x: 160, y: 80 };
  const C = { x: 130, y: 132 };

  return (
    <svg
      viewBox="0 0 260 200"
      className={`w-full max-w-md ${className ?? ""}`}
      role="img"
      aria-label={`${preset} uch to'plamli Venn diagrammasi`}
    >
      <defs>
        <clipPath id={`A-${uid}`}>
          <circle cx={A.x} cy={A.y} r={r} />
        </clipPath>
        <clipPath id={`B-${uid}`}>
          <circle cx={B.x} cy={B.y} r={r} />
        </clipPath>
        <clipPath id={`C-${uid}`}>
          <circle cx={C.x} cy={C.y} r={r} />
        </clipPath>
      </defs>

      {flags.abc && (
        <Region animate={animate}>
          <g clipPath={`url(#A-${uid})`}>
            <g clipPath={`url(#B-${uid})`}>
              <circle cx={C.x} cy={C.y} r={r} fill={fill} opacity={0.85} />
            </g>
          </g>
        </Region>
      )}

      {preset === "three-union" && (
        <Region animate={animate}>
          <circle cx={A.x} cy={A.y} r={r} fill={fill} opacity={0.35} />
          <circle cx={B.x} cy={B.y} r={r} fill={fill} opacity={0.35} />
          <circle cx={C.x} cy={C.y} r={r} fill={fill} opacity={0.35} />
        </Region>
      )}

      <circle
        cx={A.x}
        cy={A.y}
        r={r}
        className="fill-none stroke-brand-500"
        strokeWidth="2.5"
      />
      <circle
        cx={B.x}
        cy={B.y}
        r={r}
        className="fill-none stroke-accent-500"
        strokeWidth="2.5"
      />
      <circle
        cx={C.x}
        cy={C.y}
        r={r}
        className="fill-none stroke-emerald-500"
        strokeWidth="2.5"
      />

      <text x={A.x - 40} y={A.y - 40} className="fill-brand-600 font-math font-bold" fontSize="16">
        {labelA}
      </text>
      <text x={B.x + 40} y={B.y - 40} className="fill-accent-600 font-math font-bold" fontSize="16">
        {labelB}
      </text>
      <text x={C.x} y={C.y + 62} className="fill-emerald-600 font-math font-bold" fontSize="16" textAnchor="middle">
        {labelC}
      </text>
    </svg>
  );
}
