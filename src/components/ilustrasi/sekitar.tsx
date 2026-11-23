import { detail as d, jalur as p, kotak as r, lingkaran as c, mata, oval as e } from "./bentuk";

function orang(rambut: string, baju: string, gaya: "pendek" | "panjang" | "bayi" = "pendek", aksesori?: React.ReactNode) {
  return <>{gaya === "panjang" && r(13,10,38,40,rambut,16)}
    {p("M7 58q1-18 25-18t25 18Z",baju)}{c(32,30,17,"#f5bc9a")}
    {gaya === "bayi" ? d("M26 16q0-8 10-7-1 6-8 8","#956281",3)
      : p("M14 31C8 5 53 3 50 31q-8-3-15-14-5 7-21 14Z",rambut)}
    {mata(26,32)}{mata(38,32)}{d("M28 39q4 4 8 0")}{aksesori}
  </>;
}
const kacamata = d("M20 30h11v7H21Zm13 0h11l-1 7H33Zm-2 2h2","#674c74");
const awan = p("M12 43C2 43 3 28 13 27c1-12 18-17 27-7 8-4 17 1 17 10 8 5 4 14-2 14Z","#c4dafa");
function muka(mulut: string, tambahan?: React.ReactNode) {
  return <>{c(32,32,23,"#ffdf82")}{mata(24,29)}{mata(40,29)}{d(mulut)}{tambahan}{e(18,36,4,2,"#ffa98f")}{e(46,36,4,2,"#ffa98f")}</>;
}
function kendaraan(warna: string, besar: boolean) {
  return <>{besar ? r(6,14,52,32,warna,6) : p("M5 36q0-7 10-10l8-10h22l9 13q6 2 6 11v5H5Z",warna)}
    {besar ? <>{r(11,19,36,13,"#d4f0fb")}{r(48,20,7,20,"#d4f0fb")}{d("M24 19v13m11-13v13")}</>
      : p("m19 28 7-9h17l6 9Z","#d4f0fb")}
    {c(17,47,7,"#6b598d")}{c(47,47,7,"#6b598d")}{c(17,47,2,"#e3d3ee")}{c(47,47,2,"#e3d3ee")}
  </>;
}

