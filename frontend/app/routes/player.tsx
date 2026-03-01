import type { Route } from "./+types/home";
import { Player } from "../player/player";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Player Page" },
    { name: "description", content: "Zobraz informace o hráči COL spring split 2026" },
  ];
}

export default function PlayerRoute() {
  return <Player />;
}