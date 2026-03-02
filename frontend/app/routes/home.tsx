import type { Route } from "./+types/home";
import { Homepage } from "../welcome/homepage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "COL Finder" },
    { name: "description", content: "Najdi si jakéhokoliv hráče COL spring split 2026" },
  ];
}

export default function Home() {
  return <Homepage />;
}
