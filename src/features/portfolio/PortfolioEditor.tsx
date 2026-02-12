"use client";

import { useEffect, useMemo, useState } from "react";
import type { PortfolioItemDTO } from "@/types/dto/PortfolioItemDTO";

const DESCRIPTION_HINT_LIMIT = 180;

export function PortfolioEditor() {
  const [items, setItems] = useState<PortfolioItemDTO[]>([]);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "unauthorized">(
    "loading",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPortfolio() {
      setError(null);
      const res = await fetch("/api/portfolio", { cache: "no-store" });

      if (res.status === 401) {
        if (isMounted) {
          setStatus("unauthorized");
        }
        return;
      }

      if (!res.ok) {
        if (isMounted) {
          setStatus("ready");
          setError("Failed to load portfolio.");
        }
        return;
      }

      const data = (await res.json()) as PortfolioItemDTO[];
      if (isMounted) {
        setItems(data);
        setStatus("ready");
      }
    }

    void loadPortfolio();

    return () => {
      isMounted = false;
    };
  }, []);

  const canAddMore = items.length < 5;
  const charCountLabel = useMemo(
    () => `${description.length}/${DESCRIPTION_HINT_LIMIT}`,
    [description.length],
  );

  async function handleAddItem() {
    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, description }),
      });

      if (!res.ok) {
        const payload = (await res.json()) as { error?: string };
        setError(payload.error ?? "Failed to add portfolio item.");
        return;
      }

      const item = (await res.json()) as PortfolioItemDTO;
      setItems((prev) => [item, ...prev]);
      setUrl("");
      setDescription("");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleRemove(itemId: string) {
    setRemovingItemId(itemId);
    setError(null);

    try {
      const res = await fetch(`/api/portfolio/${itemId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        setError("Failed to remove portfolio item.");
        return;
      }

      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } finally {
      setRemovingItemId(null);
    }
  }

  if (status === "loading") {
    return <p className="text-sm text-[rgb(var(--muted))]">Loading portfolio...</p>;
  }

  if (status === "unauthorized") {
    return (
      <p className="text-sm text-[rgb(var(--muted))]">
        Sign in to manage your portfolio.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}

      <div className="space-y-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block truncate text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  {item.url}
                </a>
                <p className="text-sm text-[rgb(var(--fg))]">{item.description}</p>
              </div>
              <button
                type="button"
                onClick={() => void handleRemove(item.id)}
                disabled={removingItemId === item.id}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      {canAddMore ? (
        <section className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
          <h2 className="text-sm font-semibold text-[rgb(var(--fg))]">
            Add portfolio item
          </h2>
          <div className="mt-3 space-y-3">
            <input
              type="url"
              placeholder="https://example.com/project"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              className="w-full rounded-lg border border-[rgb(var(--border))] bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            <div className="space-y-1">
              <textarea
                rows={3}
                placeholder="Short description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full rounded-lg border border-[rgb(var(--border))] bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
              <p className="text-xs text-[rgb(var(--muted))]">{charCountLabel}</p>
            </div>
            <button
              type="button"
              onClick={() => void handleAddItem()}
              disabled={isSaving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Add item
            </button>
          </div>
        </section>
      ) : (
        <p className="text-xs text-[rgb(var(--muted))]">
          Portfolio limit reached.
        </p>
      )}
    </div>
  );
}
