"use client";
import { useState } from "react";
import { Bilah } from "../components/Bilah";
import { Ikon } from "../components/Ikon";
import { KartuMenu } from "../components/KartuMenu";
import { Maskot } from "../components/Maskot";
import { games } from "../data/menu";
import { useProgress } from "../hooks/useProgress";
import { efek } from "../lib/audio";

const kategori = [["Semua", "grid"], ["Dasar","book"], ["Sekitar Kita","home"], ["Logika","puzzle"], ["Kreatif","palette"]];

export default function Home() {
  const [aktif, setAktif] = useState("Semua");
  const { permainan } = useProgress();
  const tampil = games.filter((game) => aktif === "Semua" || game[5] === aktif);
  return <>
    <Bilah/>
    <main className="container menu">
      <section className="hero">
        <div className="hero-copy">
          <h1>Halo, <em>Teman Ceria!</em></h1>
          <p>Yuk, pilih permainan favoritmu dan<br className="desktop-break"/> kumpulkan bintang!</p>
          <a className="hero-action" href="#permainan" onClick={() => efek("klik")}><Ikon nama="play" ukuran={20}/> Ayo Bermain!</a>
        </div>
        <div className="hero-picture"><Maskot className="hero-mascot"/></div>
      </section>
      <section id="permainan" className="activities" aria-labelledby="judul-permainan">
        <div className="section-title"><span className="section-icon"><Ikon nama="grid" ukuran={24}/></span><div><h2 id="judul-permainan">Pilih Permainan</h2><p>Temukan hal baru setiap hari.</p></div></div>
        <div className="filters" aria-label="Kategori permainan">
          {kategori.map(([nama, ikon]) => <button key={nama} type="button" aria-pressed={aktif === nama} className={aktif === nama ? "selected" : ""} onClick={() => { efek("klik"); setAktif(nama); }}><Ikon nama={ikon} ukuran={18}/>{nama}</button>)}
        </div>
        <div className="game-grid">{tampil.map((game) => <KartuMenu game={game} key={game[0]} level={permainan[game[0]]?.level}/>)}</div>
      </section>
      <footer><Ikon nama="star" ukuran={17}/> KelasCeria · Dibuat untuk anak usia 4–6 tahun</footer>
    </main>
  </>;
}
