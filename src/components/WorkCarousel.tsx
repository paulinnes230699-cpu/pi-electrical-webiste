"use client";

import { useId } from "react";
import Image from "next/image";
import { useAutoAdvance, ALL_WIDTHS } from "@/lib/auto-advance";
import { cx } from "@/lib/cx";
import SectionHeading from "./SectionHeading";
import { WORK_GALLERY } from "@/data/media";

export interface GalleryImage {
  src: string;
  /** Describes the visible photograph. */
  alt: string;
  /** Native ratio of the source file, recorded so the crop is not a surprise. */
  native: string;
  /** sizes attribute for the responsive srcset. */
  sizes: string;
  /** object-position, only where the default centre crop is known to be wrong. */
  position?: string;
  zoom?: number;
  rotation?: number;
}

interface WorkCarouselProps {
  images?: GalleryImage[];
  heading?: {
    eyebrow?: string;
    title?: string;
    intro?: string;
    className?: string;
  };
  /**
   * Render the heading above the strip. True by default, which is right for the
   * homepage carousel - it is the only thing on the page naming the strip.
   *
   * Set false when the carousel is embedded in a section that already has its
   * own heading in a sibling column, as the About section does. Without it the
   * same title renders twice on one page, and the duplicate is worse than
   * useless: the carousel's default copy also calls its photographs "a selection
   * of recent projects", which is wrong for the About photographs.
   */
  showHeading?: boolean;
  /**
   * Accessible name for the section, used only when `showHeading` is false.
   * Required in that case, because the section is then no longer named by a
   * visible heading and `aria-labelledby` would point at nothing.
   */
  label?: string;
  intervalMs?: number;
  showControls?: boolean;
  className?: string;
}

/**
 * ============================================================================
 * WORK CAROUSEL
 * ----------------------------------------------------------------------------
 * The photographs of completed work from WORK_GALLERY, directly below the hero,
 * advancing itself one slide at a time. The count comes from the data, so
 * adding a photograph needs no change here.
 *
 * ---------------------------------------------------------------------------
 * WHY IT ADVANCES ON DESKTOP TOO, WHEN QUICKACTIONS DOES NOT
 * ---------------------------------------------------------------------------
 * QuickActions stops at sm, because from sm up it is a multi-column grid with
 * every tile already visible - there is nothing to advance. This is a real
 * scroller at every width, showing one slide at a time, so it is passed
 * ALL_WIDTHS. A carousel that moves on a phone and sits frozen at 1280px, next
 * to a phone that is visibly cycling, reads as broken.
 *
 * ---------------------------------------------------------------------------
 * THE DOTS ARE REAL BUTTONS HERE, AND SO ARE THE ARROWS
 * ---------------------------------------------------------------------------
 * The QuickActions indicators are `aria-hidden` and deliberately inert, which
 * is right for decorative tiles that are all already reachable by scrolling.
 * These are not: with one slide per view, the dots and the arrows are the only
 * affordance for jumping straight to a later slide. So they are <button>s
 * carrying aria-current, and the dot list is a labelled group.
 *
 * The arrows wrap rather than disabling at the ends, so a visitor who reaches
 * slide 1 and presses back gets the last photograph instead of a control that
 * does nothing - which is also what the auto-advance loop itself does.
 *
 * ---------------------------------------------------------------------------
 * WHY THERE IS NO RUNWAY
 * ---------------------------------------------------------------------------
 * This strip once rendered two extra copies of the first photographs at the
 * tail, so that stepping forward off the last slide landed on a copy of slide 1
 * and the loop turned over in one ordinary stride instead of sweeping back
 * across all eight. The catch is that the copy is the same photograph: to the
 * visitor, slide 1 simply arrived twice in a row, on autoplay and on the arrow
 * alike. Ten image nodes for eight photographs, and no amount of aria-hidden
 * hides a duplicate to someone looking at the screen.
 *
 * So the copies are gone and the wrap is an un-animated cut instead, with a
 * longer dwell on the last slide so the jump reads as a new cycle. Every
 * photograph is now shown exactly once, and the DOM is one node per
 * photograph.
 * ---------------------------------------------------------------------------
 * Alt text is maintained alongside the image filenames in data/media.ts.
 * ============================================================================
 */

