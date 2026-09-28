"use client";

import { useState } from "react";
import Image from "next/image";
import GalleryLightbox from "./GalleryLightbox";
import { cx } from "@/lib/cx";
import { track } from "@/lib/analytics";
import { PROJECTS, type Project } from "@/data/projects";

/**
 * ============================================================================
 * PROJECT GALLERY
 * ----------------------------------------------------------------------------
 * A grid of completed-work photographs. Clicking any tile opens the lightbox,
 * which steps through the whole set rather than just the one photograph that was
 * clicked - with one photograph per project, a lightbox scoped to a single item
 * would be a dialog containing one image, so the step set is the full list and
 * the tile only decides where it starts.
 *
 * NO FILTER
 * ---------
 * The domestic/commercial filter was removed at the client's request: the grid is
 * short enough to scan, and the category split is not something the site needs to
 * offer. `category` is still recorded on each project in data/projects.ts, so
 * filtering can come back without re-collecting any data.
 *
 * THE TILES CARRY NO CAPTION
 * ----------------------------
 * Every metadata field in data/projects.ts is currently unwritten, so the cards
 * render as bare photographs rather than inventing project names, areas and
 * descriptions. Two consequences worth knowing:
 *
 *  - A caption block is rendered per field, and only when that field has been
 *    filled in. See data/projects.ts for the TODO(content) note.
 *  - Because a card can end up with no visible text, each tile's accessible
 *    name comes from an explicit aria-label rather than from its contents.
 *    Without that, a screen reader would announce nine identical empty buttons.
 *
 * THE FRAME IS UNIFORM 4/3
 * -----------------------
 * Seven of the nine photographs are portrait, so a frame chosen per-orientation
 * leaves a visibly ragged grid. Every tile is 4/3 and object-cover does the
 * cropping. A tile whose subject gets cut wants an `objectPosition`, which is
 * the one thing nobody can set without looking at the photograph.
 *
 * TO ADD A PHOTOGRAPH: append an object to PROJECTS in src/data/projects.ts.
 * Nothing in this file needs to change.
 * ============================================================================
 */

export default function ProjectGallery() {
  /** Index into PROJECTS, or null when the lightbox is closed. */
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {PROJECTS.length === 0 ? (
        <p className="text-lg text-muted">No projects to show yet.</p>
      ) : (
        <ul
          role="list"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((project, index) => (
            <li key={project.id} className={project.size === "large" ? "lg:col-span-2" : ""}>
              <ProjectCard
                project={project}
                index={index}
                total={PROJECTS.length}
                onOpen={() => {
                  setOpenIndex(index);
                  track("project_viewed", {
                    location: "projects",
                    action: "lightbox_open",
                    service: project.category ?? undefined,
                  });
                }}
              />
            </li>
          ))}
        </ul>
      )}

      {openIndex === null ? null : (
        <GalleryLightbox
          items={PROJECTS}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  total,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  onOpen: () => void;
}) {
  const cover = project.photos[0];

  return (
    <button
      type="button"
      onClick={onOpen}
      /* The tile can have no visible text at all, so the accessible name is set
         explicitly rather than inherited from the contents. */
      aria-label={`View photograph ${index + 1} of ${total}, full size`}
      className={cx(
        "group relative block w-full overflow-hidden rounded-lg border border-line bg-white text-left",
      )}
    >
      <span className="relative block" style={{ aspectRatio: "4 / 3" }}>
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          quality={75}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </span>

      {/* Caption, field by field, only once written. */}
      {project.title.length > 0 || project.location !== null ? (
        <span className="block p-5">
          {project.title.length > 0 && (
            <span className="mt-2 block font-display text-lg font-extrabold tracking-[-0.02em] text-ink">
              {project.title}
            </span>
          )}
          {project.location !== null && (
            <span className="mt-1 block text-sm text-muted">
              {project.location}
            </span>
          )}
        </span>
      ) : null}

      {/* A quiet affordance, since a bare photograph is otherwise just a photo. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-sm leading-none text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        ⤢
      </span>
    </button>
  );
}
