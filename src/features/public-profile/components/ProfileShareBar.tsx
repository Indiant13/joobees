export type ProfileShareBarProps = {
  url: string;
};

export function ProfileShareBar({ url }: ProfileShareBarProps) {
  return (
    <section className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Share profile</h2>
      <p className="mt-2 text-sm text-[rgb(var(--muted))]">
        Public URL
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          readOnly
          value={url}
          className="w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm text-[rgb(var(--muted))]"
          aria-label="Public profile URL"
        />
        <a
          href={url}
          className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Open
        </a>
      </div>
    </section>
  );
}
