import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const motionDuration = {
  hero: 0.4,
  panel: 0.3,
  modalIn: 0.28,
  modalOut: 0.2,
  expand: 0.3,
  collapse: 0.22,
} as const;

const EASE_OUT = "power2.out";

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Fade and a short vertical slide. Clears inline styles when the tween ends. */
export function fadeSlideIn(target: gsap.TweenTarget, duration: number): void {
  gsap.killTweensOf(target);
  if (prefersReducedMotion()) {
    gsap.set(target, { clearProps: "opacity,transform" });
    return;
  }
  gsap.fromTo(
    target,
    { opacity: 0, y: 8 },
    {
      opacity: 1,
      y: 0,
      duration,
      ease: EASE_OUT,
      clearProps: "opacity,transform",
    },
  );
}

export { gsap, useGSAP };
