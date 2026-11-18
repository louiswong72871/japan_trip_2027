import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import {
  gsap,
  hasSeenIntro,
  markIntroSeen,
  motionDuration,
  prefersReducedMotion,
  useGSAP,
} from "../motion/gsap";

function shouldPlayIntro(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  if (prefersReducedMotion()) {
    return false;
  }
  return !hasSeenIntro();
}

export function IntroWipe({
  targetRef,
}: {
  targetRef: RefObject<HTMLElement | null>;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(shouldPlayIntro);

  const hide = () => {
    const overlay = overlayRef.current;
    if (overlay) {
      gsap.set(overlay, { autoAlpha: 0, yPercent: -100, pointerEvents: "none" });
    }
    if (targetRef.current) {
      gsap.set(targetRef.current, { clearProps: "transform" });
    }
    setActive(false);
  };

  useLayoutEffect(() => {
    if (!active) {
      return;
    }
    const timeout = window.setTimeout(() => {
      markIntroSeen();
      hide();
    }, 2500);
    return () => window.clearTimeout(timeout);
  }, [active]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const target = targetRef.current;
      if (!active) {
        return;
      }
      if (!overlay || !target) {
        return;
      }

      if (prefersReducedMotion() || hasSeenIntro()) {
        hide();
        return;
      }

      gsap.set(target, { scale: 1.06, transformOrigin: "50% 0%" });
      gsap.set(overlay, { autoAlpha: 1, yPercent: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          markIntroSeen();
          hide();
        },
      });

      timeline.to(
        overlay,
        {
          yPercent: -100,
          duration: motionDuration.introWipe,
          ease: "power3.inOut",
        },
        0.2,
      );
      timeline.to(
        target,
        {
          scale: 1,
          duration: motionDuration.introScale,
          ease: "power3.out",
        },
        0.15,
      );

      return () => {
        timeline.kill();
        gsap.set(overlay, { autoAlpha: 0, yPercent: -100, pointerEvents: "none" });
        gsap.set(target, { clearProps: "transform" });
      };
    },
    { scope: overlayRef, dependencies: [active, targetRef] },
  );

  if (!active) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[100] bg-accent"
      aria-hidden="true"
    />
  );
}
