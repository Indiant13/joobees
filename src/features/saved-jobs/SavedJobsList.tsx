"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SavedJobDTO } from "@/types/dto/SavedJobDTO";

export function SavedJobsList() {
  const [jobs, setJobs] = useState<SavedJobDTO[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "unauthorized">(
    "loading",
  );
  const [error, setError] = useState<string | null>(null);
  const [removingJobId, setRemovingJobId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSavedJobs() {
      setError(null);
      const res = await fetch("/api/saved-jobs", { cache: "no-store" });

      if (res.status === 401) {
        if (isMounted) {
          setStatus("unauthorized");
        }
        return;
      }

      if (!res.ok) {
        if (isMounted) {
          setError("Failed to load saved jobs.");
          setStatus("ready");
        }
        return;
      }

      const data = (await res.json()) as SavedJobDTO[];
      if (isMounted) {
        setJobs(data);
        setStatus("ready");
      }
    }

    void loadSavedJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleRemove(jobId: string) {
    setRemovingJobId(jobId);
    setError(null);

    try {
      const res = await fetch(`/api/saved-jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        setError("Failed to remove saved job.");
        return;
      }

      setJobs((prev) => prev.filter((item) => item.jobId !== jobId));
    } finally {
      setRemovingJobId(null);
    }
  }

  if (status === "loading") {
    return <p className="text-sm text-[rgb(var(--muted))]">Loading saved jobs...</p>;
  }

  if (status === "unauthorized") {
    return <p className="text-sm text-[rgb(var(--muted))]">Sign in to view saved jobs.</p>;
  }

  if (jobs.length === 0) {
    return <p className="text-sm text-[rgb(var(--muted))]">No saved jobs yet.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
      {jobs.map((job) => (
        <article
          key={job.id}
          className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Link
                href={`/jobs/${job.jobId}`}
                className="text-sm font-semibold text-[rgb(var(--fg))] hover:underline"
              >
                {job.title}
              </Link>
              <p className="text-xs text-[rgb(var(--muted))]">
                {job.company} · {job.location}
              </p>
              {job.salary ? (
                <p className="text-xs text-[rgb(var(--muted))]">{job.salary}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => void handleRemove(job.jobId)}
              disabled={removingJobId === job.jobId}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
            >
              Remove
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
