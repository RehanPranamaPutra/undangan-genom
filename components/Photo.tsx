import { PhotoImage } from "@/components/PhotoImage";
import type { GalleryItem } from "@/lib/event";

export type PhotoShape = "rect" | "arch" | "circle" | "polaroid";

function PlaceholderArt() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(150deg,var(--color-panel),#e0d4bb)]">
      <svg
        viewBox="0 0 120 120"
        className="h-1/2 w-1/2 text-moss/35"
        fill="none"
        aria-hidden="true"
      >
        <path d="M10 44 60 24l50 20-50 20z" fill="currentColor" />
        <path
          d="M32 56v22c0 6 12.5 12 28 12s28-6 28-12V56"
          stroke="currentColor"
          strokeWidth="5"
        />
        <path d="M100 44v26" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <circle cx="100" cy="74" r="5" fill="currentColor" />
      </svg>
    </div>
  );
}

function Media({
  item,
  sizes,
  priority,
}: {
  item: GalleryItem;
  sizes: string;
  priority: boolean;
}) {
  return (
    <div
      data-photo
      data-loaded={item.src ? undefined : "true"}
      className="absolute inset-0"
    >
      {item.src ? (
        <PhotoImage
          src={item.src}
          alt={item.alt}
          sizes={sizes}
          priority={priority}
          position={item.position}
          zoom={item.zoom}
        />
      ) : (
        <PlaceholderArt />
      )}
      <span
        aria-hidden
        className="photo-curtain pointer-events-none absolute inset-0 z-[5]"
      />
    </div>
  );
}

/** Kelas bingkai per bentuk. */
const frame: Record<Exclude<PhotoShape, "polaroid">, string> = {
  rect: "border-2 border-ink shadow-[7px_7px_0_0_var(--color-moss)]",
  arch: "rounded-t-[999px] border-2 border-ink shadow-[7px_7px_0_0_var(--color-denim)]",
  circle: "rounded-full border-2 border-ink shadow-[6px_6px_0_0_var(--color-marker)]",
};

export type TapeVariant = "moss" | "denim" | "marker";

export function Photo({
  item,
  shape = "rect",
  ratio,
  className = "",
  sizes = "(max-width: 768px) 88vw, 42vw",
  priority = false,
  tilt = 0,
  tape = "moss",
}: {
  item: GalleryItem;
  shape?: PhotoShape;
  /** rasio CSS; default mengikuti bentuk, atau `item.ratio` bila diisi */
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** kemiringan bingkai dalam derajat */
  tilt?: number;
  /** warna selotip untuk bentuk polaroid */
  tape?: TapeVariant;
}) {
  const aspect = item.ratio ?? ratio ?? "4 / 5";

  if (shape === "polaroid") {
    return (
      <figure className={`group ${className}`}>
        <div
          className="relative border-2 border-ink bg-card p-2 pb-10 shadow-brutal"
          style={{ rotate: `${tilt}deg` }}
        >
          <span aria-hidden className={`tape tape--${tape} -top-3 left-1/2 -translate-x-1/2 -rotate-2`} />
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
            <Media item={item} sizes={sizes} priority={priority} />
          </div>
          {item.caption && (
            <figcaption className="absolute inset-x-2 bottom-2 truncate text-center font-hand text-lg text-ink/80">
              {item.caption}
            </figcaption>
          )}
        </div>
      </figure>
    );
  }

  return (
    <figure className={`group ${className}`}>
      <div
        className={`relative w-full overflow-hidden bg-panel ${frame[shape]}`}
        style={{ aspectRatio: aspect, rotate: `${tilt}deg` }}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-[6px] z-10 border border-moss/30 ${
            shape === "arch" ? "rounded-t-[999px]" : shape === "circle" ? "rounded-full" : ""
          }`}
        />
        <Media item={item} sizes={sizes} priority={priority} />
      </div>
      {item.caption && (
        <figcaption
          className={`mt-3 font-hand text-lg text-muted ${
            shape === "circle" ? "text-center" : ""
          }`}
        >
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}
