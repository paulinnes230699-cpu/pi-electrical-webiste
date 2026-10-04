"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SPONSORSHIP_PHOTOS } from "@/data/sponsorships";

export default function SponsorshipCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (interacting || reducedMotion) return;
    const timer = window.setInterval(() => {
      const element = track.current;
      if (!element || document.hidden) return;
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
      const next = (Math.round(element.scrollLeft / element.clientWidth) + 1) % SPONSORSHIP_PHOTOS.length;
      element.scrollTo({ left: next * element.clientWidth, behavior: "smooth" });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [interacting, reducedMotion]);
  function move(index: number) {
    const element = track.current;
    if (!element) return;
    element.scrollTo({
      left: index * element.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <div className="mt-10 overflow-hidden rounded-lg border border-line bg-white" role="region" aria-roledescription="carousel" aria-label="Sponsored bowls teams">

      <div
        ref={track}
        id="sponsorship-photos"
        onTouchStart={() => setInteracting(true)}
        onTouchEnd={() => setInteracting(false)}
        onTouchCancel={() => setInteracting(false)}
        className="flex snap-x snap-mandatory overflow-x-auto"
        onScroll={() => {
          const element = track.current;
          if (element) setActive(Math.round(element.scrollLeft / element.clientWidth));
        }}
      >
        {SPONSORSHIP_PHOTOS.map((photo, index) => (
          <div key={photo.src} className="relative aspect-square max-h-[680px] w-full shrink-0 snap-center bg-[#171d19]" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${SPONSORSHIP_PHOTOS.length}`}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-contain p-3 sm:p-5" style={{ transform: `rotate(${photo.rotation}deg) scale(0.96)` }} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:px-6">
        <p className="text-sm text-muted">New season, new strips. Proudly sponsored by PI Electrical.</p>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => move(active - 1)} disabled={active === 0} aria-label="Previous team photo" aria-controls="sponsorship-photos" className="h-11 w-11 rounded-full border border-line text-ink hover:bg-warm disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-[#24663d]">←</button>
          <span className="text-sm text-ink" aria-live={reducedMotion ? "polite" : "off"} aria-atomic="true">{active + 1} / {SPONSORSHIP_PHOTOS.length}</span>
          <button type="button" onClick={() => move(active + 1)} disabled={active === SPONSORSHIP_PHOTOS.length - 1} aria-label="Next team photo" aria-controls="sponsorship-photos" className="h-11 w-11 rounded-full border border-line text-ink hover:bg-warm disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-[#24663d]">→</button>
        </div>
      </div>
    </div>
  );
}
