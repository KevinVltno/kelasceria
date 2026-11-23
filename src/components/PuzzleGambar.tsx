"use client";

import { useState } from "react";
import { contohGambar } from "../data/contoh-gambar";
import { useProgress } from "../hooks/useProgress";
import { useSuara } from "../hooks/useSuara";
import { acak } from "../lib/soal";
import { Ilustrasi } from "./Ilustrasi";
import { Ikon } from "./Ikon";
import { Konfeti } from "./Konfeti";
import { TombolBesar } from "./TombolBesar";
import { TombolSuara } from "./TombolSuara";

const id = "puzzle-gambar";
const instruksi = "Sentuh satu potongan, lalu sentuh potongan lain untuk menukar tempatnya. Lihat gambar contoh jika perlu.";

export function PuzzleGambar() {
  const { permainan, hadiah, siap } = useProgress();
  const { baca, efek } = useSuara();
  const [pilihan, pilihGambar] = useState(0);
  const [sisi, setSisi] = useState(2);
  const [papan, setPapan] = useState<number[]>([]);
  const [dipilih, setDipilih] = useState<number | null>(null);
  const [bintang, setBintang] = useState(0);
  const [bantuan, setBantuan] = useState(true);
  const [nomor, setNomor] = useState(false);
  const [nama, gambar] = contohGambar[pilihan];
  const petak = `repeat(${sisi}, minmax(0, 1fr))`;

  function mulai(index: number, sisiBaru: number) {
    const potongan = acak(Array.from({ length: sisiBaru ** 2 }, (_, i) => i));
    if (potongan.every((isi, i) => isi === i)) [potongan[0], potongan[1]] = [potongan[1], potongan[0]];
    pilihGambar(index);
    setSisi(sisiBaru);
    setPapan(potongan);
    setDipilih(null);
    setBintang(0);
    baca(instruksi);
  }

  function tukar(i: number) {
    if (bintang) return;
    if (dipilih === null || dipilih === i) {
      setDipilih(dipilih === i ? null : i);
      return;
    }
    const baru = [...papan];
    [baru[i], baru[dipilih]] = [baru[dipilih], baru[i]];
    setPapan(baru);
    setDipilih(null);
    if (baru.every((isi, posisi) => isi === posisi)) {
      const nilai = sisi - 1;
      hadiah(id, nilai);
      setBintang(nilai);
      efek("bintang");
      baca("Hebat! Gambar " + nama + " sudah tersusun.");
    }
  }

  return <section className="play-panel puzzle-panel">
    <div className="question"><h2>Susun gambar</h2><TombolSuara teks={instruksi}/></div>
    {!papan.length ? <>
      <div className="example-picker" aria-label="Pilih gambar puzzle">{contohGambar.map(([label, ikon], i) =>
        <button type="button" key={ikon} aria-pressed={i === pilihan} onClick={() => { efek("klik"); pilihGambar(i); }}>
          <Ilustrasi isi={ikon}/>{label}
        </button>
      )}</div>
      <div className="button-row" aria-label="Jumlah potongan">{[2, 3, 4].map((jumlah) =>
        <TombolBesar key={jumlah} aria-pressed={sisi === jumlah} disabled={jumlah > (permainan[id]?.level ?? 1) + 1} className={sisi === jumlah ? "primary" : ""} onClick={() => setSisi(jumlah)}>{jumlah ** 2} potongan</TombolBesar>
      )}</div>
      <TombolBesar className="primary" disabled={!siap} onClick={() => mulai(pilihan, sisi)}>Mulai Puzzle</TombolBesar>
    </> : <>
      <div className="puzzle-workspace">
        <div className={"puzzle-board" + (bintang ? " solved" : "")} style={{ gridTemplateColumns: petak, gridTemplateRows: petak }} aria-label={"Puzzle " + nama}>
          {papan.map((potongan, i) => {
            const ukuran = 64 / sisi;
            const bidang = [potongan % sisi * ukuran, Math.floor(potongan / sisi) * ukuran, ukuran, ukuran].join(" ");
            return <button type="button" key={i} disabled={Boolean(bintang)} aria-label={"Petak " + (i + 1) + (nomor ? ", potongan " + (potongan + 1) : "")} aria-pressed={i === dipilih} onClick={() => { efek("klik"); tukar(i); }}>
              <Ilustrasi isi={gambar} bidang={bidang}/>
              {nomor && !bintang && <span className="puzzle-number">{potongan + 1}</span>}
            </button>;
          })}
        </div>
        <div className="puzzle-reference">
          {bantuan && <figure><Ilustrasi isi={gambar}/><figcaption>Contoh {nama}</figcaption></figure>}
          {!bintang && <>
            <button type="button" className="art-secondary" onClick={() => setBantuan(!bantuan)}>{bantuan ? "Sembunyikan contoh" : "Lihat contoh"}</button>
            <button type="button" className="art-secondary" aria-pressed={nomor} onClick={() => setNomor(!nomor)}>Petunjuk nomor</button>
          </>}
        </div>
      </div>
      <p role="status">{bintang ? "Hebat! Gambar sudah tersusun." : dipilih !== null ? "Sekarang pilih potongan yang ingin ditukar." : "Sentuh dua potongan untuk menukar tempat."}</p>
      {Boolean(bintang) && <><Konfeti/><div className="puzzle-stars" aria-label={bintang + " bintang"}>{Array.from({ length: bintang }, (_, i) => <Ikon key={i} nama="star" ukuran={34}/>)}</div></>}
      <div className="button-row">
        {Boolean(bintang) && <TombolBesar className="primary" onClick={() => mulai(pilihan, sisi)}>Main Lagi</TombolBesar>}
        <TombolBesar onClick={() => { setPapan([]); setDipilih(null); }}>Pilih Gambar</TombolBesar>
      </div>
    </>}
  </section>;
}
