import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

gsap.defaults({
  duration: 0.3,
  ease: "power2.out",
});

export const motionDuration = {
  hero: 0.4,
  panel: 0.3,
  modalIn: 0.28,
  modalOut: 0.2,
  expand: 0.3,
  collapse: 0.22,
  introWipe: 1.05,
  introScale: 1.45,
} as const;

export const INTRO_STORAGE_KEY = "sendai-2027-intro-seen";

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasSeenIntro(): boolean {
  try {
    return sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen(): void {
  try {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

/** Fade and a short vertical slide. Clears inline styles when the tween ends. */
export function fadeSlideIn(target: gsap.TweenTarget, duration: number): void {
  gsap.killTweensOf(target);
  if (prefersReducedMotion()) {
    gsap.set(target, { clearProps: "opacity,visibility,transform" });
    return;
  }
  gsap.fromTo(
    target,
    { autoAlpha: 0, y: 8 },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      ease: "power2.out",
      clearProps: "opacity,visibility,transform",
    },
  );
}

export { gsap, useGSAP };
