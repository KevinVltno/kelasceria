"use client";
import { DeretIlustrasi } from "./Ilustrasi";
import { TombolBesar } from "./TombolBesar";

export function PilihanJawaban({ jawaban, gambar, tampilkanNama, dipilih, status, pilih }: { jawaban: string[]; gambar?: Record<string, string[]>; tampilkanNama?: boolean; dipilih: string; status: "benar" | "salah" | null; pilih: (isi: string) => void }) {
  return <div className="answers">{jawaban.map((isi) => <TombolBesar key={isi} aria-label={isi} disabled={status === "benar"} className={isi === dipilih && status ? status : ""} onClick={() => pilih(isi)}>{gambar?.[isi] ? <span className="answer-illustration"><DeretIlustrasi isi={gambar[isi]}/>{tampilkanNama && <span>{isi}</span>}</span> : isi}</TombolBesar>)}</div>;
}
