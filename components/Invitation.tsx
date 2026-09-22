import type { ReactNode } from "react";
import { BrutalLink } from "@/components/BrutalButton";
import { PaperDust } from "@/components/PaperDust";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Seal } from "@/components/Seal";
import { event } from "@/lib/event";

/** Kemiringan berseling tiap foto, supaya terasa ditempel tangan. */
const TILTS = [-2, 1.5, -1.5, 2, -1, 1.5];

/** Foto lanskap (rasio > 1) menempati dua kolom penuh — tak pernah dipotong jadi potret. */
function isLandscape(ratio: string) {
  const [w, h] = ratio.split("/").map((n) => parseFloat(n.trim()));
  return w > h;
}

/**
 * Grid 2 kolom + `grid-flow-row-dense` menutup celah kalau urutan lanskap/potret
 * pas-pasan — TAPI kalau total foto potret ganjil, satu sel akan selalu tersisa
 * kosong di ujung (matematis, bukan bug urutan). `needsFiller` mendeteksi itu
 * supaya kita render satu catatan kecil sebagai penutup, bukan ruang kosong.
 */
const portraitCount = event.gallery.filter(
  (item) => !isLandscape(item.ratio ?? "4 / 5"),
).length;
const needsFiller = portraitCount % 2 === 1;

function SectionHead({ children }: { children: ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-[clamp(1.6rem,4.6vw,2.35rem)] leading-tight text-ink">
        {children}
      </h3>
      <span className="mt-3 block h-px w-16 tape-rule" />
    </div>
  );
}

function RuleWithSeal() {
  return (
    <div className="my-7 flex items-center gap-4">
      <span className="h-px flex-1 tape-rule" />
      <Seal className="h-11 w-11 shrink-0" />
      <span className="h-px flex-1 tape-rule" />
    </div>
  );
}

function Corners() {
  const c = "corner pointer-events-none absolute h-4 w-4 border-moss";
  return (
    <>
      <span className={`${c} left-2 top-2 border-l-2 border-t-2`} />
      <span className={`${c} right-2 top-2 border-r-2 border-t-2`} />
      <span className={`${c} bottom-2 left-2 border-b-2 border-l-2`} />
      <span className={`${c} bottom-2 right-2 border-b-2 border-r-2`} />
    </>
  );
}

