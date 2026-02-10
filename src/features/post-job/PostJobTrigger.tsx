"use client";

import { useState } from "react";
import { PostJobModal } from "@/features/post-job/PostJobModal";

export function PostJobTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="whitespace-nowrap rounded-full border border-blue-300/40 px-3 py-1 text-blue-50 transition hover:border-white hover:text-white"
      >
        Post a job
      </button>
      <PostJobModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
