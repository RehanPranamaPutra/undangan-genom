@AGENTS.md

# Proyek: Undangan Wisuda (digital)

Undangan wisuda digital, satu halaman per tamu di `/to/<slug>`. Next.js 16 (App
Router, Turbopack) + Tailwind v4. Bahasa UI: Indonesia, gaya semi-formal yang hangat ("saya"/"Anda", tidak kaku, bukan gue/lo). Pesan WhatsApp mengikuti gaya yang sama.

## Alur

1. `/` — halaman **pembuat tautan**: ketik nama tamu → salin link / share ke
   WhatsApp (`wa.me/?text=`) / pratinjau. Client component.
2. `/to/<slug>` — `InvitationExperience` (client) menampilkan `Cover`
   (sampul, overlay `position: fixed`). Tekan **Buka Undangan** →
   cover terangkat (`data-closing`), musik mulai (dihitung sebagai gesture user),
   scroll body terbuka, `Invitation` yang tadinya di belakang jadi terlihat.
3. Slug tak terdaftar tetap jalan: `deslugify()` mengubah `pak-budi` → "Pak Budi".

### Query params (dev/util)

- `?preview` — lewati sampul, langsung ke isi undangan (dipakai tombol "Intip dulu").
- `?still` — tambahan: matikan semua animasi masuk (`[data-still]` di CSS). Buat
  screenshot / orang yang tak suka gerak. Diproses di `InvitationExperience`.

## Data & teks — semua di `lib/`

- `lib/event.ts` — **satu-satunya sumber**: nama, gelar, prodi, kampus, tanggal,
  jam, tempat, Maps, `rundown[]`, `gallery[]` (`src` + `ratio` per foto),
  `cover`, `music`, `quote`, `signature`, `year`, dan objek **`copy`** berisi
  seluruh label/heading UI. Foto & musik ditaruh di `public/`, path ditulis di sini.
- `lib/guests.ts` — opsional; `slugify`/`deslugify`/`getGuest`/`greetingLine`.
  Daftar `guests[]` hanya untuk sapaan khusus (`honorific`) atau ejaan aneh.

## Komponen

| File | Peran |
| --- | --- |
| `components/InvitationExperience.tsx` | Orkestrasi: state buka/tutup, scroll-lock, mount `MusicPlayer`, `?preview`/`?still`. |
| `components/Cover.tsx` | Sampul: foto (`TapedPhoto`, rasio 3:2 tetap — tak dipaksa potret) ditempel selotip + `Seal`; nama kelas (`tape-underline`), lockup prodi/kampus; **kartu nama tamu** "Kepada Yth." ditempel selotip; tombol `btn-pulse`. |
| `components/Invitation.tsx` | Isi: pembuka (drop-cap), lockup nama kelas, kartu acara berlapis + ornamen sudut, rundown rel putus-putus, galeri foto (lihat di bawah), **band kutipan gelap full-bleed**, penutup + angka tahun. Section dibungkus `<Reveal>`. |
| `components/Reveal.tsx` | Client. IntersectionObserver → `data-inview="true"` sekali. Varian `rise`/`fade`/`wipe` diatur CSS. `prefers-reduced-motion` & no-JS ditangani CSS, bukan JS. |
| `components/Seal.tsx` | SVG monogram cap tinta (inisial dari `event.graduate.name`), cincin berputar (`.seal-ring`). |
| `components/PaperDust.tsx` | Client. Partikel `<canvas>` rAF (dulu `GoldDust`); mati saat `prefers-reduced-motion`. |
| `components/Photo.tsx` | Bingkai foto. `shape`: `rect`, `arch`, `circle`, `polaroid` (dipakai di galeri — selotip warna-warni via prop `tape`). Rasio ikut `item.ratio` (rasio ASLI foto, lihat Galeri). Mendukung `item.position`/`item.zoom`, animasi "tirai" (`.photo-curtain`); gambar dirender lewat `components/PhotoImage.tsx` (client) yang menandai `[data-photo]` dengan `data-loaded`. Placeholder bila `src` kosong. |
| `components/BrutalButton.tsx` | `BrutalButton`/`BrutalLink`, kelas `btn-gilt` (kilau sapuan). |
| `components/MusicPlayer.tsx` | Client. `<audio loop>`, autoplay saat mount, toggle. `onError` → sembunyikan tombol. |

## Galeri

