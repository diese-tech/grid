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
      className="fixed inset-0 z-40 overflow-hidden bg-[#030609] text-cyan-50 [perspective:900px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.18 }}
      aria-live="polite"
      aria-label="Moving from the transit layer into The Lab"
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1, y: 0, opacity: 0.95 }}
        animate={reduceMotion ? undefined : { scale: 1.38, y: "-6%", opacity: 0.24 }}
        transition={{ duration: 1.28, ease: [0.16, 1, 0.3, 1] }}
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
        initial={reduceMotion ? false : { scale: 1.28, y: "8%", opacity: 0 }}
        animate={reduceMotion ? { opacity: 1 } : { scale: 1.04, y: 0, opacity: 0.78 }}
        transition={{ delay: reduceMotion ? 0 : 0.7, duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
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
        className="absolute left-1/2 top-1/2 h-[74vmin] w-[74vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/20 bg-cyan-100/5 shadow-[0_0_70px_rgba(103,232,249,0.28)]"
        initial={reduceMotion ? false : { scale: 0.16, opacity: 0, rotateX: 68 }}
        animate={reduceMotion ? undefined : { scale: [0.16, 0.72, 2.9], opacity: [0, 0.82, 0], rotateX: 68 }}
        transition={{ duration: 1.22, ease: [0.2, 0.9, 0.2, 1] }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute inset-x-[7%] top-[47%] h-32 origin-center border-y border-cyan-100/20 bg-[linear-gradient(90deg,transparent,rgba(103,232,249,0.16),transparent)]"
        initial={reduceMotion ? false : { rotateX: 72, scaleY: 0.22, opacity: 0 }}
        animate={reduceMotion ? undefined : { rotateX: 72, scaleY: [0.22, 2.4, 0.12], opacity: [0, 0.8, 0] }}
        transition={{ delay: 0.12, duration: 1.18, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: [0, 0.65, 0] }}
        transition={{ delay: 0.24, duration: 0.9, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-full w-px bg-cyan-100/35 shadow-[0_0_24px_rgba(103,232,249,0.9)]" />
        <div className="absolute left-[42%] top-0 h-full w-px bg-amber-100/25 shadow-[0_0_18px_rgba(252,211,77,0.65)]" />
        <div className="absolute left-[58%] top-0 h-full w-px bg-emerald-100/20 shadow-[0_0_18px_rgba(110,231,183,0.55)]" />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,7,18,0.96)_0%,transparent_18%,transparent_82%,rgba(3,7,18,0.96)_100%)]"
        initial={reduceMotion ? false : { scaleY: 1 }}
        animate={reduceMotion ? undefined : { scaleY: [1, 0.82, 1.16] }}
        transition={{ duration: 1.28, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute left-[-30%] top-[45%] h-px w-[160%] bg-cyan-100/60 shadow-[0_0_28px_rgba(103,232,249,0.9)]"
        initial={reduceMotion ? false : { y: 120, rotate: -8, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: -140, rotate: -8, opacity: [0, 1, 0.18] }}
        transition={{ duration: 1.18, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-30%] top-[58%] h-px w-[160%] bg-amber-100/50 shadow-[0_0_22px_rgba(252,211,77,0.7)]"
        initial={reduceMotion ? false : { y: 140, rotate: 6, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: -190, rotate: 6, opacity: [0, 0.85, 0] }}
        transition={{ delay: 0.16, duration: 1.1, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-y-0 left-1/2 w-28 -translate-x-1/2 bg-cyan-100/14 blur-2xl"
        initial={reduceMotion ? false : { scaleX: 0.2, opacity: 0 }}
        animate={reduceMotion ? undefined : { scaleX: [0.2, 3.6, 0.4], opacity: [0, 0.85, 0] }}
        transition={{ delay: 0.32, duration: 0.82, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[18rem] w-[34rem] max-w-[86vw] -translate-x-1/2 -translate-y-1/2 border border-cyan-100/25 bg-black/15 shadow-[0_0_80px_rgba(103,232,249,0.22)]"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
        animate={reduceMotion ? undefined : { opacity: [0, 0.85, 0], scale: [0.82, 1.2, 1.86] }}
        transition={{ delay: 0.46, duration: 0.76, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-6 border-t border-cyan-100/20 pt-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan-100/75">
        <span>Transit Layer</span>
        <span className="text-amber-100/80">Phasing through platform gate</span>
        <span>The Lab</span>
      </div>
    </motion.div>
  );
}
