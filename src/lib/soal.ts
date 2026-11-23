import { angka } from "../data/angka";
import { huruf } from "../data/huruf";
import { soalBendaLangit, tema } from "../data/kuis-tema";
import { hari, kebiasaan, materi, tubuh } from "../data/materi";
import { bendaHitung, keluarga, profesi, urutanPola } from "../data/petunjuk";

export type Soal = {
  instruksi: string;
  visual: string;
  benar: string;
  pilihan: string[];
  suara?: string;
  warna?: boolean;
  baris?: string[];
  gambarPilihan?: Record<string, string[]>;
  tampilkanNamaPilihan?: boolean;
};

const soalPerRonde = 5;
const angkaTeks = angka.map(String);
const abjad = huruf.map(([huruf]) => huruf);
const ulang = (jumlah: number, gambar: string) => Array.from({ length: jumlah }, () => gambar);

export function acak<T>(items: readonly T[]): T[] {
  const hasil = [...items];
  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
}

function pilihan(benar: string, bank: readonly string[], jumlah: number) {
  return acak([benar, ...acak([...new Set(bank)].filter((isi) => isi !== benar)).slice(0, jumlah - 1)]);
}

const tambah = angka.slice(0, 9).flatMap((a) => angka.slice(0, 10 - a).map((b) => [a, b] as const));
const kurang = angka.slice(1, 10).flatMap((a) => angka.slice(0, a - 1).map((b) => [a, b] as const));

const labelPola: Record<string, string> = {
  "apel-hijau": "Apel hijau", wajik: "Wajik jingga", kura: "Kura-kura", kupu: "Kupu-kupu",
  cerah: "Matahari", awan: "Awan",
};

