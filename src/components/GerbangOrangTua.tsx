"use client";
import { useState, type ReactNode } from "react";
import { Ilustrasi } from "./Ilustrasi";
import { TombolBesar } from "./TombolBesar";

export function GerbangOrangTua({ children }: { children: ReactNode }) {
  const [terbuka, buka] = useState(false);
  const [salah, setSalah] = useState(false);
  if (terbuka) return children;
  return <section className="play-panel intro">
    <div className="intro-icon" aria-hidden="true"><Ilustrasi isi="gembok"/></div>
    <h2>Untuk Orang Tua</h2>
    <p>Jawab soal untuk membuka pengaturan.</p>
    <div className="gate-math">3 + 4 = ?</div>
    <div className="answers">{[5, 7, 9].map((n) => <TombolBesar key={n} onClick={() => n === 7 ? buka(true) : setSalah(true)}>{n}</TombolBesar>)}</div>
    {salah && <p role="status">Silakan coba lagi.</p>}
  </section>;
}
