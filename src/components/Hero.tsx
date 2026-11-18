import { useRef } from "react";
import { fadeSlideIn, motionDuration, useGSAP } from "../motion/gsap";

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (cardRef.current) {
      fadeSlideIn(cardRef.current, motionDuration.hero);
    }
  }, { scope: cardRef });

  return (
    <header className="bg-bg px-6 pt-6 sm:px-8 sm:pt-8">
      <div
        ref={cardRef}
        className="mx-auto max-w-3xl bg-accent p-2 sm:p-3"
      >
        <div className="relative h-[200px] overflow-hidden sm:h-[280px]">
          <picture>
            <source
              type="image/webp"
              srcSet="/sendai-winter-hero-960.webp 960w, /sendai-winter-hero.webp 1920w"
              sizes="(min-width: 768px) 48rem, 100vw"
            />
            <img
              src="/sendai-winter-hero.jpg"
              srcSet="/sendai-winter-hero-960.jpg 960w, /sendai-winter-hero.jpg 1920w"
              sizes="(min-width: 768px) 48rem, 100vw"
              width={1920}
              height={1080}
              alt="藍天下被霧冰覆蓋的樹冰與雪原"
              className="absolute inset-0 size-full object-cover"
              fetchPriority="high"
            />
          </picture>
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--hero-overlay)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 px-4 pb-4 sm:px-6 sm:pb-5">
            <p className="text-sm font-medium tracking-[0.14em] text-white/90">
              仙台 · 藏王 · 東京
            </p>
            <h1 className="mt-1 font-serif text-2xl font-semibold text-balance text-white sm:text-4xl">
              2027仙台冬旅計劃（可修訂）
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
