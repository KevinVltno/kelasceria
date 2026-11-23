"use client";
import { useEffect } from "react";
import { aktifkanAudio, aturAudio, hentikanBacaan, visibilitas, type PengaturanAudio, type RekamanBgm } from "../lib/audio";

export function useBgm(audio: PengaturanAudio, siap: boolean, rekaman: RekamanBgm) {
  useEffect(() => {
    if (!siap) return;
    const mode = () => aturAudio(audio, ["/", "/pengaturan/","/pengaturan"].includes(location.pathname) ? "menu" : "main", rekaman);
    mode();
    const mulai = () => { mode(); aktifkanAudio(); };
    const navigasi = () => { hentikanBacaan(); mode(); };
    addEventListener("pointerdown", mulai);
    addEventListener("keydown", mulai);
    addEventListener("popstate", navigasi);
    addEventListener("kelasceria:navigasi", navigasi);
    document.addEventListener("visibilitychange", visibilitas);
    return () => {
      removeEventListener("pointerdown", mulai);
      removeEventListener("keydown", mulai);
      removeEventListener("popstate", navigasi);
      removeEventListener("kelasceria:navigasi", navigasi);
      document.removeEventListener("visibilitychange", visibilitas);
    };
  }, [audio, siap, rekaman]);
}
