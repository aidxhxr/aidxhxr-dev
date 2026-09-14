import Link from "next/link";
import type { Post } from "@/lib/posts";
import type { Project } from "@/lib/projects";
import PinnResearch from "@/content/writing/pinn-research.mdx";
import HeroArtwork from "@/components/hero-artwork";
import { researchComponents } from "@/components/mdx/research-components";
import ArticleNavigation from "./article-navigation";
import RelatedPosts from "../related-posts";

export default function ResearchArticle({ post, project }: { post: Post; project?: Project }) {
  return (
    <div className="publication research-publication" id="article-top">
      <header className="article-header site-shell">
        <div className="article-breadcrumb">
          <Link href="/projects">projects</Link><span aria-hidden="true">/</span><span>{project?.name}</span>
        </div>
        <p className="eyebrow article-category">{post.kind}</p>
        <h1>{post.title}</h1>
        <p className="article-deck">{post.description}</p>
        <div className="article-byline">
          <span>Amirkhan Aidarkhan</span><span aria-hidden="true">·</span>
          <time dateTime={post.date}>
            {new Date(`${post.date}T12:00:00Z`).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
            })}
          </time>
          <span aria-hidden="true">·</span><span>{post.readingMinutes} min read</span>
        </div>
        <div className="article-resource-links">
          {project?.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              github <span aria-hidden="true">↗</span>
            </a>
          )}
          <a href="#sources">sources <span aria-hidden="true">↓</span></a>
        </div>
      </header>
      <div className="article-cover">
        <div className="cover-copy">
          <span className="eyebrow">WNT–RA–HOX / summer 2026</span>
          <p>The trajectory is visible.<br /><em>The mechanism is not.</em></p>
          <div className="cover-scale">
            <span><strong>07</strong>State variables</span>
            <span><strong>36</strong>Unknown parameters</span>
            <span><strong>04</strong>Disease regimes</span>
          </div>
        </div>
        <HeroArtwork />
      </div>
      <div className="article-layout site-shell">
        <ArticleNavigation />
        <article id="article-body" className="article-prose">
          <PinnResearch components={researchComponents()} />
        </article>
      </div>
      <RelatedPosts post={post} />
    </div>
  );
}
