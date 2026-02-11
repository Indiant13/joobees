"use client";

import type { ReactNode } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { usePathname } from "next/navigation";

export function MotionLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <LayoutGroup id="joobees-layout">
      <AnimatePresence mode="wait" initial={false}>
        <div key={pathname}>{children}</div>
      </AnimatePresence>
    </LayoutGroup>
  );
}
