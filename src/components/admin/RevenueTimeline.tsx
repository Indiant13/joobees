type RevenueTimelineProps = {
  title: string;
  points: { label: string; amount: number; formatted: string }[];
};

export function RevenueTimeline({ title, points }: RevenueTimelineProps) {
  const max = points.reduce((value, point) => Math.max(value, point.amount), 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <span className="text-xs text-slate-400">Last period</span>
      </div>
      <div className="mt-4 grid gap-3">
        {points.map((point) => (
          <div key={point.label} className="flex items-center gap-3">
            <span className="w-12 text-xs text-slate-500">{point.label}</span>
            <div className="h-2 flex-1 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{
                  width: `${max === 0 ? 0 : (point.amount / max) * 100}%`,
                }}
              />
            </div>
            <span className="w-16 text-right text-xs font-semibold text-slate-700">
              {point.formatted}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
