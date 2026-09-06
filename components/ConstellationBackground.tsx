const NODES = [
  { x: 60, y: 40 }, { x: 180, y: 90 }, { x: 90, y: 160 }, { x: 260, y: 50 },
  { x: 340, y: 140 }, { x: 220, y: 200 }, { x: 420, y: 60 }, { x: 480, y: 170 },
  { x: 400, y: 250 }, { x: 560, y: 100 }, { x: 620, y: 220 }, { x: 540, y: 300 },
  { x: 680, y: 60 }, { x: 720, y: 180 }, { x: 300, y: 300 }, { x: 150, y: 260 },
  { x: 460, y: 330 }, { x: 640, y: 340 },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 3], [1, 2], [3, 4], [4, 5], [4, 6], [6, 7], [7, 9], [9, 12],
  [9, 10], [10, 13], [10, 11], [7, 8], [8, 16], [2, 15], [5, 14], [14, 16],
  [16, 17], [11, 17], [12, 13],
];

/**
 * Purely decorative, static (non-animated) node graphic behind the hero.
 * Kept very low-opacity so it reads as texture, not a distraction.
 */
export function ConstellationBackground() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]"
      viewBox="0 0 800 400"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden
    >
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="#6E8CFF"
          strokeOpacity={0.25}
          strokeWidth={1}
        />
      ))}
      {NODES.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i % 3 === 0 ? 2.5 : 1.5} fill="#6E8CFF" fillOpacity={0.6} />
      ))}
    </svg>
  );
}
