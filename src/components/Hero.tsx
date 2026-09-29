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
      className="hero-entrance relative isolate overflow-hidden pt-header"
      style={{ backgroundColor: "#1C1C1C" }}
    >
      {/* Serve the original 343KB WebP: this tall cover image can otherwise
          stretch a viewport-width mobile variant well beyond its resolution. */}
      <Image
        src="/images/hero-page-pielectricals.webp"
        alt=""
        fill
        preload
        unoptimized
        sizes="100vw"
        className="hero-entrance-image pointer-events-none -z-10 object-cover"
      />
      {/* Keep contrast behind the copy while letting the photo show on the right. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(10, 10, 10, 0.78) 0%, rgba(10, 10, 10, 0.68) 40%, rgba(10, 10, 10, 0.32) 70%, rgba(10, 10, 10, 0.16) 100%)"
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
              className="hero-entrance-heading font-display font-extrabold tracking-[-0.03em] leading-[0.95] max-w-[900px]"
              style={{
                textShadow: "0 2px 28px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.6)",
                fontSize: "clamp(34px, 4vw, 52px)",
                color: "#FFFFFF"
              }}
            >
              Providing all aspects
              <br className="hidden sm:block" /> of{" "}
              <span style={{ color: "#4bb874" }}>electrical work.</span>
            </h1>

            {/* Supporting Copy */}
            <p
              className="hero-entrance-copy max-w-[650px] text-[20px] leading-[1.55] sm:text-[17px]"
              style={{
                textShadow: "0 1px 14px rgba(0,0,0,0.85)",
                color: "#F4F4F1"
              }}
            >
              {HERO_INTRO}
            </p>

            {/* CTA Buttons */}
            <div className="hero-entrance-actions mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
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
