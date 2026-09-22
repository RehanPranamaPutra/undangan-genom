/**
 * Daftar tamu bersifat OPSIONAL. URL /to/<slug> tetap jalan untuk nama apa pun:
 * slug diubah kembali menjadi teks berkapital (mis. "pak-budi" -> "Pak Budi").
 *
 * Tambahkan entri di sini hanya bila ingin:
 *  - menyapa dengan panggilan khusus (honorific), atau
 *  - memakai ejaan/kapitalisasi yang tak bisa ditebak dari slug.
 */

export type Guest = {
  slug: string;
  name: string;
  /** sapaan sebelum nama, mis. "Bapak", "Ibu", "Keluarga" */
  honorific?: string;
};

export const guests: Guest[] = [
  { slug: "keluarga-besar", name: "Keluarga Besar" },
  { slug: "sahabat-seperjuangan", name: "Sahabat Seperjuangan" },
  // { slug: "budi-santoso", name: "Budi Santoso", honorific: "Bapak" },
];

const LOWERCASE_WORDS = new Set(["dan", "bin", "binti", "al", "van", "de", "di", "ke"]);
// rentang tanda diakritik gabungan (U+0300–U+036F)
const COMBINING_MARKS = /[̀-ͯ]/g;

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function deslugify(slug: string): string {
  const words = slug.split("-").filter(Boolean);
  if (words.length === 0) return "Tamu Undangan";
  return words
    .map((word, i) =>
      i > 0 && LOWERCASE_WORDS.has(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

export function getGuest(slug: string): Guest {
  const known = guests.find((g) => g.slug === slug);
  if (known) return known;
  return { slug, name: deslugify(slug) };
}

/** "Bapak Budi Santoso" / "Sahabat Seperjuangan" */
export function greetingLine(guest: Guest): string {
  return guest.honorific ? `${guest.honorific} ${guest.name}` : guest.name;
}
