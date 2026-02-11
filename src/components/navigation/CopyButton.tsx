"use client";

import { useEffect, useState } from "react";

type CopyButtonProps = {
  value: string;
  idleLabel?: string;
  copiedLabel?: string;
};

export function CopyButton({
  value,
  idleLabel = "Copy",
  copiedLabel = "Copied",
}: CopyButtonProps) {
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
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // No-op: clipboard not available or denied.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
      aria-label={copied ? copiedLabel : idleLabel}
    >
      {copied ? copiedLabel : idleLabel}
    </button>
  );
}
