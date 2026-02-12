"use client";

import { useEffect, useState } from "react";
import type { JobDetailsDTO } from "@/types/jobDetails";

type JobApplyCardProps = {
  job: JobDetailsDTO;
};

export function JobApplyCard({ job }: JobApplyCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSavedState() {
      const res = await fetch("/api/saved-jobs", { cache: "no-store" });
      if (!res.ok) {
        return;
      }
      const data = (await res.json()) as { jobId: string }[];
      if (isMounted) {
        setIsSaved(data.some((item) => item.jobId === job.id));
      }
    }

    void loadSavedState();

    return () => {
      isMounted = false;
    };
  }, [job.id]);

  async function handleSaveJob() {
    setErrorMessage(null);
    setIsPending(true);

    try {
      const method = isSaved ? "DELETE" : "POST";
      const res = await fetch(`/api/saved-jobs/${job.id}`, {
        method,
      });

      if (res.status === 401) {
        setErrorMessage("Sign in to save jobs.");
        return;
      }

      if (!res.ok) {
        setErrorMessage("Could not update saved jobs.");
        return;
      }

      setIsSaved((prev) => !prev);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <aside className="flex flex-col gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
      <h2 className="text-base font-semibold text-[rgb(var(--fg))]">
        Ready to apply?
      </h2>
      <p className="text-sm text-[rgb(var(--muted))]">
        Submit your application and start the conversation.
      </p>
      <a
        href={job.applyUrl}
        target="_blank"
        rel="noreferrer"
        className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Apply now
      </a>
      <button
        type="button"
        onClick={() => void handleSaveJob()}
        disabled={isPending}
        className="rounded-xl border border-[rgb(var(--border))] px-4 py-3 text-sm font-semibold text-[rgb(var(--muted))] transition hover:border-blue-500/40 hover:text-[rgb(var(--fg))]"
      >
        {isSaved ? "Remove saved" : "Save job"}
      </button>
      {errorMessage ? (
        <p className="text-xs text-rose-600">{errorMessage}</p>
      ) : null}
    </aside>
  );
}
