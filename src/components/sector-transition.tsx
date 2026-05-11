"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type SectorTransitionProps = {
  active: boolean;
};

export function SectorTransition({ active }: SectorTransitionProps) {
  const reduceMotion = useReducedMotion();

  if (!active) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-hidden bg-[#030609] text-cyan-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.18 }}
      aria-live="polite"
      aria-label="Moving from the transit layer into The Lab"
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1, x: 0, opacity: 0.92 }}
        animate={reduceMotion ? undefined : { scale: 1.12, x: "-7%", opacity: 0.22 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/homepage-transit-station-v01.jpeg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.08, x: "7%", opacity: 0 }}
        animate={reduceMotion ? { opacity: 1 } : { scale: 1, x: 0, opacity: 0.72 }}
        transition={{ delay: reduceMotion ? 0 : 0.42, duration: 0.72, ease: "easeOut" }}
      >
        <Image
          src="/images/dreamspace-lab-atmosphere-v01.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,18,0.92),rgba(3,7,18,0.25)_50%,rgba(3,7,18,0.9)),radial-gradient(circle_at_center,rgba(103,232,249,0.2),transparent_35%)]" />

      <motion.div
        className="absolute left-[-20%] top-1/2 h-px w-[140%] bg-cyan-100/50 shadow-[0_0_28px_rgba(103,232,249,0.9)]"
        initial={reduceMotion ? false : { y: 80, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: -90, opacity: [0, 1, 0.25] }}
        transition={{ duration: 0.95, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-20%] top-[58%] h-px w-[140%] bg-amber-100/45 shadow-[0_0_22px_rgba(252,211,77,0.7)]"
        initial={reduceMotion ? false : { y: 100, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: -140, opacity: [0, 0.8, 0] }}
        transition={{ delay: 0.12, duration: 0.9, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-y-0 left-1/2 w-24 -translate-x-1/2 bg-cyan-100/10 blur-2xl"
        initial={reduceMotion ? false : { scaleX: 0.2, opacity: 0 }}
        animate={reduceMotion ? undefined : { scaleX: [0.2, 2.8, 0.4], opacity: [0, 0.75, 0] }}
        transition={{ delay: 0.18, duration: 0.76, ease: "easeInOut" }}
      />

      <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-6 border-t border-cyan-100/20 pt-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan-100/75">
        <span>Transit Layer</span>
        <span className="text-amber-100/80">Platform shift</span>
        <span>The Lab</span>
      </div>
    </motion.div>
  );
}
