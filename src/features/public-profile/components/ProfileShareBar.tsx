"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { CopyButton } from "@/components/navigation/CopyButton";

export type ProfileShareBarProps = {
  url: string;
};

export function ProfileShareBar({ url }: ProfileShareBarProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(url, { width: 180, margin: 1 })
      .then((dataUrl) => {
        if (isMounted) {
          setQrDataUrl(dataUrl);
        }
      })
      .catch(() => {
        if (isMounted) {
          setQrDataUrl(null);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [url]);

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
        <CopyButton value={url} />
      </div>
      {qrDataUrl ? (
        <div className="mt-4 flex items-center justify-center rounded-2xl border border-[rgb(var(--border))] bg-white p-4">
          <img
            src={qrDataUrl}
            alt="QR code for public profile"
            className="h-36 w-36"
          />
        </div>
      ) : null}
    </section>
  );
}