export default function WorkCarousel({
  images,
  heading,
  showHeading = true,
  label,
  intervalMs = 3500,
  showControls = true,
  className,
}: WorkCarouselProps = {}) {
  const imageList = images ?? WORK_GALLERY;
  const {
    eyebrow = "Recent work",
    title = "Electrical work across homes & businesses",
    intro = "A selection of recent projects completed across Edinburgh, the Lothians and Fife.",
    className: headingClassName = "mb-10",
  } = heading ?? {};

  /** At 3.5s a slide this takes about 28s round the seven current photographs -
      six steps plus the longer dwell on the last one - tighter than the 4s
      QuickActions uses for its five. */
  const INTERVAL_MS = intervalMs;

  /** Extra beat on the final photograph before the loop cuts back to the first,
      so the jump reads as a new cycle rather than the strip glitching. */
  const END_HOLD_MS = intervalMs;

  const headingId = `work-heading-${useId()}`;

  const { ref, index, goTo, next, prev, stop } = useAutoAdvance<HTMLUListElement>({
    count: imageList.length,
    interval: INTERVAL_MS,
    maxWidth: ALL_WIDTHS,
    /* No runway. Duplicating the first photographs at the tail makes the wrap a
       smooth one-stride step, but the copies are the same pictures, so the
       visitor watches slide 1 arrive twice in a row. Cutting instead shows every
       photograph exactly once. See lib/auto-advance.ts. */
    wrapToStart: true,
    endHoldMs: END_HOLD_MS,
  });

  return (
    <section
      /* The id is generated rather than hard-coded, so a second carousel on the
         same page cannot produce a duplicate "work-heading". Named by the
         visible heading when there is one, and by `label` when there is not -
         a dangling aria-labelledby names nothing and leaves the section
         unnamed in the accessibility tree. */
      {...(showHeading
        ? { "aria-labelledby": headingId }
        : { "aria-label": label ?? "Image carousel" })}
      className={cx("border-b border-line bg-warm", className)}
    >
      <div className="shell py-16 sm:py-24">
        {showHeading && (
          <SectionHeading
            id={headingId}
            eyebrow={eyebrow}
            title={title}
            intro={intro}
            className={headingClassName}
          />
        )}

        {/*
           The scroller. Same interaction contract as QuickActions: any pointer,
           touch, focus, wheel or key event means the visitor has taken over, so
           the loop stops permanently and never resumes. See lib/auto-advance.ts
           for why that is a stop rather than a pause.
         */}
        <ul
          ref={ref}
          data-work-carousel
          onPointerDown={stop}
          onTouchStart={stop}
          onFocus={stop}
          onWheel={stop}
          onKeyDown={stop}
          className={cx(
            "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto",
            "px-5 pb-2 sm:-mx-6 sm:px-6",
          )}
        >
          {imageList.map((image, i) => (
            <li
              key={image.src}
              data-work-slide
              data-active={i === index ? "true" : undefined}
              /* One slide per view on a phone, two on a tablet and up, with the
                 basis being w-4/5 against a px-5 gutter, so 92vw of frame inside
                 the shell. */
              className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[38vw]"
            >
              <div
                className={cx(
                  "relative overflow-hidden rounded-lg bg-surface",
                  "shadow-[0_2px_0_0_rgba(21,24,22,0.08)]",
                )}
                style={{ aspectRatio: "4 / 5" }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  /* object-cover does the cropping: work-01 is landscape and
                     the frame is portrait, so it loses most of its width. */
                  className="object-cover"
                  style={{
                    objectPosition: image.position,
                    // Scale enough to keep rotated corners outside the 4:5 frame.
                    transform: image.rotation
                      ? `rotate(${image.rotation}deg) scale(${Math.max(image.zoom ?? 1, Math.cos(Math.abs(image.rotation) * Math.PI / 180) + 1.25 * Math.sin(Math.abs(image.rotation) * Math.PI / 180))})`
                      : image.zoom ? `scale(${image.zoom})` : undefined,
                    transformOrigin: image.position,
                  }}
                  sizes={image.sizes}
                  /* Never priority. This sits below the fold on every
                     viewport, and a priority image here would compete with the
                     hero for the LCP slot. */
                  quality={75}
                />
              </div>
            </li>
          ))}
        </ul>

        {showControls && (
          <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              data-work-prev
              onClick={prev}
              aria-label="Previous photograph"
              className={cx(
                "grid h-11 w-11 shrink-0 place-items-center rounded-full",
                "border border-line bg-white text-lg leading-none text-ink",
                "transition-colors duration-200",
                "hover:border-black hover:bg-black hover:text-white",
                "active:bg-black active:text-white",
              )}
            >
              <span aria-hidden="true">←</span>
            </button>

            {/*
               Indicator buttons. Labelled as a group so the count is announced, and
               each carries an explicit target rather than a bare position, since
               the positions alone ("3") mean nothing out of context.
             */}
            <div
              role="group"
              aria-label={`Choose a photograph, ${imageList.length} in total`}
              data-work-dots
              className="flex items-center justify-center gap-2"
            >
              {imageList.map((image, dot) => (
                <button
                  key={image.src}
                  type="button"
                  data-work-dot
                  data-active={dot === index ? "true" : undefined}
                  aria-current={dot === index ? "true" : undefined}
                  aria-label={`Photograph ${dot + 1} of ${imageList.length}`}
                  onClick={() => goTo(dot)}
                  className={cx(
                    "rounded-full p-1 transition-all duration-300",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cx(
                      "block rounded-full transition-all duration-300",
                      dot === index
                        ? "h-1.5 w-5 bg-[#2a2a2a]"
                        : "h-1.5 w-1.5 bg-white/25",
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              data-work-next
              onClick={next}
              aria-label="Next photograph"
              className={cx(
                "grid h-11 w-11 shrink-0 place-items-center rounded-full",
                "border border-line bg-white text-lg leading-none text-ink",
                "transition-colors duration-200",
                "hover:border-black hover:bg-black hover:text-white",
                "active:bg-black active:text-white",
              )}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
