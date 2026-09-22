import type { Metadata } from "next";
import { InvitationExperience } from "@/components/InvitationExperience";
import { event } from "@/lib/event";
import { getGuest, greetingLine, guests } from "@/lib/guests";

type Params = { params: Promise<{ slug: string }> };

// Prerender undangan untuk tamu yang terdaftar; slug lain dirender saat diminta.
export function generateStaticParams() {
  return guests.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const guest = getGuest(slug);
  const title = `Untuk ${guest.name}`;
  const description = `${greetingLine(guest)}, Anda diundang ke wisuda ${event.graduate.name}: ${event.ceremony.day}, ${event.ceremony.dateLabel} di ${event.ceremony.venue}. Silakan buka undangannya.`;

  return {
    title,
    description,
    openGraph: {
      title: `Undangan Wisuda ${event.graduate.name}`,
      description,
    },
    robots: { index: false, follow: false },
  };
}

export default async function InvitationPage({ params }: Params) {
  const { slug } = await params;
  const guest = getGuest(slug);
  return <InvitationExperience greeting={greetingLine(guest)} />;
}
