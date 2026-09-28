"use client";

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
          background and the copy are kept in separate stacking contexts. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/images/hero-page-pielectricals.webp')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.55) saturate(0.85)"
        }}
      ></div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(10, 10, 10, 0.85) 0%, rgba(10, 10, 10, 0.74) 40%, rgba(10, 10, 10, 0.6) 70%, rgba(10, 10, 10, 0.5) 100%)"
        }}
      ></div>
      <div className="relative max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:py-28 xl:py-32">
        <div className="max-w-[720px] pl-6">
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
                fontSize: "clamp(40px, 5vw, 68px)",
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
