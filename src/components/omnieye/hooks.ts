"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * IntersectionObserver hook. Fires once by default (elements rise and
 * settle; we never re-animate on scroll-up).
 */
export function useInView<T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  onEnter?: () => void;
}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          options?.onEnter?.();
          if (options?.once !== false) io.disconnect();
        } else if (options?.once === false) {
          setInView(false);
        }
      },
      {
        threshold: options?.threshold ?? 0.18,
        rootMargin: options?.rootMargin,
      }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

/** Media-query hook (used to honour pointer/reduced-motion preferences). */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
