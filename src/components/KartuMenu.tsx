"use client";
import Link from "next/link";
import type { Game } from "../data/menu";
import { efek } from "../lib/audio";
import { Ilustrasi } from "./Ilustrasi";
import { Ikon } from "./Ikon";

export function KartuMenu({ game, level }: { game: Game; level?: number }) {
  const [id, nama, deskripsi, gambar, warna] = game;
  return <Link className={"game-card tone-" + warna} href={"/" + id + "/"} onClick={() => efek("klik")}>
    <span className="card-art" aria-hidden="true"><Ilustrasi isi={gambar}/></span>
    <span className="card-meta"><strong>{nama}</strong><span>{deskripsi}{level && level > 1 ? " · Level " + level : ""}</span></span>
    <span className="card-next"><Ikon nama="next" ukuran={19}/></span>
  </Link>;
}
