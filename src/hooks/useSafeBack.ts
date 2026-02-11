"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

export function useSafeBack() {
  const router = useRouter();

  return useCallback(() => {
    if (typeof document === "undefined") {
      router.push("/");
      return;
    }

    try {
      const referrer = document.referrer;
      if (referrer) {
        const referrerUrl = new URL(referrer);
        if (referrerUrl.origin === window.location.origin) {
          router.back();
          return;
        }
      }
    } catch {
      // fall through to home
    }

    router.push("/");
  }, [router]);
}
