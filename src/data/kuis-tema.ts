type Pelajaran = readonly [nama: string, gambar: string, ringkasan: string];
type Pertanyaan = readonly [teks: string, benar: string, salah: readonly [string, string, string]];

export const planet: Pelajaran[] = [
  ["Matahari", "cerah", "Bintang di pusat tata surya. Delapan planet bergerak mengelilinginya."],
  ["Merkurius", "merkurius", "Planet yang paling dekat dengan Matahari."],
  ["Venus", "venus", "Planet kedua dari Matahari."],
  ["Bumi", "bumi", "Planet ketiga dari Matahari. Kita tinggal di Bumi."],
  ["Mars", "mars", "Planet keempat. Permukaannya tampak kemerahan."],
  ["Jupiter", "jupiter", "Planet kelima dan paling besar di tata surya."],
  ["Saturnus", "saturnus", "Planet keenam dengan cincin yang terlihat jelas."],
  ["Uranus", "uranus", "Planet ketujuh. Warnanya tampak biru kehijauan."],
  ["Neptunus", "neptunus", "Planet kedelapan dan paling jauh dari Matahari."],
];

export const bendaLangit: Pelajaran[] = [
  ["Bulan", "bulan", "Bulan adalah satelit alami Bumi. Bulan bergerak mengelilingi Bumi."],
  ["Bintang", "bintang-langit", "Bintang menghasilkan cahayanya sendiri. Matahari juga sebuah bintang."],
  ["Komet", "komet", "Komet mengandung es dan debu. Saat mendekati Matahari, komet dapat terlihat berekor."],
  ["Meteor", "meteor", "Meteor adalah kilatan cahaya saat benda kecil dari angkasa masuk ke atmosfer Bumi."],
];

