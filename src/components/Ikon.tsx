import type { ReactNode } from "react";

const gambar: Record<string, ReactNode> = {
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/></>,
  play: <path d="m9 5 12 7-12 7z"/>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
  settings: <><path d="m10 3-.7 3-2 .9-2.7-1.5L2.7 9l2.3 2v2l-2.3 2 1.9 3.6 2.7-1.5 2 .9.7 3h4l.7-3 2-.9 2.7 1.5 1.9-3.6-2.3-2v-2l2.3-2-1.9-3.6-2.7 1.5-2-.9-.7-3z"/><circle cx="12" cy="12" r="3"/></>,
  music: <><path d="M9 18V5l12-2v13M9 9l12-2"/><ellipse cx="6" cy="18.5" rx="3" ry="2.5"/><ellipse cx="18" cy="16.5" rx="3" ry="2.5"/></>,
  full: <path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6"/>,
  back: <path d="m14 6-6 6 6 6"/>,
  next: <path d="m10 6 6 6-6 6"/>,
  sound: <><path d="M3 9v6h4l5 4V5L7 9zM16 9a4 4 0 0 1 0 6m3-9a8 8 0 0 1 0 12"/></>,
  star: <path d="m12 2 3 6 7 .9-5 4.8 1.2 7-6.2-3.3-6.2 3.3 1.2-7-5-4.8L9 8z" fill="currentColor"/>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 1 1 0 0 1 .6-1.8h2.9C23 15.5 22 3 12 3Z"/><path d="M7 11h.01M9 7h.01M14 7h.01M17 10h.01" strokeWidth="3"/></>,
  puzzle: <path d="M9 3H5a2 2 0 0 0-2 2v4a3 3 0 1 1 0 6v4a2 2 0 0 0 2 2h4a3 3 0 1 1 6 0h4a2 2 0 0 0 2-2v-4a3 3 0 1 1 0-6V5a2 2 0 0 0-2-2h-4a3 3 0 1 1-6 0Z"/>,
  book: <><path d="M12 5v16M3 4c4-1 7 0 9 2 2-2 5-3 9-2v14c-4-1-7 0-9 2-2-2-5-3-9-2z"/></>,
};

export function Ikon({ nama, ukuran = 22 }: { nama: string; ukuran?: number }) {
  return <svg width={ukuran} height={ukuran} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{gambar[nama]}</svg>;
}
