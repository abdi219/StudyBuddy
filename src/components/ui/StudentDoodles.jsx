import { useEffect, useRef } from "react";

/* ──────────────────────────────────────
   SVG Doodle Paths — hand-drawn student items
   Each doodle is an SVG path + metadata
   ────────────────────────────────────── */
const doodleLibrary = {
  pencil: {
    viewBox: "0 0 40 40",
    path: `M8 32 L28 12 L32 8 L36 12 L16 32 L8 36 Z M28 12 L32 16`,
    size: 40,
  },
  pen: {
    viewBox: "0 0 40 40",
    path: `M10 30 L26 14 L30 10 Q32 8 34 10 L30 14 L14 30 Z M10 30 L6 34 L10 34 Z`,
    size: 38,
  },
  book: {
    viewBox: "0 0 44 40",
    path: `M6 8 Q6 6 8 6 L20 6 L20 34 Q14 32 8 34 Q6 34 6 32 Z M38 8 Q38 6 36 6 L24 6 L24 34 Q30 32 36 34 Q38 34 38 32 Z M20 6 L24 6 M20 34 L24 34`,
    size: 44,
  },
  ruler: {
    viewBox: "0 0 50 20",
    path: `M4 4 L46 4 L46 16 L4 16 Z M12 4 L12 10 M20 4 L20 12 M28 4 L28 10 M36 4 L36 12`,
    size: 50,
  },
  eraser: {
    viewBox: "0 0 36 24",
    path: `M4 8 Q4 4 8 4 L28 4 Q32 4 32 8 L32 16 Q32 20 28 20 L8 20 Q4 20 4 16 Z M16 4 L16 20`,
    size: 36,
  },
  paperPlane: {
    viewBox: "0 0 40 40",
    path: `M4 20 L36 4 L28 36 L20 24 L36 4 M20 24 L20 34`,
    size: 40,
  },
  lightbulb: {
    viewBox: "0 0 32 40",
    path: `M16 4 Q8 4 8 14 Q8 20 12 22 L12 28 L20 28 L20 22 Q24 20 24 14 Q24 4 16 4 Z M12 30 L20 30 M13 32 L19 32`,
    size: 36,
  },
  star: {
    viewBox: "0 0 36 36",
    path: `M18 4 L22 14 L32 14 L24 22 L26 32 L18 26 L10 32 L12 22 L4 14 L14 14 Z`,
    size: 36,
  },
  coffee: {
    viewBox: "0 0 36 36",
    path: `M6 12 L6 28 Q6 32 10 32 L22 32 Q26 32 26 28 L26 12 Z M26 16 L30 16 Q34 16 34 20 L34 22 Q34 26 30 26 L26 26 M10 8 Q10 4 12 6 Q14 8 14 4 M18 8 Q18 4 20 6 Q22 8 22 4`,
    size: 36,
  },
  calculator: {
    viewBox: "0 0 32 40",
    path: `M6 4 Q6 2 8 2 L24 2 Q26 2 26 4 L26 36 Q26 38 24 38 L8 38 Q6 38 6 36 Z M10 8 L22 8 L22 16 L10 16 Z M10 22 L14 22 M18 22 L22 22 M10 28 L14 28 M18 28 L22 28 M10 34 L22 34`,
    size: 36,
  },
  notebook: {
    viewBox: "0 0 36 40",
    path: `M8 4 L30 4 L30 36 L8 36 Z M12 4 L12 36 M4 10 L12 10 M4 18 L12 18 M4 26 L12 26 M16 12 L26 12 M16 18 L24 18 M16 24 L26 24`,
    size: 38,
  },
  graduationCap: {
    viewBox: "0 0 44 36",
    path: `M22 4 L4 14 L22 24 L40 14 Z M10 18 L10 28 Q22 34 34 28 L34 18 M22 24 L22 32`,
    size: 44,
  },
  paperClip: {
    viewBox: "0 0 24 40",
    path: `M8 12 L8 30 Q8 36 14 36 Q20 36 20 30 L20 10 Q20 4 14 4 Q8 4 8 10 L8 12`,
    size: 28,
  },
  scissors: {
    viewBox: "0 0 40 36",
    path: `M8 8 Q4 4 8 4 Q12 4 10 8 Q8 12 6 10 Q4 8 8 8 Z M8 28 Q4 32 8 32 Q12 32 10 28 Q8 24 6 26 Q4 28 8 28 Z M10 10 L32 26 M10 26 L32 10`,
    size: 40,
  },
};

