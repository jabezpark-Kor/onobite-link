import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-translucent)] px-4 backdrop-blur-sm">
      <Link href="/" className="text-base font-semibold text-[var(--text)]">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="flex items-center gap-1 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)]"
      >
        <span aria-hidden>+</span>
        새 링크
      </Link>
    </header>
  );
}
