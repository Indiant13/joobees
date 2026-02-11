"use client";

import type { JobShareCardDTO } from "@/types/jobShareCard";
import { useEffect, useState } from "react";

type JobShareCardProps = {
  data: JobShareCardDTO;
};

export function JobShareCard({ data }: JobShareCardProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
        return;
      }
      await navigator.clipboard.writeText(data.shortUrl);
      setCopied(true);
    } catch {
      // No-op: clipboard not available or denied.
    }
  };

  return (
    <aside className="flex flex-col gap-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-white">
          {data.company.logoUrl ? (
            <img
              src={data.company.logoUrl}
              alt={`${data.company.name} logo`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-[rgb(var(--muted))]">
              Logo
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-[rgb(var(--fg))]">
            {data.company.name}
          </p>
          <p className="text-xs text-[rgb(var(--muted))]">Share this job</p>
          {data.promoted ? (
            <span className="mt-2 inline-flex rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-700">
              Promoted job
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={data.shortUrl}
          className="flex-1 break-all rounded-xl border border-[rgb(var(--border))] bg-white px-3 py-2 text-sm text-[rgb(var(--fg))] transition hover:border-blue-500/40"
        >
          {data.shortUrl}
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-xl border border-[rgb(var(--border))] px-3 py-2 text-xs font-semibold text-[rgb(var(--muted))] transition hover:border-blue-500/40 hover:text-[rgb(var(--fg))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="flex items-center justify-center rounded-xl border border-dashed border-[rgb(var(--border))] bg-white p-4">
        <img
          src={data.qrCodeUrl}
          alt={`QR code for ${data.company.name} job`}
          className="h-32 w-32"
        />
      </div>
    </aside>
  );
}
