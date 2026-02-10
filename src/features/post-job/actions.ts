"use server";

import { getBaseUrl } from "@/lib/getBaseUrl";
import type { JobPayload } from "@/features/post-job/types";

export async function createJobAction(payload: JobPayload) {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to submit job");
  }

  return res.json();
}
