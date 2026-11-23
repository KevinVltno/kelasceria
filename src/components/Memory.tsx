"use client";
import { useEffect, useRef, useState } from "react";
import { materi } from "../data/materi";
import { acak } from "../lib/soal";
import { useProgress } from "../hooks/useProgress";
import { useSuara } from "../hooks/useSuara";
import { TombolBesar } from "./TombolBesar";
import { TombolSuara } from "./TombolSuara";
import { LayarBintang } from "./LayarBintang";
import { Ilustrasi } from "./Ilustrasi";
import { Ikon } from "./Ikon";
import { Konfeti } from "./Konfeti";

const id = "mencocokkan";
const jumlahPasangan = 10;
const instruksi = "Balik dua kartu. Temukan sepuluh pasangan gambar yang sama!";
const bank = [...new Map(materi["tebak-gambar"].map((entri) => [entri[1], entri])).values()];

export function Memory() {
  const { hadiah, permainan, siap } = useProgress();
  const { baca, efek } = useSuara();
  const [kartu, setKartu] = useState<string[][]>([]);
  const [terbuka, buka] = useState<number[]>([]);
  const [pasang, setPasang] = useState<number[]>([]);
  const [pesan, setPesan] = useState("");
  const [menang, setMenang] = useState(0);
  const [level, setLevel] = useState(1);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  function mulai() {
    window.clearTimeout(timer.current);
    const gambar = acak(bank).slice(0, jumlahPasangan);
    setKartu(acak([...gambar, ...gambar]));
    setLevel(permainan[id]?.level ?? 1);
    setMenang(0);
    buka([]);
    setPasang([]);
    setPesan("");
    baca(instruksi);
  }

  function pilih(i: number) {
    if (terbuka.length === 2 || pasang.includes(i) || terbuka.includes(i)) return;
    if (!terbuka.length) {
      buka([i]);
      setPesan("");
      return;
    }
    const pertama = terbuka[0];
    const sama = kartu[pertama][1] === kartu[i][1];
    buka([pertama, i]);
    setPesan(sama ? "Hebat! Pasangannya ketemu." : "Coba pasangan lain, ya!");
    efek(sama ? "benar" : "salah");
    baca(sama ? "Hebat!" : "Coba pasangan lain, ya!");
    timer.current = window.setTimeout(() => {
      if (sama) {
        const ditemukan = [...pasang, pertama, i];
        setPasang(ditemukan);
        if (ditemukan.length === kartu.length) {
          hadiah(id, level);
          setMenang(level);
          efek("selesai");
          timer.current = window.setTimeout(() => efek("bintang"), 560);
          baca("Kamu berhasil menemukan semua pasangan!");
        }
      }
      buka([]);
    }, sama ? 650 : 1000);
  }

  if (menang) return <LayarBintang bintang={menang} ulang={mulai}/>;
  return <section className="play-panel quiz">
    <div className="question"><h2>{kartu.length ? "Cari pasangan gambar" : "Ayo cari pasangan!"}</h2><TombolSuara teks={instruksi}/></div>
    {!kartu.length ? <>
      <div className="intro-icon"><Ilustrasi isi="kartu"/></div>
      <p>20 kartu · 10 pasangan</p>
      <TombolBesar className="primary" disabled={!siap} onClick={mulai}>Mulai Bermain</TombolBesar>
    </> : <>
      <p role="status">{pasang.length / 2} / {jumlahPasangan} pasangan ditemukan</p>
      <div className="memory-grid" aria-label="Papan 20 kartu">{kartu.map(([nama, gambar], i) => {
        const cocok = pasang.includes(i);
        const lihat = cocok || terbuka.includes(i);
        return <TombolBesar key={i} className={cocok ? "benar" : lihat ? "flipped" : "memory-back"} disabled={lihat || terbuka.length === 2} aria-label={lihat ? nama : "Buka kartu " + (i + 1)} onClick={() => pilih(i)}>{lihat ? <Ilustrasi isi={gambar}/> : "?"}</TombolBesar>;
      })}</div>
      <div className="feedback" role="status">{pesan.startsWith("Hebat") && <Ikon nama="star"/>}{pesan}</div>
      {pesan.startsWith("Hebat") && terbuka.length === 2 && <Konfeti/>}
    </>}
  </section>;
}
