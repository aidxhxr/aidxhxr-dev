type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export default function Figure({ src, alt, caption, width, height }: FigureProps) {
  return (
    <figure className="not-prose my-8">
      {/* eslint-disable-next-line @next/next/no-img-element -- static asset, no optimizer on Workers */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="block w-full h-auto rounded border border-border bg-bg"
      />
      {caption && (
        <figcaption className="mt-2 text-xs font-mono text-muted leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
