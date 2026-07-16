type SparklineProps = {
  points: number[];
};

const WIDTH = 240;
const HEIGHT = 40;

export function Sparkline({ points }: SparklineProps) {
  if (points.length === 0) return null;

  const min = Math.min(...points);
  const max = Math.min(...points) === Math.max(...points) ? min + 1 : Math.max(...points);

  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * WIDTH;
      const y = HEIGHT - ((p - min) / (max - min)) * (HEIGHT - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-10 w-full">
      <path d={d} fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />
    </svg>
  );
}
