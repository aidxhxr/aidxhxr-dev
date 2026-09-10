"use client";

import { useEffect, useRef, useState } from "react";

type Section = { id: string; title: string };

export default function ArticleNavigation() {
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState("");
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const article = document.getElementById("article-body");
    if (!article) return;
    const headings = Array.from(article.querySelectorAll<HTMLHeadingElement>("h2[id]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const current = [...headings].reverse().find((heading) => heading.getBoundingClientRect().top <= 160);
      setActive(current?.id || headings[0]?.id || "");
      const top = article.getBoundingClientRect().top + window.scrollY;
      const distance = article.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(100, ((window.scrollY - top) / Math.max(distance, 1)) * 100));
      if (progressRef.current) progressRef.current.style.width = `${progress}%`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    frame = requestAnimationFrame(() => {
      setSections(headings.map((heading) => ({ id: heading.id, title: heading.querySelector("a")?.childNodes[0]?.textContent || heading.textContent || "" })));
      update();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const links = sections.map((section, index) => (
    <li key={section.id}>
      <a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>
        <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{section.title}
      </a>
    </li>
  ));

  return (
    <>
      <div className="reading-progress" aria-hidden="true"><span ref={progressRef} style={{ width: 0 }} /></div>
      <aside className="article-rail">
        <nav className="desktop-contents" aria-label="Article sections">
          <p className="eyebrow">In this article</p>
          <ol>{links}</ol>
          <a className="rail-top" href="#article-top">Back to top ↑</a>
        </nav>
        <details className="mobile-contents">
          <summary>In this article <span aria-hidden="true">↗</span></summary>
          <nav aria-label="Article sections"><ol>{links}</ol></nav>
        </details>
      </aside>
    </>
  );
}
