import Link from "next/link";
import { posts, type Post } from "@/lib/posts";

/** Two other posts, same kind first. */
export default function RelatedPosts({ post }: { post: Post }) {
  const related = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.kind === post.kind) - Number(a.kind === post.kind))
    .slice(0, 2);
  return (
    <nav className="article-related" aria-label="More writing">
      {related.map((p) => (
        <Link href={`/writing/${p.slug}`} key={p.slug}>
          <span>{p.kind}</span>
          <strong>{p.title} ↗</strong>
        </Link>
      ))}
    </nav>
  );
}
