"use client";
import { useEffect, useRef, useState } from "react";
import { buatSoal, type Soal } from "../lib/soal";
import { useProgress } from "./useProgress";
import { useSuara } from "./useSuara";

export function useRonde(id: string) {
  const { permainan, hadiah } = useProgress();
  const [soal, setSoal] = useState<Soal[]>([]);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const [bintang, setBintang] = useState(0);
  const [level, setLevel] = useState(1);
  const [jawaban, setJawaban] = useState("");
  const timer = useRef<number | undefined>(undefined);
  const terkunci = useRef(false);
  const { baca, efek } = useSuara();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function mulai() {
    const tingkat = permainan[id]?.level ?? 1;
    const bank = buatSoal(id, tingkat + 1);
    if (!bank.length) return;
    window.clearTimeout(timer.current);
    terkunci.current = false;
    setLevel(tingkat);
    setIndex(0);
    setStatus(null);
    setBintang(0);
    setJawaban("");
    setSoal(bank);
    baca(bank[0].instruksi);
  }
  function jawab(pilihan: string) {
    if (terkunci.current || !soal[index]) return;
    setJawaban(pilihan);
    if (pilihan !== soal[index].benar) {
      efek("salah");
      baca("Ayo coba lagi ya!");
      setStatus("salah");
      return;
    }
    terkunci.current = true;
    setStatus("benar");
    efek("benar");
    baca(index % 2 ? "Pintar sekali!" : "Hebat!");
    timer.current = window.setTimeout(() => {
      if (index + 1 === soal.length) {
        const nilai = level;
        hadiah(id, nilai);
        setBintang(nilai);
        efek("selesai");
        timer.current = window.setTimeout(() => efek("bintang"), 560);
        baca("Hebat! Kamu mendapat " + nilai + " bintang!");
      } else {
        setIndex(index + 1);
        baca(soal[index + 1].instruksi);
      }
      setStatus(null);
      setJawaban("");
      terkunci.current = false;
    }, 1450);
  }
  return { mulai, jawab, soal: soal[index], index, jumlah: soal.length, status, bintang, level, jawaban };
}
