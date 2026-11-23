"use client";
import { tubuh } from "../data/materi";
const posisi = [[98,39],[123,81],[104,105],[100,131],[28,185],[127,285],[153,99],[100,152],[81,254]];

export function Tubuh({ opsi, pilih, status, dipilih }: { opsi: string[]; pilih: (nama: string) => void; status: string | null; dipilih: string }) {
  return <div className="body-map">
    <svg viewBox="0 0 200 315" aria-hidden="true">
      <path d="M68 164 28 186m104-22 40 22" stroke="#f1ab83" strokeWidth="21" strokeLinecap="round"/>
      <path d="M81 229v55m38-55v55" stroke="#f1ab83" strokeWidth="23" strokeLinecap="round"/>
      <path d="M80 279q-20 0-19 19h30v-19m28 0q20 0 20 19h-30v-19" fill="#6846b4"/>
      <rect x="69" y="200" width="62" height="45" rx="12" fill="#546ec6"/>
      <path d="M60 157q40-27 80 0l-11 18v42H71v-42z" fill="#9c77ef"/>
      <path d="M88 144v15q12 13 24 0v-15" fill="#f1ab83"/>
      <ellipse cx="150" cy="99" rx="10" ry="14" fill="#f1ab83"/>
      <ellipse cx="50" cy="99" rx="10" ry="14" fill="#f1ab83"/>
      <ellipse cx="100" cy="94" rx="54" ry="59" fill="#ffca9e"/>
      <path d="M47 91q-13-63 51-66 54-1 56 56-27-2-44-27-23 25-63 37" fill="#5b3a4b"/>
      <ellipse cx="78" cy="86" rx="5" ry="8" fill="#49314f"/><ellipse cx="122" cy="86" rx="5" ry="8" fill="#49314f"/>
      <path d="m101 96 6 11h-9m-10 14q12 13 24 0" fill="none" stroke="#a35460" strokeWidth="4" strokeLinecap="round"/>
      <ellipse cx="66" cy="111" rx="9" ry="5" fill="#ffa08e"/><ellipse cx="134" cy="111" rx="9" ry="5" fill="#ffa08e"/>
    </svg>
    {tubuh.map(([nama], i) => opsi.includes(nama) && <button key={nama} type="button" className={dipilih === nama ? status ?? "" : ""} disabled={status === "benar"} aria-label={nama} style={{left: posisi[i][0] / 2 + "%", top: posisi[i][1] / 3.15 + "%"}} onClick={() => pilih(nama)}><span/></button>)}
  </div>;
}
