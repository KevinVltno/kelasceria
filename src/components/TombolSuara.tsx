"use client";
import { baca } from "../lib/audio";
import { Ikon } from "./Ikon";

export function TombolSuara({ teks, judul = "Ulangi suara" }: { teks: string; judul?: string }) {
  return <button className="icon-button sound-button" aria-label={judul} title={judul} onClick={() => baca(teks)}><Ikon nama="sound"/></button>;
}
