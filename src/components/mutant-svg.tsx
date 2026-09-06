import type { LabTraits } from "@/lib/game";

export function MutantCatSVG({ traits, glitching }: { traits: LabTraits; glitching?: boolean }) {
  const bt = traits.bodyType;
  const et = traits.eyeType;
  const ap = traits.appendages;
  const aura = traits.aura;
  const fur = traits.furPattern;
  const ml = traits.mutationLevel;
  const G = "#A5FA00";
  const accent =
    bt === "void"
      ? "#7C6CFF"
      : bt === "plasma"
        ? "#FF5A4A"
        : bt === "blob"
          ? "#3DFFC8"
          : bt === "skeletal"
            ? "#F4F4F0"
            : bt === "armored"
              ? "#8A8AA8"
              : G;
  const bodyFill =
    bt === "void"
      ? "#0d0020"
      : bt === "plasma"
        ? "#200005"
        : bt === "blob"
          ? "#002518"
          : bt === "skeletal"
            ? "#080808"
            : bt === "armored"
              ? "#101018"
              : "#0d0d0d";
  const eyeCol =
    et === "void"
      ? "#000"
      : et === "laser"
        ? "#FF5A4A"
        : et === "compound"
          ? "#3DFFC8"
          : et === "cyclops"
            ? "#E8EDE3"
            : et === "hex"
              ? G
              : "#EAEAEA";
  const bodyRx = bt === "blob" ? 55 + ml / 8 : 60;
  const bodyRy = bt === "blob" ? 70 + ml / 10 : 68;
  const getFill = () =>
    fur === "none"
      ? bodyFill
      : fur === "void"
        ? "url(#vg)"
        : fur === "plasma"
          ? "url(#pg)"
          : fur === "acid"
            ? "url(#ap)"
            : fur === "glitch"
              ? "url(#gp)"
              : bodyFill;

  return (
    <svg
      viewBox="0 0 300 330"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full w-full"
      style={{ overflow: "visible", animation: glitching ? "kili-glitch 0.25s 3" : "none" }}
    >
      <defs>
        <pattern id="ap" patternUnits="userSpaceOnUse" width="14" height="14">
          <rect width="14" height="14" fill={bodyFill} />
          <circle cx="7" cy="7" r="3" fill={accent} opacity="0.35" />
        </pattern>
        <pattern id="gp" patternUnits="userSpaceOnUse" width="22" height="5">
          <rect width="22" height="5" fill={bodyFill} />
          <rect x="2" y="1" width="8" height="1" fill={accent} opacity="0.5" />
          <rect x="13" y="3" width="6" height="1" fill="#FF5A4A" opacity="0.35" />
        </pattern>
        <radialGradient id="pg" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={bodyFill} />
        </radialGradient>
        <radialGradient id="vg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" />
          <stop offset="100%" stopColor="#1a0035" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softg">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {aura === "radiation" && (
        <>
          <ellipse cx="150" cy="215" rx={95 + ml / 3} ry={80 + ml / 4} fill="none" stroke={G} strokeWidth="1" opacity="0.07" />
          <ellipse
            cx="150"
            cy="215"
            rx={80 + ml / 4}
            ry={68 + ml / 5}
            fill="none"
            stroke={G}
            strokeWidth="1.5"
            opacity="0.14"
            filter="url(#softg)"
          />
        </>
      )}
      {aura === "electric" &&
        [0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i * Math.PI) / 3;
          return (
            <line
              key={i}
              x1="150"
              y1="215"
              x2={150 + Math.cos(a) * (70 + ml / 2)}
              y2={215 + Math.sin(a) * (55 + ml / 3)}
              stroke="#3DFFC8"
              strokeWidth="1.5"
              opacity="0.5"
              filter="url(#glow)"
            />
          );
        })}
      {aura === "shadow" && <ellipse cx="150" cy="240" rx="115" ry="88" fill="#000" opacity="0.65" />}
      {aura === "fire" &&
        [0, 1, 2, 3, 4, 5, 6].map((i) => (
          <ellipse
            key={i}
            cx={118 + i * 10 + (i % 3) * 4}
            cy={160 + (i % 2) * 18}
            rx={3 + (i % 3) * 2}
            ry={7 + (i % 3) * 10}
            fill="#FF5500"
            opacity={0.22 + i * 0.02}
          />
        ))}
      {aura === "crystal" &&
        [0, 1, 2, 3, 4].map((i) => {
          const cx2 = 90 + i * 30;
          return (
            <polygon
              key={i}
              points={`${cx2},250 ${cx2 - 6},234 ${cx2 + 6},234`}
              fill={G}
              opacity="0.35"
              transform={`rotate(${i * 8 - 16},${cx2},242)`}
            />
          );
        })}

      {ap === "wings" && (
        <>
          <ellipse cx="62" cy="190" rx="62" ry="28" fill={accent} opacity="0.15" transform="rotate(-22,62,190)" />
          <ellipse cx="62" cy="190" rx="50" ry="17" fill={accent} opacity="0.28" transform="rotate(-30,62,190)" />
          <ellipse cx="238" cy="190" rx="62" ry="28" fill={accent} opacity="0.15" transform="rotate(22,238,190)" />
          <ellipse cx="238" cy="190" rx="50" ry="17" fill={accent} opacity="0.28" transform="rotate(30,238,190)" />
        </>
      )}
      {ap === "tentacles" &&
        [0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M ${120 + i * 20} 275 Q ${92 + i * 22} ${302 + i * 8} ${70 + i * 38} ${318 + i * 4}`}
            stroke={accent}
            strokeWidth="4.5"
            fill="none"
            opacity="0.6"
            strokeLinecap="round"
          />
        ))}

      {bt !== "skeletal" ? (
        <ellipse cx="150" cy="220" rx={bodyRx} ry={bodyRy} fill={getFill()} stroke={accent} strokeWidth={bt === "armored" ? 2.5 : 1.5} />
      ) : (
        <>
          <ellipse cx="150" cy="220" rx="55" ry="65" fill="transparent" stroke="#FFFFFF" strokeWidth="1" opacity="0.18" />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={118 + i * 2}
              y={180 + i * 14}
              width={64 - i * 4}
              height="5"
              rx="2"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              opacity="0.12"
            />
          ))}
        </>
      )}

      {ap === "crystals" &&
        [0, 1, 2].map((i) => (
          <polygon key={i} points={`${122 + i * 28},218 ${118 + i * 28},195 ${126 + i * 28},195`} fill={accent} opacity="0.55" />
        ))}

      {ap !== "tentacles" && (
        <>
          <path d="M 205,262 Q 250,278 260,254 Q 272,232 248,220" stroke={accent} strokeWidth="7" fill="none" strokeLinecap="round" />
          {ap === "multi_tail" && (
            <>
              <path
                d="M 205,268 Q 255,295 268,268 Q 280,246 255,235"
                stroke={accent}
                strokeWidth="5.5"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path
                d="M 200,272 Q 245,305 252,284 Q 260,262 240,250"
                stroke={accent}
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
              />
            </>
          )}
        </>
      )}

      <ellipse cx="150" cy="140" rx="62" ry="56" fill={getFill()} stroke={accent} strokeWidth={bt === "armored" ? 2.5 : 1.5} />

      {bt === "blob" ? (
        <>
          <ellipse cx="100" cy="90" rx="20" ry="28" fill={getFill()} stroke={accent} strokeWidth="1.5" />
          <ellipse cx="200" cy="90" rx="20" ry="28" fill={getFill()} stroke={accent} strokeWidth="1.5" />
        </>
      ) : (
        <>
          <polygon points="102,110 88,68 126,100" fill={getFill()} stroke={accent} strokeWidth="1.5" />
          <polygon points="198,110 212,68 174,100" fill={getFill()} stroke={accent} strokeWidth="1.5" />
          <polygon points="107,108 94,74 120,99" fill={accent} opacity="0.22" />
          <polygon points="193,108 206,74 180,99" fill={accent} opacity="0.22" />
        </>
      )}

      {et === "normal" && (
        <>
          <ellipse cx="125" cy="135" rx="14" ry="12" fill={eyeCol} stroke={accent} strokeWidth="1" />
          <ellipse cx="175" cy="135" rx="14" ry="12" fill={eyeCol} stroke={accent} strokeWidth="1" />
          <ellipse cx="125" cy="136" rx="6" ry={Math.max(2, 9 - ml / 14)} fill="#000" />
          <ellipse cx="175" cy="136" rx="6" ry={Math.max(2, 9 - ml / 14)} fill="#000" />
        </>
      )}
      {et === "cyclops" && (
        <>
          <ellipse cx="150" cy="133" rx="28" ry="20" fill={eyeCol} stroke={accent} strokeWidth="2" filter="url(#glow)" />
          <ellipse cx="150" cy="133" rx="13" ry="14" fill="#000" />
        </>
      )}
      {et === "compound" && (
        <>
          {[-1, 0, 1].map((c) =>
            [-1, 0].map((r) => (
              <circle key={`L${c}${r}`} cx={118 + c * 10} cy={133 + r * 9} r="5.5" fill={eyeCol} stroke="#000" strokeWidth="0.5" />
            )),
          )}
          {[-1, 0, 1].map((c) =>
            [-1, 0].map((r) => (
              <circle key={`R${c}${r}`} cx={182 + c * 10} cy={133 + r * 9} r="5.5" fill={eyeCol} stroke="#000" strokeWidth="0.5" />
            )),
          )}
        </>
      )}
      {et === "void" && (
        <>
          <ellipse cx="125" cy="135" rx="15" ry="13" fill="#000" stroke="#330066" strokeWidth="2" />
          <ellipse cx="175" cy="135" rx="15" ry="13" fill="#000" stroke="#330066" strokeWidth="2" />
        </>
      )}
      {et === "laser" && (
        <>
          <ellipse cx="125" cy="135" rx="14" ry="11" fill={eyeCol} filter="url(#glow)" />
          <ellipse cx="175" cy="135" rx="14" ry="11" fill={eyeCol} filter="url(#glow)" />
          <line x1="111" y1="135" x2="-5" y2="135" stroke={eyeCol} strokeWidth="2.5" opacity="0.9" filter="url(#glow)" />
          <line x1="189" y1="135" x2="305" y2="135" stroke={eyeCol} strokeWidth="2.5" opacity="0.9" filter="url(#glow)" />
        </>
      )}
      {et === "hex" && (
        <>
          <polygon points="112,126 124,126 130,136 124,146 112,146 106,136" fill={eyeCol} stroke={accent} strokeWidth="1.2" />
          <polygon points="170,126 182,126 188,136 182,146 170,146 164,136" fill={eyeCol} stroke={accent} strokeWidth="1.2" />
        </>
      )}

      <polygon points="150,152 146,158 154,158" fill={accent} opacity="0.8" />
      {bt !== "blob" && ap !== "tentacles" && (
        <>
          <rect x="108" y="272" width="36" height="34" rx={bt === "armored" ? 3 : 16} fill={getFill()} stroke={accent} strokeWidth="1.5" />
          <rect x="156" y="272" width="36" height="34" rx={bt === "armored" ? 3 : 16} fill={getFill()} stroke={accent} strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}
