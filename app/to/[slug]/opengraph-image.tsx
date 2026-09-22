import { ImageResponse } from "next/og";
import { event } from "@/lib/event";
import { getGuest, greetingLine } from "@/lib/guests";

export const alt = "Undangan Wisuda";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guest = getGuest(slug);

  const guestLine = `Kepada Yth. ${greetingLine(guest)}`;
  const whenLine = `${event.ceremony.day}, ${event.ceremony.dateLabel} — ${event.ceremony.venue}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#2b2620",
          color: "#efe6d0",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            border: "3px solid #93a56b",
            padding: "40px 48px",
          }}
        >
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 2, opacity: 0.85 }}>
            {`WISUDA ${event.year}`}
          </div>
          <div style={{ display: "flex", fontSize: 84, marginTop: 12 }}>
            {event.graduate.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              marginTop: 8,
              fontStyle: "italic",
              opacity: 0.9,
            }}
          >
            {event.graduate.degree}
          </div>
          <div style={{ display: "flex", fontSize: 30, marginTop: 40, opacity: 0.95 }}>
            {guestLine}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 28, opacity: 0.9 }}>
          {whenLine}
        </div>
      </div>
    ),
    size,
  );
}
