// Hubungan keluarga dan profesi perlu konteks. Penampilan saja tidak menjelaskan peran seseorang.
export const keluarga: Record<string, string> = {
  Ayah: "Dimas memanggil laki-laki yang menjadi orang tuanya dengan sebutan apa?",
  Ibu: "Nina memanggil perempuan yang menjadi orang tuanya dengan sebutan apa?",
  Kakak: "Ari punya saudara yang lebih tua. Apa sebutannya?",
  Adik: "Lala punya saudara yang lebih muda. Apa sebutannya?",
  Kakek: "Apa sebutan untuk ayah dari ibu atau ayah kita?",
  Nenek: "Apa sebutan untuk ibu dari ibu atau ayah kita?",
  Paman: "Apa sebutan untuk saudara laki-laki dari ibu atau ayah kita?",
  Bibi: "Apa sebutan untuk saudara perempuan dari ibu atau ayah kita?",
};

export const profesi: Record<string, string> = {
  Dokter: "Siapa yang memeriksa dan merawat orang sakit?",
  Guru: "Siapa yang mengajar murid di kelas?",
  Koki: "Siapa yang bertugas memasak di dapur restoran?",
  "Pemadam kebakaran": "Siapa yang bertugas memadamkan api saat terjadi kebakaran?",
  Petani: "Siapa yang menanam dan memanen padi di sawah?",
  Polisi: "Siapa yang bertugas mengatur lalu lintas ketika lampu lalu lintas rusak?",
};

export const bendaHitung = [
  ["bintang", "bintang"], ["apel", "apel"], ["stroberi", "stroberi"],
  ["bola", "bola"], ["ikan", "ikan"], ["bunga", "bunga"], ["daun", "daun"],
] as const;

export const urutanPola = [
  ["titik-merah","titik-biru"], ["titik-kuning","titik-ungu"], ["titik-hijau","titik-jingga"],
  ["titik-biru","titik-merah","titik-kuning"], ["titik-merah","titik-merah","titik-biru"],
  ["lingkaran","persegi","segitiga"], ["wajik","bintang","oval"], ["persegi","persegi","lingkaran"],
  ["bintang","segitiga"], ["apel-hijau","stroberi"], ["pir","kiwi"], ["apel","jeruk","pisang"],
  ["kucing","anjing","katak"], ["kupu","lebah"], ["ikan","gurita","kura"],
  ["bulan","cerah","awan"], ["bus","mobil","sepeda"], ["perahu","truk"],
];
