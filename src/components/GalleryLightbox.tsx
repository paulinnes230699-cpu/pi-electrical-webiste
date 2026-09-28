"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cx } from "@/lib/cx";
import { useHydrated } from "@/lib/use-hydrated";
import { track } from "@/lib/analytics";
import {
  bindOverlayKeys,
  captureFocus,
  focusFirstInPanel,
  inertBackground,
  lockPageScroll,
} from "@/lib/overlay";
import type { Project } from "@/data/projects";

/**
 * ============================================================================
 * GALLERY LIGHTBOX
 * ----------------------------------------------------------------------------
 * Full-bleed viewer for the completed-work photographs. One photograph at a
 * time, with arrows, a counter, keyboard navigation and swipe.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS IS NOT Modal
 * ---------------------------------------------------------------------------
 * Modal hard-codes `bg-warm p-5` on its panel and appends `panelClassName`
 * through `cx`, so overriding that background to near-black means depending on
 * which of two competing Tailwind utilities happens to be emitted later in the
 * stylesheet. That is a coin flip with a redesign. This portals directly and
 * reuses the same primitives Modal does - captureFocus, lockPageScroll,
 * inertBackground, bindOverlayKeys - so the focus trap, focus restoration,
 * inert background and iOS-safe scroll lock are all identical behaviour, just
 * on a surface this component owns.
 *
 * ---------------------------------------------------------------------------
 * THE ARROWS WRAP
 * ---------------------------------------------------------------------------
 * Stepping forward off the last photograph lands on the first, and back off the
 * first lands on the last. Neither arrow is ever disabled. This is the same
 * choice WorkCarousel makes, for the same reason: an arrow that is present and
 * does nothing is worse than no arrow at all. See lib/auto-advance.ts.
 *
 * ---------------------------------------------------------------------------
 * THE COUNTER IS THE LIVE REGION
 * ---------------------------------------------------------------------------
 * Each step is announced through `aria-live="polite"` on the counter. Without
 * it, arrowing through nine photographs is silent for a screen-reader user -
 * the focus never moves, because the only focusable things in here are the
 * close button and the two arrows.
 *
 * ---------------------------------------------------------------------------
 * SWIPE
 * ---------------------------------------------------------------------------
 * Pointer events rather than touch events, so a stylus and a mouse drag take
 * the same path as a finger. `touch-action: pan-y` on the frame means the
 * horizontal gesture is ours while vertical panning still belongs to the
 * caption below, which is a scrollable column on a phone. A gesture is only
 * treated as a swipe when the horizontal movement both clears the threshold and
 * beats the vertical, so a diagonal scroll never flips the photograph.
 * ============================================================================
 */

