/**
 * ============================================================================
 * MEDIA SLOTS
 * ----------------------------------------------------------------------------
 * The single place image assets are configured.
 *
 * Paul will supply the real photography later. Until then every slot has
 * `src: null` and the <MediaSlot> component renders a labelled placeholder at
 * a locked aspect ratio - so there is no layout shift when a real image is
 * dropped in, and no fabricated alt text.
 *
 * There is no `hero` slot any more. The hero is text-only; the photography
 * lives in the work carousel below it. See WORK_GALLERY at the foot of this
 * file for the real project photographs.
 *
 * TO ATTACH A REAL IMAGE
 * ----------------------
 * 1. Put the file in /public/images (prefer a descriptive, space-free name).
 * 2. Set `src: "/images/your-file.jpg"`.
 * 3. Set `alt` to describe what is actually in the photo.
 * 4. Set `priority: true` ONLY on the single LCP image (the hero).
 *
 * Alt text guidance: describe the work shown, not the file. "Rewired consumer
 * unit with labelled circuits in a renovated kitchen" is useful. "Electrical
 * work" is not. Decorative images should use alt: "".
 * ============================================================================
 */

export interface MediaSlotConfig {
  /** What image belongs here. Rendered on the placeholder. */
  needs: string;
  src: string | null;
  alt: string;
  /** CSS aspect-ratio value, e.g. "4 / 5". Locks layout before an image lands. */
  ratio: string;
  /** Preload this image. Use on the hero only. */
  priority?: boolean;
  /** sizes attribute for the responsive srcset. */
  sizes?: string;
  /** Object position hint once a real image is attached. */
  position?: string;
}

export const MEDIA = {
  aboutPrimary: {
    needs: "Photograph of Paul, or Paul on site",
    src: null,
    alt: "",
    ratio: "3 / 4",
    sizes: "(min-width: 1024px) 46vw, 100vw",
  },
  aboutSecondary: {
    needs: "Supporting detail photograph",
    src: null,
    alt: "",
    ratio: "1 / 1",
    sizes: "(min-width: 1024px) 22vw, 40vw",
  },
  domesticBreak: {
    needs: "Large photograph - extension or renovation electrical work",
    src: "/images/electrical-lighting-project-collage.webp",
    alt: "Collage of garden room electrics, sockets, kitchen lighting and ceiling lights",
    ratio: "16 / 10",
    sizes: "100vw",
  },
  membership: {
    needs: "Optional membership photograph",
    src: null,
    alt: "",
    ratio: "3 / 2",
    sizes: "(min-width: 1024px) 40vw, 100vw",
  },
  emergency: {
    needs: "Optional emergency / fault-finding photograph",
    src: null,
    alt: "",
    ratio: "16 / 9",
    sizes: "100vw",
  },
} as const satisfies Record<string, MediaSlotConfig>;

export type MediaKey = keyof typeof MEDIA;

/** Carousel photographs retain their original files and visual adjustments.
 * Alt text describes visible content without guessing job locations.
 */

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

/**
 * Order matters: slide 1 is what a visitor sees on arrival, before the loop
 * takes over, and it is the frame that gets scrolled past first. work-08 leads
 * because it reads as the strongest single piece of work; the stair-lights
 * photograph is a close second and follows it.
 *
 * The order is a pure rotation - move the last entry to the front and the rest
 * shift up - so reordering is a cut and paste here, with no other change.
 */
export const WORK_GALLERY: GalleryImage[] = [
  {
    src: "/images/garden-step-led-lighting-night.webp",
    rotation: -2,
    alt: "Garden steps and stone walls illuminated by LED strip lighting at night",
    native: "1212 / 1076",
    sizes: "(min-width: 1024px) 44vw, 92vw",
  },
  {
    src: "/images/work-stair-lights.png",
    rotation: -6,
    alt: "Outdoor LED strip lighting installed on stone walls and steps at a residential property in Edinburgh",
    native: "1422 / 1622",
    sizes: "(min-width: 1024px) 44vw, 92vw",
  },
  {
    src: "/images/kitchen-glass-pendant-lighting.webp",
    rotation: 1,
    alt: "Glass pendant lights above a kitchen island with recessed ceiling lights",
    native: "1846 / 1384",
    sizes: "(min-width: 1024px) 44vw, 92vw",
  },
  {
    src: "/images/kitchen-island-plinth-lighting.webp",
    rotation: -1,
    alt: "Dark kitchen cabinets with pendant lights, under-cabinet lighting and illuminated plinths",
    native: "1754 / 1376",
    sizes: "(min-width: 1024px) 44vw, 92vw",
  },
  {
    src: "/images/vaulted-living-room-downlights.webp",
    rotation: 8,
    alt: "Recessed downlights in a vaulted living room ceiling with roof windows",
    native: "1046 / 1270",
    sizes: "(min-width: 1024px) 44vw, 92vw",
  },
  {
    src: "/images/dining-room-pendant-downlights.webp",
    rotation: -7,
    alt: "Dining room with three pendant lights and recessed ceiling downlights",
    native: "1032 / 1166",
    sizes: "(min-width: 1024px) 44vw, 92vw",
  },
  {
    src: "/images/house-exterior-lighting-night.webp",
    alt: "Exterior lights illuminating a two-storey stone house at night",
    native: "1034 / 1148",
    sizes: "(min-width: 1024px) 44vw, 92vw",
  },
];

export const ABOUT_GALLERY: GalleryImage[] = [
  {
    src: "/images/about-pi-electrical-van.png",
    alt: "PI Electrical van parked outside a large stone building",
    native: "1408 / 1542",
    sizes: "(min-width: 1024px) 33vw, 100vw",
    // Keep the van at the left edge intact in the portrait carousel frame.
    position: "left 12%",
    zoom: 1.4,
  },
  {
    src: "/images/kitchen-pendant-lights-breakfast-bar.webp",
    rotation: -0.5,
    alt: "Three glass pendant lights above a kitchen breakfast bar",
    native: "2484 / 1868",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
  {
    src: "/images/about-kitchen-lighting.png",
    rotation: -6,
    alt: "Kitchen with recessed ceiling lights, under-cabinet lighting and illuminated plinths",
    native: "1412 / 1792",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
  {
    src: "/images/green-kitchen-ceiling-downlights.webp",
    rotation: -2,
    alt: "Recessed ceiling downlights above green kitchen cabinets",
    native: "1422 / 1322",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
  {
    src: "/images/bathroom-recessed-ceiling-lights.webp",
    rotation: 7,
    alt: "White tiled bathroom with recessed ceiling lights and a corner bath",
    native: "1424 / 1686",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
  {
    src: "/images/rear-house-exterior-downlights.webp",
    alt: "Exterior downlights illuminating the rear of a house at night",
    native: "1416 / 1638",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
];
