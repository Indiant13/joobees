"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

type BrandLinkProps = {
  title: string;
  subtitle: string;
};

export function BrandLink({ title, subtitle }: BrandLinkProps) {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleActivate = () => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
  };

  return (
    <motion.button
      type="button"
      onClick={handleActivate}
      className="group relative text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
      aria-label="Go to homepage"
      layoutId="brand-link"
      animate={{ scale: isAnimating ? 0.96 : 1 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      onAnimationComplete={() => {
        if (isAnimating) {
          setIsAnimating(false);
          router.push("/");
        }
      }}
    >
      <motion.span
        className="pointer-events-none absolute -inset-6 rounded-full opacity-0 blur-2xl"
        initial={false}
        animate={{
          opacity: isAnimating ? 0.6 : 0,
          scale: isAnimating ? 1 : 0.9,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.35), transparent 60%)",
        }}
      />
      <motion.span
        className="relative inline-flex flex-col"
        layoutId="brand-text"
      >
        <motion.span
          className="text-2xl font-semibold sm:text-3xl"
          layoutId="brand-title"
        >
          {title}
        </motion.span>
        <motion.span
          className="text-sm text-blue-100 sm:text-base"
          layoutId="brand-subtitle"
        >
          {subtitle}
        </motion.span>
      </motion.span>
    </motion.button>
  );
}
