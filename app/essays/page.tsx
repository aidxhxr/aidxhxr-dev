import type { Metadata } from "next";
import SandText from "@/components/sand-text";

export const metadata: Metadata = {
  title: "Essays — Amirkhan Aidarkhan",
};

export default function EssaysPage() {
  return (
    <div className="max-w-[773px] mx-auto px-6 py-10 sm:py-16">
      <header className="mb-14">
        <h1 className="text-fg text-2xl font-medium tracking-tight mb-2">
          essays
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          I have been deeply inspired by the essays I have read all over the
          internet, from Tim Denning on X to Zvi Mowshowitz on LessWrong. In
          the near future, I hope to share my own first principles here.
        </p>
      </header>
      <SandText />
    </div>
  );
}
