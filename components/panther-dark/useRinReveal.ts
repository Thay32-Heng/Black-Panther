"use client";

import { useEffect } from "react";

/**
 * useRinReveal — fades `[data-rin-reveal]` elements in as they scroll into view.
 *
 * Pairs with the `.rin-reveal-ready [data-rin-reveal]` rules in
 * `rin-tokens.css`. The hook only adds/removes classes and sets the stagger
 * index; all the motion lives in CSS so it can be switched off wholesale by
 * `prefers-reduced-motion`.
 *
 * Design notes:
 * - Elements are revealed once and then unobserved, so scrolling back up does
 *   not replay the animation.
 * - `threshold: 0` with a small negative bottom `rootMargin` is deliberate. A
 *   non-zero threshold can never be satisfied by an element shorter than
 *   `threshold x viewport`, so a short element near the end of the document
 *   (the footer is ~72px) would stay at `opacity: 0` forever.
 * - This hook owns ONE container. Pass your own `ref` as `root`. Defaulting to
 *   `document.body` makes two consumers fight over the same class: the first
 *   to unmount would strip `rin-reveal-ready` out from under the other.
 */
export function useRinReveal(root?: Element | null) {
  useEffect(() => {
    // Fall back to the document when no container is supplied, so the default
    // is still a complete page rather than an empty query.
    const scope: ParentNode = root ?? document;
    const container: Element = root ?? document.body;

    const nodes = Array.from(
      scope.querySelectorAll<HTMLElement>("[data-rin-reveal]"),
    );

    const cleanup = () => {
      container.classList.remove("rin-reveal-ready");
      nodes.forEach((node) => node.classList.remove("rin-is-visible"));
    };

    if (nodes.length === 0) return;

    // Stagger index. The CSS clamps this to --rin-stagger-max, so a long list
    // cannot cascade indefinitely.
    nodes.forEach((node, i) => {
      node.style.setProperty("--rin-i", String(i));
    });

    // Respect the OS-level motion preference up front. The CSS also guards
    // this, but doing it here means we never apply the hidden starting state,
    // so there is no flash of invisible content for a visitor who asked for
    // less motion.
    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If IntersectionObserver is missing (old browsers, some test
    // environments) or motion is unwanted, show everything rather than
    // leaving it invisible. Still returns cleanup, so the class does not leak
    // onto a shared container after unmount.
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      container.classList.add("rin-reveal-ready");
      nodes.forEach((node) => node.classList.add("rin-is-visible"));
      return cleanup;
    }

    container.classList.add("rin-reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("rin-is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        root: root ?? null,
        // Delay the trigger until the element is genuinely near the fold.
        rootMargin: "0px 0px -10% 0px",
        threshold: 0,
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      cleanup();
    };
  }, [root]);
}

export default useRinReveal;