export function Invitation({ greeting }: { greeting: string }) {
  const g = event.graduate;
  const c = event.ceremony;
  const t = event.copy;

  const facts: { label: string; value: string; sub?: string }[] = [
    { label: "Hari, tanggal", value: `${c.day}, ${c.dateLabel}` },
    { label: "Jam", value: c.timeLabel },
    { label: "Tempat", value: c.venue, sub: c.venueDetail },
  ];

  return (
    <main>
      {/* Pembuka */}
      <section className="wrap pt-16 sm:pt-24">
        <Reveal variant="fade">
          <p className="dropcap font-serif text-[1.05rem] leading-[1.78] text-ink/85 sm:text-[1.12rem]">
            {event.opening}
          </p>
        </Reveal>

        <Reveal variant="rise" className="mt-12 sm:mt-16">
          <p className="font-hand text-2xl text-moss-deep">{t.introLead}</p>

          <h2 className="relative mt-1 inline-block font-display text-[clamp(2.3rem,10vw,4.6rem)] italic leading-[1.02] tracking-[-0.01em] text-ink">
            {g.name}
            <span className="tape-underline" aria-hidden />
          </h2>

          <RuleWithSeal />

          <div className="space-y-1.5">
            <p className="font-display text-2xl text-ink">{g.degree}</p>
            <p className="font-serif text-[1.02rem] italic text-muted">
              {g.program}
            </p>
            <p className="font-serif text-sm text-muted">
              {g.faculty}, {g.university}
              {g.honors ? ` · ${g.honors}` : ""}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Kartu acara */}
      <section className="wrap mt-16 sm:mt-24">
        <Reveal variant="rise">
          <div className="relative pr-3 sm:pr-5">
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 right-3 -z-10 translate-y-2 border-2 border-ink bg-panel sm:right-5 sm:translate-y-3"
            />
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 right-3 -z-20 translate-x-2 translate-y-4 rotate-[0.6deg] border-2 border-ink bg-panel sm:right-5 sm:translate-x-3 sm:translate-y-6"
            />

            <div className="relative border-2 border-ink bg-panel p-6 shadow-brutal sm:p-9 md:p-11">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-[7px] border border-moss/30"
              />
              <Corners />
              <Seal className="absolute -right-4 -top-5 h-14 w-14 rotate-6 drop-shadow-sm" />

              <p className="font-hand text-2xl text-moss-deep">
                {t.panelHeading}
              </p>

              <dl className="mt-6 divide-y divide-edge border-y border-edge">
                {facts.map((f) => (
                  <div key={f.label} className="flex flex-col gap-0.5 py-4">
                    <dt className="font-serif text-[0.82rem] italic text-moss-deep/80">
                      {f.label}
                    </dt>
                    <dd className="font-display text-xl text-ink sm:text-[1.4rem]">
                      {f.value}
                    </dd>
                    {f.sub && (
                      <dd className="font-serif text-sm text-muted">{f.sub}</dd>
                    )}
                  </div>
                ))}
              </dl>

              <div className="mt-7">
                <BrutalLink
                  href={c.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  {t.mapsButton}
                </BrutalLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Rundown */}
      <section className="wrap mt-20 sm:mt-28">
        <Reveal>
          <SectionHead>{t.rundownHeading}</SectionHead>
        </Reveal>

        <ol className="relative mt-8 pl-1">
          <span
            aria-hidden
            className="rail absolute bottom-3 left-[7px] top-3 w-[2px]"
          />
          {event.rundown.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              variant="rise"
              delay={i * 90}
              className="relative pb-8 pl-10 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-moss bg-paper"
              />
              <span className="font-sans text-[0.7rem] font-semibold tracking-[0.22em] text-moss-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-0.5 font-display text-xl text-ink sm:text-[1.35rem]">
                {item.title}
              </p>
              <p className="font-serif text-sm italic text-muted">
                {item.time} WIB
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Galeri — setiap foto tetap dalam rasio aslinya: lanskap tetap lebar,
          potret tetap tinggi. Ditempel dengan selotip pada kemiringan berseling. */}
      <section className="mt-20 sm:mt-28">
        <div className="wrap-wide">
          <Reveal>
            <SectionHead>{t.galleryHeading}</SectionHead>
          </Reveal>

          <div className="mt-10 grid grid-flow-row-dense grid-cols-2 gap-x-5 gap-y-14 sm:gap-x-8 sm:gap-y-20">
            {event.gallery.map((item, i) => {
              const ratio = item.ratio ?? "4 / 5";
              const wide = isLandscape(ratio);
              return (
                <Reveal
                  key={item.caption ?? i}
                  variant="fade"
                  delay={(i % 3) * 90}
                  className={wide ? "col-span-2" : "col-span-1"}
                >
                  <Photo
                    item={item}
                    shape="polaroid"
                    tilt={TILTS[i % TILTS.length]}
                    sizes={
                      wide
                        ? "(max-width: 768px) 92vw, 58vw"
                        : "(max-width: 768px) 42vw, 26vw"
                    }
                  />
                </Reveal>
              );
            })}
            {needsFiller && (
              <Reveal variant="fade" className="col-span-1 flex items-center justify-center">
                <div className="flex -rotate-2 flex-col items-center gap-3 border-2 border-ink bg-card px-6 py-10 text-center shadow-brutal">
                  <Seal className="h-9 w-9" />
                  <p className="font-hand text-xl text-moss-deep">
                    &amp; banyak cerita lain yang tak sempat terekam kamera
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Kutipan — halaman gelap disematkan di tengah buku */}
      <section className="quote-band my-24 sm:my-32">
        <PaperDust className="opacity-50" count={14} />
        <div className="wrap relative py-20 sm:py-28">
          <Reveal variant="rise">
            <span className="quote-mark text-[clamp(6rem,20vw,12rem)]" aria-hidden>
              &ldquo;
            </span>
            <blockquote className="relative">
              <p className="font-display text-[clamp(1.6rem,4.8vw,2.7rem)] italic leading-[1.3] text-paper">
                {event.quote.text}
              </p>
              <cite className="mt-6 block font-hand text-xl not-italic text-moss-bright">
                {event.quote.source}
              </cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Penutup */}
      <section className="wrap">
        <Reveal variant="rise">
          <p className="dropcap font-serif text-[1.05rem] leading-[1.78] text-ink/85 sm:text-[1.12rem]">
            {event.closing}
          </p>

          <p className="mt-8 font-display text-2xl text-ink sm:text-[1.7rem]">
            {t.thanksPrefix}, {greeting}.
          </p>

          <RuleWithSeal />

          <p className="font-hand text-2xl text-moss-deep">{t.signoff}</p>
          <p className="mt-1 font-display text-2xl italic text-ink">{event.signature}</p>
        </Reveal>

        <Reveal variant="fade" className="mt-12 sm:mt-16">
          <p className="year-kinetic text-[clamp(4.5rem,26vw,13rem)]">
            {event.year}
          </p>
        </Reveal>
      </section>

      <footer className="wrap mt-12 pb-16">
        <div className="flex items-center gap-2 border-t-2 border-ink pt-5 font-sans text-xs text-muted">
          <Seal className="h-4 w-4 opacity-60" />
          Undangan digital · {g.name}
        </div>
      </footer>
    </main>
  );
}
