"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "./types";

type SidebarProps = {
  folders: Folder[];
};

export default function Sidebar({ folders }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 flex-col gap-1 border-r border-black/[.08] p-4 dark:border-white/[.145]">
      <Link
        href="/"
        className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
          pathname === "/"
            ? "bg-foreground text-background"
            : "text-zinc-600 hover:bg-black/[.04] dark:text-zinc-400 dark:hover:bg-[#1a1a1a]"
        }`}
      >
        ALL
      </Link>
      <div className="mt-4 flex flex-col gap-1">
        <span className="px-3 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          폴더
        </span>
        {folders.map((folder) => {
          const href = `/folder/${folder.id}`;
          const isActive = pathname === href;
          return (
            <Link
              key={folder.id}
              href={href}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                isActive
                  ? "bg-foreground text-background"
                  : "text-zinc-600 hover:bg-black/[.04] dark:text-zinc-400 dark:hover:bg-[#1a1a1a]"
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
