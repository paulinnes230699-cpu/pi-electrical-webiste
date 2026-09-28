/**
 * ============================================================================
 * PROJECTS
 * ----------------------------------------------------------------------------
 * Nine completed-work photographs, one per entry. The gallery, the
 * Domestic/Commercial filter and the lightbox all read from here, so adding a
 * tenth photograph is a one-object change and needs no component edits.
 *
 * ---------------------------------------------------------------------------
 * THE CONTENT FIELDS ARE BLANK ON PURPOSE - TODO(content)
 * ---------------------------------------------------------------------------
 * `title`, `category`, `location`, `description`, `workCompleted` and every
 * photo's `alt` are all empty. They are empty because the photographs were
 * supplied as image files and nobody who can see them has written the words
 * yet. A card captioned with a guessed project name, a guessed area and a
 * guessed list of work would be fabricated evidence of work this electrician may
 * not have done - which is the single worst thing this site could ship.
 *
 * So the components omit any field that is empty rather than printing a
 * placeholder, and the tiles render as bare photographs. That reads as a
 * slightly plain gallery rather than a dishonest one, which is the right way
 * round.
 *
 * `grep -rn "TODO(content)" src/` lists every gap.
 *
 * WHAT EACH FIELD NEEDS
 *   title          Short name for the job, e.g. "Full rewire, 3-bed house".
 *   category       "domestic" or "commercial". Drives the filter chips.
 *   location       Town or area, or null to omit the line entirely.
 *   description    Two or three sentences of what the job involved.
 *   workCompleted  Short imperative bullets of what was actually done.
 *   photos[].alt   What is in the frame. "Rewired consumer unit with labelled
 *                  circuits in a renovated kitchen", not "Electrical work".
 *
 * category is nullable so a photograph nobody has classified yet still appears
 * under "All" instead of being mislabelled. Until the categories are filled in,
 * the Domestic and Commercial chips show their empty state.
 *
 * ---------------------------------------------------------------------------
 * ORIENTATION IS RECORDED, NOT RENDERED
 * ---------------------------------------------------------------------------
 * `orientation` is the native shape of the file, kept for two reasons: the card
 * picks an object-position, and it is what a before/after pair will need to be
 * checked against. The card frame itself is a uniform 4/3 for all nine, because
 * seven of them are portrait and letting each card pick its own ratio leaves a
 * ragged grid.
 *
 * ---------------------------------------------------------------------------
 * gallery-07 NEEDS A HUMAN EYE
 * ---------------------------------------------------------------------------
 * Its channel means are 91/119/141 against roughly 126/124/118 for the rest -
 * a pronounced blue cast that usually means a photograph of a screen rather
 * than a photograph. It is in the grid because it was supplied as completed
 * work; it should be confirmed or removed before this ships to customers.
 * ============================================================================
 */

export type ProjectCategory = "domestic" | "commercial";

export interface ProjectPhoto {
  src: string;
  /**
   * See the alt-text warning above. This is not display copy - it is only ever
   * read aloud or surfaced by a broken-image state, so a visitor will not see
   * the TODO marker. It is still not optional: an empty alt on a photograph of
   * a job is a hole in the page.
   */
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
        src: "/images/gallery/gallery-01.webp",
        alt: "TODO(content): landscape photograph - describe the work",
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
        src: "/images/gallery/gallery-02.webp",
        alt: "TODO(content): describe the work shown",
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
        src: "/images/gallery/gallery-03.webp",
        alt: "TODO(content): describe the work shown",
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
        src: "/images/gallery/gallery-04.webp",
        alt: "TODO(content): describe the work shown",
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
        src: "/images/gallery/gallery-05.webp",
        alt: "TODO(content): describe the work shown",
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
        src: "/images/gallery/gallery-06.webp",
        alt: "TODO(content): describe the work shown",
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
        /* See the blue-cast warning at the head of this file. */
        src: "/images/gallery/gallery-07.webp",
        alt: "TODO(content): describe the work shown",
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
        src: "/images/gallery/gallery-08.webp",
        alt: "TODO(content): describe the work shown",
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
        src: "/images/gallery/gallery-09.webp",
        alt: "TODO(content): describe the work shown",
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
