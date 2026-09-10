import Link from "next/link";
import type { ReactNode } from "react";
import { posts, type Post } from "@/lib/posts";
import type { Project } from "@/lib/projects";
import ArticleNavigation from "./research/article-navigation";
import WorkVisual from "./work-visual";

export default function ProjectArticle({ post, project, children }: { post: Post; project?: Project; children: ReactNode }) {
  const related = posts.filter(p => p.slug !== post.slug).sort((a, b) => Number(b.kind === post.kind) - Number(a.kind === post.kind)).slice(0, 2);
  return (
    <div className="publication project-publication" id="article-top">
      <header className="article-header site-shell">
        <div className="article-breadcrumb"><Link href="/#featured-work">Selected work</Link><span aria-hidden="true">/</span><span>{project?.name}</span></div>
        <p className="eyebrow article-category">{post.category} / {post.kind === "Product" ? "Build notes" : "Engineering notes"}</p>
        <h1>{post.title}</h1>
        <p className="article-deck">{post.description}</p>
        <div className="article-byline">
          <span>Amirkhan Aidarkhan</span><span aria-hidden="true">·</span>
          <time dateTime={post.updatedDate || post.date}>{post.updatedDate ? "Updated " : ""}{new Date(`${post.updatedDate || post.date}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time>
          <span aria-hidden="true">·</span><span>{post.readingMinutes} min read</span>
        </div>
        <div className="article-resource-links">
          {project?.github && <a href={project.github} target="_blank" rel="noopener noreferrer">Explore the code <span aria-hidden="true">↗</span></a>}
          {project?.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">{post.slug === "grokeye" ? "Watch the demo" : "Visit the project"} <span aria-hidden="true">↗</span></a>}
          <a href="#sources-and-scope">Sources &amp; scope <span aria-hidden="true">↓</span></a>
        </div>
      </header>
      <figure className="project-cover"><WorkVisual slug={post.slug} /><figcaption>An illustration of the idea behind {project?.name}.</figcaption></figure>
      <div className="article-layout site-shell">
        <ArticleNavigation key={post.slug} />
        <article id="article-body" className="article-prose">{children}</article>
      </div>
      <nav className="article-related" aria-label="More writing">
        {related.map(p => <Link href={`/writing/${p.slug}`} key={p.slug}><span>{p.kind} / {p.readingMinutes} min read</span><strong>{p.title} ↗</strong></Link>)}
      </nav>
    </div>
  );
}
