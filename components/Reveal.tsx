"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type Tag = "div" | "section" | "li" | "p" | "figure";

/**
 * Membungkus konten dan menganimasikannya sekali saat masuk viewport.
 * Gaya animasi diatur lewat CSS (`[data-reveal]` di globals.css).
 */
export function Reveal({
  as = "div",
  variant = "rise",
  delay = 0,
  className = "",
  style,
  children,
}: {
  as?: Tag;
  variant?: "rise" | "fade" | "wipe";
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inview, setInview] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // prefers-reduced-motion ditangani di CSS (semua [data-reveal] dipaksa tampil).
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInview(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;

  const mergedStyle = { ...style } as Record<string, string | number>;
  mergedStyle["--reveal-delay"] = `${delay}ms`;

  return (
    <Tag
      ref={ref as never}
      data-reveal={variant}
      data-inview={inview ? "true" : "false"}
      className={className}
      style={mergedStyle as CSSProperties}
    >
      {children}
    </Tag>
  );
}
