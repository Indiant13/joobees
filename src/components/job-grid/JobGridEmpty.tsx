export type JobGridEmptyProps = {
  title?: string;
  description?: string;
};

export function JobGridEmpty({
  title = "No roles found",
  description = "Try adjusting filters or search terms.",
}: JobGridEmptyProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 text-center">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-[rgb(var(--muted))]">{description}</p>
    </div>
  );
}
