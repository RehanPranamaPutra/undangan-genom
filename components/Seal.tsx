import { event } from "@/lib/event";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** Monogram / segel emas — dipakai berulang sebagai penanda identitas. */
export function Seal({ className = "" }: { className?: string }) {
  const mono = initials(event.graduate.name);

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={`Monogram ${mono}`}
    >
      <defs>
        <path
          id="seal-arc"
          d="M50 14 a36 36 0 1 1 -0.01 0"
          fill="none"
        />
      </defs>

      <circle cx="50" cy="50" r="47" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" opacity="0.85" />
      <circle cx="50" cy="50" r="40.5" fill="none" stroke="var(--color-ink)" strokeWidth="0.7" opacity="0.85" />

      <g className="seal-ring">
        <text fill="var(--color-ink)" opacity="0.85" fontSize="6.6" letterSpacing="2.4">
          <textPath href="#seal-arc" startOffset="2%">
            · WISUDA · MMXXVI · SELAMAT · MENEMPUH · HIDUP · BARU ·
          </textPath>
        </text>
      </g>

      <text
        x="50"
        y="59"
        textAnchor="middle"
        fill="var(--color-marker)"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize={mono.length >= 3 ? 21 : 27}
      >
        {mono}
      </text>

      <g fill="var(--color-ink)" opacity="0.85">
        <circle cx="50" cy="19.5" r="1.5" />
        <circle cx="50" cy="80.5" r="1.5" />
        <circle cx="19.5" cy="50" r="1.5" />
        <circle cx="80.5" cy="50" r="1.5" />
      </g>
    </svg>
  );
}
