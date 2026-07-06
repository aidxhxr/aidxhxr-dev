import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { label: "projects", href: "/projects" },
  { label: "experience", href: "/experience" },
  { label: "essays", href: "/essays" },
];

const socials = [
  { label: "github ↗", href: "https://github.com/aidxhxr" },
  {
    label: "linkedin ↗",
    href: "https://www.linkedin.com/in/amirkhan-aidarkhan-53b926347",
  },
];

export default function Nav() {
  return (
    <nav className="max-w-[773px] mx-auto w-full px-6 pt-10 pb-2 flex items-center justify-between">
      <Link href="/" className="group font-mono text-sm transition-colors">
        <span className="text-fg group-hover:text-sharp transition-colors">amir</span>
        <span className="text-dim group-hover:text-sharp transition-colors">[khan]</span>
      </Link>
      <div className="flex items-center gap-4 sm:gap-6">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm text-muted hover:text-fg transition-colors link-underline"
          >
            {l.label}
          </Link>
        ))}
        {socials.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block text-sm text-muted hover:text-fg transition-colors link-underline"
          >
            {s.label}
          </a>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
