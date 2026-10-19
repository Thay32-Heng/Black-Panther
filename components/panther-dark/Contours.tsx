import {
  CONTOUR_VIEWBOX,
  generateContours,
  type ContourOptions,
} from "./contourPaths";

/**
 * Contours — topographic SVG overlay.
 *
 * Purely decorative, so it is hidden from screen readers. The paths are
 * generated at render time and carry no state.
 *
 * NOTE: this component has no `"use client"` directive, but it is rendered
 * inside `HeroSection`, which is a client component — so the generator does
 * ship in the client bundle and re-runs on client render. That is cheap (21
 * closed loops) and keeps the hero to one bundle. If the hero ever becomes a
 * server component, this drops the code out of the client payload for free.
 */
export default function Contours({ options }: { options?: ContourOptions }) {
  // The SVG viewBox has to agree with the viewBox the generator scaled for,
  // otherwise paths land in the wrong coordinate space. The generated markup
  // must also be identical on server and client, so this must stay derived
  // from props rather than from the measured element.
  const viewBox = options?.viewBox ?? CONTOUR_VIEWBOX;
  const paths = generateContours(options);

  return (
    <svg
      className="rin-contours"
      viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
      // `slice`, not `meet`: the rings deliberately overflow the viewBox, and
      // `slice` expands to fill the element instead of letterboxing. Switching
      // this to `meet` crops the outer rings. See contourPaths.ts.
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d, i) => (
        <path d={d} key={i} />
      ))}
    </svg>
  );
}