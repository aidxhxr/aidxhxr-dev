import type { Metadata } from "next";
import type { MDXProps } from "mdx/types";
import ProjectArticle from "@/components/project-article";
import { researchComponents } from "@/components/mdx/research-components";
import { posts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/content/writing/breadcrumbs.mdx";
import BuildingTickflow from "@/content/writing/building-tickflow.mdx";
import CompanyBrain from "@/content/writing/company-brain.mdx";
import Grokeye from "@/content/writing/grokeye.mdx";
import PinnResearch from "@/content/writing/pinn-research.mdx";
import Swatgpt from "@/content/writing/swatgpt.mdx";
import ResearchArticle from "@/components/research/article";

const postComponents: Record<string, React.ComponentType<MDXProps>> = {
  breadcrumbs: Breadcrumbs,
  "building-tickflow": BuildingTickflow,
  "company-brain": CompanyBrain,
  grokeye: Grokeye,
  "pinn-research": PinnResearch,
  swatgpt: Swatgpt,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Amirkhan Aidarkhan`,
    description: post.description,
    openGraph: {
      title: post.title, description: post.description, type: "article",
      publishedTime: post.date, modifiedTime: post.updatedDate || post.date, authors: ["Amirkhan Aidarkhan"],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const project = projects.find((p) => p.slug === slug);
  const Post = postComponents[slug];
  if (!Post) notFound();

  if (slug === "pinn-research") {
    return <ResearchArticle post={post} project={project} />;
  }

  return (
    <ProjectArticle post={post} project={project}>
      <Post components={researchComponents("Project comparison table")} />
    </ProjectArticle>
  );
}
