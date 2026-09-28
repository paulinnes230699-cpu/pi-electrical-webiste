"use client";

import { useSyncExternalStore } from "react";

/**
 * "Have we hydrated yet?", without a setState-in-effect.
 *
 * Portals can only be created in the browser, so a component that renders one
 * must not render it on the server or hydration mismatches. useSyncExternalStore
 * with an empty subscribe and a server snapshot of `false` is the supported way
 * to express exactly that, and unlike a mount effect it does not schedule a
 * second render.
 *
 * Extracted from Modal.tsx, which is where it lived first, so the gallery
 * lightbox - which also portals and also must not render on the server - uses
 * the same answer rather than a second copy of the trick.
 */
const neverChanges = () => () => {};

export function useHydrated() {
  return useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );
}