export function buatSoal(id: string, jumlah: number): Soal[] {
  const soal = (instruksi: string, visual: string, benar: string, bank: readonly string[], tambahan: Partial<Soal> = {}): Soal =>
    ({ instruksi, visual, benar, pilihan: pilihan(benar, bank, jumlah), ...tambahan });

  if (id === "mengenal-huruf") return acak(huruf).slice(0, soalPerRonde).map(([huruf, kata, gambar]) =>
    soal("Apa huruf awal kata " + kata + "?", gambar, huruf, abjad));
  if (id === "mengenal-angka") {
    const benda = acak(bendaHitung);
    return acak(angka).slice(0, soalPerRonde).map((nilai, i) => {
      const [nama, gambar] = benda[i];
      return soal("Ada berapa " + nama + "?", "", String(nilai), angkaTeks, { baris: ulang(nilai, gambar) });
    });
  }
  if (id === "anggota-tubuh") return acak(tubuh).slice(0, soalPerRonde).map(([nama]) =>
    soal("Sentuh " + nama.toLowerCase(), "", nama, tubuh.map(([nama]) => nama)));
  if (id === "berhitung") {
    const operasi = acak([
      ...acak(tambah).slice(0, 3).map(([a, b]) => ({ a, b, operasi: "+" })),
      ...acak(kurang).slice(0, 2).map(([a, b]) => ({ a, b, operasi: "−" })),
    ]);
    return operasi.map(({ a, b, operasi }) => {
      const penjumlahan = operasi === "+";
      const hasil = penjumlahan ? a + b : a - b;
      const baris = penjumlahan ? [...ulang(a, "apel"), "+", ...ulang(b, "apel")] : [...ulang(hasil, "apel"), ...ulang(b, "apel-dicoret")];
      return soal(penjumlahan ? "Berapa jumlah semua apel?" : "Berapa apel yang tidak dicoret?", a + " " + operasi + " " + b + " = ?", String(hasil), angkaTeks.slice(0, 10), { baris });
    });
  }
  if (id === "membandingkan") {
    const jenis = acak([["terbesar", true, false], ["terkecil", false, false], ["paling banyak", true, true], ["paling sedikit", false, true], ["paling banyak", true, true]] as const);
    const benda = acak(bendaHitung);
    return jenis.map(([kata, besar, visual], i) => {
      const [nama, gambar] = benda[i];
      const bank = acak(angka.slice(0, visual ? 6 : 20)).slice(0, jumlah).sort((a, b) => a - b);
      const label = (n: number) => visual ? n + " " + nama : String(n);
      const gambarPilihan = visual ? Object.fromEntries(bank.map((n) => [label(n), ulang(n, gambar)])) : undefined;
      const pertanyaan = visual ? "Kelompok mana yang punya " + nama + " " + kata + "?" : "Angka mana yang " + kata + "?";
      return soal(pertanyaan, "", label(besar ? bank[bank.length - 1] : bank[0]), bank.map(label), { gambarPilihan });
    });
  }
  if (id === "pola") return acak(urutanPola).slice(0, soalPerRonde).map((pola) => {
    const panjang = pola.length * 2 + Math.floor(Math.random() * pola.length);
    const label = (gambar: string) => labelPola[gambar] ?? (gambar.startsWith("titik-") ? "Lingkaran " + gambar.slice(6) : gambar);
    const opsi = [...new Set([...pola, "titik-hijau", "titik-jingga", "wajik-biru", "segitiga"])];
    return soal("Gambar apa yang muncul setelah pola ini?", "?", label(pola[panjang % pola.length]), opsi.map(label), {
      baris: Array.from({ length: panjang }, (_, i) => pola[i % pola.length]),
      gambarPilihan: Object.fromEntries(opsi.map((gambar) => [label(gambar), [gambar]])),
    });
  });

  if (id === "kebiasaan") return acak(kebiasaan).slice(0, soalPerRonde).map(([pertanyaan, gambar, benar, ...opsi]) =>
    soal(pertanyaan, gambar, benar, opsi));

  const topik = tema[id];
  if (topik) {
    let dataSoal = acak(topik.soal).slice(0, id === "luar-angkasa" ? 3 : soalPerRonde);
    if (id === "luar-angkasa") {
      const sudahDipilih = new Set(dataSoal.map(([, benar]) => benar));
      const lainnya = soalBendaLangit.filter(([, benar]) => !sudahDipilih.has(benar));
      dataSoal = acak([...dataSoal, ...acak(lainnya).slice(0, 2)]);
    }
    const gambarPilihan = Object.fromEntries(topik.materi.map(([nama, gambar]) => [nama, [gambar]]));
    return dataSoal.map(([pertanyaan, benar, salah]) => soal(pertanyaan, "", benar, salah, { gambarPilihan, tampilkanNamaPilihan: true }));
  }

  const kategori = materi[id];
  if (!kategori) return [];
  const bank = acak(kategori).slice(0, soalPerRonde).map(([nama, visual, suara]) => {
    if (id === "anggota-keluarga") return soal(keluarga[nama], "keluarga", nama, kategori.map(([opsi]) => opsi));
    if (id === "kendaraan-profesi" && profesi[nama]) return soal(profesi[nama], visual, nama, Object.keys(profesi));
    const perasaan = ["senang", "sedih", "marah", "takut", "terkejut", "lelah"];
    const pilihanKategori = kategori.filter(([label, gambar]) =>
      id === "kendaraan-profesi" ? !profesi[label]
        : id === "hari-cuaca-perasaan" ? perasaan.includes(gambar) === perasaan.includes(visual) && !(visual === "petir" && gambar === "hujan")
        : true);
    const instruksi = id === "warna" ? "Warna apakah ini?"
      : id === "bentuk" ? "Bentuk apakah ini?"
      : id === "kendaraan-profesi" ? "Apa nama kendaraan ini?"
      : id === "hari-cuaca-perasaan" ? (perasaan.includes(visual) ? "Apa yang sedang ia rasakan?" : "Cuaca atau gejala langit apa yang ditunjukkan?")
      : "Apa nama yang tepat untuk gambar ini?";
    return soal(instruksi, visual, nama, pilihanKategori.map(([opsi]) => opsi), { suara, warna: id === "warna" });
  });
  if (id === "hari-cuaca-perasaan") {
    const i = Math.floor(Math.random() * hari.length);
    const arah = Math.random() < 0.5 ? 1 : -1;
    const pertanyaan = "Hari apa " + (arah > 0 ? "setelah " : "sebelum ") + hari[i] + "?";
    return acak([...bank.slice(0, soalPerRonde - 1), soal(pertanyaan, "kalender", hari[(i + arah + hari.length) % hari.length], hari)]);
  }
  return bank;
}
