"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useBgm } from "./useBgm";
import type { Kanal, PengaturanAudio, RekamanBgm } from "../lib/audio";

type Data = { bintang: number; permainan: Record<string, { level: number; ronde: number }>; audio: PengaturanAudio };
const awal: Data = { bintang: 0, permainan: {}, audio: {
  bgm: { aktif: true, volume: 0.34 }, efek: { aktif: true, volume: 0.63 }, suara: { aktif: true, volume: 0.85 },
} };
const kunci = "kelasceria-progres";
type Progres = Data & {
  siap: boolean;
  ubahAudio: (kanal: Kanal, nilai: Partial<PengaturanAudio[Kanal]>) => void;
  hadiah: (id: string, nilai: number) => void;
  reset: () => void;
};
const Context = createContext<Progres | null>(null);

export function ProgressProvider({ children, rekaman }: { children: ReactNode; rekaman: RekamanBgm }) {
  const [tersimpan, simpan] = useState<Data | null>(null);
  const data = tersimpan ?? awal;
  const siap = tersimpan !== null;
  const pathname = usePathname();
  useBgm(data.audio, siap, rekaman);
  useEffect(() => { dispatchEvent(new Event("kelasceria:navigasi")); }, [pathname]);
  useEffect(() => {
    let nilai = awal;
    try {
      const lama = JSON.parse(localStorage.getItem(kunci) ?? "null") as Partial<Data> | null;
      if (lama) nilai = { ...awal, ...lama, audio: {
        bgm: { ...awal.audio.bgm, ...lama.audio?.bgm },
        efek: { ...awal.audio.efek, ...lama.audio?.efek },
        suara: { ...awal.audio.suara, ...lama.audio?.suara },
      } };
    } catch { /* Progres baru tetap dapat dipakai. */ }
    // Pembacaan penyimpanan hanya dilakukan setelah hidrasi.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    simpan(nilai);
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" }).catch(() => {});
    }
  }, []);
  useEffect(() => {
    if (!tersimpan) return;
    try { localStorage.setItem(kunci, JSON.stringify(tersimpan)); } catch { /* Tetap bermain dalam sesi ini. */ }
  }, [tersimpan]);

  const value: Progres = {
    ...data, siap,
    ubahAudio: (kanal, nilai) => simpan((lama) => {
      const data = lama ?? awal;
      return { ...data, audio: { ...data.audio, [kanal]: { ...data.audio[kanal], ...nilai } } };
    }),
    hadiah: (id, nilai) => simpan((lama) => {
      const data = lama ?? awal;
      const main = data.permainan[id] ?? { level: 1, ronde: 0 };
      return { ...data, bintang: data.bintang + nilai, permainan: {
        ...data.permainan, [id]: { ronde: main.ronde + 1, level: Math.min(3, main.level + 1) },
      } };
    }),
    reset: () => simpan((lama) => ({ ...(lama ?? awal), bintang: 0, permainan: {} })),
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useProgress() {
  const value = useContext(Context);
  if (!value) throw new Error("ProgressProvider diperlukan.");
  return value;
}