export const tema: Readonly<Record<string, { materi: readonly Pelajaran[]; soal: readonly Pertanyaan[] }>> = {
  "luar-angkasa": {
    materi: [...planet, ...bendaLangit],
    soal: [
      ["Planet apa yang kita tinggali?", "Bumi", ["Mars", "Venus", "Neptunus"]],
      ["Planet apa yang paling dekat dengan Matahari?", "Merkurius", ["Bumi", "Saturnus", "Jupiter"]],
      ["Apa nama planet kedua dari Matahari?", "Venus", ["Mars", "Uranus", "Bumi"]],
      ["Planet apa yang dijuluki Planet Merah?", "Mars", ["Bumi", "Neptunus", "Jupiter"]],
      ["Planet apa yang paling besar di tata surya?", "Jupiter", ["Mars", "Bumi", "Merkurius"]],
      ["Planet apa yang terkenal karena cincinnya yang lebar dan terang?", "Saturnus", ["Mars", "Bumi", "Merkurius"]],
      ["Apa nama planet ketujuh dari Matahari?", "Uranus", ["Merkurius", "Venus", "Neptunus"]],
      ["Planet mana yang paling jauh dari Matahari?", "Neptunus", ["Venus", "Jupiter", "Bumi"]],
      ["Apa yang berada di pusat tata surya dan dikelilingi delapan planet?", "Matahari", ["Bumi", "Bulan", "Mars"]],
    ],
  },
  pakaian: {
    materi: [
      ["Kaus", "kaus", "Pakaian untuk bagian atas tubuh. Kaus ini berlengan pendek."],
      ["Celana", "celana", "Pakaian untuk kaki. Celana punya dua bagian, satu untuk setiap kaki."],
      ["Jaket", "jaket", "Pakaian luar yang bisa membantu tubuh tetap hangat."],
      ["Topi berlidah", "topi", "Bagian yang menonjol di depan membantu menaungi wajah."],
      ["Topi rajut", "topi-hangat", "Topi berbahan rajut yang menutup kepala saat dingin."],
      ["Kaus kaki", "kaus-kaki", "Dipakai pada kaki, biasanya sebelum sepatu."],
      ["Sepatu", "sepatu", "Membantu melindungi telapak kaki saat berjalan."],
      ["Ikat pinggang", "sabuk", "Dipakai melingkar di pinggang, misalnya untuk menahan celana."],
    ],
    soal: [
      ["Apa yang dipakai sebelum memakai sepatu?", "Kaus kaki", ["Topi rajut", "Kaus", "Jaket"]],
      ["Apa yang membantu melindungi telapak kaki saat berjalan di jalan berbatu?", "Sepatu", ["Topi berlidah", "Celana", "Jaket"]],
      ["Apa yang dilingkarkan di pinggang agar celana tidak melorot?", "Ikat pinggang", ["Kaus kaki", "Sepatu", "Topi berlidah"]],
      ["Pakaian apa yang punya dua bagian untuk kaki?", "Celana", ["Jaket", "Kaus", "Ikat pinggang"]],
      ["Pakaian luar berlengan panjang apa yang bisa membuat tubuh tetap hangat?", "Jaket", ["Kaus kaki", "Kaus", "Topi rajut"]],
      ["Pakaian berlengan pendek apa yang biasa dipakai untuk menutup bagian atas tubuh?", "Kaus", ["Celana", "Sepatu", "Ikat pinggang"]],
      ["Apa yang punya bagian menonjol di depan untuk menaungi wajah?", "Topi berlidah", ["Kaus kaki", "Topi rajut", "Jaket"]],
      ["Apa yang terbuat dari rajutan dan dipakai di kepala saat dingin?", "Topi rajut", ["Topi berlidah", "Jaket", "Kaus kaki"]],
    ],
  },
  "alat-musik": {
    materi: [
      ["Gitar", "gitar", "Bunyinya dibuat dengan memetik senar."],
      ["Drum", "drum", "Permukaannya dipukul untuk menghasilkan bunyi."],
      ["Piano", "piano", "Dibunyikan dengan menekan tuts hitam dan putih."],
      ["Tamborin", "tamborin", "Saat digoyang, keping logam kecilnya berbunyi."],
      ["Xilofon", "xilofon", "Bilah-bilahnya dipukul dengan alat pemukul kecil."],
      ["Seruling", "seruling", "Dibunyikan dengan meniupnya. Jari bisa membuka dan menutup lubangnya."],
    ],
    soal: [
      ["Alat musik mana yang dimainkan dengan memetik senarnya?", "Gitar", ["Drum", "Seruling", "Xilofon"]],
      ["Alat musik apa yang punya tuts hitam dan putih untuk ditekan?", "Piano", ["Gitar", "Seruling", "Drum"]],
      ["Alat musik apa yang ditiup sambil membuka dan menutup lubangnya dengan jari?", "Seruling", ["Piano", "Drum", "Gitar"]],
      ["Alat musik apa yang permukaan bundarnya dipukul untuk membuat irama?", "Drum", ["Gitar", "Seruling", "Piano"]],
      ["Alat musik apa yang punya deretan bilah untuk dipukul satu per satu?", "Xilofon", ["Piano", "Gitar", "Seruling"]],
      ["Alat musik bundar apa yang keping logam kecilnya berbunyi saat digoyang?", "Tamborin", ["Drum", "Xilofon", "Gitar"]],
    ],
  },
  "alam-sekitar": {
    materi: [
      ["Gunung", "gunung", "Bagian permukaan bumi yang menjulang tinggi."],
      ["Pohon", "pohon", "Tumbuhan yang biasanya punya batang berkayu, dahan, dan daun."],
      ["Sungai", "sungai", "Aliran air yang mengalir melalui daratan."],
      ["Bunga", "bunga", "Bagian tumbuhan yang biasanya punya kelopak."],
      ["Batu", "batu", "Benda keras yang dapat ditemukan di tanah atau di sungai."],
      ["Awan", "awan", "Kumpulan titik air atau kristal es kecil yang terlihat di langit."],
      ["Pelangi", "pelangi", "Lengkungan warna yang bisa terlihat saat cahaya Matahari bertemu tetes air."],
      ["Daun", "daun", "Bagian tumbuhan yang biasanya berwarna hijau."],
      ["Jamur", "jamur", "Makhluk hidup yang berbeda dari tumbuhan. Beberapa jamur berbentuk seperti payung."],
    ],
    soal: [
      ["Apa yang menjulang tinggi dari daratan?", "Gunung", ["Sungai", "Daun", "Bunga"]],
      ["Tumbuhan mana yang punya batang berkayu, dahan, dan daun?", "Pohon", ["Batu", "Bunga", "Jamur"]],
      ["Apa nama aliran air yang mengalir melalui daratan?", "Sungai", ["Gunung", "Pohon", "Batu"]],
      ["Bagian tumbuhan apa yang biasanya memiliki kelopak?", "Bunga", ["Daun", "Batu", "Awan"]],
      ["Benda keras apa yang bisa kita temukan di tanah atau di sungai?", "Batu", ["Pelangi", "Awan", "Bunga"]],
      ["Apa kumpulan titik air kecil yang bisa terlihat mengambang di langit?", "Awan", ["Batu", "Gunung", "Pohon"]],
      ["Apa nama lengkungan warna-warni yang bisa terlihat saat Matahari bersinar dan ada tetes air di udara?", "Pelangi", ["Awan", "Sungai", "Bunga"]],
      ["Bagian tumbuhan apa yang biasanya hijau dan tumbuh pada ranting?", "Daun", ["Jamur", "Batu", "Awan"]],
      ["Makhluk hidup apa yang sebagian jenisnya berbentuk seperti payung dan bisa tumbuh di tempat lembap?", "Jamur", ["Batu", "Daun", "Pohon"]],
    ],
  },
};

export const soalBendaLangit: readonly Pertanyaan[] = [
  ["Benda langit apa yang merupakan satelit alami Bumi?", "Bulan", ["Matahari", "Mars", "Komet"]],
  ["Benda langit jenis apa yang membuat cahayanya sendiri?", "Bintang", ["Bulan", "Bumi", "Komet"]],
  ["Benda langit apa yang mengandung es dan debu serta bisa terlihat berekor saat mendekati Matahari?", "Komet", ["Bulan", "Bumi", "Mars"]],
  ["Apa nama kilatan cahaya saat benda kecil dari angkasa masuk ke atmosfer Bumi?", "Meteor", ["Bulan", "Bumi", "Jupiter"]],
  ["Apa nama bintang yang memberi cahaya dan panas bagi Bumi?", "Matahari", ["Bulan", "Mars", "Komet"]],
];
