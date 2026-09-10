import Link from "next/link";
import type { Post } from "@/lib/posts";
import type { Project } from "@/lib/projects";
import PinnResearch from "@/content/writing/pinn-research.mdx";
import HeroArtwork from "@/components/hero-artwork";
import { researchComponents } from "@/components/mdx/research-components";
import ArticleNavigation from "./article-navigation";

export default function ResearchArticle({ post, project }: { post: Post; project?: Project }) {
  return (
    <div className="publication research-publication" id="article-top">
      <header className="article-header site-shell">
        <div className="article-breadcrumb">
          <Link href="/projects">Projects</Link><span aria-hidden="true">/</span><span>Research</span>
        </div>
        <p className="eyebrow article-category">Scientific machine learning</p>
        <h1>{post.title}</h1>
        <p className="article-deck">
          From the first physics-informed network to parameter inference and neural–mechanistic models:
          an experimental account of what the data can tell us.
        </p>
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
              Explore the code <span aria-hidden="true">↗</span>
            </a>
          )}
          <a href="#sources-and-reproducibility">Methods &amp; sources <span aria-hidden="true">↓</span></a>
        </div>
      </header>
      <div className="article-cover">
        <div className="cover-copy">
          <span className="eyebrow">WNT–RA–HOX / Research field notes</span>
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
      <div className="article-end site-shell">
        <p className="eyebrow">Keep exploring</p>
        <Link href="/projects">More from the workbench <span aria-hidden="true">↗</span></Link>
        <a href="mailto:aaidark1@swarthmore.edu">Questions or ideas? Let’s talk.</a>
      </div>
    </div>
  );
}
