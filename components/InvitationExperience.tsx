"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Cover } from "@/components/Cover";
import { Invitation } from "@/components/Invitation";
import { MusicPlayer } from "@/components/MusicPlayer";
import { event } from "@/lib/event";

const noop = () => () => {};

function useQueryFlag(key: string) {
  return useSyncExternalStore(
    noop,
    () => new URLSearchParams(window.location.search).has(key),
    () => false,
  );
}

export function InvitationExperience({ greeting }: { greeting: string }) {
  /** ?preview -> lewati sampul · ?still -> matikan animasi masuk (buat screenshot) */
  const preview = useQueryFlag("preview");
  const still = useQueryFlag("still");
  const [opened, setOpened] = useState(false);
  const [closing, setClosing] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const isOpen = opened || preview || still;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function open() {
    if (isOpen || closing) return;
    setClosing(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(() => setOpened(true), reduce ? 200 : 900);
  }

  return (
    <div data-still={still ? "" : undefined}>
      <Invitation greeting={greeting} />

      {!isOpen && <Cover greeting={greeting} closing={closing} onOpen={open} />}

      {(isOpen || closing) && (
        <MusicPlayer src={event.music.src} title={event.music.title} />
      )}
    </div>
  );
}
