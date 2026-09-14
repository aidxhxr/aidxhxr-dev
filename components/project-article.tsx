import Link from "next/link";
import type { ReactNode } from "react";
import type { Post } from "@/lib/posts";
import type { Project } from "@/lib/projects";
import ArticleNavigation from "./research/article-navigation";
import RelatedPosts from "./related-posts";

export default function ProjectArticle({ post, project, children }: { post: Post; project?: Project; children: ReactNode }) {
  return (
    <div className="publication project-publication" id="article-top">
      <header className="article-header site-shell">
        <div className="article-breadcrumb"><Link href="/projects">projects</Link><span aria-hidden="true">/</span><span>{project?.name}</span></div>
        <p className="eyebrow article-category">{post.kind}</p>
        <h1>{post.title}</h1>
        <p className="article-deck">{post.description}</p>
        <div className="article-byline">
          <span>Amirkhan Aidarkhan</span><span aria-hidden="true">·</span>
          <time dateTime={post.updatedDate || post.date}>{post.updatedDate ? "Updated " : ""}{new Date(`${post.updatedDate || post.date}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time>
          <span aria-hidden="true">·</span><span>{post.readingMinutes} min read</span>
        </div>
        <div className="article-resource-links">
          {project?.github && <a href={project.github} target="_blank" rel="noopener noreferrer">github <span aria-hidden="true">↗</span></a>}
          {project?.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">demo <span aria-hidden="true">↗</span></a>}
          {project?.github && <a href="#sources">sources <span aria-hidden="true">↓</span></a>}
        </div>
      </header>
      <div className="article-layout site-shell">
        <ArticleNavigation key={post.slug} />
        <article id="article-body" className="article-prose">{children}</article>
      </div>
      <RelatedPosts post={post} />
    </div>
  );
}
