import Image from "next/image";
import { BrutalButton } from "@/components/BrutalButton";
import { Seal } from "@/components/Seal";
import { event } from "@/lib/event";

/** Foto sampul ditempel selotip — mempertahankan rasio asli, tidak dipaksa potret. */
function TapedPhoto() {
  const cover = event.cover;

  return (
    <div className="relative w-full max-w-[420px] -rotate-2 sm:max-w-[480px]">
      <span aria-hidden className="tape tape--sage -top-4 left-10 -rotate-6" />
      <span aria-hidden className="tape tape--terracotta -bottom-4 right-8 rotate-6" />

      <div className="relative border-2 border-ink bg-card p-2 pb-3 shadow-brutal-lg">
        <div
          className="relative w-full overflow-hidden bg-panel"
          style={{ aspectRatio: "3 / 2" }}
        >
          {cover.src ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              priority
              sizes="(max-width: 640px) 92vw, 480px"
              className="object-cover"
              style={{
                objectPosition: cover.position ?? "50% 40%",
                transform: cover.zoom ? `scale(${cover.zoom})` : undefined,
              }}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(160deg,var(--color-panel),#dccf9f)] font-sans text-xs text-ink/45">
              foto menyusul
            </div>
          )}
        </div>
      </div>

      {/* segel menempel di sudut bawah */}
      <span className="absolute -bottom-6 -right-6 grid h-16 w-16 place-items-center rounded-full bg-card ring-1 ring-ink/15 sm:-bottom-8 sm:-right-8 sm:h-20 sm:w-20">
        <Seal className="h-[52px] w-[52px] sm:h-16 sm:w-16" />
      </span>
    </div>
  );
}

export function Cover({
  greeting,
  closing,
  onOpen,
}: {
  greeting: string;
  closing: boolean;
  onOpen: () => void;
}) {
  const g = event.graduate;
  const c = event.copy;

  return (
    <div
      className="cover fixed inset-0 z-40 overflow-y-auto bg-paper"
      data-closing={closing ? "true" : "false"}
      aria-hidden={closing ? "true" : undefined}
    >
      <div className="cover-frame" aria-hidden />

      <div className="relative mx-auto flex min-h-full max-w-5xl flex-col justify-center px-5 py-14 sm:px-8 md:px-14 md:py-20">
        <p className="font-hand text-2xl text-moss-deep">{c.coverKicker} —</p>

        <div className="mt-4 grid grid-cols-1 items-start gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          {/* Foto */}
          <div className="order-1 flex justify-center md:order-2 md:justify-end md:pt-4">
            <TapedPhoto />
          </div>

          {/* Teks */}
          <div className="order-2 md:order-1">
            <h1 className="cover-name relative inline-block text-[clamp(2.6rem,11vw,5.2rem)] italic leading-[0.98] tracking-[-0.01em] text-ink">
              {g.name}
              <span className="tape-underline" aria-hidden />
            </h1>

            <p className="mt-5 font-display text-xl text-ink/80 sm:text-2xl">
              {c.coverTagline}
            </p>

            <div className="mt-6 space-y-1 font-serif text-[0.95rem] text-muted sm:text-[1rem]">
              <p className="flex items-baseline gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                {g.degree} · {g.program}
              </p>
              <p className="flex items-baseline gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss/50" />
                {g.faculty}, {g.university}
              </p>
            </div>

            {/* Kartu nama tamu — seperti kartu indeks yang ditempel */}
            <div className="relative mt-9 w-full max-w-sm rotate-1 border-2 border-ink bg-card p-1 shadow-brutal">
              <span aria-hidden className="tape -top-3 left-1/2 -translate-x-1/2 rotate-1" />
              <div className="px-5 py-6 text-center sm:px-8 sm:py-7">
                <p className="font-hand text-xl text-moss-deep sm:text-2xl">
                  {c.greetingLabel}
                </p>
                <p className="mt-1 text-balance font-display text-[clamp(1.7rem,6.5vw,2.5rem)] italic leading-[1.15] text-ink">
                  {greeting}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <BrutalButton
                type="button"
                onClick={onOpen}
                className="btn-pulse w-full sm:w-auto"
              >
                {c.openButton}
              </BrutalButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