interface GalleryLightboxProps {
  /** The photographs on show. Normally the current filter's results. */
  items: Project[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export default function GalleryLightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: GalleryLightboxProps) {
  const hydrated = useHydrated();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const count = items.length;
  const project = items[index];
  const photo = project?.photos[0];

  const step = useCallback(
    (delta: 1 | -1) => {
      if (count < 2) return;
      onIndexChange((index + delta + count) % count);
    },
    [count, index, onIndexChange],
  );

  /* Focus trap, scroll lock, inert background, Escape - all from the shared
     overlay module, plus the left/right arrows, which nothing else claims. */
  useEffect(() => {
    if (!hydrated) return;

    const restoreFocus = captureFocus();
    const unlockScroll = lockPageScroll();
    const uninert = inertBackground(panelRef.current);
    const unbindKeys = bindOverlayKeys(panelRef.current, onClose);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    document.addEventListener("keydown", onKeyDown);

    /* Deferred, so focus lands after the dialog has been painted. */
    const focusFirst = window.setTimeout(() => {
      focusFirstInPanel(panelRef.current);
    }, 20);

    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKeyDown);
      unbindKeys();
      uninert();
      unlockScroll();
      restoreFocus();
    };
  }, [hydrated, onClose, step]);

  /* Report which photograph is being looked at. The open itself is tracked by
     the card that triggered it; this covers the steps taken from inside. */
  useEffect(() => {
    if (!project) return;
    track("project_viewed", {
      location: "projects",
      action: "lightbox_step",
      service: project.category ?? undefined,
    });
  }, [project]);

  const onPointerDown = (event: PointerEvent) => {
    dragRef.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent) => {
    const start = dragRef.current;
    dragRef.current = null;
    if (!start) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const SWIPE_PX = 40;

    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) <= Math.abs(dy)) return;

    step(dx < 0 ? 1 : -1);
  };

  if (!hydrated || !project || !photo) return null;

  const titleId = `lightbox-title-${project.id}`;
  const hasTitle = project.title.length > 0;
  const showControls = count > 1;

  const dialog = (
    <div className="fixed inset-0 z-[80] flex bg-[#0b0d0c] motion-safe:animate-[pi-fade_0.2s_ease-out]">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        {...(hasTitle
          ? { "aria-labelledby": titleId }
          : { "aria-label": `Photograph ${index + 1} of ${count}` })}
        tabIndex={-1}
        className="relative flex max-h-[100dvh] w-full flex-col overflow-y-auto overscroll-contain"
      >
        <div className="flex justify-end p-3 sm:p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full text-2xl leading-none text-warm hover:bg-white/10"
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close photograph</span>
          </button>
        </div>

        {/*
           ONE live region wraps the photograph and the counter, so a step is
           announced once with both the new position and the new description.
           A live region on the counter alone would announce "5 / 9" while
           silently swapping a different photograph underneath, and focus never
           moves - the only focusable things in here are the close button and
           the two arrows - so a screen-reader user would otherwise be stepping
           blind.
        */}
        <div aria-live="polite">
          {/*
             The frame. Fixed height rather than flex-grow, so the photograph
             lands in the same place every time and the caption below does not
             shift as the visitor steps through. `pan-y` keeps vertical panning
             with the caption; the horizontal gesture is the swipe.
          */}
          <div
            data-lightbox-frame
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            className="relative mx-auto w-full shrink-0 px-3 sm:px-8"
            style={{ height: "min(62dvh, 74vw)", touchAction: "pan-y" }}
          >
            {project.beforeAfter && project.photos.length === 2 ? (
              <BeforeAfter
                before={project.photos[0]}
                after={project.photos[1]}
                projectTitle={project.title}
              />
            ) : (
              <Image
                /* Keying on the src makes React mount a fresh <img> per step
                   rather than mutating the existing one. Assistive tech reliably
                   announces a node ADDED to a live region and unreliably announces
                   a changed alt attribute on a node that was already there, so
                   this is what makes the new photograph's description audible. */
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                fill
                /* object-contain, not object-cover: a lightbox that crops the
                   photograph has failed at the one job it exists for. */
                className="object-contain"
                sizes="100vw"
                quality={80}
                /* An <img> is natively draggable, and starting a drag cancels the
                   pointer sequence - which silently kills the swipe gesture. */
                draggable={false}
              />
            )}
          </div>

          {showControls && (
            <div className="flex items-center justify-center gap-3 px-4 py-4 sm:gap-4">
              <ArrowButton direction="prev" onClick={() => step(-1)} />

              <p
                data-lightbox-counter
                className="min-w-[6ch] text-center text-sm tabular-nums text-muted-dark"
              >
                {index + 1} / {count}
              </p>

              <ArrowButton direction="next" onClick={() => step(1)} />
            </div>
          )}
        </div>

        {/*
           Metadata. Every field is rendered only when it has been written -
           see the TODO(content) note in data/projects.ts. With the words
           unwritten the caption collapses to nothing rather than printing
           placeholders at the customer.
        */}
        {(hasTitle ||
          project.category ||
          project.location ||
          project.description ||
          project.workCompleted.length > 0) && (
          <div className="mx-auto w-full max-w-[62ch] px-5 pb-10 text-center sm:px-8">
            {project.category && (
              <p className="eyebrow text-muted-dark">{project.category}</p>
            )}

            {hasTitle && (
              <h2 id={titleId} className="mt-3 text-display-sm text-warm">
                {project.title}
              </h2>
            )}

            {project.location && (
              <p className="mt-2 text-sm text-muted-dark">{project.location}</p>
            )}

            {project.description && (
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-warm/80">
                {project.description}
              </p>
            )}

            {project.workCompleted.length > 0 && (
              <ul className="mt-5 flex flex-col items-start gap-2 text-left">
                {project.workCompleted.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted-dark"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-dark"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous photograph" : "Next photograph"}
      className={cx(
        "grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg leading-none",
        "border border-white/25 text-warm",
        "transition-colors duration-200",
        "hover:border-white hover:bg-white hover:text-[#0b0d0c]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
      )}
    >
      <span aria-hidden="true">{isPrev ? "←" : "→"}</span>
    </button>
  );
}

/**
 * Before / after comparison.
 *
 * The control is a real <input type="range">, not a draggable div: it is
 * keyboard operable, announces its value to screen readers, and works with
 * assistive touch. The visible divider follows the input.
 *
 * Dormant for now - it needs a project with exactly two photos and
 * `beforeAfter: true`, and none of the nine has been supplied as a pair.
 */
function BeforeAfter({
  before,
  after,
  projectTitle,
}: {
  before: Project["photos"][number];
  after: Project["photos"][number];
  projectTitle: string;
}) {
  const [position, setPosition] = useState(50);
  const id = `ba-${before.src.replace(/\W+/g, "-")}`;

  return (
    <div>
      <div
        className="relative h-full w-full overflow-hidden rounded-[2px] bg-white/5"
        style={{ aspectRatio: "16 / 10" }}
      >
        {/* After (base layer) */}
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="100vw"
          quality={80}
          className="object-contain"
        />

        {/* Before (clipped from the left) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes="100vw"
            quality={80}
            className="object-contain"
          />
        </div>

        <span
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />

        <span className="pointer-events-none absolute left-3 top-3 rounded-[2px] bg-black/75 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-[2px] bg-black/75 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white">
          After
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        Compare before and after{projectTitle ? ` for ${projectTitle}` : ""}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="mt-3 w-full accent-white"
        aria-valuetext={`${position}% before shown`}
      />
    </div>
  );
}
