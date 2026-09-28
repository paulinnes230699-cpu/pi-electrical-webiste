"use client";

import Image from "next/image";
import { BUSINESS, HERO_INTRO } from "@/data/business";
import Button from "./Button";

/**
 * Hero.
 *
 * Premium dark theme hero with 3-value row beneath CTAs.
 * Refined editorial layout with clean spacing.
 */
export default function Hero() {
  const quoteHref = "#quote";

  return (
    <section
      aria-labelledby="hero-heading"
      data-first-section
      className="relative isolate overflow-hidden pt-header"
      style={{ backgroundColor: "#1C1C1C" }}
    >
      {/* The photo is dimmed on its own layer. A filter on the section itself
          would darken every descendant too, including the text, so the
          background and the copy are kept in separate stacking contexts.

          Served through next/image rather than a CSS background-image: the
          background-image version bypassed the optimiser entirely, so every
          device downloaded the full 1672x941 file (343KB) with no srcset, no
          preload and no format negotiation. `fill` + `object-cover` reproduces
          `background-size: cover`, and `object-position` already defaults to
          center, so the framing is unchanged. `priority` makes this the preloaded
          LCP element. The gradient below follows in DOM order and still
          overlays the photo. */}
      <Image
        src="/images/hero-page-pielectricals.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover"
        style={{ filter: "brightness(0.7) saturate(0.9)" }}
      />
      {/* Scrim, not a second dimmer. Raised only as far as the copy allows: the
          h1 sits over the darkest end of this ramp, so easing it is what
          actually lets the photograph through. The alpha stays high enough at
          0% to keep white-on-dark text well past AA. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(10, 10, 10, 0.74) 0%, rgba(10, 10, 10, 0.62) 40%, rgba(10, 10, 10, 0.48) 70%, rgba(10, 10, 10, 0.38) 100%)"
        }}
      ></div>
      {/* `shell` is the same container the header wordmark sits in, so the
          heading lines up with the header at every width. The previous bespoke
          max-w-[1400px] wrapper had no mx-auto, so above 1400px the copy
          drifted left of the header by the difference.
          `-ml-1` repeats the optical nudge BrandLink applies to the round
          mark, putting the text on the same rail as the visible logo rather
          than the link's padding box. */}
      <div className="shell relative py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32">
        <div className="max-w-[720px] -ml-1">
          <div className="flex flex-col gap-8">
            {/* Eyebrow */}
            <p
              className="font-sans text-[14px] font-semibold uppercase tracking-[0.14em]"
              style={{
                color: "#FFFFFF",
                textShadow: "0 1px 10px rgba(0,0,0,0.9)",
                paddingLeft: "8px",
                borderLeft: "2px solid rgba(255,255,255,0.6)"
              }}
            >
              DOMESTIC / COMMERCIAL / EMERGENCY
            </p>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] max-w-[900px]"
              style={{
                textShadow: "0 2px 28px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.6)",
                fontSize: "clamp(34px, 4vw, 52px)",
                color: "#FFFFFF"
              }}
            >
              Providing all aspects
              <br className="hidden sm:block" /> of electrical work.
            </h1>

            {/* Supporting Copy */}
            <p
              className="max-w-[650px] text-[20px] leading-[1.55] sm:text-[17px]"
              style={{
                textShadow: "0 1px 14px rgba(0,0,0,0.85)",
                color: "#F4F4F1"
              }}
            >
              {HERO_INTRO}
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                href={quoteHref}
                size="lg"
                analyticsEvent="quote_cta_clicked"
                analyticsLocation="hero"
                analyticsAction="hero_primary"
                className="hero-cta-primary font-semibold px-6 py-4 rounded-[6px] transition-all duration-300 ease-in-out"
              >
                Get a free quote →
              </Button>
              <Button
                href={BUSINESS.phone.href}
                size="lg"
                variant="outline"
                analyticsEvent="phone_clicked"
                analyticsLocation="hero"
                analyticsAction="hero_call"
                className="hero-cta-secondary font-semibold px-6 py-4 rounded-[6px] transition-all duration-300 ease-in-out"
              >
                Call {BUSINESS.phone.display}
              </Button>
            </div>

            {/* Divider */}
            <div
              className="mt-12 h-px w-full"
              style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
            />

            {/* 3-Value Row */}
            <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
              {/* Column 1: NEAT WORKMANSHIP */}
              <div className="flex flex-col gap-3">
                <h3
                  className="font-sans text-[14px] font-bold uppercase tracking-[0.14em]"
                  style={{ textShadow: "0 2px 14px rgba(0,0,0,0.9)", color: "#FFFFFF" }}
                >
                  NEAT WORKMANSHIP
                </h3>
                <p
                  className="font-sans text-[16px] leading-[1.6]"
                  style={{ textShadow: "0 1px 12px rgba(0,0,0,0.85)", color: "#F0F0ED" }}
                >
                  A finish we&apos;re proud to put our name to.
                </p>
              </div>

              {/* Column 2: CLEAR COMMUNICATION */}
              <div className="flex flex-col gap-3">
                <h3
                  className="font-sans text-[14px] font-bold uppercase tracking-[0.14em]"
                  style={{ textShadow: "0 2px 14px rgba(0,0,0,0.9)", color: "#FFFFFF" }}
                >
                  CLEAR COMMUNICATION
                </h3>
                <p
                  className="font-sans text-[16px] leading-[1.6]"
                  style={{ textShadow: "0 1px 12px rgba(0,0,0,0.85)", color: "#F0F0ED" }}
                >
                  From first message to final finish.
                </p>
              </div>

              {/* Column 3: PROFESSIONAL SERVICE */}
              <div className="flex flex-col gap-3">
                <h3
                  className="font-sans text-[14px] font-bold uppercase tracking-[0.14em]"
                  style={{ textShadow: "0 2px 14px rgba(0,0,0,0.9)", color: "#FFFFFF" }}
                >
                  PROFESSIONAL SERVICE
                </h3>
                <p
                  className="font-sans text-[16px] leading-[1.6]"
                  style={{ textShadow: "0 1px 12px rgba(0,0,0,0.85)", color: "#F0F0ED" }}
                >
                  Punctual, tidy and easy to deal with.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
