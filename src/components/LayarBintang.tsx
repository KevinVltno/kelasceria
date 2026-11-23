"use client";
import Link from "next/link";
import { Konfeti } from "./Konfeti";
import { Maskot } from "./Maskot";
import { TombolBesar } from "./TombolBesar";
import { Ikon } from "./Ikon";
import { efek } from "../lib/audio";

export function LayarBintang({ bintang, ulang }: { bintang: number; ulang: () => void }) {
  return <section className="play-panel celebration">
    <Konfeti/><Maskot className="small-mascot"/>
    <h2>Hebat, Teman Ceria!</h2>
    <div className="reward-stars" aria-label={bintang + " dari 3 bintang"}>{Array.from({length:3}, (_, i) => <span aria-hidden="true" key={i} className={i < bintang ? "earned" : ""}><Ikon nama="star"/></span>)}</div>
    <p>Kamu mendapat {bintang} bintang!</p>
    <div className="button-row"><TombolBesar className="primary" onClick={ulang}>Main Lagi</TombolBesar><Link className="big-button" href="/" onClick={() => efek("klik")}><Ikon nama="home"/> Menu</Link></div>
  </section>;
}
