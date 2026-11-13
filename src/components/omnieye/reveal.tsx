"use client";

import { useInView } from "./hooks";

/**
 * Rise-and-fade wrapper: runs once when scrolled into view.
 * transform + opacity only; honours prefers-reduced-motion via CSS.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  id,
  "aria-hidden": ariaHidden,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      id={id}
      aria-hidden={ariaHidden}
      className={`reveal ${inView ? "is-inview" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
