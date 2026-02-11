type RevenueBreakdownTableProps = {
  title: string;
  rows: { label: string; amount: string }[];
};

export function RevenueBreakdownTable({
  title,
  rows,
}: RevenueBreakdownTableProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-4 space-y-3 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-slate-600">{row.label}</span>
            <span className="font-semibold text-slate-900">{row.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
