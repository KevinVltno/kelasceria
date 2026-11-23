# KelasCeria

KelasCeria menyediakan 25 permainan belajar berbahasa Indonesia untuk anak usia 4–6 tahun. Progres permainan dan pengaturan suara tersimpan di perangkat. Menu, permainan, dan pengaturan dibangun sebagai rute Next.js App Router yang dapat dihosting sebagai berkas statis.

## Menjalankan proyek

Gunakan Node.js 20.9 atau lebih baru.

```sh
npm install
npm run dev
```

Buka http://localhost:3000. Pada PowerShell yang memblokir `npm.ps1`, jalankan `npm.cmd` untuk setiap perintah npm.

Jika memulai dari direktori kosong, perintah scaffold adalah `npx create-next-app@latest kelasceria --ts --tailwind --eslint --app --src-dir --use-npm`. Proyek di repositori ini sudah lengkap sehingga langkah scaffold dapat dilewati.

## Struktur proyek

```text
kelasceria/
├── AGENTS.md
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── public/
│   ├── manifest.webmanifest
│   ├── sw.js                       worker pembersih khusus development
│   ├── icon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   └── audio/                      opsional
├── scripts/
│   ├── buat-offline.mjs
│   └── preview.mjs
└── src/
    ├── app/
    │   ├── page.tsx
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── [nama-permainan]/page.tsx
    │   ├── pengaturan/page.tsx
    │   └── fonts/
    │       ├── baloo-2.ttf
    │       ├── nunito.ttf
    │       ├── OFL-baloo-2.txt
    │       └── OFL-nunito.txt
    ├── components/
    │   ├── Bilah.tsx
    │   ├── GerbangOrangTua.tsx
    │   ├── Ikon.tsx
    │   ├── Ilustrasi.tsx
    │   ├── ilustrasi/
    │   │   ├── alam.tsx
    │   │   ├── angkasa.tsx
    │   │   ├── benda.tsx
    │   │   ├── bentuk.tsx
    │   │   ├── pelajaran.tsx
    │   │   ├── sekitar.tsx
    │   │   └── tambahan.tsx
    │   ├── KartuMenu.tsx
    │   ├── Konfeti.tsx
    │   ├── LayarBintang.tsx
    │   ├── Maskot.tsx
    │   ├── Memory.tsx
    │   ├── Permainan.tsx
    │   ├── PilihanJawaban.tsx
    │   ├── PuzzleGambar.tsx
    │   ├── Seni.tsx
    │   ├── TombolBesar.tsx
    │   ├── TombolMusik.tsx
    │   ├── TombolSuara.tsx
    │   └── Tubuh.tsx
    ├── data/
    │   ├── angka.ts
    │   ├── contoh-gambar.ts
    │   ├── buah.ts
    │   ├── hewan.ts
    │   ├── huruf.ts
    │   ├── kuis-tema.ts
    │   ├── materi.ts
    │   ├── menu.ts
    │   ├── mewarnai.ts
    │   └── petunjuk.ts
    ├── hooks/
    │   ├── useBgm.ts
    │   ├── useProgress.tsx
    │   ├── useRonde.ts
    │   └── useSuara.ts
    └── lib/
        ├── audio.ts
        └── soal.ts
```

Setiap ronde kuis terdiri dari lima soal. Ronde yang selesai memberi 1, 2, atau 3 bintang sesuai level dan membuka level berikutnya. Anak boleh mencoba sampai benar. Dalam Mencocokkan Gambar, satu ronde adalah satu papan berisi 20 kartu dan berakhir setelah 10 pasang ditemukan. Menggambar menyediakan contoh bergambar dan panduan singkat di samping kanvas bebas. Puzzle Gambar memakai 4, 9, atau 16 potongan sesuai tingkat. Setiap gambar Mewarnai memiliki bidang yang bisa diwarnai satu per satu.

## Menambah materi

- Untuk buah, tambahkan pasangan nama dan ID ilustrasi di `src/data/buah.ts`, misalnya `["Pepaya", "pepaya"]`. Tambahkan bidang SVG bernama `pepaya` di `src/components/ilustrasi/alam.tsx`. Materi ini muncul di Buah-buahan, Tebak Gambar, dan kartu pasangan.
- Untuk hewan, gunakan format nama, ID ilustrasi, dan tiruan bunyi opsional seperti `["Burung", "burung", "cuit cuit"]`. Bunyi dibacakan oleh suara perangkat.
- Huruf memakai format huruf, kata, dan ID ilustrasi. Kategori umum lainnya ada di `src/data/materi.ts`. Sediakan sedikitnya lima entri berbeda supaya setiap ronde dapat berisi lima soal.
- Untuk menambahkan kategori kuis, daftarkan slug dan metadata di `src/data/menu.ts`, lalu tambahkan bank dengan slug yang sama di `src/data/materi.ts`. Rute dan kuis generik ikut dibuat saat build.
- Tambahkan gambar untuk mewarnai di `src/data/mewarnai.ts`. Setiap bidang memiliki nama dan jalur SVG di dalam area gambar 400 × 260.

## Mengganti musik latar

Buat folder `public/audio/` dan tambahkan `bgm-menu.mp3` atau `bgm-main.mp3`. Siapkan audio yang berulang mulus dan gunakan musik yang Anda miliki hak pakainya. Musik sintetis dipakai ketika file pengganti untuk suasana itu tidak tersedia atau gagal diputar. Setelah mengganti audio, jalankan build ulang agar file ikut tersedia offline.

## Build dan uji offline

```sh
npm run lint
npm run build
npm start
```

Buka http://localhost:3000 sekali saat masih online dan tunggu hingga service worker aktif. Setelah itu, gunakan opsi instal aplikasi pada browser yang mendukungnya. Di Safari pada iPad atau iPhone, gunakan Bagikan → Tambahkan ke Layar Utama. Ketersediaan suara bahasa Indonesia dan pembacaan saat offline mengikuti suara yang ada di perangkat. Musik sintetis, efek suara, dan aktivitas tetap tersedia melalui build yang sudah disimpan browser.

## Deploy ke Vercel

1. Unggah sumber proyek ke GitHub, GitLab, atau Bitbucket.
2. Di Vercel, pilih **Add New → Project**, lalu impor repositorinya.
3. Pilih preset **Next.js** dengan direktori akar proyek ini. Konfigurasi menyediakan perintah `npm run build` dan output `out`.
4. Tekan **Deploy**. Buka URL HTTPS hasil deploy sekali untuk mulai menyimpan permainan offline.

Dokumentasi [deploy dari Git](https://vercel.com/docs/git) dan [konfigurasi build](https://vercel.com/docs/builds/configure-a-build).
