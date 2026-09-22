import { event } from "@/lib/event";

/**
 * Template pesan WhatsApp yang dikirim ke tiap tamu.
 * Ubah teks di sini bila ingin mengganti gaya bahasanya; data acara ikut otomatis
 * dari `lib/event.ts`.
 *
 * Format WhatsApp: *tebal*, _miring_. Baris `url` harus muncul tepat satu kali
 * (halaman pembuat tautan memakainya untuk mewarnai tautan di pratinjau).
 */
export function buildWaMessage(name: string, url: string): string {
  const { graduate: g, ceremony: c } = event;

  return [
    "Kepada Yth.",
    `*${name}*`,
    "",
    "Salam hangat,",
    "",
    "Dengan penuh rasa syukur, kami bermaksud mengundang Anda untuk hadir dalam acara wisuda kami 🎓",
    "",
    `*${g.name}, ${g.degree}*`,
    `_${g.program}, ${g.university}_`,
    "",
    "Acara akan dilaksanakan pada:",
    `📅 *Hari/Tanggal:* ${c.day}, ${c.dateLabel}`,
    `⏰ *Waktu:* ${c.timeLabel}`,
    `📍 *Tempat:* ${c.venue}, ${c.venueDetail}`,
    "",
    "Susunan acara dan petunjuk lokasi selengkapnya dapat dibuka melalui undangan digital berikut (disarankan dengan suara menyala 🎶):",
    url,
    "",
    "Merupakan kebahagiaan bagi kami apabila Anda berkenan hadir dan berbagi momen ini. Atas doa dan dukungan Anda, kami ucapkan terima kasih 🙏",
    "",
    "Hormat kami,",
    `*${g.nickname}*`,
  ].join("\n");
}

/** "0812-3456-789" / "+62 812..." -> "628123456789" (format wa.me) */
export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return `62${digits}`;
}
