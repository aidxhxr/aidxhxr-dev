export default function FigureRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 [&>figure]:my-0">
      {children}
    </div>
  );
}
