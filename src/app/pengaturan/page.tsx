"use client";
import { useState } from "react";
import { Ikon } from "../../components/Ikon";
import { Bilah } from "../../components/Bilah";
import { GerbangOrangTua } from "../../components/GerbangOrangTua";
import { TombolBesar } from "../../components/TombolBesar";
import { useProgress } from "../../hooks/useProgress";
import type { Kanal } from "../../lib/audio";

const kanal: [Kanal, string][] = [["bgm","Musik latar"],["efek","Efek suara"],["suara","Suara pembaca"]];

function PengaturanAudio() {
  const { audio, ubahAudio, reset } = useProgress();
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [pesan, setPesan] = useState("");
  return <section className="play-panel settings-panel">
    <h2>Pengaturan Suara</h2>
    {kanal.map(([id, nama]) => <fieldset key={id}>
      <legend>{nama}</legend>
      <label className="toggle"><input type="checkbox" checked={audio[id].aktif} onChange={(event) => ubahAudio(id, {aktif: event.target.checked})}/> <span>{audio[id].aktif ? "Aktif" : "Mati"}</span></label>
      <label className="volume">Volume <input type="range" min={0} max={100} value={Math.round(audio[id].volume * 100)} onChange={(event) => ubahAudio(id, {volume: Number(event.target.value) / 100})}/><output>{Math.round(audio[id].volume * 100)}%</output></label>
    </fieldset>)}
    <h2>Progres</h2>
    {konfirmasi ? <><p>Hapus semua bintang dan level dari perangkat ini?</p><div className="button-row"><TombolBesar className="primary" onClick={() => { reset(); setKonfirmasi(false); setPesan("Progres sudah direset."); }}>Ya, Reset</TombolBesar><TombolBesar onClick={() => setKonfirmasi(false)}>Batal</TombolBesar></div></> : <TombolBesar onClick={() => { setKonfirmasi(true); setPesan(""); }}>Reset Progres</TombolBesar>}
    <p role="status">{pesan}</p>
  </section>;
}

export default function Pengaturan() {
  return <><Bilah kembali/><main className="container game-page"><div className="game-heading"><h1><Ikon nama="settings" ukuran={38}/> Pengaturan</h1></div><GerbangOrangTua><PengaturanAudio/></GerbangOrangTua></main></>;
}
