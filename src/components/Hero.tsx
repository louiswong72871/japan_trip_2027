export function Hero() {
  return (
    <header className="bg-bg px-6 pt-6 sm:px-8 sm:pt-8">
      <div className="relative mx-auto max-w-3xl rounded-[var(--radius)] bg-muted p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-[calc(var(--radius)-0.5rem)]">
          <div className="aspect-16/9 max-h-[min(360px,70dvh)] w-full min-h-44">
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
                className="size-full object-cover"
                fetchPriority="high"
              />
            </picture>
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--hero-overlay)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-16 sm:px-6">
            <p className="text-sm font-medium tracking-wide text-white/90">
              仙台 · 藏王 · 東京
            </p>
            <h1 className="mt-1 font-serif text-2xl font-semibold text-balance text-white sm:text-3xl">
              2027仙台冬旅計劃（可修訂）
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
