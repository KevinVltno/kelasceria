"use client";
import { useProgress } from "../hooks/useProgress";
import { Ikon } from "./Ikon";

export function TombolMusik() {
  const { audio, ubahAudio } = useProgress();
  return <button className={"icon-button " + (!audio.bgm.aktif ? "muted" : "")} aria-label="Musik latar" title="Musik latar" aria-pressed={audio.bgm.aktif} onClick={() => ubahAudio("bgm", { aktif: !audio.bgm.aktif })}><Ikon nama="music"/></button>;
}
