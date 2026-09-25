"use client";

import { useState } from "react";
import Link from "next/link";
import NewFolderModal from "./NewFolderModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-translucent)] px-4 backdrop-blur-sm">
        <Link href="/" className="text-base font-semibold text-[var(--text)]">
          한입 링크
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--hover-bg)]"
          >
            + 새 폴더
          </button>
          <Link
            href="/new"
            className="flex items-center gap-1 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)]"
          >
            <span aria-hidden>+</span>
            새 링크
          </Link>
        </div>
      </header>
      <NewFolderModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
