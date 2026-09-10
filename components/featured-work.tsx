"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import WorkVisual from "./work-visual";

const filters = ["All", "Research", "Engineering", "Product"] as const;
type WorkItem = { post: Post; name: string };

export default function FeaturedWork({ items }: { items: WorkItem[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = items.filter(({ post }) => filter === "All" || post.kind === filter);
  return (
    <section className="featured-work" id="featured-work" aria-labelledby="featured-title">
      <div className="featured-heading">
        <div><p className="work-eyebrow">From the workbench</p><h2 id="featured-title">Featured work<span>.</span></h2></div>
        <p>Things I’m building, questions I’m following,<br className="hidden sm:block" /> and what I’ve learned along the way.</p>
      </div>
      <div className="work-toolbar">
        <div className="work-filters" role="group" aria-label="Filter featured work">
          {filters.map(option => <button key={option} type="button" aria-pressed={option === filter} onClick={() => setFilter(option)}>{option}</button>)}
        </div>
        <span className="work-count" role="status">{String(visible.length).padStart(2, "0")} {visible.length === 1 ? "story" : "stories"}</span>
      </div>
      <div className="work-grid">
        {visible.map(({ post, name }) => <Link className="work-card" key={post.slug} href={`/writing/${post.slug}`}>
          <div className="work-card-image"><WorkVisual slug={post.slug} /><span className="work-open" aria-hidden="true">↗</span></div>
          <div className="work-card-meta"><span>{name} <span aria-hidden="true">/</span> {post.kind}</span><span>{post.readingMinutes} min read</span></div>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <span className="work-read">Read the {post.kind === "Research" ? "research" : post.kind === "Product" ? "notes" : "story"} <span aria-hidden="true">↗</span></span>
        </Link>)}
      </div>
      <div className="work-footer"><span>Built while studying computer science at Swarthmore.</span><Link href="/projects">Project index <span aria-hidden="true">↗</span></Link></div>
    </section>
  );
}
