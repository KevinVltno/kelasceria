import { angkasa } from "./ilustrasi/angkasa";
import { alam } from "./ilustrasi/alam";
import { benda } from "./ilustrasi/benda";
import { pelajaran } from "./ilustrasi/pelajaran";
import { tambahan } from "./ilustrasi/tambahan";
import { sekitar } from "./ilustrasi/sekitar";
import { gambarBentuk, warnaTinta } from "./ilustrasi/bentuk";

const ilustrasi: Record<string, React.ReactNode> = { ...alam, ...angkasa, ...benda, ...sekitar, ...pelajaran, ...tambahan, ...gambarBentuk() };

export function Ilustrasi({ isi, className = "", bidang = "0 0 64 64" }: { isi: string; className?: string; bidang?: string }) {
  const gambar = isi === "apel-dicoret" ? <>{alam.apel}<path d="M9 54 55 8" stroke="#593657" strokeWidth="8"/><path d="M9 54 55 8" stroke="#fff8f4" strokeWidth="3"/></> : ilustrasi[isi];
  if (!gambar) return <span>{isi}</span>;
  return <svg className={"illustration " + className} viewBox={bidang} fill="none" stroke={warnaTinta} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{gambar}</svg>;
}

export function DeretIlustrasi({ isi }: { isi: string[] }) {
  return <span className="illustration-row">{isi.map((item, i) => <Ilustrasi key={i} isi={item}/>)}</span>;
}
