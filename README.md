# Undangan Wisuda

Undangan digital wisuda berbasis [Next.js](https://nextjs.org) 16 (App Router) + Tailwind CSS v4.
Tiap tamu mendapat halaman personal di `/to/<nama-tamu>`.

## Menjalankan

```bash
pnpm install
pnpm dev
```

Buka http://localhost:3000 — halaman ini adalah **pembuat tautan**: ketik nama
tamu, salin tautannya, atau kirim langsung lewat WhatsApp.

Contoh undangan: http://localhost:3000/to/keluarga-besar

## Yang perlu kamu ganti

| Berkas | Isi |
| --- | --- |
| `lib/event.ts` | **Semua data**: nama, gelar, program studi, fakultas, universitas, hari/tanggal/jam, tempat, tautan Google Maps, rundown, kutipan, tanda tangan, tahun. Semua teks/label UI ada di objek `event.copy` di bagian bawah berkas — ganti gaya bahasanya sesukamu. |
| `lib/guests.ts` | Opsional. Daftar tamu hanya untuk sapaan khusus (`honorific`) atau ejaan yang tak bisa ditebak dari slug. URL `/to/<slug>` tetap jalan untuk nama apa pun. |

### Foto

Simpan foto di `public/photos/`, lalu isi path-nya di `lib/event.ts`:

```ts
cover: { src: "/photos/toga.jpg", alt: "Potret wisuda" },
gallery: [
  { src: "/photos/kampus.jpg", alt: "...", caption: "Hari pertama di kampus", ratio: "4/5" },
  // ...
],
```

Selama `src` masih `""`, tampil placeholder bertuliskan "foto menyusul".
`ratio` menerima nilai CSS `aspect-ratio` seperti `"4/5"`, `"1/1"`, `"3/2"`.

### Musik

Simpan berkas di `public/music/` dan tulis path-nya di `lib/event.ts` →
`music.src` (saat ini `/music/good-life.mp3`). Hindari spasi/karakter aneh di
nama berkas. Musik mulai otomatis saat tamu menekan **Buka Undangan** (dihitung
sebagai interaksi pengguna, jadi tidak diblokir browser). Jika berkas tidak ada,
tombol musik disembunyikan tanpa error.

## URL dinamis

- `/to/budi-santoso` → menyapa "Budi Santoso"
- `/to/pak-budi` → menyapa "Pak Budi"
- Slug diubah dari nama lewat `slugify()` di `lib/guests.ts` (huruf kecil, spasi menjadi `-`).

## Deploy

Set `NEXT_PUBLIC_SITE_URL` ke domain final (dipakai untuk metadata & pratinjau
WhatsApp), lalu:

```bash
pnpm build
pnpm start
```

Atau deploy ke Vercel dan isi `NEXT_PUBLIC_SITE_URL` di Environment Variables.

## Tema

Editorial akademik + aksen brutalist. Token warna & tipografi ada di
`app/globals.css` (`@theme`). Font: Libre Caslon Display/Text + Archivo
(`app/layout.tsx`).
