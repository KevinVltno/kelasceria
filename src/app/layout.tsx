import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ProgressProvider } from "../hooks/useProgress";
import "./globals.css";

const baloo = localFont({ src: "./fonts/baloo-2.ttf", weight: "400 800", variable: "--font-baloo", display: "swap" });
const nunito = localFont({ src: "./fonts/nunito.ttf", weight: "200 1000", variable: "--font-nunito", display: "swap" });

export const metadata: Metadata = {
  title: "KelasCeria — Belajar sambil bermain",
  description: "Permainan belajar berbahasa Indonesia untuk anak usia 4–6 tahun.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon-192.png" },
};

export const viewport: Viewport = { themeColor: "#8959e5" };

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const rekaman = {
    menu: existsSync(join(process.cwd(), "public/audio/bgm-menu.mp3")),
    main: existsSync(join(process.cwd(), "public/audio/bgm-main.mp3")),
  };
  return <html lang="id" className={baloo.variable + " " + nunito.variable}>
    <body><ProgressProvider rekaman={rekaman}>{children}</ProgressProvider></body>
  </html>;
}
