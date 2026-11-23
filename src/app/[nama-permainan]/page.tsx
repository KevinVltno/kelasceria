import { notFound } from "next/navigation";
import { games } from "../../data/menu";
import { Permainan } from "../../components/Permainan";

export function generateStaticParams() {
  return games.map(([id]) => ({ "nama-permainan": id }));
}

export default async function Page({ params }: { params: Promise<{ "nama-permainan": string }> }) {
  const id = (await params)["nama-permainan"];
  const game = games.find(([slug]) => slug === id);
  if (!game) notFound();
  return <Permainan key={id} game={game}/>;
}
