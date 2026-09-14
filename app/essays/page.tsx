import type { Metadata } from "next";
import SandMap from "@/components/sand-map";

export const metadata: Metadata = {
  title: "Essays — Amirkhan Aidarkhan",
};

export default function EssaysPage() {
  return (
    <div className="max-w-[773px] mx-auto px-6 py-10 sm:py-16">
      <header className="mb-10">
        <h1 className="text-fg text-2xl font-medium tracking-tight mb-2">
          essays
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          I was born in Kazakhstan and have done most of my reading in essays
          written somewhere else. This is the map of that reading. Each point
          is a writer who changed how I think, and the bright one is home. My
          own essays will start there.
        </p>
      </header>

      <SandMap />
    </div>
  );
}
