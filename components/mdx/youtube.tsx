type YouTubeProps = {
  id: string;
  title: string;
  caption?: string;
};

export default function YouTube({ id, title, caption }: YouTubeProps) {
  return (
    <figure className="not-prose my-8">
      <div className="relative aspect-video w-full overflow-hidden rounded border border-border bg-bg">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs font-mono text-muted leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
