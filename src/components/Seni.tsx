"use client";
import { useRef, useState, type PointerEvent } from "react";
import { contohGambar } from "../data/contoh-gambar";
import { Ilustrasi } from "./Ilustrasi";
import { gambar } from "../data/mewarnai";
import { warna } from "../data/materi";
import { efek } from "../lib/audio";
import { TombolBesar } from "./TombolBesar";
import { TombolSuara } from "./TombolSuara";
const palet = warna;
const lebar = 1000;
const tinggi = 620;

function Palet({ aktif, pilih }: { aktif: string; pilih: (warna: string) => void }) {
  return <div className="palette" aria-label="Pilihan warna">{palet.map(([nama, nilai]) => <button key={nama} type="button" aria-label={nama} title={nama} aria-pressed={aktif === nilai} onClick={() => { efek("klik"); pilih(nilai); }}><span style={{background: nilai}}/></button>)}</div>;
}

export function GambarBebas() {
  const kanvas = useRef<HTMLCanvasElement>(null);
  const gores = useRef<{ id: number; x: number; y: number } | null>(null);
  const [warna, pilih] = useState(palet[0][1]);
  const [ukuran, ukuranBaru] = useState(14);
  const [hapus, setHapus] = useState(false);
  const [contoh, pilihContoh] = useState(0);
  const [namaContoh, ikonContoh, langkah] = contohGambar[contoh];

  function titik(event: PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * lebar / rect.width, y: (event.clientY - rect.top) * tinggi / rect.height };
  }

  function gambar(event: PointerEvent<HTMLCanvasElement>, mulai: boolean) {
    const el = event.currentTarget;
    const lama = gores.current;
    if (mulai ? lama || event.button !== 0 : lama?.id !== event.pointerId) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    if (mulai) el.setPointerCapture(event.pointerId);
    const {x,y} = titik(event);
    ctx.globalCompositeOperation = hapus ? "destination-out" : "source-over";
    ctx.strokeStyle = warna;
    ctx.lineWidth = hapus ? ukuran * 2 : ukuran;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lama?.x ?? x - 0.01, lama?.y ?? y);
    ctx.lineTo(x,y);
    ctx.stroke();
    gores.current = {id:event.pointerId,x,y};
  }

  function selesai(event: PointerEvent<HTMLCanvasElement>) {
    if (gores.current?.id === event.pointerId) gores.current = null;
  }
  function simpan() {
    const asal = kanvas.current;
    if (!asal) return;
    const file = document.createElement("canvas");
    file.width = lebar; file.height = tinggi;
    const ctx = file.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, lebar, tinggi);
    ctx.drawImage(asal, 0, 0);
    const link = document.createElement("a");
    link.download = "gambar-kelasceria.png";
    link.href = file.toDataURL("image/png");
    link.click();
  }
  return <section className="play-panel art-panel">
    <div className="question"><h2>Ayo menggambar!</h2><TombolSuara teks="Pilih warna, lalu gambar dengan jarimu atau tetikus."/></div>
    <div className="example-picker drawing-picker" aria-label="Pilih contoh gambar">
      {contohGambar.map(([nama, ikon], i) => <button type="button" key={ikon} aria-pressed={i === contoh} onClick={() => { efek("klik"); pilihContoh(i); }}><Ilustrasi isi={ikon}/>{nama}</button>)}
    </div>
    <div className="drawing-reference">
      <Ilustrasi isi={ikonContoh}/>
      <div><h3>Coba gambar {namaContoh.toLowerCase()}!</h3><p>{langkah}</p></div>
      <TombolSuara teks={"Coba gambar " + namaContoh + ". " + langkah}/>
    </div>
    <Palet aktif={hapus ? "" : warna} pilih={(nilai) => { pilih(nilai); setHapus(false); }}/>
    <canvas width={lebar} height={tinggi} className="canvas" aria-label="Kanvas menggambar" ref={kanvas} onPointerDown={(event) => gambar(event, true)} onPointerMove={(event) => gambar(event, false)} onPointerUp={selesai} onPointerCancel={selesai} onLostPointerCapture={selesai}/>
    <div className="button-row art-tools">
      <label className="brush">Ukuran kuas <input type="range" min={4} max={50} value={ukuran} onChange={(event) => ukuranBaru(Number(event.target.value))}/></label>
      <TombolBesar aria-pressed={hapus} className={hapus ? "primary" : ""} onClick={() => setHapus(!hapus)}>Penghapus</TombolBesar>
      <TombolBesar onClick={() => kanvas.current?.getContext("2d")?.clearRect(0,0,lebar,tinggi)}>Bersihkan</TombolBesar>
      <TombolBesar className="primary" onClick={simpan}>Simpan PNG</TombolBesar>
    </div>
  </section>;
}

export function Mewarnai() {
  const [i, pilihGambar] = useState(0);
  const [warna, pilihWarna] = useState(palet[0][1]);
  const [isian, setIsian] = useState<Record<string, string>>({});
  const pilihan = gambar[i];
  function isi(nama: string) {
    efek("klik");
    setIsian((lama) => ({...lama, [i + "-" + nama]: warna}));
  }
  return <section className="play-panel art-panel">
    <div className="question"><h2>Ayo mewarnai!</h2><TombolSuara teks="Pilih gambar dan warna. Sentuh bagian gambar untuk mewarnainya."/></div>
    <div className="example-picker coloring-picker" aria-label="Pilih gambar untuk diwarnai">
      {gambar.map(({ nama, bidang }, index) => <button key={nama} type="button" aria-pressed={i === index} onClick={() => { efek("klik"); pilihGambar(index); }}>
        <svg viewBox="0 0 400 260" aria-hidden="true">{bidang.map(([nama, d]) => <path key={nama} d={d} fill="white" stroke="#675589" strokeWidth="7"/>)}</svg>
        {nama}
      </button>)}
    </div>
    <Palet aktif={warna} pilih={pilihWarna}/>
    <svg className="coloring" viewBox="0 0 400 260" aria-label={pilihan.nama}>
      {pilihan.bidang.map(([nama,d]) => <path key={nama} d={d} fill={isian[i + "-" + nama] ?? "white"} stroke="#433254" strokeWidth="2.4" role="button" tabIndex={0} aria-label={nama} onClick={() => isi(nama)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); isi(nama); } }}/>)}
    </svg>
    <TombolBesar onClick={() => setIsian((lama) => Object.fromEntries(Object.entries(lama).filter(([kunci]) => !kunci.startsWith(i + "-"))))}>Bersihkan</TombolBesar>
  </section>;
}