export const sekitar = {
  ayah: orang("#684a6f","#89c5ec"), ibu: orang("#653e62","#f39cc9","panjang"), kakak: orang("#814b67","#ae9af2"),
  adik: orang("#8b6b79","#ffcf7c","bayi"), kakek: orang("#b4a3b8","#8bc8ad","pendek",kacamata),
  nenek: orang("#cdc0d6","#c49eea","panjang",kacamata), paman: orang("#72506f","#85cdb3","pendek",d("M26 39q6-6 12 0")),
  bibi: orang("#a86756","#ffc77e","panjang"),
  keluarga: <><g transform="translate(1 8) scale(.64)">{orang("#654c78","#91c5ef")}</g><g transform="translate(23 5) scale(.64)">{orang("#704962","#eda9cb","panjang")}</g><g transform="translate(17 26) scale(.52)">{orang("#9a6783","#ffcb79","bayi")}</g></>,
  tubuh: <>{d("M18 27q0 6 14 8 14-2 14-8m-16 20-6 10m11-10 6 10","#df947d",6)}{c(32,16,10,"#f7bd98")}{r(22,28,20,20,"#9d82e6",6)}{mata(29,16)}{mata(35,16)}</>,
  kepala: orang("#765878","#c3a7ef"),
  mata: <>{p("M4 32q11-19 24 0-13 19-24 0Zm32 0q11-19 24 0-13 19-24 0Z","#fff9ec")}{c(16,32,5,"#9a78ca")}{c(48,32,5,"#9a78ca")}{mata(16,32)}{mata(48,32)}</>,
  hidung: <>{p("m28 13-9 27q-3 12 13 8 16 5 13-8l-9-27Z","#f7ba9e")}{d("M19 43q5-4 9 0m8 0q4-4 9 0","#c5787f")}</>,
  mulut: <>{p("M8 33q9 0 17-8 5-2 7 2 4-4 8-2 9 8 16 8-10 14-24 14T8 33Z","#f48da9")}{d("M9 33q22 11 46 0","#9b5682")}</>,
  tangan: p("M20 55q-5-6-13-19c-4-7 2-11 7-6l7 7V15q0-6 5-5 4 0 4 5v13-18q0-5 5-5 4 0 4 5v18-13q0-5 4-5t4 5v15-9q0-5 5-5 4 0 4 5v18q0 16-13 16Z","#f4bc9a"),
  kaki: <>{p("M34 9h17l-3 22q-1 7 1 14 1 8-7 9H14q-9 0-9-8c0-8 22-11 24-20Z","#f1b292")}{d("M6 44q19 2 27-6","#d48982")}</>,
  dokter: orang("#6a5073","#e0eef8","pendek",<>{r(40,47,9,9,"#faecf1",1)}{d("M44 49v5m-2-2h5","#e27896")}</>),
  guru: orang("#795675","#bba2ec","panjang",kacamata),
  koki: orang("#5e486c","#f3f0fc","pendek",p("M19 22v-7c-10-1-7-12 2-10 3-6 14-6 17 0 9-2 12 9 4 10v7Z","#fff9eb")),
  pemadam: orang("#6d4f69","#f28ba0","pendek",p("M14 22q0-15 18-15t18 15h6v5H8v-5Z","#f9808f")),
  petani: orang("#71596e","#8bc8a3","pendek",<>{p("m18 22 5-15h18l5 15Z","#efc27d")}{r(6,21,52,6,"#efc27d")}</>),
  polisi: orang("#675176","#a4a8e5","pendek",<>{p("m13 14 19-9 19 9-4 10H17Z","#8f9dd9")}{d("M17 24h30")}</>),
  sepeda: <>{c(15,43,11,"#d7edf9")}{c(49,43,11,"#d7edf9")}{d("m15 43 10-18 10 18H15l20-1 11-17 3 18m-27-20h9m10-4h9l-4 6","#8972c7",3)}</>,
  mobil: kendaraan("#f5a3b6",false), bus: kendaraan("#ffcb71",true),
  kereta: <>{r(6,11,42,36,"#9eabed",6)}{r(48,23,10,22,"#c5b5f0")}{r(11,17,15,13,"#ddf3ff")}{r(30,17,13,13,"#ddf3ff")}{c(17,48,6,"#766197")}{c(44,48,6,"#766197")}{d("M4 56h56","#815a8b",3)}</>,
  pesawat: p("m49 8 5 2q5 2 0 8L40 32l9 21-6 5-14-18-10 7 1 10-5 2-6-10-8-5 3-4 9 2 8-12-17-15 5-5 22 12Z","#9acdf3"),
  "mobil-pemadam": <>{kendaraan("#f892a5",true)}{d("M16 12 46 6m-28 8 29-6","#986783",2)}{d("M29 33h10m-5-5v10","#fff1e8",2.5)}</>,
  perahu: <>{p("M8 41h48l-9 14H18Z","#bd90e7")}{p("M31 8v30H12Zm4 6 17 24H35Z","#ffc979")}{d("M4 58q7 4 14 0t14 0 14 0 14 0","#77bfe7",2.5)}</>,
  truk: <>{r(4,15,34,29,"#91d3b1",3)}{p("M38 24h12l9 11v10H38Z","#99bdf0")}{r(43,27,7,8,"#d5eff9",1)}{c(16,46,7,"#766394")}{c(49,46,7,"#766394")}</>,
  awan, hujan: <>{awan}{d("m18 48-3 7m15-7-3 7m15-7-3 7","#5b9ed8",3)}</>,
  cerah: <>{c(32,32,15,"#ffcf65")}{d("M32 5v7m0 40v7M5 32h7m40 0h7M12 12l5 5m30 30 5 5m0-40-5 5M17 47l-5 5","#df9855",3)}</>,
  mendung: <>{c(21,23,12,"#ffcd67")}<g transform="translate(11 10) scale(.82)">{awan}</g></>,
  angin: d("M7 23h36a6 6 0 1 0-6-7M4 33h49a6 6 0 1 1-6 6M13 43h19a6 6 0 1 1-5 6","#7eb7da",4),
  bulan: p("M43 8c-10 7-13 22-6 30 5 6 12 8 20 7A26 26 0 1 1 43 8Z","#ffd686"),
  pelangi: <>{d("M7 46a25 25 0 0 1 50 0","#ec8eac",6)}{d("M14 46a18 18 0 0 1 36 0","#ffd479",6)}{d("M21 46a11 11 0 0 1 22 0","#8acfae",6)}{c(8,48,6,"#dbe9fb")}{c(56,48,6,"#dbe9fb")}</>,
  senang: muka("M22 37q10 14 20 0"), sedih: muka("M25 43q7-9 14 0",p("M42 34q-6 8 0 10 6-2 0-10Z","#88cafa")),
  marah: muka("M24 42q8-5 16 0",d("m19 23 8 3m18-3-8 3")), takut: muka("M27 39q5-8 10 0-5 8-10 0Z",d("m20 23 6-2m12-2 6 2")),
  terkejut: muka("M28 39a4 5 0 1 0 8 0 4 5 0 1 0-8 0Z"), batuk: muka("M26 37q4-6 9 0",p("m33 34 15 5-4 14-15-7Z","#f7f4ff")),
  kalender: <>{r(8,13,48,42,"#f7f1ff",6)}{p("M8 21q0-8 8-8h32q8 0 8 8v5H8Z","#f49cb8")}{d("M20 8v11M44 8v11m-24 17h4m6 0h4m6 0h4m-24 9h4m6 0h4m6 0h4","#a887ca",3)}</>,
};
