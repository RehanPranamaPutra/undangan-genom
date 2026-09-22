"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { BrutalButton, BrutalLink } from "@/components/BrutalButton";
import { event } from "@/lib/event";
import { buildWaMessage, normalizePhone } from "@/lib/invite-message";
import { guests, slugify } from "@/lib/guests";

const noop = () => () => {};

/** origin browser-only, tanpa memicu hydration mismatch */
function useOrigin() {
  return useSyncExternalStore(
    noop,
    () => window.location.origin,
    () => "",
  );
}

/** Render format WhatsApp sederhana: *tebal* dan _miring_ */
function WaText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*\n]+\*|_[^_\n]+_)/g).map((part, i) => {
        if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
          return <strong key={i}>{part.slice(1, -1)}</strong>;
        }
        if (part.length > 2 && part.startsWith("_") && part.endsWith("_")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

const HONORIFICS = ["", "Bapak", "Ibu", "Kak", "Mas", "Mba","Bang"] as const;

export default function GeneratorPage() {
  const [name, setName] = useState("");
  const [honorific, setHonorific] = useState<(typeof HONORIFICS)[number]>("");
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState<"pesan" | "link" | null>(null);
  const origin = useOrigin();

  const fullName = [honorific, name.trim()].filter(Boolean).join(" ");
  const slug = slugify(fullName);
  const ready = Boolean(name.trim() && slug);

  const url = `${origin}/to/${slug || "nama-tamu"}`;
  const message = useMemo(
    () => buildWaMessage(ready ? fullName : "[nama tamu]", url),
    [ready, fullName, url],
  );

  const waHref = useMemo(() => {
    const to = normalizePhone(phone);
    return `https://wa.me/${to}?text=${encodeURIComponent(message)}`;
  }, [phone, message]);

  async function copy(kind: "pesan" | "link") {
    if (!ready) return;
    try {
      await navigator.clipboard.writeText(kind === "pesan" ? message : url);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  }

  const [before, after] = message.split(url);

  return (
    <main className="mx-auto max-w-2xl px-5 py-14 sm:px-6 md:py-20">
      <p className="font-hand text-xl text-moss-deep sm:text-2xl">
        Bikin undangan
      </p>
      <h1 className="mt-2 text-[clamp(2rem,8vw,3.5rem)] leading-[1.05] text-ink">
        Undangan Wisuda {event.graduate.nickname}
      </h1>
      <p className="mt-4 font-serif text-muted">
        Ketik nama tamu, pesan WhatsApp-nya langsung tersusun. Tinggal kirim.
      </p>

      {/* Input */}
      <div className="mt-8 border-2 border-ink bg-panel p-5 shadow-brutal sm:mt-10 sm:p-8">
        <label
          htmlFor="guest"
          className="font-sans text-sm font-semibold tracking-wide text-ink"
        >
          Nama yang diundang
        </label>
        <input
          id="guest"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="mis. Budi Santoso"
          autoComplete="off"
          className="mt-2 w-full border-2 border-ink bg-paper px-4 py-3 font-serif text-lg text-ink outline-none placeholder:text-muted/60 focus:shadow-brutal-sm"
        />

        <p className="mt-5 font-sans text-xs font-semibold tracking-wide text-muted">
          Sapaan (opsional)
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {HONORIFICS.map((h) => (
            <button
              key={h || "none"}
              type="button"
              onClick={() => setHonorific(h)}
              aria-pressed={honorific === h}
              className={`border-2 border-ink px-3 py-1.5 font-sans text-sm transition-transform duration-100 hover:-translate-y-0.5 ${
                honorific === h ? "bg-moss text-card" : "bg-paper text-ink"
              }`}
            >
              {h || "Tanpa"}
            </button>
          ))}
        </div>

        <label
          htmlFor="phone"
          className="mt-5 block font-sans text-xs font-semibold tracking-wide text-muted"
        >
          Nomor WA (opsional, biar langsung buka chat-nya)
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0812 3456 7890"
          autoComplete="off"
          className="mt-2 w-full border-2 border-ink bg-paper px-4 py-2.5 font-serif text-base text-ink outline-none placeholder:text-muted/60 focus:shadow-brutal-sm"
        />

        {guests.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {guests.map((g) => (
              <button
                key={g.slug}
                type="button"
                onClick={() => {
                  setHonorific("");
                  setName(g.name);
                }}
                className="border-2 border-dashed border-ink bg-paper px-3 py-1.5 font-sans text-sm text-ink transition-transform duration-100 hover:-translate-y-0.5"
              >
                {g.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Pratinjau chat WhatsApp */}
      <p className="mt-10 font-hand text-2xl text-moss-deep">Pratinjau pesan</p>
      <div className="mt-3 overflow-hidden border-2 border-ink shadow-brutal">
        <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 font-sans text-sm font-semibold">
            {(ready ? fullName : "?").charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate font-sans text-sm font-semibold">
              {ready ? fullName : "Nama tamu"}
            </p>
            <p className="font-sans text-[0.7rem] text-white/70">online</p>
          </div>
        </div>

        <div className="bg-[#efeae2] px-3 py-5 [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:14px_14px] sm:px-5">
          <div className="relative ml-auto max-w-[92%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-3 py-2 shadow-[0_1px_1px_rgba(0,0,0,0.15)] sm:max-w-[85%]">
            <span
              aria-hidden
              className="absolute -right-2 top-0 h-2.5 w-2.5 bg-[#d9fdd3] [clip-path:polygon(0_0,100%_0,0_100%)]"
            />
            <p
              className={`whitespace-pre-wrap break-words font-sans text-[0.9rem] leading-snug text-[#111b21] ${
                ready ? "" : "opacity-70"
              }`}
            >
              <WaText text={before} />
              <span className="break-all text-[#027eb5] underline">{url}</span>
              <WaText text={after} />
            </p>
            <p className="mt-1 text-right font-sans text-[0.65rem] text-[#667781]">
              09.41 <span className="text-[#53bdeb]">✓✓</span>
            </p>
          </div>
        </div>
      </div>

      {/* Aksi */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <BrutalButton
          type="button"
          disabled={!ready}
          onClick={() => window.open(waHref, "_blank", "noopener,noreferrer")}
          className="w-full sm:w-auto"
        >
          Kirim ke WhatsApp
        </BrutalButton>
        <BrutalButton
          type="button"
          variant="outline"
          disabled={!ready}
          onClick={() => copy("pesan")}
          className="w-full sm:w-auto"
        >
          {copied === "pesan" ? "Tersalin ✓" : "Salin pesan"}
        </BrutalButton>
        <BrutalButton
          type="button"
          variant="outline"
          disabled={!ready}
          onClick={() => copy("link")}
          className="w-full sm:w-auto"
        >
          {copied === "link" ? "Tersalin ✓" : "Salin link"}
        </BrutalButton>
        {ready ? (
          <BrutalLink
            href={`/to/${slug}?preview`}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Intip undangan
          </BrutalLink>
        ) : (
          <BrutalButton
            type="button"
            variant="outline"
            disabled
            className="w-full sm:w-auto"
          >
            Intip undangan
          </BrutalButton>
        )}
      </div>
    </main>
  );
}
