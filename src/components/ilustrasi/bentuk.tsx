import type { ReactNode } from "react";

export const warnaTinta = "#362b55";
export const lingkaran = (x: number, y: number, r: number, fill: string) => <circle cx={x} cy={y} r={r} fill={fill}/>;
export const oval = (x: number, y: number, rx: number, ry: number, fill: string) => <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={fill}/>;
export const kotak = (x: number, y: number, w: number, h: number, fill: string, r = 3) => <rect x={x} y={y} width={w} height={h} rx={r} fill={fill}/>;
export const jalur = (d: string, fill = "none") => <path d={d} fill={fill}/>;
export const detail = (d: string, stroke = warnaTinta, width = 2) => <path d={d} fill="none" stroke={stroke} strokeWidth={width}/>;
export const mata = (x: number, y: number) => <circle cx={x} cy={y} r={2.3} fill={warnaTinta} stroke="none"/>;
export const bintang = "M32 5l8 17 19 3-14 13 4 19-17-9-17 9 4-19L5 25l19-3Z";
export const daun = (x = 0, y = 0) => <g transform={`translate(${x} ${y})`}>{jalur("M32 16Q37 2 51 6Q48 18 32 16Z", "#62c691")}{detail("M32 16q-1-8-5-11")}</g>;
export function gambarBentuk(): Record<string, ReactNode> {
  return {
    bintang: jalur(bintang,"#ffce58"), silang: detail("m15 15 34 34m0-34L15 49", "#df5071", 8),
    lingkaran: lingkaran(32,32,23,"#b38bf7"), persegi: kotak(10,10,44,44,"#79c4f1",2),
    segitiga: jalur("M32 8 57 53H7Z","#ffcb58"), "persegi-panjang": kotak(6,17,52,30,"#79d7ab"),
    oval: oval(32,32,26,17,"#f989b0"), wajik: jalur("M32 6 58 32 32 58 6 32Z","#ffad62"),
    "wajik-biru": jalur("M32 6 58 32 32 58 6 32Z","#7eb9fa"),
    "titik-merah": lingkaran(32,32,21,"#f47798"), "titik-biru": lingkaran(32,32,21,"#72adfb"),
    "titik-kuning": lingkaran(32,32,21,"#ffcc57"), "titik-ungu": lingkaran(32,32,21,"#b28af1"),
    "titik-hijau": lingkaran(32,32,21,"#6acc9e"), "titik-jingga": lingkaran(32,32,21,"#ff9a61"),
  };
}
