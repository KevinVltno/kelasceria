export type Kanal = "bgm" | "efek" | "suara";
export type PengaturanAudio = Record<Kanal, { aktif: boolean; volume: number }>;
export type Efek = "klik" | "benar" | "salah" | "bintang" | "selesai";
type Suasana = "menu" | "main";
export type RekamanBgm = Record<Suasana, boolean>;

let context: AudioContext | undefined;
let pengaturan: PengaturanAudio | undefined;
let daftarRekaman: RekamanBgm = { menu: false, main: false };
let musik: { suasana: Suasana; gain: GainNode; audio?: HTMLAudioElement; timer: number; rekaman: boolean } | undefined;
let diizinkan = false;
let suasana: Suasana = "menu";
let bacaan = 0;

const melodi = {
  menu: [60, 64, 69, 67, 64, 62, 65, 69, 67, 71, 74, 72, 69, 65, 64, 62],
  main: [60, 64, 67, 69, 65, 64, 62, 67, 59, 62, 67, 64, 65, 69, 67, 62],
};
const bunyi: Record<Efek, number[]> = { klik: [72], benar: [67, 72, 76], salah: [65, 62], bintang: [72, 76, 79, 84], selesai: [60, 64, 67, 72, 79] };

function nada(midi: number, mulai: number, durasi: number, gain: AudioNode, volume: number, type: OscillatorType = "sine") {
  if (!context) return;
  const oscillator = context.createOscillator();
  const envelope = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
  envelope.gain.setValueAtTime(0, mulai);
  envelope.gain.linearRampToValueAtTime(volume, mulai + 0.025);
  envelope.gain.exponentialRampToValueAtTime(0.0001, mulai + durasi);
  oscillator.connect(envelope).connect(gain);
  oscillator.start(mulai);
  oscillator.stop(mulai + durasi);
}

function volumeMusik() {
  if (!context || !musik) return;
  musik.gain.gain.setTargetAtTime((pengaturan?.bgm.volume ?? 0) * (bacaan ? 0.19 : 1), context.currentTime, 0.11);
}

function sinkron() {
  if (!context || !diizinkan) return;
  const jalan = pengaturan?.bgm.aktif && !document.hidden;
  if (musik && (!jalan || musik.suasana !== suasana)) {
    const lama = musik;
    musik = undefined;
    window.clearInterval(lama.timer);
    lama.gain.gain.setTargetAtTime(0, context.currentTime, 0.07);
    window.setTimeout(() => { lama.audio?.pause(); lama.gain.disconnect(); }, document.hidden ? 0 : 330);
  }
  if (jalan && !musik) {
    const ctx = context;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    const audio = daftarRekaman[suasana] ? new Audio("/audio/bgm-" + suasana + ".mp3") : undefined;
    if (audio) {
      audio.loop = true;
      const mediaVolume = ctx.createGain();
      mediaVolume.gain.value = 0.55;
      ctx.createMediaElementSource(audio).connect(mediaVolume).connect(gain);
    }
    const track = { suasana, gain, audio, timer: 0, rekaman: false };
    let waktu = ctx.currentTime + 0.05;
    let langkah = 0;
    const tempo = suasana === "menu" ? 0.31 : 0.48;
    const jadwalkan = () => {
      if (track.rekaman || ctx.state !== "running") return;
      if (waktu < ctx.currentTime) waktu = ctx.currentTime + 0.02;
      while (waktu < ctx.currentTime + 0.2) {
        const note = melodi[track.suasana][langkah % 16];
        nada(note, waktu, tempo * 1.55, gain, 0.14, "triangle");
        if (langkah % 4 === 0) nada(note - 24, waktu, tempo * 3, gain, 0.09);
        langkah++;
        waktu += tempo;
      }
    };
    musik = track;
    track.timer = window.setInterval(jadwalkan, 85);
    jadwalkan();
    void audio?.play().then(() => {
      if (musik === track) track.rekaman = true;
      else audio.pause();
    }).catch(() => { /* Melodi sintetis tetap berjalan. */ });
    audio?.addEventListener("error", () => { track.rekaman = false; });
  }
  volumeMusik();
}

export function aktifkanAudio() {
  const Audio = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Audio) return;
  try {
    context ??= new Audio();
    diizinkan = true;
    if (context.state !== "running") void context.resume().catch(() => {});
    sinkron();
  } catch { /* Perangkat dapat membatasi audio. */ }
}
export function aturAudio(baru: PengaturanAudio, mode: Suasana, rekaman: RekamanBgm) {
  const berhenti = pengaturan?.suara.aktif && !baru.suara.aktif;
  pengaturan = baru;
  suasana = mode;
  daftarRekaman = rekaman;
  if (berhenti) hentikanBacaan();
  sinkron();
}
export function visibilitas() {
  if (document.hidden) hentikanBacaan();
  sinkron();
}
export function efek(nama: Efek) {
  if (!pengaturan?.efek.aktif) return;
  aktifkanAudio();
  if (!context) return;
  const volume = pengaturan.efek.volume * 0.22;
  if (!volume) return;
  const sekarang = context.currentTime;
  bunyi[nama].forEach((n, i) => nada(n, sekarang + i * 0.095, 0.22, context!.destination, volume));
}
export function hentikanBacaan() {
  if (bacaan) {
    bacaan = 0;
    window.speechSynthesis?.cancel();
    volumeMusik();
  }
}
let urutan = 0;
export function baca(teks: string) {
  if (!pengaturan?.suara.aktif || !pengaturan.suara.volume || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window) || document.hidden) return;
  hentikanBacaan();
  const id = ++urutan;
  const ujaran = new SpeechSynthesisUtterance(teks);
  ujaran.lang = "id-ID";
  ujaran.rate = 0.86;
  ujaran.volume = pengaturan.suara.volume;
  const suara = window.speechSynthesis.getVoices().find((v) => /^id(?:[-_]|$)/i.test(v.lang));
  if (suara) ujaran.voice = suara;
  const selesai = () => { if (bacaan === id) { bacaan = 0; volumeMusik(); } };
  const batas = window.setTimeout(selesai, 12000);
  ujaran.onend = ujaran.onerror = () => { window.clearTimeout(batas); selesai(); };
  bacaan = id;
  volumeMusik();
  try { window.speechSynthesis.speak(ujaran); } catch { selesai(); }
}