- Data: `event.gallery[]` (`src`, `alt`, `caption`, opsional `position`, `zoom`, `ratio`). Urutan = urutan cerita.
- **`ratio` wajib diisi rasio ASLI foto** (mis. potret HP `9/16`, studio `3/2`), bukan dipaksa ke satu bentuk. Cek dimensi asli dulu (`ffprobe`/EXIF) sebelum menambah foto baru.
- Layout: grid 2 kolom (`.wrap-wide`, 64rem) di `components/Invitation.tsx`. Foto **lanskap** (rasio lebar > tinggi, dicek dari `item.ratio`) otomatis `col-span-2` (melebar penuh, tanpa crop paksa); foto **potret** tetap 1 kolom. Semua pakai bentuk `polaroid` (`Photo.tsx`), ditempel selotip dengan kemiringan & warna berselang (`TILTS`/`TAPES`).
- **Pipeline foto**: jangan taruh foto mentah di `public/`. HEIC tidak tampil di browser. Konversi (Windows: WIC/PowerShell; sharp ada di `node_modules/.pnpm`), lalu kecilkan sisi terpanjang ke ~1800px (2400 untuk landscape), JPEG q≈82, simpan ke `public/photos/gallery/`. Foto asli disimpan di `photos-original/` (di luar `public`, tidak ikut deploy).

- **Jangan pakai `clip-path` untuk menyembunyikan foto lazy.** Browser tidak memuat `<img loading="lazy">` yang sedang tertutup clip-path oleh ancestor, jadi foto baru diunduh setelah animasi selesai dan muncul tiba-tiba (atau tak pernah bila animasi menunggu `data-loaded`). Animasi buka foto memakai tirai `transform: scaleX` yang baru menyingkap saat bingkai masuk layar **dan** foto sudah dimuat.
- Verifikasi animasi di Chrome sungguhan (CDP: scroll ke elemen + throttle jaringan), bukan screenshot headless statis — yang terakhir membekukan transisi dan tinggi window >~4500px membuat IntersectionObserver tak jalan.

## Sistem visual (`app/globals.css`)

- Tema **scrapbook/yearbook hangat**: kertas kraft, selotip washi, foto
  ditempel miring, aksen tulisan tangan — bukan editorial-akademik/emas (versi
  lama, sudah diganti karena undangan ini untuk satu kelas, bukan perorangan).
- Token warna: `ink`, `paper`, `card` (kertas foto/kartu, lebih terang dari
  `paper`), `panel`, `edge`, `moss`/`moss-deep`/`moss-bright` (aksen utama),
  `denim` (selotip kedua), `marker` (aksen tegas, dipakai sangat jarang —
  garis bawah nama di sampul & tinta monogram `Seal`), `muted`.
- Font: Fraunces (display, italic hangat) + Libre Caslon Text (serif isi) +
  Archivo (sans/UI) + Caveat (`--font-hand`, tulisan tangan — dipakai untuk
  caption foto, label kecil, tanda tangan; JANGAN dipakai untuk paragraf
  panjang) (`app/layout.tsx`, `next/font`).
- `.tape`/`.tape--moss`/`.tape--denim`/`.tape--marker`: selotip washi dekoratif
  (dipakai di `Cover.tsx` dan bentuk `polaroid` pada `Photo.tsx`).
- `.tape-rule`/`.tape-underline`: pengganti bekas `.gilt-*` — flat, tanpa
  animasi kilau (kilau emas sudah dibuang, ganti dengan warna solid).
- Butiran kertas: `body::before` (SVG noise, opacity ~3.5%).
- **Semua animasi wajib punya fallback**: blok `@media (prefers-reduced-motion:
  reduce)` dan `@media (scripting: none)` memaksa konten tampil. `[data-still]`
  idem untuk screenshot. Jangan menyembunyikan teks penting via `animation ...
  both` tanpa jalur aman (lihat kenapa letter-rise nama dibuang).

## Aturan kerja di repo ini

- ESLint aktif rule `react-hooks/set-state-in-effect`: **jangan** `setState`
  sinkron di body `useEffect`. Untuk nilai browser-only pakai `useSyncExternalStore`
  (lihat `useOrigin`/`useQueryFlag`), atau tangani lewat CSS.
- Verifikasi: `pnpm build` + `pnpm lint` harus lolos. Cek overflow horizontal
  di lebar HP (band full-bleed & foto miring rawan) — target `scrollWidth ==
  clientWidth`.
- `params` di route = `Promise`, wajib di-`await` (Next 16).
- OG image (`app/to/[slug]/opengraph-image.tsx`) pakai `next/og`; tiap `<div>`
  dengan >1 anak **wajib** `display:flex`.

## Status

- Undangan untuk **satu kelas (GENOMIA 23, Manajemen Informatika, Politeknik
  Negeri Padang)**, bukan wisudawan perorangan — `event.graduate` merepresentasikan
  kelas (lihat komentar di `lib/event.ts`), teks pakai sudut pandang "kami".
- Tema: scrapbook/yearbook hangat (lihat "Sistem visual"). Animasi & fallback aksesibilitas: selesai. Copy: semi-formal.
- Galeri: 22 foto terpasang (`public/photos/gallery/`, ~7MB total setelah
  dikompres — foto mentah asli ada di `photos-original/`, tidak ikut deploy).
- Data wisuda, foto cover, foto galeri, dan musik (`/public/music/good-life.mp3`) sudah terisi.
