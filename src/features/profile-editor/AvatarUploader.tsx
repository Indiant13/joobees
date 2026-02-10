"use client";

import { useState } from "react";
import type { SaveState } from "@/features/profile-editor/useProfileEditor";

export type AvatarUploaderProps = {
  avatarUrl: string | null;
  state: SaveState;
  onUpload: (file: File) => void;
  onRetry: () => void;
  canRetry: boolean;
};

export function AvatarUploader({
  avatarUrl,
  state,
  onUpload,
  onRetry,
  canRetry,
}: AvatarUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");
  const displayUrl = preview ?? avatarUrl;
  const inputId = "avatar-upload-input";

  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Avatar</h2>
        <div className="flex items-center gap-3 text-xs">
          {state === "saving" ? (
            <span className="text-blue-600">Uploading…</span>
          ) : state === "success" ? (
            <span className="text-emerald-600">Updated</span>
          ) : state === "error" ? (
            <span className="text-rose-600">Error</span>
          ) : null}
          {canRetry && state === "error" ? (
            <button
              type="button"
              onClick={onRetry}
              className="text-blue-600 transition hover:text-blue-700"
            >
              Retry
            </button>
          ) : null}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-slate-100 text-sm text-slate-500">
          {displayUrl ? (
            <img src={displayUrl} alt="Avatar preview" className="h-full w-full object-cover" />
          ) : (
            <span>No image</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]"
          >
            Upload new
          </label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              id={inputId}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) {
                  return;
                }
                setFileName(file.name);
                const nextPreview = URL.createObjectURL(file);
                setPreview(nextPreview);
                onUpload(file);
              }}
            />
            <label
              htmlFor={inputId}
              className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-2 text-sm text-[rgb(var(--fg))] transition hover:border-blue-500"
            >
              Choose file
            </label>
            <span className="text-xs text-[rgb(var(--muted))]">
              {fileName}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

