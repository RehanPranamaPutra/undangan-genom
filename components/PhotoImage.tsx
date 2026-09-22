"use client";

import Image from "next/image";

/**
 * Menandai bingkai (`[data-photo]`) sebagai "sudah dimuat" lewat atribut DOM.
 * Animasi wipe di CSS baru berjalan setelah atribut ini ada, supaya foto yang
 * lambat diunduh tidak muncul begitu saja setelah animasinya lewat.
 */
function markLoaded(el: HTMLElement | null) {
  el?.closest<HTMLElement>("[data-photo]")?.setAttribute("data-loaded", "true");
}

export function PhotoImage({
  src,
  alt,
  sizes,
  priority,
  position,
  zoom,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority: boolean;
  position?: string;
  zoom?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
      style={{
        objectPosition: position ?? "50% 50%",
        transformOrigin: position ?? "50% 50%",
        transform: zoom ? `scale(${zoom})` : undefined,
      }}
      // Gambar yang sudah ada di cache bisa selesai sebelum hydration.
      ref={(el) => {
        if (el?.complete && el.naturalWidth > 0) markLoaded(el);
      }}
      onLoad={(e) => markLoaded(e.currentTarget)}
      onError={(e) => markLoaded(e.currentTarget)}
    />
  );
}
