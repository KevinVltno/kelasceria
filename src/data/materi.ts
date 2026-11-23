import { tema } from "./kuis-tema";
import { buah } from "./buah";
import { hewan } from "./hewan";

export const tubuh = [["Kepala","kepala"],["Mata","mata"],["Hidung","hidung"],["Mulut","mulut"],["Tangan","tangan"],["Kaki","kaki"],["Telinga","telinga"],["Leher","leher"],["Lutut","lutut"]];
export const warna = [["Merah","#ef476f"],["Biru","#3987ed"],["Kuning","#ffcb47"],["Hijau","#36b987"],["Ungu","#9463ec"],["Jingga","#f58229"],["Merah muda","#f694c0"],["Cokelat","#8d593f"],["Hitam","#25212c"],["Putih","#ffffff"]];
export const bentuk = [["Lingkaran","lingkaran"],["Persegi","persegi"],["Segitiga","segitiga"],["Persegi panjang","persegi-panjang"],["Bintang","bintang"],["Oval","oval"],["Wajik","wajik"]];
export const hari = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"];

const kategori: Record<string, string[][]> = {
  "anggota-keluarga": [["Ayah","ayah"],["Ibu","ibu"],["Kakak","kakak"],["Adik","adik"],["Kakek","kakek"],["Nenek","nenek"],["Paman","paman"],["Bibi","bibi"]],
  "buah-buahan": buah,
  sayuran: [["Wortel","wortel"],["Brokoli","brokoli"],["Terung","terung"],["Jagung","jagung"],["Mentimun","mentimun"],["Kentang","kentang"],["Tomat","tomat"],["Kubis","kubis"],["Paprika","paprika"],["Lobak","lobak"],["Zukini","zukini"],["Bawang merah","bawang"],["Labu kuning","labu"]],
  hewan,
  benda: [["Kursi","kursi"],["Meja","meja"],["Tas","tas"],["Buku","buku"],["Pensil","pensil"],["Penghapus","penghapus"],["Papan tulis","papan-tulis"],["Gunting","gunting"],["Jam","jam"],["Lampu","lampu"],["Penggaris","penggaris"],["Botol minum","botol"],["Sepatu","sepatu"],["Krayon","krayon"],["Garpu","penggarpu"],["Topi","topi"],["Tempat sampah","tempat-sampah"],["Payung","payung"],["Sendok","sendok"],["Cangkir","cangkir"],["Piring","piring"],["Tempat tidur","tempat-tidur"]],
  "kendaraan-profesi": [["Sepeda","sepeda"],["Mobil","mobil"],["Bus","bus"],["Kereta","kereta"],["Pesawat","pesawat"],["Perahu","perahu"],["Truk","truk"],["Mobil pemadam","mobil-pemadam"],["Dokter","dokter"],["Guru","guru"],["Koki","koki"],["Pemadam kebakaran","pemadam"],["Petani","petani"],["Polisi","polisi"]],
  "hari-cuaca-perasaan": [["Cerah","cerah"],["Hujan","hujan"],["Berawan","awan"],["Berangin","angin"],["Senang","senang"],["Sedih","sedih"],["Marah","marah"],["Takut","takut"],["Terkejut","terkejut"],["Pelangi","pelangi"],["Hujan petir","petir"],["Lelah","lelah"]],
  warna,
  bentuk,
};

export const materi = {
  ...kategori,
  ...Object.fromEntries(Object.entries(tema).map(([id, { materi }]) => [id, materi.map(([nama, gambar, ringkasan]) => [nama, gambar, "", ringkasan])])),
  "tebak-gambar": [...buah, ...hewan, ...kategori.sayuran, ...kategori.benda, ["Sepeda","sepeda"], ["Bola","bola"]]
} as Record<string, string[][]>;

export const kebiasaan = [
  ["Sebelum makan, apa yang sebaiknya kita lakukan?","penggarpu","Cuci tangan","Langsung makan","Bermain pasir","Lari-lari"],
  ["Apa yang kita lakukan agar gigi bersih?","gigi","Gosok gigi","Makan permen","Minum sirup","Tidur"],
  ["Di mana kita membuang sampah?","sampah","Tempat sampah","Jalan","Sungai","Meja"],
  ["Saat batuk, tutup mulut dengan apa?","batuk","Siku bagian dalam","Mainan","Buku","Biarkan terbuka"],
  ["Setelah bermain, apa yang kita lakukan?","mainan","Rapikan mainan","Tinggalkan mainan","Sembunyikan mainan","Lempar mainan"],
  ["Apa yang diminum saat haus?","air","Air putih","Saus","Minyak","Kecap"],
  ["Apa yang kita pakai untuk mencuci tangan?","sabun","Sabun","Krayon","Kertas","Lem"],
  ["Apa yang kita lakukan setelah bangun?","tempat-tidur","Rapikan tempat tidur","Lempar bantal","Buang selimut","Tidur di lantai"],
  ["Apa yang kita ucapkan setelah dibantu?","senang","Terima kasih","Selamat tidur","Sampai besok","Ayo lari"],
  ["Apa yang melindungi telapak kaki saat berjalan di jalan berbatu?","sepatu","Sepatu","Topi","Sarung tangan","Kacamata"],
  ["Apa yang sebaiknya kita lakukan sebelum makan buah yang baru dibeli?","apel","Cuci buah dengan air bersih","Letakkan di lantai","Rendam dalam sirup","Bungkus dengan kertas kotor"],
  ["Saat bersin, bagaimana cara menutup hidung dan mulut?","batuk","Gunakan tisu atau siku bagian dalam","Gunakan telapak tangan teman","Gunakan buku","Arahkan ke wajah teman"],
  ["Apa yang kita lakukan setelah menggunakan toilet?","sabun","Cuci tangan pakai sabun","Langsung makan","Lap tangan di meja","Bermain air"],
  ["Kita tidak sengaja menyenggol teman. Apa yang kita ucapkan?","keluarga","Maaf","Selamat pagi","Sampai besok","Selamat ulang tahun"],
  ["Bagaimana cara merawat buku yang kita pinjam?","buku","Jaga agar tetap bersih dan utuh","Lipat semua halaman","Coret sampulnya","Simpan di tempat basah"],
  ["Kalau hujan dan harus berjalan di luar, apa yang bisa kita bawa agar tidak basah?","hujan","Payung","Sendok","Botol minum","Penggaris"],
];
