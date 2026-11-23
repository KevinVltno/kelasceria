"use client";
import Link from "next/link";
import { useState } from "react";
import { angka } from "../data/angka";
import { huruf } from "../data/huruf";
import { planet } from "../data/kuis-tema";
import { hari, materi } from "../data/materi";
import type { Game } from "../data/menu";
import { useProgress } from "../hooks/useProgress";
import { useRonde } from "../hooks/useRonde";
import { useSuara } from "../hooks/useSuara";
import { Bilah } from "./Bilah";
import { GambarBebas, Mewarnai } from "./Seni";
import { DeretIlustrasi, Ilustrasi } from "./Ilustrasi";
import { Ikon } from "./Ikon";
import { Konfeti } from "./Konfeti";
import { LayarBintang } from "./LayarBintang";
import { PuzzleGambar } from "./PuzzleGambar";
import { Memory } from "./Memory";
import { PilihanJawaban } from "./PilihanJawaban";
import { TombolBesar } from "./TombolBesar";
import { TombolSuara } from "./TombolSuara";
import { Tubuh } from "./Tubuh";

function Materi({ data, warna }: { data: string[][]; warna: boolean }) {
  const [i, pilih] = useState(0);
  const [label, gambar, suara, ringkasan] = data[i];
  const { baca } = useSuara();
  function geser(arah: number) {
    const next = (i + arah + data.length) % data.length;
    pilih(next);
    baca([data[next][0], data[next][3]].filter(Boolean).join(". "));
  }
  return <div className="lesson">
    <TombolBesar className="square" aria-label="Materi sebelumnya" onClick={() => geser(-1)}><Ikon nama="back"/></TombolBesar>
    <div><div className="lesson-picture">{warna ? <span className="color-sample" style={{ background: gambar }}/> : <DeretIlustrasi isi={gambar.split(' ')}/>}</div><strong>{label}</strong>{ringkasan && <p className="lesson-summary">{ringkasan}</p>}<small>{i+1} / {data.length}</small></div>
    <TombolBesar className="square" aria-label="Materi berikutnya" onClick={() => geser(1)}><Ikon nama="next"/></TombolBesar>
    <TombolSuara teks={[label, suara, ringkasan].filter(Boolean).join(". ")}/>
  </div>;
}

function Kuis({ game }: { game: Game }) {
  const [id, nama, deskripsi, gambar] = game;
  const ronde = useRonde(id);
  const { siap, permainan } = useProgress();
  if (ronde.bintang) return <LayarBintang bintang={ronde.bintang} ulang={ronde.mulai}/>;
  const soal = ronde.soal;
  if (!soal) {
    const data = id === "mengenal-huruf" ? huruf.map(([h, kata, gambar]) => [h + " untuk " + kata, gambar])
      : id === "mengenal-angka" ? angka.map((n) => [String(n), Array.from({ length: n }, () => "bintang").join(" ")])
      : id === "hari-cuaca-perasaan" ? [[...hari].map((nama) => [nama, "kalender"]), materi[id]].flat()
      : materi[id];
    return <section className="play-panel intro">
      <div className="intro-icon" aria-hidden="true"><Ilustrasi isi={gambar}/></div>
      <h2>{nama}</h2><p>{deskripsi}</p>
      {id === "luar-angkasa" && <section className="solar-overview" aria-label="Urutan planet dari Matahari">
        <h3>Urutan planet dari Matahari</h3>
        <ol>{planet.map(([nama, gambar]) => <li key={gambar}><Ilustrasi isi={gambar}/><span>{nama}</span></li>)}</ol>
      </section>}
      {data && <Materi data={data} warna={id === "warna"}/>}
      <div className="button-row">
        <TombolBesar className="primary" disabled={!siap} onClick={ronde.mulai}><Ikon nama="play"/> Mulai Kuis</TombolBesar>
        <TombolSuara teks={nama + ". " + deskripsi + ". Tekan mulai kuis untuk bermain."}/>
      </div>
      <small className="level">Level {permainan[id]?.level ?? 1} · 5 soal</small>
    </section>;
  }
  return <section className="play-panel quiz">
    <div className="round-top"><span>Level {ronde.level}</span><div className="round-dots" aria-label={"Soal " + (ronde.index + 1) + " dari " + ronde.jumlah}>{Array.from({length: ronde.jumlah}, (_, i) => <i key={i} className={i <= ronde.index ? "lit" : ""}/>)}</div><span>{ronde.index + 1} / {ronde.jumlah}</span></div>
    <div className="question"><h2>{soal.instruksi}</h2><TombolSuara teks={soal.instruksi}/></div>
    {id === "anggota-tubuh" ? <Tubuh opsi={soal.pilihan} pilih={ronde.jawab} status={ronde.status} dipilih={ronde.jawaban}/> : <>
      {(soal.baris || soal.visual || soal.suara) && <div className={"question-visual " + (id === "berhitung" ? "math" : "")}>
        {soal.baris && <div className="objects" aria-hidden="true"><DeretIlustrasi isi={soal.baris}/></div>}
        {soal.warna ? <span className="color-sample" style={{background: soal.visual}}/> : soal.visual && <div aria-hidden="true"><Ilustrasi isi={soal.visual}/></div>}
        {soal.suara && <TombolSuara teks={soal.suara} judul="Dengarkan suara hewan"/>}
      </div>}
      <PilihanJawaban jawaban={soal.pilihan} gambar={soal.gambarPilihan} tampilkanNama={soal.tampilkanNamaPilihan} dipilih={ronde.jawaban} status={ronde.status} pilih={ronde.jawab}/>
    </>}
    <div className={"feedback " + (ronde.status ?? "")} role="status">{ronde.status === "benar" ? <><Ikon nama="star"/> Hebat!</> : ronde.status === "salah" ? "Ayo coba lagi ya!" : "\u00a0"}</div>
    {ronde.status === "benar" && <Konfeti/>}
  </section>;
}

export function Permainan({ game }: { game: Game }) {
  const [id, nama, , gambar] = game;
  const { efek } = useSuara();
  return <><Bilah kembali/><main className="container game-page">
    <div className="game-heading">
      <Link href="/" className="icon-button" aria-label="Kembali ke menu" title="Kembali ke menu" onClick={() => efek("klik")}><Ikon nama="back"/></Link>
      <h1><Ilustrasi isi={gambar}/> {nama}</h1>
    </div>
    {id === "menggambar" ? <GambarBebas/> : id === "mewarnai" ? <Mewarnai/> : id === "mencocokkan" ? <Memory/> : id === "puzzle-gambar" ? <PuzzleGambar/> : <Kuis game={game}/>}
  </main></>;
}