/* Pick a random subset of doodles for variety */
function pickDoodles(count, seed = 0) {
  const keys = Object.keys(doodleLibrary);
  const picked = [];
  for (let i = 0; i < count; i++) {
    const idx = (seed + i * 7 + i * i * 3) % keys.length;
    picked.push({ key: keys[idx], ...doodleLibrary[keys[idx]] });
  }
  return picked;
}

/* ──────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────── */
export default function StudentDoodles({
  count = 8,
  opacity = 0.07,
  color = "var(--accent)",
  animated = true,
  seed = 42,
  className = "",
}) {
  const doodles = pickDoodles(count, seed);

  /* Generate random positions across the entire container area */
  const positions = doodles.map((_, i) => {
    // Generate true random positions spread across the 100x100 grid rather than a ring
    const x = ((seed * 17 + i * 53) % 90) + 5; // 5% to 95%
    const y = ((seed * 43 + i * 89) % 90) + 5; // 5% to 95%
    const rotation = ((seed * 13 + i * 47) % 360) - 180;
    const scale = 0.6 + ((seed * 3 + i * 19) % 40) / 100;
    const delay = (i * 0.4).toFixed(1);
    const duration = 6 + ((seed + i * 11) % 8);
    return { x, y, rotation, scale, delay, duration };
  });

  return (
    <div
      className={className}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}
      aria-hidden="true"
    >
      {doodles.map((doodle, i) => {
        const pos = positions[i];
        return (
          <svg
            key={`${doodle.key}-${i}`}
            viewBox={doodle.viewBox}
            style={{
              position: "absolute",
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: doodle.size * pos.scale,
              height: doodle.size * pos.scale,
              opacity,
              transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
              transition: "opacity 0.3s ease",
            }}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g style={{
              animation: animated
                ? `doodleFloat ${pos.duration}s ease-in-out infinite ${pos.delay}s`
                : "none",
            }}>
              <path d={doodle.path} />
            </g>
          </svg>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────
   SINGLE DOODLE — for inline use
   ────────────────────────────────────── */
export function SingleDoodle({
  name = "pencil",
  size = 24,
  color = "var(--accent)",
  opacity = 0.15,
  style = {},
  animated = false,
  className = "",
}) {
  const doodle = doodleLibrary[name];
  if (!doodle) return null;

  return (
    <svg
      viewBox={doodle.viewBox}
      className={className}
      style={{
        width: size,
        height: size,
        opacity,
        fill: "none",
        stroke: color,
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        animation: animated ? "doodleFloat 6s ease-in-out infinite" : "none",
        ...style,
      }}
      aria-hidden="true"
    >
      <path d={doodle.path} />
    </svg>
  );
}

/* ──────────────────────────────────────
   PENCIL DRAW ANIMATION — draws an SVG path on mount
   ────────────────────────────────────── */
export function PencilDrawLine({
  d = "M0,0 Q50,20 100,0",
  width = 100,
  height = 20,
  color = "var(--accent)",
  strokeWidth = 2,
  duration = 1.2,
  delay = 0,
  className = "",
  style = {},
}) {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.transition = "none";

    // Trigger reflow
    path.getBoundingClientRect();

    path.style.transition = `stroke-dashoffset ${duration}s ease-in-out ${delay}s`;
    path.style.strokeDashoffset = "0";
  }, [duration, delay]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ width, height, overflow: "visible", ...style }}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
