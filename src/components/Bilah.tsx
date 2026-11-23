"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress } from "../hooks/useProgress";
import { efek } from "../lib/audio";
import { Ikon } from "./Ikon";
import { TombolMusik } from "./TombolMusik";

export function Bilah({ kembali = false }: { kembali?: boolean }) {
  const { bintang } = useProgress();
  const [penuh, setPenuh] = useState(false);
  useEffect(() => {
    const ubah = () => setPenuh(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", ubah);
    return () => document.removeEventListener("fullscreenchange", ubah);
  }, []);
  function fullscreen() {
    efek("klik");
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    else void document.documentElement.requestFullscreen?.().catch(() => {});
  }
  return <header className="site-header"><div className="header-inner">
    <Link href="/" className="brand" onClick={() => efek("klik")}><span className="brand-icon"><Ikon nama="star" ukuran={25}/></span><span>Kelas<span>Ceria</span><small>Belajar sambil bermain</small></span></Link>
    <div className="header-tools">
      <span className="star-counter" aria-label={bintang + " bintang"}><Ikon nama="star" ukuran={21}/><strong>{bintang}</strong><span>Bintang</span></span>
      <TombolMusik/>
      <button className="icon-button fullscreen" aria-label={penuh ? "Keluar layar penuh" : "Layar penuh"} title="Layar penuh" onClick={fullscreen}><Ikon nama="full"/></button>
      <Link className="icon-button settings" href={kembali ? "/" : "/pengaturan/"} aria-label={kembali ? "Rumah" : "Pengaturan"} title={kembali ? "Rumah" : "Pengaturan"} onClick={() => efek("klik")}><Ikon nama={kembali ? "home" : "settings"}/></Link>
    </div>
  </div></header>;
}
