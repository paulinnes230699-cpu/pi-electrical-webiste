import { cx } from "@/lib/cx";

/**
 * Star rating.
 *
 * The visible stars are decorative; the whole group is exposed once to
 * assistive tech as a single image with a full label. This avoids announcing
 * five separate "star" graphics for every review.
 *
 * Both surface tokens use the same yellow for consistent ratings site-wide.
 */
export default function Stars({
  rating,
  tone = "light",
  className,
}: {
  rating: number;
  /** Which surface the stars sit on. Light = white/warm cards, dark = black. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const label = `Rated ${rating} out of 5`;

  return (
    <span role="img" aria-label={label} className={className}>
      <span
        aria-hidden="true"
        className={cx(
          "inline-flex gap-0.5",
          tone === "dark" ? "text-star-dark" : "text-star",
        )}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5 fill-current"
            focusable="false"
          >
            <path d="M10 1.6l2.47 5.32 5.83.66-4.32 3.97 1.15 5.76L10 14.44l-5.13 2.87 1.15-5.76L1.7 7.58l5.83-.66L10 1.6z" />
          </svg>
        ))}
      </span>
    </span>
  );
}
