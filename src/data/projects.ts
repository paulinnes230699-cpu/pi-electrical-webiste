/** Project photography uses descriptive filenames and visually verified alt text.
 * Job details remain blank until confirmed by the business; do not infer locations
 * or the scope of completed work solely from photographs.
 */

export type ProjectCategory = "domestic" | "commercial";

export interface ProjectPhoto {
  src: string;
  /** Describes the visible photograph. */
  alt: string;
  /** Native shape of the source file. See the note above. */
  orientation: "portrait" | "landscape" | "square";
}

export interface Project {
  /** Stable id. Never key on image path or title. */
  id: string;
  /** Empty string until written - see TODO(content) above. */
  title: string;
  /** Null means unclassified: shown under "All", hidden from the chips. */
  category: ProjectCategory | null;
  /** City or area. Null omits the line rather than printing a placeholder. */
  location: string | null;
  /** Empty string until written. */
  description: string;
  /** Empty array until written. */
  workCompleted: string[];
  photos: ProjectPhoto[];
  /**
   * When true the lightbox renders a before/after comparison using photos[0] as
   * "before" and photos[1] as "after". Requires exactly two photos, so it stays
   * dormant until a genuine pair is supplied.
   */
  beforeAfter: boolean;
  /** Marks a visually larger cell in the grid. Uniform "small" for this set. */
  size: "large" | "small";
}

export const PROJECTS: Project[] = [
  {
    id: "p-01",
    title: "",
    category: null,
    location: null,
    description: "",
    workCompleted: [],
    photos: [
      {
        src: "/images/gallery/dark-kitchen-led-lighting.webp",
        alt: "Dark kitchen with pendant lights, under-cabinet lighting and illuminated plinths",
        orientation: "landscape",
      },
    ],
    beforeAfter: false,
    size: "small",
  },
  {
    id: "p-02",
    title: "",
    category: null,
    location: null,
    description: "",
    workCompleted: [],
    photos: [
      {
        src: "/images/gallery/kitchen-renovation-downlights.webp",
        alt: "Kitchen renovation with illuminated ceiling downlights and a roof window",
        orientation: "portrait",
      },
    ],
    beforeAfter: false,
    size: "small",
  },
  {
    id: "p-03",
    title: "",
    category: null,
    location: null,
    description: "",
    workCompleted: [],
    photos: [
      {
        src: "/images/gallery/white-kitchen-recessed-lighting.webp",
        alt: "White kitchen with wood-effect wall cabinets and recessed ceiling lights",
        orientation: "square",
      },
    ],
    beforeAfter: false,
    size: "small",
  },
  {
    id: "p-04",
    title: "",
    category: null,
    location: null,
    description: "",
    workCompleted: [],
    photos: [
      {
        src: "/images/gallery/shower-room-ceiling-downlights.webp",
        alt: "Shower room with recessed ceiling lights, a round mirror and a vanity unit",
        orientation: "portrait",
      },
    ],
    beforeAfter: false,
    size: "small",
  },
  {
    id: "p-05",
    title: "",
    category: null,
    location: null,
    description: "",
    workCompleted: [],
    photos: [
      {
        src: "/images/gallery/timber-garden-room-wall-lights.webp",
        alt: "Timber-clad garden room with exterior wall lights and open folding doors",
        orientation: "portrait",
      },
    ],
    beforeAfter: false,
    size: "small",
  },
  {
    id: "p-06",
    title: "",
    category: null,
    location: null,
    description: "",
    workCompleted: [],
    photos: [
      {
        src: "/images/gallery/garden-room-track-lighting.webp",
        alt: "Garden room interior with ceiling track lights and surface-mounted conduit",
        orientation: "portrait",
      },
    ],
    beforeAfter: false,
    size: "small",
  },
  {
    id: "p-07",
    title: "",
    category: null,
    location: null,
    description: "",
    workCompleted: [],
    photos: [
      {
        src: "/images/gallery/garage-exterior-downlights.webp",
        alt: "Detached garage illuminated by exterior downlights at dusk",
        orientation: "landscape",
      },
    ],
    beforeAfter: false,
    size: "small",
  },
  {
    id: "p-08",
    title: "",
    category: null,
    location: null,
    description: "",
    workCompleted: [],
    photos: [
      {
        src: "/images/gallery/commercial-washroom-downlights.webp",
        alt: "Washroom with ceiling downlights above basins, urinals and toilet cubicles",
        orientation: "portrait",
      },
    ],
    beforeAfter: false,
    size: "small",
  },
  {
    id: "p-09",
    title: "",
    category: null,
    location: null,
    description: "",
    workCompleted: [],
    photos: [
      {
        src: "/images/gallery/stockroom-ceiling-batten-lights.webp",
        alt: "Stockroom with ceiling-mounted batten lights above shelving and storage cages",
        orientation: "portrait",
      },
    ],
    beforeAfter: false,
    size: "small",
  },
];

/** Categories for the gallery filter. Only the confirmed domestic/commercial split. */
export const PROJECT_FILTERS = [
  { id: "all", label: "All" },
  { id: "domestic", label: "Domestic" },
  { id: "commercial", label: "Commercial" },
] as const satisfies ReadonlyArray<{ id: string; label: string }>;

export type ProjectFilterId = (typeof PROJECT_FILTERS)[number]["id"];
