"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFolders } from "./FoldersProvider";

export default function Sidebar() {
  const pathname = usePathname();
  const { folders } = useFolders();

  return (
    <aside className="flex w-56 flex-col gap-1 border-r border-[var(--border)] p-4">
      <Link
        href="/"
        className={`rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 ${
          pathname === "/"
            ? "bg-[var(--hover-bg)] font-semibold text-[var(--text)]"
            : "font-medium text-[var(--text-sub)] hover:bg-[var(--hover-bg)]"
        }`}
      >
        ALL
      </Link>
      <div className="mt-4 flex flex-col gap-1">
        <span className="px-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-sub)]">
          폴더
        </span>
        {folders.map((folder) => {
          const href = `/folder/${folder.id}`;
          const isActive = pathname === href;
          return (
            <Link
              key={folder.id}
              href={href}
              className={`rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 ${
                isActive
                  ? "bg-[var(--hover-bg)] font-semibold text-[var(--text)]"
                  : "font-medium text-[var(--text-sub)] hover:bg-[var(--hover-bg)]"
              }`}
            >
              {folder.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
